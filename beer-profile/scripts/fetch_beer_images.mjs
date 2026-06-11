/**
 * 맥주 Wikipedia 이미지 자동 수집 스크립트 (REST API v1 버전)
 *
 * 사용법:
 *   node scripts/fetch_beer_images.mjs <SERVICE_ROLE_KEY>
 *
 * - SERVICE_ROLE_KEY: Supabase Dashboard → Project Settings → API → service_role
 * - 키 없이 실행하면 supabase/seed_images.sql 파일만 생성
 */

import { createClient } from "@supabase/supabase-js";
import { writeFileSync } from "fs";

const SUPABASE_URL = "https://wuasbqxufoadvmkecxff.supabase.co";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1YXNicXh1Zm9hZHZta2VjeGZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwNjU0NzEsImV4cCI6MjA5NjY0MTQ3MX0.Qc_lQO2v4urrDFeCr-d-XebMXRwCbGktFhTb3zDBI-o";

const SERVICE_KEY = process.argv[2] || null;

const reader = createClient(SUPABASE_URL, ANON_KEY);
const writer = SERVICE_KEY ? createClient(SUPABASE_URL, SERVICE_KEY) : null;

// 한국어 맥주명 → Wikipedia 영문 아티클 제목 (정확한 제목 사용)
// https://en.wikipedia.org/api/rest_v1/page/summary/{TITLE} 로 조회
const WIKI_TITLE_MAP = {
  // ── 라거 (국내) ──────────────────────────────────────────────
  "테라": "Terra (beer)",
  "카스": "Cass (beer)",
  "켈리": "Kelly (beer)",
  "클라우드": "Kloud",
  "하이트": "Hite",
  "OB 라거": "OB Beer",
  // ── 라거 (일본) ──────────────────────────────────────────────
  "아사히 수퍼 드라이": "Asahi Super Dry",
  "삿포로 프리미엄": "Sapporo Beer",
  "에비스": "Yebisu",
  "기린 이치방": "Kirin Ichiban",
  "기린 라거": "Kirin Brewery Company",
  "산토리 더 프리미엄 몰츠": "The Premium Malt's",
  "오리온 드래프트": "Orion Beer",
  // ── 라거 (아시아) ────────────────────────────────────────────
  "칭다오": "Tsingtao Brewery",
  "타이거": "Tiger Beer",
  "창": "Chang Beer",
  "싱하": "Singha",
  // ── 라거 (유럽) ──────────────────────────────────────────────
  "하이네켄": "Heineken",
  "스텔라 아르투아": "Stella Artois",
  "칼스버그": "Carlsberg Group",
  "필스너 우르켈": "Pilsner Urquell",
  "코젤 다크": "Kozel",
  "코젤 프리미엄": "Kozel",
  "파울라너 헬레스": "Paulaner Brewery",
  "아우구스티너 헬레스": "Augustiner-Bräu",
  "호프브로이 오리지널": "Hofbräuhaus München",
  "뢰벤브로이": "Löwenbräu",
  "벡스": "Beck's Brewery",
  "비트부르거": "Bitburger Brewery",
  "크로넨버그 1664": "Kronenbourg",
  "크롬바허 필스": "Krombacher Brauerei",
  "바슈타이너": "Warsteiner",
  "예버 필스너": "Jever (beer)",
  "부드바르": "Budweiser Budvar Brewery",
  "스타로프라멘": "Staropramen",
  // ── 라거 (아메리카) ──────────────────────────────────────────
  "코로나 엑스트라": "Corona (beer)",
  "모델로 에스페시알": "Grupo Modelo",
  "버드와이저": "Budweiser",
  "밀러 라이트": "Miller Lite",
  "쿠어스 라이트": "Coors Light",
  "미켈롭 울트라": "Michelob Ultra",
  "유엔글링 트래디셔널 라거": "Yuengling",
  "퍼시피코": "Cerveza Pacífico Clara",
  "도스 에퀴스": "Dos Equis",
  "솔": "Sol (beer)",
  // ── IPA ──────────────────────────────────────────────────────
  "브루독 펑크 IPA": "BrewDog",
  "시에라 네바다 토르치 IPA": "Sierra Nevada Brewing Co.",
  "도그피시헤드 60분 IPA": "Dogfish Head Brewery",
  "라구니타스 IPA": "Lagunitas Brewing Company",
  "구스 아일랜드 IPA": "Goose Island Beer Company",
  "스톤 IPA": "Stone Brewing Co.",
  "밸러스트 포인트 스컬핀": "Ballast Point Brewing Company",
  "벨스 투 하티드": "Bell's Brewery",
  "플리니 더 엘더": "Russian River Brewing Company",
  "파이어스톤 유니온 잭": "Firestone Walker Brewing Company",
  "데슈츠 프레시 스퀴즈": "Deschutes Brewery",
  "파운더스 센테니얼 IPA": "Founders Brewing Co.",
  "데드 포니 클럽": "BrewDog",
  "헤이지 제인": "BrewDog",
  "히타치노 네스트 IPA": "Hitachino Nest Beer",
  // ── 에일 - 밀맥주 ────────────────────────────────────────────
  "호가든 오리지날": "Hoegaarden Brewery",
  "파울라너 헤페바이젠": "Paulaner Brewery",
  "에르딩어 바이스비어": "Erdinger",
  "슈나이더 아벤투스": "Schneider Weisse",
  "블루문 벨지안 화이트": "Blue Moon Brewing Company",
  "프란치스카너 헤페바이젠": "Franziskaner-Leist-Bräu",
  "바이엔슈테판 헤페바이젠": "Bayerische Staatsbrauerei Weihenstephan",
  "1664 블랑": "Kronenbourg",
  "알라가쉬 화이트": "Allagash Brewing Company",
  "에르딩어 둔켈": "Erdinger",
  "히타치노 네스트 화이트에일": "Hitachino Nest Beer",
  // ── 에일 - Pale Ale ──────────────────────────────────────────
  "시에라 네바다 페일 에일": "Sierra Nevada Brewing Co.",
  "뉴캐슬 브라운 에일": "Newcastle Brown Ale",
  "사무엘 스미스 페일 에일": "Samuel Smith's Brewery",
  "풀러스 런던 프라이드": "Fuller's Brewery",
  "앵커 리버티 에일": "Anchor Brewing Company",
  "쓰리플로이즈 좀비 더스트": "Three Floyds Brewing",
  // ── 에일 - 벨기에 ────────────────────────────────────────────
  "호가든 그랑 크뤼": "Hoegaarden Brewery",
  "시메이 화이트 (Tripel)": "Chimay Brewery",
  "시메이 레드 (Dubbel)": "Chimay Brewery",
  "시메이 블루 (Quadrupel)": "Chimay Brewery",
  "듀벨": "Duvel Moortgat Brewery",
  "레페 브론드": "Leffe",
  "레페 다크": "Leffe",
  "베스트말레 트리플": "Westmalle Brewery",
  "베스트말레 더블": "Westmalle Brewery",
  "오르발": "Orval Brewery",
  "로슈포르 6": "Brasserie de Rochefort",
  "로슈포르 8": "Brasserie de Rochefort",
  "로슈포르 10": "Brasserie de Rochefort",
  "델리리움 트레멘스": "Delirium Tremens (beer)",
  "델리리움 녹터넘": "Delirium Tremens (beer)",
  "세인트 버나두스 압트 12": "Brouwerij St. Bernardus",
  "굴든 드락": "Van Steenberge Brewery",
  "웨스트블레테런 12": "Westvleteren Brewery",
  "트리펠 카멜리트": "Brouwerij Bosteels",
  "크바크": "Brouwerij Bosteels",
  "그림베르겐 블론드": "Grimbergen (beer)",
  "마레드수 8": "Maredsous Brewery",
  "파울라너 살바토르": "Paulaner Brewery",
  // ── 스타우트 ─────────────────────────────────────────────────
  "기네스 드래프트": "Guinness",
  "기네스 엑스트라 스타우트": "Guinness",
  "영스 더블 초콜릿 스타우트": "Wells & Young's",
  "사무엘 스미스 오트밀 스타우트": "Samuel Smith's Brewery",
  "파운더스 임페리얼 스타우트": "Founders Brewing Co.",
  "파운더스 브렉퍼스트 스타우트": "Founders Brewing Co.",
  "파운더스 KBS": "Founders Brewing Co.",
  "올드 라스푸틴": "North Coast Brewing Company",
  "레프트핸드 밀크 스타우트": "Left Hand Brewing Company",
  "구스 아일랜드 버번 카운티": "Goose Island Beer Company",
  "알레스미스 스피드웨이 스타우트": "AleSmith Brewing Company",
  "브루클린 블랙 초콜릿 스타우트": "Brooklyn Brewery",
  "머피스 아이리시 스타우트": "Murphy's Irish Stout",
  // ── 포터 ─────────────────────────────────────────────────────
  "풀러스 런던 포터": "Fuller's Brewery",
  "앵커 포터": "Anchor Brewing Company",
  "파운더스 포터": "Founders Brewing Co.",
  "데슈츠 블랙 버트 포터": "Deschutes Brewery",
  "코나 파이프라인 포터": "Kona Brewing Company",
  "스톤 스모크드 포터": "Stone Brewing Co.",
  "오코침 발틱 포터": "Okocim Brewery",
  "지비에츠 발틱 포터": "Żywiec Brewery",
  "코에도 시코쿠": "Coedo Brewery",
  // ── 사워 ─────────────────────────────────────────────────────
  "린데만스 크릭": "Brouwerij Lindemans",
  "린데만스 프람부아즈": "Brouwerij Lindemans",
  "린데만스 피치": "Brouwerij Lindemans",
  "칸티용 구즈": "Brasserie Cantillon",
  "칸티용 크릭": "Brasserie Cantillon",
  "칸티용 로제 드 감브리누스": "Brasserie Cantillon",
  "분 우드 구즈": "Brouwerij Boon",
  "분 크릭": "Brouwerij Boon",
  "쓰리 폰테이넨 구즈": "3 Fonteinen",
  "로덴바흐 그랑 크뤼": "Brouwerij Rodenbach",
  "뒤세스 드 부르고뉴": "Brouwerij Verhaeghe",
  "러시안 리버 서플리케이션": "Russian River Brewing Company",
  "러시안 리버 컨세크레이션": "Russian River Brewing Company",
  "뉴 벨지엄 라 폴리 사워": "New Belgium Brewing Company",
};

