import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { BEER_LIST } from "../data/beerData";

// ────────────────────────────────────────────────────────────
// Supabase 컬럼(snake_case) → 앱 포맷(camelCase) 변환
// ────────────────────────────────────────────────────────────
function normalizeBeer(b) {
  return {
    id:          b.id,                     // UUID string
    name:        b.name ?? "",
    type:        b.type ?? "",
    category:    b.category ?? "",
    abv:         b.abv ?? "",
    srm:         b.srm ?? 0,
    srmColor:    b.srm_color ?? "#C9A227",
    image:       b.image_url ?? null,
    tags:        b.tags ?? [],
    hashtags:    b.hashtags ?? [],
    profile:     b.profile ?? {},
    brewery:     b.brewery ?? "",
    origin:      b.origin ?? "",
    description: b.description ?? "",
    is_verified: b.is_verified ?? false,
  };
}

// ────────────────────────────────────────────────────────────
// Context
// ────────────────────────────────────────────────────────────
const BeerContext = createContext({
  beers:   [],
  loading: true,
  error:   null,
});

export function BeerProvider({ children }) {
  const [beers,   setBeers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchBeers() {
      try {
        // PostgREST max_rows 제한을 피하기 위해 range로 전체 fetch
        let allData = [];
        const PAGE = 500;
        let from = 0;
        while (true) {
          const { data: chunk, error: chunkErr } = await supabase
            .from("beers")
            .select("*")
            .order("category")
            .order("name")
            .range(from, from + PAGE - 1);

          if (chunkErr) throw chunkErr;
          if (!chunk || chunk.length === 0) break;
          allData = allData.concat(chunk);
          if (chunk.length < PAGE) break;
          from += PAGE;
        }
        if (cancelled) return;

        const normalized = allData.map(normalizeBeer);
        // DB가 비어 있으면 기본 데이터 사용
        setBeers(normalized.length > 0 ? normalized : BEER_LIST);
      } catch (err) {
        if (!cancelled) {
          setError(err);
          console.error("[BeerContext] Supabase 연결 실패 → 기본 데이터 사용:", err.message);
          // Supabase 실패 시 정적 BEER_LIST 폴백
          setBeers(BEER_LIST);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchBeers();
    return () => { cancelled = true; };
  }, []);

  return (
    <BeerContext.Provider value={{ beers, loading, error }}>
      {children}
    </BeerContext.Provider>
  );
}

export function useBeers() {
  return useContext(BeerContext);
}
