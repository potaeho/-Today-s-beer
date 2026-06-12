import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

// ── supabase 모듈 모킹 (테스트마다 재설정) ───────────────────
vi.mock("../lib/supabase", () => ({ supabase: null }));

import { BeerProvider, useBeers } from "../contexts/BeerContext";
import { BEER_LIST } from "../data/beerData";

const wrapper = ({ children }) => <BeerProvider>{children}</BeerProvider>;

function renderBeers() {
  return renderHook(() => useBeers(), { wrapper });
}

describe("BeerProvider 폴백 동작", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("supabase가 null이면 정적 BEER_LIST로 폴백한다", async () => {
    // 기본 모킹값이 null
    const { result } = renderBeers();
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.beers).toBe(BEER_LIST);
    expect(result.current.error).toBeNull();
  });
});