async function fetchWikiImage(articleTitle) {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(articleTitle)}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "BeerProfileApp/1.0 (beer-profile-project)" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.thumbnail?.source || data?.originalimage?.source || null;
  } catch {
    return null;
  }
}

async function main() {
  let allBeers = [];
  let from = 0;
  while (true) {
    const { data, error } = await reader
      .from("beers")
      .select("id, name, image_url")
      .range(from, from + 499);
    if (error) throw error;
    if (!data || data.length === 0) break;
    allBeers = allBeers.concat(data);
    if (data.length < 500) break;
    from += 500;
  }

  const targets = allBeers.filter((b) => !b.image_url);
  console.log(`이미지 없는 맥주: ${targets.length}개 검색 시작...\n`);

  const found = [];
  const notFound = [];

  for (const beer of targets) {
    const wikiTitle = WIKI_TITLE_MAP[beer.name];
    if (!wikiTitle) {
      notFound.push(beer.name);
      console.log(`⏭️  ${beer.name} → 매핑 없음 (스킵)`);
      continue;
    }

    const imageUrl = await fetchWikiImage(wikiTitle);

    if (imageUrl) {
      found.push({ id: beer.id, name: beer.name, imageUrl });
      const short = imageUrl.length > 80 ? imageUrl.slice(0, 80) + "…" : imageUrl;
      console.log(`✅ ${beer.name}\n   → ${short}`);
    } else {
      notFound.push(beer.name);
      console.log(`⚠️  ${beer.name} (${wikiTitle}) → 이미지 없음`);
    }

    await new Promise((r) => setTimeout(r, 400));
  }

  console.log(`\n📊 결과: ${found.length}개 수집 / ${notFound.length}개 미수집`);

  if (writer && found.length > 0) {
    console.log("\n🔄 DB 업데이트 중...");
    for (const { id, name, imageUrl } of found) {
      const { error } = await writer
        .from("beers")
        .update({ image_url: imageUrl })
        .eq("id", id);
      if (error) {
        console.error(`  ❌ ${name}: ${error.message}`);
      } else {
        console.log(`  ✅ ${name}`);
      }
    }
    console.log("\n🎉 DB 업데이트 완료!");
  } else if (found.length > 0) {
    const sql =
      "-- 맥주 이미지 업데이트 (name 기준)\n" +
      found
        .map(
          ({ name, imageUrl }) =>
            `UPDATE public.beers SET image_url = '${imageUrl.replace(/'/g, "''")}' WHERE name = '${name.replace(/'/g, "''")}';`
        )
        .join("\n");

    writeFileSync("supabase/seed_images.sql", sql);
    console.log("\n📄 supabase/seed_images.sql 생성 완료");
    console.log("   → Supabase Dashboard SQL Editor에서 실행하세요.");
    console.log("   → 또는: node scripts/fetch_beer_images.mjs <SERVICE_ROLE_KEY>");
  }

  if (notFound.length > 0) {
    console.log("\n⚠️  이미지 미수집 목록:");
    notFound.forEach((n) => console.log(`   - ${n}`));
  }
}

main().catch(console.error);
