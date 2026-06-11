// 노션 추가 맥주 데이터 Supabase 삽입 스크립트
// 실행: node scripts/insert_notion_beers.mjs [SERVICE_ROLE_KEY]
// SERVICE_ROLE_KEY가 없으면 .env의 anon key 사용

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

const SUPABASE_URL = "https://wuasbqxufoadvmkecxff.supabase.co";

// 인자로 service_role key를 받거나 anon key 사용
const KEY =
  process.argv[2] ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1YXNicXh1Zm9hZHZta2VjeGZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwNjU0NzEsImV4cCI6MjA5NjY0MTQ3MX0.Qc_lQO2v4urrDFeCr-d-XebMXRwCbGktFhTb3zDBI-o";

const supabase = createClient(SUPABASE_URL, KEY);

const BEERS = [
  // ──────────────────────────────────────────────────
  // 라거 추가 (axes: 단맛 신맛 쓴맛 몰티함 아로마)
  // ──────────────────────────────────────────────────

  // 국내 추가
  { name: "카스 라이트", type: "Light Lager", category: "라거", abv: "4.0%", srm: 2, srm_color: "#F8EFA0", brewery: "OB맥주", origin: "대한민국", tags: ["#가벼운", "#저칼로리"], hashtags: ["tex_watery", "tex_dry"], profile: { 단맛: 0.8, 신맛: 0.3, 쓴맛: 1.0, 몰티함: 1.0, 아로마: 0.8 } },
  { name: "OB 라거", type: "Lager", category: "라거", abv: "5.0%", srm: 3, srm_color: "#F5E27A", brewery: "OB맥주", origin: "대한민국", tags: ["#청량함", "#가벼운"], hashtags: ["tex_watery", "malt_grain"], profile: { 단맛: 1.0, 신맛: 0.5, 쓴맛: 1.2, 몰티함: 1.5, 아로마: 1.0 } },
  { name: "맥스", type: "All-Malt Lager", category: "라거", abv: "5.0%", srm: 4, srm_color: "#F0D060", brewery: "OB맥주", origin: "대한민국", tags: ["#올몰트", "#깔끔함"], hashtags: ["malt_grain", "tex_dry"], profile: { 단맛: 1.5, 신맛: 0.5, 쓴맛: 2.0, 몰티함: 2.2, 아로마: 1.8 } },
  { name: "드라이피니시 D", type: "Dry Lager", category: "라거", abv: "4.5%", srm: 3, srm_color: "#F5E27A", brewery: "하이트진로", origin: "대한민국", tags: ["#드라이", "#청량함"], hashtags: ["tex_dry", "tex_watery"], profile: { 단맛: 0.8, 신맛: 0.5, 쓴맛: 2.0, 몰티함: 1.5, 아로마: 1.2 } },
  { name: "클라우드 생 드래프트", type: "Draft Lager", category: "라거", abv: "5.0%", srm: 4, srm_color: "#F0D060", brewery: "롯데주류", origin: "대한민국", tags: ["#드래프트", "#깔끔함"], hashtags: ["tex_dry", "malt_grain"], profile: { 단맛: 1.3, 신맛: 0.5, 쓴맛: 1.8, 몰티함: 2.0, 아로마: 1.5 } },
  { name: "피츠", type: "Light Lager", category: "라거", abv: "4.5%", srm: 2, srm_color: "#F8EFA0", brewery: "하이트진로", origin: "대한민국", tags: ["#가벼운", "#청량함"], hashtags: ["tex_watery", "tex_dry"], profile: { 단맛: 0.8, 신맛: 0.3, 쓴맛: 1.0, 몰티함: 1.0, 아로마: 0.8 } },
  { name: "필굿", type: "Light Lager", category: "라거", abv: "4.0%", srm: 2, srm_color: "#F8EFA0", brewery: "OB맥주", origin: "대한민국", tags: ["#가벼운", "#저칼로리"], hashtags: ["tex_watery", "tex_dry"], profile: { 단맛: 0.8, 신맛: 0.3, 쓴맛: 0.8, 몰티함: 1.0, 아로마: 0.8 } },
  { name: "하이트", type: "Lager", category: "라거", abv: "4.5%", srm: 3, srm_color: "#F5E27A", brewery: "하이트진로", origin: "대한민국", tags: ["#청량함", "#클래식"], hashtags: ["tex_watery", "malt_grain"], profile: { 단맛: 1.0, 신맛: 0.5, 쓴맛: 1.3, 몰티함: 1.5, 아로마: 1.2 } },
  // 국내 크래프트
  { name: "제주 라거", type: "Craft Lager", category: "라거", abv: "4.3%", srm: 3, srm_color: "#F5E27A", brewery: "제주 맥주", origin: "대한민국", tags: ["#청량함", "#제주"], hashtags: ["tex_watery", "malt_grain", "sour_citrus"], profile: { 단맛: 1.5, 신맛: 1.0, 쓴맛: 1.5, 몰티함: 1.8, 아로마: 2.0 } },
  { name: "갈매기 라거", type: "Craft Lager", category: "라거", abv: "4.5%", srm: 3, srm_color: "#F5E27A", brewery: "갈매기 브루잉", origin: "대한민국", tags: ["#청량함", "#수제"], hashtags: ["tex_watery", "malt_grain"], profile: { 단맛: 1.3, 신맛: 0.5, 쓴맛: 1.5, 몰티함: 1.8, 아로마: 1.5 } },
  { name: "플레이그라운드 라거", type: "Craft Lager", category: "라거", abv: "4.5%", srm: 3, srm_color: "#F5E27A", brewery: "플레이그라운드 브루어리", origin: "대한민국", tags: ["#청량함", "#수제"], hashtags: ["tex_watery", "malt_grain"], profile: { 단맛: 1.3, 신맛: 0.5, 쓴맛: 1.5, 몰티함: 2.0, 아로마: 1.8 } },
  { name: "ARC 라거", type: "Craft Lager", category: "라거", abv: "4.5%", srm: 3, srm_color: "#F5E27A", brewery: "아크 브루잉", origin: "대한민국", tags: ["#청량함", "#수제"], hashtags: ["tex_watery", "malt_grain"], profile: { 단맛: 1.2, 신맛: 0.5, 쓴맛: 1.5, 몰티함: 1.8, 아로마: 1.5 } },
  { name: "ARC 필스너", type: "Craft Pilsner", category: "라거", abv: "5.0%", srm: 4, srm_color: "#F0D060", brewery: "아크 브루잉", origin: "대한민국", tags: ["#쌉싸름", "#체코식"], hashtags: ["hop_herb", "malt_biscuit", "tex_dry"], profile: { 단맛: 1.5, 신맛: 0.8, 쓴맛: 3.0, 몰티함: 2.5, 아로마: 2.8 } },
  { name: "더부스 대동강 필스너", type: "Craft Pilsner", category: "라거", abv: "5.0%", srm: 4, srm_color: "#F0D060", brewery: "더 부스 브루잉", origin: "대한민국", tags: ["#쌉싸름", "#수제"], hashtags: ["hop_herb", "malt_grain", "tex_dry"], profile: { 단맛: 1.5, 신맛: 0.8, 쓴맛: 3.2, 몰티함: 2.5, 아로마: 2.8 } },
  { name: "어메이징브루잉 성수라거", type: "Craft Lager", category: "라거", abv: "4.5%", srm: 3, srm_color: "#F5E27A", brewery: "어메이징브루잉", origin: "대한민국", tags: ["#청량함", "#수제"], hashtags: ["tex_watery", "malt_grain"], profile: { 단맛: 1.3, 신맛: 0.5, 쓴맛: 1.5, 몰티함: 1.8, 아로마: 1.5 } },
  { name: "크래프트브로스 필스", type: "Craft Pilsner", category: "라거", abv: "5.2%", srm: 4, srm_color: "#F0D060", brewery: "크래프트브로스", origin: "대한민국", tags: ["#쌉싸름", "#체코식"], hashtags: ["hop_herb", "malt_biscuit", "tex_dry"], profile: { 단맛: 1.5, 신맛: 0.8, 쓴맛: 3.2, 몰티함: 2.5, 아로마: 2.8 } },
  // 독일 추가
  { name: "크롬바허 필스", type: "German Pilsner", category: "라거", abv: "4.8%", srm: 4, srm_color: "#F0D060", brewery: "Krombacher", origin: "독일", tags: ["#쌉싸름", "#청량함"], hashtags: ["hop_herb", "tex_dry", "malt_grain"], profile: { 단맛: 1.2, 신맛: 0.5, 쓴맛: 2.8, 몰티함: 1.8, 아로마: 2.2 } },
  { name: "바슈타이너", type: "German Pilsner", category: "라거", abv: "4.9%", srm: 4, srm_color: "#F0D060", brewery: "Warsteiner", origin: "독일", tags: ["#쌉싸름", "#균형잡힌"], hashtags: ["hop_herb", "malt_grain", "tex_dry"], profile: { 단맛: 1.3, 신맛: 0.5, 쓴맛: 2.5, 몰티함: 2.0, 아로마: 2.0 } },
  { name: "쾨닉 필스너", type: "German Pilsner", category: "라거", abv: "4.9%", srm: 4, srm_color: "#F0D060", brewery: "König Pilsener", origin: "독일", tags: ["#쌉싸름", "#깔끔함"], hashtags: ["hop_herb", "tex_dry"], profile: { 단맛: 1.2, 신맛: 0.5, 쓴맛: 2.8, 몰티함: 1.8, 아로마: 2.2 } },
  { name: "예버 필스너", type: "German Pilsner", category: "라거", abv: "4.9%", srm: 4, srm_color: "#F0D060", brewery: "Jever", origin: "독일", tags: ["#쌉싸름", "#드라이"], hashtags: ["hop_herb", "tex_dry"], profile: { 단맛: 1.0, 신맛: 0.5, 쓴맛: 3.5, 몰티함: 1.5, 아로마: 2.5 } },
  { name: "아우구스티너 헬레스", type: "Helles Lager", category: "라거", abv: "5.2%", srm: 4, srm_color: "#F0D060", brewery: "Augustiner-Bräu", origin: "독일", tags: ["#부드러운", "#바이에른"], hashtags: ["malt_grain", "tex_silky", "malt_biscuit"], profile: { 단맛: 2.2, 신맛: 0.5, 쓴맛: 1.5, 몰티함: 3.0, 아로마: 2.0 } },
  { name: "호프브로이 오리지널", type: "Helles Lager", category: "라거", abv: "5.1%", srm: 4, srm_color: "#F0D060", brewery: "Hofbräuhaus", origin: "독일", tags: ["#부드러운", "#옥토버페스트"], hashtags: ["malt_grain", "tex_silky"], profile: { 단맛: 2.0, 신맛: 0.5, 쓴맛: 1.5, 몰티함: 2.8, 아로마: 1.8 } },
  { name: "뢰벤브로이", type: "Munich Helles", category: "라거", abv: "5.1%", srm: 4, srm_color: "#F0D060", brewery: "Löwenbräu", origin: "독일", tags: ["#부드러운", "#뮌헨"], hashtags: ["malt_grain", "tex_silky", "malt_biscuit"], profile: { 단맛: 2.0, 신맛: 0.5, 쓴맛: 1.8, 몰티함: 2.5, 아로마: 2.0 } },
  // 체코 추가
  { name: "코젤 프리미엄", type: "Czech Lager", category: "라거", abv: "4.6%", srm: 6, srm_color: "#D4A835", brewery: "Kozel", origin: "체코", tags: ["#균형잡힌", "#몰티한"], hashtags: ["malt_biscuit", "hop_herb", "tex_silky"], profile: { 단맛: 2.0, 신맛: 0.5, 쓴맛: 2.2, 몰티함: 2.8, 아로마: 2.2 } },
  { name: "부드바르", type: "Czech Lager", category: "라거", abv: "5.0%", srm: 4, srm_color: "#F0D060", brewery: "Budvar", origin: "체코", tags: ["#균형잡힌", "#체코식"], hashtags: ["malt_grain", "hop_herb", "tex_dry"], profile: { 단맛: 1.8, 신맛: 0.5, 쓴맛: 2.5, 몰티함: 2.5, 아로마: 2.5 } },
  { name: "스타로프라멘", type: "Czech Lager", category: "라거", abv: "5.0%", srm: 4, srm_color: "#F0D060", brewery: "Staropramen", origin: "체코", tags: ["#청량함", "#체코식"], hashtags: ["malt_grain", "hop_herb", "tex_dry"], profile: { 단맛: 1.5, 신맛: 0.5, 쓴맛: 2.5, 몰티함: 2.3, 아로마: 2.2 } },
  // 미국 추가
  { name: "밀러 라이트", type: "Light Lager", category: "라거", abv: "4.2%", srm: 2, srm_color: "#F8EFA0", brewery: "Miller Brewing", origin: "미국", tags: ["#가벼운", "#아메리칸"], hashtags: ["tex_watery", "tex_dry"], profile: { 단맛: 0.8, 신맛: 0.3, 쓴맛: 1.0, 몰티함: 1.0, 아로마: 0.8 } },
  { name: "쿠어스 라이트", type: "Light Lager", category: "라거", abv: "4.2%", srm: 2, srm_color: "#F8EFA0", brewery: "Coors Brewing", origin: "미국", tags: ["#가벼운", "#아메리칸"], hashtags: ["tex_watery", "tex_dry"], profile: { 단맛: 0.8, 신맛: 0.3, 쓴맛: 0.8, 몰티함: 1.0, 아로마: 0.8 } },
  { name: "미켈롭 울트라", type: "Light Lager", category: "라거", abv: "4.2%", srm: 2, srm_color: "#F8EFA0", brewery: "Anheuser-Busch", origin: "미국", tags: ["#저칼로리", "#가벼운"], hashtags: ["tex_watery", "tex_dry"], profile: { 단맛: 0.5, 신맛: 0.3, 쓴맛: 0.8, 몰티함: 0.8, 아로마: 0.5 } },
  { name: "유엔글링 트래디셔널 라거", type: "Traditional Lager", category: "라거", abv: "4.4%", srm: 9, srm_color: "#C9A227", brewery: "Yuengling", origin: "미국", tags: ["#앰버", "#아메리칸"], hashtags: ["malt_toast", "sweet_caramel", "tex_dry"], profile: { 단맛: 2.0, 신맛: 0.5, 쓴맛: 2.0, 몰티함: 2.5, 아로마: 2.0 } },
  // 일본 추가
  { name: "기린 라거", type: "Lager", category: "라거", abv: "4.9%", srm: 4, srm_color: "#F0D060", brewery: "Kirin Brewery", origin: "일본", tags: ["#청량함", "#클래식"], hashtags: ["tex_watery", "malt_grain"], profile: { 단맛: 1.2, 신맛: 0.5, 쓴맛: 1.8, 몰티함: 1.8, 아로마: 1.5 } },
  { name: "오리온 드래프트", type: "Draft Lager", category: "라거", abv: "5.0%", srm: 3, srm_color: "#F5E27A", brewery: "Orion Breweries", origin: "일본", tags: ["#청량함", "#오키나와"], hashtags: ["tex_watery", "malt_grain"], profile: { 단맛: 1.2, 신맛: 0.5, 쓴맛: 1.5, 몰티함: 1.5, 아로마: 1.3 } },
  // 멕시코 추가
  { name: "퍼시피코", type: "Pale Lager", category: "라거", abv: "4.4%", srm: 2, srm_color: "#F8EFA0", brewery: "Grupo Modelo", origin: "멕시코", tags: ["#청량함", "#라임향"], hashtags: ["tex_watery", "tex_dry"], profile: { 단맛: 0.8, 신맛: 0.5, 쓴맛: 1.0, 몰티함: 1.0, 아로마: 1.0 } },
  { name: "도스 에퀴스", type: "Vienna Lager", category: "라거", abv: "4.2%", srm: 7, srm_color: "#C9A227", brewery: "Heineken MX", origin: "멕시코", tags: ["#앰버", "#몰티한"], hashtags: ["malt_toast", "sweet_caramel", "tex_dry"], profile: { 단맛: 2.0, 신맛: 0.5, 쓴맛: 1.8, 몰티함: 2.5, 아로마: 1.8 } },
  { name: "솔", type: "Pale Lager", category: "라거", abv: "4.5%", srm: 2, srm_color: "#F8EFA0", brewery: "Cuauhtémoc Moctezuma", origin: "멕시코", tags: ["#청량함", "#라임향"], hashtags: ["tex_watery", "tex_dry"], profile: { 단맛: 0.8, 신맛: 0.5, 쓴맛: 1.0, 몰티함: 1.0, 아로마: 0.8 } },

  // ──────────────────────────────────────────────────
  // IPA 추가 (axes: 단맛 신맛 쓴맛 아로마 부드러움)
  // ──────────────────────────────────────────────────
  { name: "스톤 IPA", type: "American IPA", category: "IPA", abv: "6.9%", srm: 7, srm_color: "#C9A227", brewery: "Stone Brewing", origin: "미국", tags: ["#솔잎", "#자몽"], hashtags: ["hop_pine", "sour_citrus", "hop_resin"], profile: { 단맛: 1.5, 신맛: 1.5, 쓴맛: 4.8, 아로마: 4.5, 부드러움: 2.0 } },
  { name: "밸러스트 포인트 스컬핀", type: "American IPA", category: "IPA", abv: "7.0%", srm: 9, srm_color: "#C9A227", brewery: "Ballast Point", origin: "미국", tags: ["#망고", "#자몽"], hashtags: ["sweet_tropical", "sour_citrus", "hop_resin"], profile: { 단맛: 2.5, 신맛: 2.0, 쓴맛: 4.5, 아로마: 4.5, 부드러움: 2.5 } },
  { name: "벨스 투 하티드", type: "American IPA", category: "IPA", abv: "7.0%", srm: 8, srm_color: "#C9A227", brewery: "Bell's Brewery", origin: "미국", tags: ["#시트러스", "#허브"], hashtags: ["sour_citrus", "hop_herb", "hop_flower"], profile: { 단맛: 2.0, 신맛: 1.5, 쓴맛: 4.5, 아로마: 4.5, 부드러움: 2.5 } },
  { name: "플리니 더 엘더", type: "Double IPA", category: "IPA", abv: "8.0%", srm: 10, srm_color: "#B8860B", brewery: "Russian River", origin: "미국", tags: ["#더블IPA", "#레전드"], hashtags: ["hop_pine", "hop_resin", "sour_citrus", "tex_dry"], profile: { 단맛: 2.0, 신맛: 1.5, 쓴맛: 5.0, 아로마: 5.0, 부드러움: 2.0 } },
  { name: "파이어스톤 유니온 잭", type: "American IPA", category: "IPA", abv: "7.5%", srm: 7, srm_color: "#C9A227", brewery: "Firestone Walker", origin: "미국", tags: ["#클래식", "#홉향"], hashtags: ["hop_herb", "sour_citrus", "malt_toast"], profile: { 단맛: 2.2, 신맛: 1.0, 쓴맛: 4.5, 아로마: 4.2, 부드러움: 2.5 } },
  { name: "브루클린 이스트 IPA", type: "East Coast IPA", category: "IPA", abv: "6.9%", srm: 7, srm_color: "#C9A227", brewery: "Brooklyn Brewery", origin: "미국", tags: ["#균형잡힌", "#아이스티"], hashtags: ["hop_herb", "malt_grain", "sour_citrus"], profile: { 단맛: 2.5, 신맛: 1.5, 쓴맛: 4.0, 아로마: 4.0, 부드러움: 3.0 } },
  { name: "그린 플래시 웨스트코스트 IPA", type: "West Coast IPA", category: "IPA", abv: "8.1%", srm: 9, srm_color: "#C9A227", brewery: "Green Flash", origin: "미국", tags: ["#솔잎", "#레진"], hashtags: ["hop_pine", "hop_resin", "tex_dry"], profile: { 단맛: 1.8, 신맛: 1.5, 쓴맛: 5.0, 아로마: 4.5, 부드러움: 2.0 } },
  { name: "데슈츠 프레시 스퀴즈", type: "West Coast IPA", category: "IPA", abv: "6.4%", srm: 7, srm_color: "#C9A227", brewery: "Deschutes Brewery", origin: "미국", tags: ["#자몽", "#오렌지"], hashtags: ["sour_citrus", "hop_flower", "tex_dry"], profile: { 단맛: 2.0, 신맛: 2.0, 쓴맛: 4.5, 아로마: 4.5, 부드러움: 2.5 } },
  { name: "파운더스 센테니얼 IPA", type: "American IPA", category: "IPA", abv: "7.2%", srm: 7, srm_color: "#C9A227", brewery: "Founders Brewing", origin: "미국", tags: ["#자몽", "#솔잎"], hashtags: ["sour_citrus", "hop_pine", "hop_resin"], profile: { 단맛: 2.0, 신맛: 1.5, 쓴맛: 4.8, 아로마: 4.5, 부드러움: 2.0 } },
  { name: "모던타임즈 오더빌", type: "Hazy IPA", category: "IPA", abv: "6.5%", srm: 5, srm_color: "#D4A835", brewery: "Modern Times Beer", origin: "미국", tags: ["#헤이지", "#트로피컬"], hashtags: ["sweet_tropical", "hop_flower", "tex_creamy"], profile: { 단맛: 3.0, 신맛: 1.5, 쓴맛: 2.5, 아로마: 4.5, 부드러움: 4.0 } },
  { name: "미켈러 IPA", type: "Danish IPA", category: "IPA", abv: "7.0%", srm: 7, srm_color: "#C9A227", brewery: "Mikkeller", origin: "덴마크", tags: ["#홉향", "#프루티"], hashtags: ["hop_flower", "sour_citrus", "tex_dry"], profile: { 단맛: 2.0, 신맛: 1.5, 쓴맛: 4.5, 아로마: 4.5, 부드러움: 2.5 } },
  { name: "데드 포니 클럽", type: "Session IPA", category: "IPA", abv: "3.8%", srm: 5, srm_color: "#D4A835", brewery: "BrewDog", origin: "영국", tags: ["#가벼운", "#세션"], hashtags: ["hop_flower", "sour_citrus", "tex_dry"], profile: { 단맛: 1.5, 신맛: 1.5, 쓴맛: 3.5, 아로마: 4.0, 부드러움: 3.0 } },
  { name: "헤이지 제인", type: "Hazy IPA", category: "IPA", abv: "5.0%", srm: 4, srm_color: "#E8C040", brewery: "BrewDog", origin: "영국", tags: ["#헤이지", "#망고"], hashtags: ["sweet_tropical", "hop_flower", "tex_creamy"], profile: { 단맛: 3.0, 신맛: 1.5, 쓴맛: 2.0, 아로마: 4.5, 부드러움: 4.5 } },
  { name: "히타치노 네스트 IPA", type: "Japanese IPA", category: "IPA", abv: "7.0%", srm: 8, srm_color: "#C9A227", brewery: "Kiuchi Brewery", origin: "일본", tags: ["#과일향", "#균형잡힌"], hashtags: ["hop_flower", "sour_citrus", "malt_grain"], profile: { 단맛: 2.5, 신맛: 1.5, 쓴맛: 4.0, 아로마: 4.2, 부드러움: 2.8 } },
  { name: "요호 아오오니 IPA", type: "Japanese IPA", category: "IPA", abv: "7.0%", srm: 8, srm_color: "#C9A227", brewery: "Yo-Ho Brewing", origin: "일본", tags: ["#청량함", "#허브"], hashtags: ["hop_herb", "hop_flower", "tex_dry"], profile: { 단맛: 2.0, 신맛: 1.0, 쓴맛: 4.5, 아로마: 4.0, 부드러움: 2.5 } },
  { name: "타이완 헤드 IPA", type: "Taiwan IPA", category: "IPA", abv: "6.0%", srm: 7, srm_color: "#C9A227", brewery: "Taiwan Head Brewers", origin: "대만", tags: ["#시트러스", "#열대"], hashtags: ["sour_citrus", "sweet_tropical", "hop_flower"], profile: { 단맛: 2.5, 신맛: 2.0, 쓴맛: 4.0, 아로마: 4.2, 부드러움: 2.8 } },
  { name: "제주 IPA", type: "American IPA", category: "IPA", abv: "6.0%", srm: 7, srm_color: "#C9A227", brewery: "제주 맥주", origin: "대한민국", tags: ["#시트러스", "#열대"], hashtags: ["sour_citrus", "sweet_tropical", "hop_flower"], profile: { 단맛: 2.5, 신맛: 2.0, 쓴맛: 4.0, 아로마: 4.2, 부드러움: 2.8 } },
  { name: "갈매기 IPA", type: "American IPA", category: "IPA", abv: "6.2%", srm: 7, srm_color: "#C9A227", brewery: "갈매기 브루잉", origin: "대한민국", tags: ["#시트러스", "#홉향"], hashtags: ["sour_citrus", "hop_pine", "hop_herb"], profile: { 단맛: 2.0, 신맛: 1.5, 쓴맛: 4.2, 아로마: 4.0, 부드러움: 2.5 } },
  { name: "성수 IPA", type: "American IPA", category: "IPA", abv: "6.0%", srm: 6, srm_color: "#D4A835", brewery: "어메이징브루잉", origin: "대한민국", tags: ["#홉향", "#청량함"], hashtags: ["hop_herb", "sour_citrus", "tex_dry"], profile: { 단맛: 2.0, 신맛: 1.5, 쓴맛: 4.0, 아로마: 3.8, 부드러움: 2.5 } },
  { name: "곰표 IPA", type: "American IPA", category: "IPA", abv: "6.5%", srm: 7, srm_color: "#C9A227", brewery: "세븐브로이", origin: "대한민국", tags: ["#홉향", "#수제"], hashtags: ["hop_flower", "sour_citrus", "tex_dry"], profile: { 단맛: 2.0, 신맛: 1.5, 쓴맛: 4.2, 아로마: 4.0, 부드러움: 2.5 } },

  // ──────────────────────────────────────────────────
  // 에일 추가 (axes: 단맛 신맛 쓴맛 아로마 부드러움)
  // ──────────────────────────────────────────────────
  // 밀맥주
  { name: "프란치스카너 헤페바이젠", type: "Hefeweizen", category: "에일", abv: "5.0%", srm: 4, srm_color: "#E8D060", brewery: "Franziskaner", origin: "독일", tags: ["#바나나", "#정향"], hashtags: ["ferment_banana", "ferment_spice", "tex_creamy"], profile: { 단맛: 2.8, 신맛: 1.0, 쓴맛: 1.0, 아로마: 4.2, 부드러움: 4.5 } },
  { name: "바이엔슈테판 헤페바이젠", type: "Hefeweizen", category: "에일", abv: "5.4%", srm: 4, srm_color: "#E8D060", brewery: "Weihenstephan", origin: "독일", tags: ["#바나나", "#크리미"], hashtags: ["ferment_banana", "ferment_spice", "malt_bread", "tex_creamy"], profile: { 단맛: 3.0, 신맛: 1.0, 쓴맛: 1.0, 아로마: 4.5, 부드러움: 4.8 } },
  { name: "쉐퍼호퍼 크리스탈바이젠", type: "Kristallweizen", category: "에일", abv: "4.9%", srm: 3, srm_color: "#F0D870", brewery: "Schöfferhofer", origin: "독일", tags: ["#맑은", "#깔끔함"], hashtags: ["ferment_banana", "malt_grain", "tex_dry"], profile: { 단맛: 2.0, 신맛: 1.0, 쓴맛: 1.0, 아로마: 3.0, 부드러움: 4.0 } },
  { name: "에델바이스", type: "Wheat Beer", category: "에일", abv: "5.0%", srm: 3, srm_color: "#F0D870", brewery: "Heineken Austria", origin: "오스트리아", tags: ["#허브향", "#청량함"], hashtags: ["ferment_spice", "hop_herb", "tex_dry"], profile: { 단맛: 2.0, 신맛: 1.0, 쓴맛: 1.5, 아로마: 3.0, 부드러움: 3.5 } },
  { name: "1664 블랑", type: "French Wheat Beer", category: "에일", abv: "5.0%", srm: 4, srm_color: "#F0D870", brewery: "Kronenbourg", origin: "프랑스", tags: ["#오렌지필", "#부드러운"], hashtags: ["sour_citrus", "ferment_spice", "tex_creamy"], profile: { 단맛: 2.5, 신맛: 1.5, 쓴맛: 1.0, 아로마: 3.5, 부드러움: 4.0 } },
  { name: "알라가쉬 화이트", type: "American Witbier", category: "에일", abv: "5.0%", srm: 3, srm_color: "#F0D870", brewery: "Allagash Brewing", origin: "미국", tags: ["#코리앤더", "#오렌지필"], hashtags: ["ferment_spice", "sour_citrus", "tex_creamy"], profile: { 단맛: 2.5, 신맛: 1.5, 쓴맛: 1.0, 아로마: 4.0, 부드러움: 4.5 } },
  { name: "벨스 오베론", type: "Wheat Ale", category: "에일", abv: "5.8%", srm: 4, srm_color: "#E8C84A", brewery: "Bell's Brewery", origin: "미국", tags: ["#여름", "#오렌지향"], hashtags: ["sour_citrus", "ferment_spice", "malt_bread"], profile: { 단맛: 2.8, 신맛: 1.5, 쓴맛: 1.5, 아로마: 3.5, 부드러움: 4.0 } },
  { name: "바이엔슈테판 비투스", type: "Weizenbock", category: "에일", abv: "7.7%", srm: 7, srm_color: "#C47A2A", brewery: "Weihenstephan", origin: "독일", tags: ["#바이젠복", "#강한"], hashtags: ["ferment_banana", "sweet_caramel", "malt_toast"], profile: { 단맛: 3.5, 신맛: 1.0, 쓴맛: 1.5, 아로마: 4.5, 부드러움: 3.5 } },
  { name: "에르딩어 둔켈", type: "Dark Wheat Beer", category: "에일", abv: "5.6%", srm: 15, srm_color: "#8B6914", brewery: "Erdinger", origin: "독일", tags: ["#다크", "#바나나"], hashtags: ["ferment_banana", "malt_toast", "sweet_caramel"], profile: { 단맛: 3.0, 신맛: 1.0, 쓴맛: 1.5, 아로마: 3.8, 부드러움: 4.0 } },
  { name: "곰표 밀맥주", type: "Korean Wheat Beer", category: "에일", abv: "4.5%", srm: 4, srm_color: "#E8D060", brewery: "세븐브로이", origin: "대한민국", tags: ["#밀맥주", "#바나나"], hashtags: ["ferment_banana", "malt_bread", "tex_creamy"], profile: { 단맛: 2.5, 신맛: 1.0, 쓴맛: 1.0, 아로마: 3.5, 부드러움: 4.5 } },
  { name: "히타치노 네스트 화이트에일", type: "Japanese Witbier", category: "에일", abv: "5.5%", srm: 4, srm_color: "#F0D870", brewery: "Kiuchi Brewery", origin: "일본", tags: ["#넛맥", "#오렌지필"], hashtags: ["ferment_spice", "sour_citrus", "malt_grain"], profile: { 단맛: 2.5, 신맛: 1.5, 쓴맛: 1.5, 아로마: 4.2, 부드러움: 4.0 } },
  { name: "코에도 시로", type: "Japanese Witbier", category: "에일", abv: "5.5%", srm: 4, srm_color: "#F0D870", brewery: "Coedo Brewery", origin: "일본", tags: ["#오렌지필", "#부드러운"], hashtags: ["sour_citrus", "ferment_spice", "tex_creamy"], profile: { 단맛: 2.5, 신맛: 1.5, 쓴맛: 1.0, 아로마: 3.8, 부드러움: 4.5 } },
  // Pale Ale
  { name: "사무엘 스미스 페일 에일", type: "English Pale Ale", category: "에일", abv: "5.0%", srm: 8, srm_color: "#C47A2A", brewery: "Samuel Smith's", origin: "영국", tags: ["#너티", "#균형잡힌"], hashtags: ["malt_biscuit", "hop_herb", "tex_silky"], profile: { 단맛: 2.5, 신맛: 0.8, 쓴맛: 2.5, 아로마: 2.8, 부드러움: 4.5 } },
  { name: "풀러스 런던 프라이드", type: "English Pale Ale", category: "에일", abv: "4.7%", srm: 10, srm_color: "#C47A2A", brewery: "Fuller's Brewery", origin: "영국", tags: ["#영국식", "#캐러멜"], hashtags: ["sweet_caramel", "malt_biscuit", "hop_herb"], profile: { 단맛: 2.8, 신맛: 0.8, 쓴맛: 2.5, 아로마: 3.0, 부드러움: 4.0 } },
  { name: "파이어스톤 페일 31", type: "American Pale Ale", category: "에일", abv: "4.9%", srm: 8, srm_color: "#C47A2A", brewery: "Firestone Walker", origin: "미국", tags: ["#균형잡힌", "#영국스타일"], hashtags: ["hop_herb", "malt_biscuit", "tex_dry"], profile: { 단맛: 2.2, 신맛: 1.0, 쓴맛: 3.0, 아로마: 3.0, 부드러움: 3.8 } },
  { name: "오스카 블루스 데일스 페일 에일", type: "American Pale Ale", category: "에일", abv: "6.5%", srm: 9, srm_color: "#C47A2A", brewery: "Oskar Blues", origin: "미국", tags: ["#쌉싸름", "#시트러스"], hashtags: ["hop_herb", "sour_citrus", "malt_grain"], profile: { 단맛: 2.0, 신맛: 1.5, 쓴맛: 3.5, 아로마: 3.8, 부드러움: 3.0 } },
  { name: "앵커 리버티 에일", type: "American Pale Ale", category: "에일", abv: "5.9%", srm: 9, srm_color: "#C47A2A", brewery: "Anchor Brewing", origin: "미국", tags: ["#홉향", "#클래식"], hashtags: ["hop_flower", "hop_herb", "tex_dry"], profile: { 단맛: 2.0, 신맛: 1.5, 쓴맛: 3.5, 아로마: 4.0, 부드러움: 3.0 } },
  { name: "쓰리플로이즈 좀비 더스트", type: "Pale Ale", category: "에일", abv: "6.2%", srm: 7, srm_color: "#C9A227", brewery: "3 Floyds Brewing", origin: "미국", tags: ["#케스케이드홉", "#레전드"], hashtags: ["hop_flower", "sour_citrus", "tex_dry"], profile: { 단맛: 2.0, 신맛: 2.0, 쓴맛: 4.0, 아로마: 5.0, 부드러움: 3.0 } },
  { name: "제주 펠롱 에일", type: "Pale Ale", category: "에일", abv: "5.3%", srm: 8, srm_color: "#C47A2A", brewery: "제주 맥주", origin: "대한민국", tags: ["#제주감귤", "#청량함"], hashtags: ["sour_citrus", "hop_flower", "malt_grain"], profile: { 단맛: 2.5, 신맛: 2.0, 쓴맛: 2.5, 아로마: 3.5, 부드러움: 3.5 } },
  { name: "갈매기 페일 에일", type: "Pale Ale", category: "에일", abv: "5.0%", srm: 8, srm_color: "#C47A2A", brewery: "갈매기 브루잉", origin: "대한민국", tags: ["#홉향", "#수제"], hashtags: ["hop_herb", "sour_citrus", "malt_grain"], profile: { 단맛: 2.2, 신맛: 1.5, 쓴맛: 3.0, 아로마: 3.5, 부드러움: 3.5 } },
  { name: "플레이그라운드 페일 에일", type: "Pale Ale", category: "에일", abv: "5.0%", srm: 8, srm_color: "#C47A2A", brewery: "플레이그라운드 브루어리", origin: "대한민국", tags: ["#홉향", "#균형잡힌"], hashtags: ["hop_flower", "hop_herb", "malt_grain"], profile: { 단맛: 2.2, 신맛: 1.5, 쓴맛: 3.0, 아로마: 3.5, 부드러움: 3.5 } },
  { name: "곰표 페일 에일", type: "Pale Ale", category: "에일", abv: "4.5%", srm: 8, srm_color: "#C47A2A", brewery: "세븐브로이", origin: "대한민국", tags: ["#수제", "#균형잡힌"], hashtags: ["hop_herb", "malt_grain", "tex_dry"], profile: { 단맛: 2.0, 신맛: 1.5, 쓴맛: 2.8, 아로마: 3.0, 부드러움: 3.5 } },
  // 벨기에 추가
  { name: "로슈포르 8", type: "Belgian Dubbel", category: "에일", abv: "9.2%", srm: 24, srm_color: "#6B3B1A", brewery: "Brasserie de Rochefort", origin: "벨기에", tags: ["#다크프룻", "#향신료"], hashtags: ["ferment_wine", "sweet_caramel", "ferment_spice"], profile: { 단맛: 3.8, 신맛: 1.5, 쓴맛: 2.5, 아로마: 4.2, 부드러움: 3.5 } },
  { name: "베스트말레 더블", type: "Belgian Dubbel", category: "에일", abv: "7.0%", srm: 22, srm_color: "#6B3B1A", brewery: "Westmalle", origin: "벨기에", tags: ["#다크프룻", "#몰티한"], hashtags: ["sweet_caramel", "ferment_wine", "malt_toast"], profile: { 단맛: 3.5, 신맛: 1.5, 쓴맛: 2.0, 아로마: 3.8, 부드러움: 4.0 } },
  { name: "델리리움 트레멘스", type: "Belgian Golden Strong", category: "에일", abv: "8.5%", srm: 4, srm_color: "#F0D050", brewery: "Brouwerij Huyghe", origin: "벨기에", tags: ["#트로피컬", "#강한"], hashtags: ["sweet_tropical", "ferment_spice", "hop_herb"], profile: { 단맛: 3.0, 신맛: 2.0, 쓴맛: 2.5, 아로마: 4.5, 부드러움: 3.0 } },
  { name: "델리리움 녹터넘", type: "Belgian Dark Strong", category: "에일", abv: "8.5%", srm: 27, srm_color: "#5C2E0A", brewery: "Brouwerij Huyghe", origin: "벨기에", tags: ["#다크프룻", "#복잡한"], hashtags: ["ferment_wine", "sweet_darkchoco", "ferment_spice"], profile: { 단맛: 4.0, 신맛: 1.5, 쓴맛: 2.0, 아로마: 4.0, 부드러움: 3.5 } },
  { name: "세인트 버나두스 압트 12", type: "Belgian Quadrupel", category: "에일", abv: "10.0%", srm: 26, srm_color: "#5C2E0A", brewery: "St. Bernardus", origin: "벨기에", tags: ["#강렬한", "#다크프룻"], hashtags: ["ferment_wine", "sweet_darkchoco", "sweet_caramel"], profile: { 단맛: 4.2, 신맛: 1.5, 쓴맛: 2.0, 아로마: 4.5, 부드러움: 4.0 } },
  { name: "굴든 드락", type: "Belgian Golden Strong", category: "에일", abv: "10.5%", srm: 4, srm_color: "#F0D050", brewery: "Van Honsebrouck", origin: "벨기에", tags: ["#강한", "#황금색"], hashtags: ["sweet_tropical", "ferment_spice", "ferment_wine"], profile: { 단맛: 3.5, 신맛: 2.0, 쓴맛: 2.5, 아로마: 4.5, 부드러움: 2.5 } },
  { name: "웨스트블레테런 12", type: "Belgian Quadrupel", category: "에일", abv: "10.2%", srm: 28, srm_color: "#5C2E0A", brewery: "Westvleteren", origin: "벨기에", tags: ["#레전드", "#다크프룻"], hashtags: ["ferment_wine", "sweet_darkchoco", "sweet_caramel", "ferment_spice"], profile: { 단맛: 4.5, 신맛: 1.5, 쓴맛: 2.0, 아로마: 5.0, 부드러움: 4.5 } },
  { name: "트리펠 카멜리트", type: "Belgian Tripel", category: "에일", abv: "8.4%", srm: 5, srm_color: "#F0D050", brewery: "Brouwerij Bosteels", origin: "벨기에", tags: ["#복잡한", "#향신료"], hashtags: ["ferment_spice", "sweet_tropical", "hop_flower"], profile: { 단맛: 3.5, 신맛: 2.0, 쓴맛: 2.5, 아로마: 4.5, 부드러움: 3.0 } },
  { name: "파울라너 살바토르", type: "Doppelbock", category: "에일", abv: "7.9%", srm: 20, srm_color: "#8B4513", brewery: "Paulaner", origin: "독일", tags: ["#몰티한", "#강한"], hashtags: ["malt_toast", "sweet_caramel", "malt_grain"], profile: { 단맛: 4.0, 신맛: 0.5, 쓴맛: 2.0, 아로마: 4.0, 부드러움: 4.0 } },
  { name: "크바크", type: "Belgian Amber", category: "에일", abv: "8.4%", srm: 12, srm_color: "#C47A2A", brewery: "Brouwerij Bosteels", origin: "벨기에", tags: ["#캐러멜", "#클로버"], hashtags: ["sweet_caramel", "ferment_spice", "malt_toast"], profile: { 단맛: 3.5, 신맛: 1.5, 쓴맛: 2.0, 아로마: 3.5, 부드러움: 3.5 } },
  { name: "그림베르겐 블론드", type: "Belgian Blonde", category: "에일", abv: "6.7%", srm: 7, srm_color: "#D4A217", brewery: "Alken-Maes", origin: "벨기에", tags: ["#부드러운", "#황금색"], hashtags: ["ferment_spice", "sweet_caramel", "tex_silky"], profile: { 단맛: 2.8, 신맛: 1.5, 쓴맛: 2.0, 아로마: 3.5, 부드러움: 4.0 } },
  { name: "마레드수 8", type: "Belgian Dubbel", category: "에일", abv: "8.0%", srm: 20, srm_color: "#8B4513", brewery: "Abbaye de Maredsous", origin: "벨기에", tags: ["#다크프룻", "#몰티한"], hashtags: ["sweet_caramel", "ferment_wine", "malt_toast"], profile: { 단맛: 3.5, 신맛: 1.5, 쓴맛: 2.0, 아로마: 3.8, 부드러움: 4.0 } },

  // ──────────────────────────────────────────────────
  // 스타우트 추가 (axes: 단맛 탄맛 몰티함 바디감 아로마)
  // ──────────────────────────────────────────────────
  { name: "머피스 아이리시 스타우트", type: "Dry Irish Stout", category: "스타우트", abv: "4.0%", srm: 38, srm_color: "#1A0505", brewery: "Murphy's Brewery", origin: "아일랜드", tags: ["#크리미", "#부드러운"], hashtags: ["roast_coffee", "tex_creamy", "tex_silky"], profile: { 단맛: 2.0, 탄맛: 2.8, 몰티함: 3.5, 바디감: 3.8, 아로마: 3.0 } },
  { name: "파운더스 브렉퍼스트 스타우트", type: "Imperial Oatmeal Stout", category: "스타우트", abv: "8.3%", srm: 40, srm_color: "#1A0505", brewery: "Founders Brewing", origin: "미국", tags: ["#커피", "#아침"], hashtags: ["roast_coffee", "sweet_darkchoco", "tex_creamy"], profile: { 단맛: 3.0, 탄맛: 4.5, 몰티함: 5.0, 바디감: 5.0, 아로마: 5.0 } },
  { name: "파운더스 KBS", type: "Barrel-Aged Imperial Stout", category: "스타우트", abv: "11.2%", srm: 40, srm_color: "#1A0505", brewery: "Founders Brewing", origin: "미국", tags: ["#버번통숙성", "#커피"], hashtags: ["roast_coffee", "sweet_darkchoco", "ferment_wine", "roast_char"], profile: { 단맛: 3.5, 탄맛: 4.5, 몰티함: 5.0, 바디감: 5.0, 아로마: 5.0 } },
  { name: "올드 라스푸틴", type: "Russian Imperial Stout", category: "스타우트", abv: "9.0%", srm: 40, srm_color: "#1A0505", brewery: "North Coast Brewing", origin: "미국", tags: ["#임페리얼", "#다크초콜릿"], hashtags: ["sweet_darkchoco", "roast_coffee", "roast_char", "ferment_wine"], profile: { 단맛: 3.0, 탄맛: 4.8, 몰티함: 5.0, 바디감: 5.0, 아로마: 4.5 } },
  { name: "레프트핸드 밀크 스타우트", type: "Milk Stout", category: "스타우트", abv: "6.0%", srm: 36, srm_color: "#2C0A0A", brewery: "Left Hand Brewing", origin: "미국", tags: ["#크리미", "#달콤한"], hashtags: ["tex_creamy", "sweet_darkchoco", "roast_coffee"], profile: { 단맛: 3.5, 탄맛: 3.0, 몰티함: 4.0, 바디감: 4.5, 아로마: 3.5 } },
  { name: "미켈러 비어긱 브렉퍼스트", type: "Oatmeal Stout", category: "스타우트", abv: "7.5%", srm: 40, srm_color: "#1A0505", brewery: "Mikkeller", origin: "덴마크", tags: ["#커피", "#오트밀"], hashtags: ["roast_coffee", "sweet_darkchoco", "tex_creamy"], profile: { 단맛: 2.8, 탄맛: 4.5, 몰티함: 4.5, 바디감: 5.0, 아로마: 5.0 } },
  { name: "구스 아일랜드 버번 카운티", type: "Barrel-Aged Imperial Stout", category: "스타우트", abv: "13.0%", srm: 40, srm_color: "#1A0505", brewery: "Goose Island", origin: "미국", tags: ["#버번통숙성", "#레전드"], hashtags: ["roast_coffee", "sweet_darkchoco", "ferment_wine", "roast_char"], profile: { 단맛: 4.0, 탄맛: 4.5, 몰티함: 5.0, 바디감: 5.0, 아로마: 5.0 } },
  { name: "알레스미스 스피드웨이 스타우트", type: "Imperial Stout", category: "스타우트", abv: "12.0%", srm: 40, srm_color: "#1A0505", brewery: "AleSmith Brewing", origin: "미국", tags: ["#커피", "#강렬한"], hashtags: ["roast_coffee", "sweet_darkchoco", "roast_char"], profile: { 단맛: 3.5, 탄맛: 4.8, 몰티함: 5.0, 바디감: 5.0, 아로마: 5.0 } },
  { name: "덕래빗 밀크 스타우트", type: "Milk Stout", category: "스타우트", abv: "5.7%", srm: 38, srm_color: "#2C0A0A", brewery: "Duck-Rabbit Craft Brewery", origin: "미국", tags: ["#크리미", "#달콤한"], hashtags: ["tex_creamy", "sweet_darkchoco", "roast_coffee"], profile: { 단맛: 3.5, 탄맛: 3.0, 몰티함: 4.0, 바디감: 4.5, 아로마: 3.5 } },
  { name: "브루클린 블랙 초콜릿 스타우트", type: "Imperial Stout", category: "스타우트", abv: "10.0%", srm: 40, srm_color: "#1A0505", brewery: "Brooklyn Brewery", origin: "미국", tags: ["#초콜릿", "#강렬한"], hashtags: ["sweet_darkchoco", "roast_coffee", "roast_char"], profile: { 단맛: 3.5, 탄맛: 4.5, 몰티함: 5.0, 바디감: 5.0, 아로마: 4.5 } },
  { name: "텐 피프티", type: "Imperial Stout", category: "스타우트", abv: "10.5%", srm: 40, srm_color: "#1A0505", brewery: "Oskar Blues", origin: "미국", tags: ["#초콜릿", "#커피"], hashtags: ["sweet_darkchoco", "roast_coffee", "malt_toast"], profile: { 단맛: 3.0, 탄맛: 4.5, 몰티함: 5.0, 바디감: 5.0, 아로마: 4.5 } },
  { name: "제주 스타우트", type: "Stout", category: "스타우트", abv: "5.0%", srm: 36, srm_color: "#2C0A0A", brewery: "제주 맥주", origin: "대한민국", tags: ["#초콜릿", "#제주"], hashtags: ["sweet_darkchoco", "roast_coffee", "tex_silky"], profile: { 단맛: 2.5, 탄맛: 3.5, 몰티함: 4.0, 바디감: 4.0, 아로마: 3.5 } },
  { name: "갈매기 스타우트", type: "Stout", category: "스타우트", abv: "5.0%", srm: 38, srm_color: "#1A0505", brewery: "갈매기 브루잉", origin: "대한민국", tags: ["#커피", "#수제"], hashtags: ["roast_coffee", "sweet_darkchoco", "tex_silky"], profile: { 단맛: 2.5, 탄맛: 3.5, 몰티함: 4.0, 바디감: 4.0, 아로마: 3.5 } },
  { name: "크래프트브로스 임페리얼 스타우트", type: "Imperial Stout", category: "스타우트", abv: "10.0%", srm: 40, srm_color: "#1A0505", brewery: "크래프트브로스", origin: "대한민국", tags: ["#강렬한", "#다크초콜릿"], hashtags: ["sweet_darkchoco", "roast_coffee", "roast_char"], profile: { 단맛: 3.0, 탄맛: 4.5, 몰티함: 5.0, 바디감: 5.0, 아로마: 4.5 } },
  // Porter → 스타우트
  { name: "파운더스 포터", type: "American Porter", category: "스타우트", abv: "6.5%", srm: 28, srm_color: "#3C1510", brewery: "Founders Brewing", origin: "미국", tags: ["#초콜릿", "#커피"], hashtags: ["sweet_darkchoco", "roast_coffee", "malt_toast"], profile: { 단맛: 3.0, 탄맛: 3.5, 몰티함: 4.0, 바디감: 4.0, 아로마: 4.0 } },
  { name: "데슈츠 블랙 버트 포터", type: "American Porter", category: "스타우트", abv: "5.2%", srm: 30, srm_color: "#2C0A08", brewery: "Deschutes Brewery", origin: "미국", tags: ["#초콜릿", "#토피"], hashtags: ["sweet_darkchoco", "malt_toast", "tex_silky"], profile: { 단맛: 3.0, 탄맛: 3.0, 몰티함: 4.0, 바디감: 3.8, 아로마: 3.8 } },
  { name: "그레이트레이크스 에드먼드 피츠제럴드", type: "American Porter", category: "스타우트", abv: "6.0%", srm: 32, srm_color: "#2C0A08", brewery: "Great Lakes Brewing", origin: "미국", tags: ["#커피", "#초콜릿"], hashtags: ["roast_coffee", "sweet_darkchoco", "malt_toast"], profile: { 단맛: 3.0, 탄맛: 3.8, 몰티함: 4.2, 바디감: 4.0, 아로마: 4.0 } },
  { name: "코나 파이프라인 포터", type: "Coffee Porter", category: "스타우트", abv: "5.4%", srm: 30, srm_color: "#2C0A08", brewery: "Kona Brewing", origin: "미국", tags: ["#커피", "#코나"], hashtags: ["roast_coffee", "sweet_darkchoco", "tex_silky"], profile: { 단맛: 2.5, 탄맛: 3.5, 몰티함: 4.0, 바디감: 4.0, 아로마: 4.5 } },
  { name: "스톤 스모크드 포터", type: "Smoked Porter", category: "스타우트", abv: "5.9%", srm: 32, srm_color: "#2C0A08", brewery: "Stone Brewing", origin: "미국", tags: ["#스모키", "#초콜릿"], hashtags: ["roast_smoke", "sweet_darkchoco", "malt_toast"], profile: { 단맛: 2.5, 탄맛: 4.0, 몰티함: 4.5, 바디감: 4.0, 아로마: 4.0 } },
  { name: "플라잉독 곤조 임페리얼 포터", type: "Imperial Porter", category: "스타우트", abv: "7.8%", srm: 34, srm_color: "#2C0A08", brewery: "Flying Dog Brewery", origin: "미국", tags: ["#임페리얼", "#강한"], hashtags: ["roast_coffee", "sweet_darkchoco", "ferment_wine"], profile: { 단맛: 3.0, 탄맛: 4.0, 몰티함: 4.5, 바디감: 4.5, 아로마: 4.2 } },
  { name: "지비에츠 발틱 포터", type: "Baltic Porter", category: "스타우트", abv: "9.0%", srm: 36, srm_color: "#2C0A08", brewery: "Żywiec", origin: "폴란드", tags: ["#발틱", "#다크프룻"], hashtags: ["ferment_wine", "sweet_darkchoco", "roast_coffee"], profile: { 단맛: 3.5, 탄맛: 3.8, 몰티함: 4.5, 바디감: 4.5, 아로마: 4.0 } },
  { name: "제주 포터", type: "Craft Porter", category: "스타우트", abv: "5.5%", srm: 28, srm_color: "#3C1510", brewery: "제주 맥주", origin: "대한민국", tags: ["#초콜릿", "#제주"], hashtags: ["sweet_darkchoco", "malt_toast", "tex_silky"], profile: { 단맛: 2.8, 탄맛: 3.0, 몰티함: 3.8, 바디감: 3.8, 아로마: 3.5 } },
  { name: "갈매기 포터", type: "Craft Porter", category: "스타우트", abv: "5.5%", srm: 30, srm_color: "#2C0A08", brewery: "갈매기 브루잉", origin: "대한민국", tags: ["#커피", "#수제"], hashtags: ["roast_coffee", "sweet_darkchoco", "malt_toast"], profile: { 단맛: 2.5, 탄맛: 3.5, 몰티함: 4.0, 바디감: 4.0, 아로마: 3.8 } },
  { name: "곰표 흑맥주", type: "Dark Lager", category: "스타우트", abv: "4.5%", srm: 28, srm_color: "#3C1510", brewery: "세븐브로이", origin: "대한민국", tags: ["#흑맥주", "#달콤한"], hashtags: ["malt_toast", "sweet_darkchoco", "tex_silky"], profile: { 단맛: 3.0, 탄맛: 2.5, 몰티함: 3.8, 바디감: 3.5, 아로마: 3.0 } },
  { name: "말표 흑맥주", type: "Dark Lager", category: "스타우트", abv: "4.5%", srm: 28, srm_color: "#3C1510", brewery: "코리아크래프트브류어리", origin: "대한민국", tags: ["#흑맥주", "#달콤한"], hashtags: ["malt_toast", "sweet_darkchoco", "tex_silky"], profile: { 단맛: 3.0, 탄맛: 2.5, 몰티함: 3.8, 바디감: 3.5, 아로마: 3.0 } },
  { name: "코에도 시코쿠", type: "Japanese Porter", category: "스타우트", abv: "5.0%", srm: 30, srm_color: "#2C0A08", brewery: "Coedo Brewery", origin: "일본", tags: ["#초콜릿", "#부드러운"], hashtags: ["sweet_darkchoco", "malt_toast", "tex_silky"], profile: { 단맛: 3.0, 탄맛: 3.0, 몰티함: 4.0, 바디감: 3.8, 아로마: 3.5 } },
  { name: "요호 도쿄 블랙", type: "Japanese Porter", category: "스타우트", abv: "5.0%", srm: 32, srm_color: "#2C0A08", brewery: "Yo-Ho Brewing", origin: "일본", tags: ["#커피", "#초콜릿"], hashtags: ["roast_coffee", "sweet_darkchoco", "malt_toast"], profile: { 단맛: 2.8, 탄맛: 3.5, 몰티함: 4.0, 바디감: 4.0, 아로마: 3.8 } },

  // ──────────────────────────────────────────────────
  // 사워 추가 (axes: 단맛 신맛 쓴맛 아로마 부드러움)
  // ──────────────────────────────────────────────────
  { name: "로덴바흐 그랑 크뤼", type: "Flanders Red Ale", category: "사워", abv: "6.0%", srm: 10, srm_color: "#B87333", brewery: "Brouwerij Rodenbach", origin: "벨기에", tags: ["#와인", "#새콤한"], hashtags: ["sour_berry", "ferment_wine", "sour_citrus"], profile: { 단맛: 2.0, 신맛: 4.5, 쓴맛: 1.0, 아로마: 4.5, 부드러움: 2.5 } },
  { name: "뒤세스 드 부르고뉴", type: "Flanders Red Ale", category: "사워", abv: "6.2%", srm: 12, srm_color: "#B87333", brewery: "Brouwerij Verhaeghe", origin: "벨기에", tags: ["#체리", "#레드와인"], hashtags: ["sour_berry", "ferment_wine", "sweet_caramel"], profile: { 단맛: 2.5, 신맛: 4.0, 쓴맛: 0.8, 아로마: 4.5, 부드러움: 3.0 } },
  { name: "분 우드 구즈", type: "Gueuze", category: "사워", abv: "6.0%", srm: 5, srm_color: "#D4A835", brewery: "Brouwerij Boon", origin: "벨기에", tags: ["#드라이", "#펑키"], hashtags: ["sour_citrus", "ferment_funky", "sour_grape"], profile: { 단맛: 1.5, 신맛: 4.8, 쓴맛: 1.0, 아로마: 4.2, 부드러움: 1.5 } },
  { name: "쓰리 폰테이넨 구즈", type: "Gueuze", category: "사워", abv: "6.0%", srm: 5, srm_color: "#D4A835", brewery: "3 Fonteinen", origin: "벨기에", tags: ["#레전드", "#람빅"], hashtags: ["sour_citrus", "ferment_funky", "sour_grape"], profile: { 단맛: 1.3, 신맛: 5.0, 쓴맛: 1.0, 아로마: 4.5, 부드러움: 1.5 } },
  { name: "미켈러 스폰탄체리", type: "Cherry Lambic", category: "사워", abv: "7.0%", srm: 8, srm_color: "#B87333", brewery: "Mikkeller", origin: "덴마크", tags: ["#체리", "#람빅"], hashtags: ["sour_berry", "ferment_funky", "sour_citrus"], profile: { 단맛: 2.0, 신맛: 4.8, 쓴맛: 1.0, 아로마: 4.5, 부드러움: 1.5 } },
  { name: "칸티용 로제 드 감브리누스", type: "Raspberry Lambic", category: "사워", abv: "5.0%", srm: 8, srm_color: "#B87333", brewery: "Cantillon", origin: "벨기에", tags: ["#라즈베리", "#드라이"], hashtags: ["sour_berry", "ferment_funky", "sour_citrus"], profile: { 단맛: 1.8, 신맛: 4.8, 쓴맛: 1.0, 아로마: 4.5, 부드러움: 1.5 } },
  { name: "러시안 리버 서플리케이션", type: "American Wild Ale", category: "사워", abv: "7.0%", srm: 10, srm_color: "#B87333", brewery: "Russian River Brewing", origin: "미국", tags: ["#체리", "#오크"], hashtags: ["sour_berry", "ferment_funky", "ferment_wine"], profile: { 단맛: 2.0, 신맛: 4.5, 쓴맛: 1.0, 아로마: 4.5, 부드러움: 2.0 } },
  { name: "러시안 리버 컨세크레이션", type: "American Wild Ale", category: "사워", abv: "10.0%", srm: 12, srm_color: "#B87333", brewery: "Russian River Brewing", origin: "미국", tags: ["#커런트", "#오크"], hashtags: ["sour_berry", "ferment_wine", "ferment_funky"], profile: { 단맛: 2.5, 신맛: 4.5, 쓴맛: 1.5, 아로마: 4.5, 부드러움: 2.0 } },
  { name: "웨스트브룩 고제", type: "Gose", category: "사워", abv: "4.0%", srm: 4, srm_color: "#F0D870", brewery: "Westbrook Brewing", origin: "미국", tags: ["#짭짤한", "#레몬"], hashtags: ["sour_citrus", "tex_dry"], profile: { 단맛: 1.5, 신맛: 4.2, 쓴맛: 0.3, 아로마: 3.0, 부드러움: 3.0 } },
  { name: "분 크릭", type: "Kriek", category: "사워", abv: "4.0%", srm: 8, srm_color: "#B87333", brewery: "Brouwerij Boon", origin: "벨기에", tags: ["#체리", "#드라이"], hashtags: ["sour_berry", "ferment_funky"], profile: { 단맛: 2.0, 신맛: 4.5, 쓴맛: 0.8, 아로마: 4.2, 부드러움: 2.0 } },
  { name: "제주 감귤 사워", type: "Fruited Sour Ale", category: "사워", abv: "4.5%", srm: 4, srm_color: "#F0D870", brewery: "제주 맥주", origin: "대한민국", tags: ["#감귤", "#제주"], hashtags: ["sour_citrus", "sweet_tropical", "tex_watery"], profile: { 단맛: 3.0, 신맛: 4.2, 쓴맛: 0.3, 아로마: 4.0, 부드러움: 3.0 } },
  { name: "갈매기 사워", type: "Sour Ale", category: "사워", abv: "4.5%", srm: 4, srm_color: "#F0D870", brewery: "갈매기 브루잉", origin: "대한민국", tags: ["#산미", "#수제"], hashtags: ["sour_citrus", "tex_watery"], profile: { 단맛: 2.0, 신맛: 4.0, 쓴맛: 0.5, 아로마: 3.5, 부드러움: 3.0 } },
  { name: "크래프트브로스 체리 사워", type: "Fruited Sour", category: "사워", abv: "5.0%", srm: 7, srm_color: "#B87333", brewery: "크래프트브로스", origin: "대한민국", tags: ["#체리", "#수제"], hashtags: ["sour_berry", "sour_citrus"], profile: { 단맛: 2.5, 신맛: 4.2, 쓴맛: 0.5, 아로마: 3.8, 부드러움: 2.8 } },
  { name: "아트몬스터 유자 사워", type: "Yuzu Sour", category: "사워", abv: "4.5%", srm: 3, srm_color: "#F5E080", brewery: "아트몬스터 브루잉", origin: "대한민국", tags: ["#유자", "#산미"], hashtags: ["sour_citrus", "sweet_tropical", "tex_watery"], profile: { 단맛: 2.8, 신맛: 4.5, 쓴맛: 0.3, 아로마: 4.2, 부드러움: 3.5 } },
  { name: "히타치노 유자 사워", type: "Yuzu Sour Ale", category: "사워", abv: "4.5%", srm: 3, srm_color: "#F5E080", brewery: "Kiuchi Brewery", origin: "일본", tags: ["#유자", "#레몬"], hashtags: ["sour_citrus", "sweet_tropical"], profile: { 단맛: 2.5, 신맛: 4.2, 쓴맛: 0.3, 아로마: 4.2, 부드러움: 3.5 } },
  { name: "타이후 패션프루츠 사워", type: "Fruited Sour", category: "사워", abv: "4.5%", srm: 3, srm_color: "#F5E080", brewery: "Taihu Brewing", origin: "대만", tags: ["#패션프루츠", "#열대"], hashtags: ["sweet_tropical", "sour_citrus", "tex_watery"], profile: { 단맛: 3.5, 신맛: 4.5, 쓴맛: 0.3, 아로마: 4.5, 부드러움: 3.0 } },
  { name: "어메이징브루잉 베를리너 바이세", type: "Berliner Weisse", category: "사워", abv: "3.5%", srm: 3, srm_color: "#F5E080", brewery: "어메이징브루잉", origin: "대한민국", tags: ["#산미", "#가벼운"], hashtags: ["sour_citrus", "tex_watery", "sour_yogurt"], profile: { 단맛: 1.5, 신맛: 4.2, 쓴맛: 0.3, 아로마: 2.8, 부드러움: 3.5 } },
  { name: "뉴 벨지엄 레이밍 고제", type: "Gose", category: "사워", abv: "4.2%", srm: 4, srm_color: "#F0D870", brewery: "New Belgium Brewing", origin: "미국", tags: ["#짭짤한", "#라임"], hashtags: ["sour_citrus", "tex_dry"], profile: { 단맛: 2.0, 신맛: 4.2, 쓴맛: 0.3, 아로마: 3.2, 부드러움: 3.0 } },
];

async function insertBeers() {
  console.log(`총 ${BEERS.length}개 맥주 삽입 시작...`);

  // 청크 단위로 삽입 (50개씩)
  const CHUNK = 50;
  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < BEERS.length; i += CHUNK) {
    const chunk = BEERS.slice(i, i + CHUNK);

    const { data, error } = await supabase
      .from("beers")
      .insert(
        chunk.map((b) => ({
          name: b.name,
          type: b.type,
          category: b.category,
          abv: b.abv,
          srm: b.srm,
          srm_color: b.srm_color,
          brewery: b.brewery,
          origin: b.origin,
          tags: b.tags,
          hashtags: b.hashtags,
          profile: b.profile,
          is_verified: true,
        }))
      );

    if (error) {
      console.error(`❌ 오류 (${i}~${i + CHUNK}):`, error.message);
      // 권한 오류면 중단
      if (error.code === "42501" || error.message.includes("policy")) {
        console.log("\n⚠️  RLS 정책으로 인해 anon key로는 삽입 불가.");
        console.log("Supabase Dashboard → SQL Editor에서 seed_beers_notion.sql을 실행해주세요.");
        console.log("또는: node scripts/insert_notion_beers.mjs <SERVICE_ROLE_KEY>");
        process.exit(1);
      }
    } else {
      inserted += chunk.length;
      console.log(`✅ ${i + 1}~${Math.min(i + CHUNK, BEERS.length)}번 삽입 완료`);
    }
  }

  console.log(`\n🎉 완료: ${inserted}개 처리 (중복 제외 자동 skip)`);

  // 최종 카운트 확인
  const { count } = await supabase
    .from("beers")
    .select("*", { count: "exact", head: true });
  console.log(`📊 현재 DB 총 맥주 수: ${count}개`);
}

insertBeers().catch(console.error);
