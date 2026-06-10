-- ================================================
-- 오늘의 맥주 (OMAC) — Beers Seed Data
-- Notion 데이터 기반 | 2026-06-10
-- ================================================
-- 실행 순서: 1) schema.sql  2) seed_beers.sql
--
-- 카테고리 매핑 (앱 CATEGORIES → Notion):
--   라거    ← 라거(LAGER)
--   IPA     ← IPA
--   에일    ← 밀맥주(Wheat) + Pale Ale + 벨기에 맥주(Belgian Ale)
--   스타우트 ← 스타우트(Stout) + 포터(Porter)
--   사워    ← 신 맥주(Sour Beer)
--
-- profile JSON 축(PROFILE_AXES):
--   라거    : 단맛 | 신맛 | 쓴맛 | 몰티함 | 아로마   (0~5)
--   에일    : 단맛 | 신맛 | 쓴맛 | 아로마 | 부드러움
--   IPA     : 단맛 | 신맛 | 쓴맛 | 아로마 | 부드러움
--   사워    : 단맛 | 신맛 | 쓴맛 | 아로마 | 부드러움
--   스타우트 : 단맛 | 탄맛 | 몰티함 | 바디감 | 아로마
-- ================================================

INSERT INTO public.beers
  (name, type, category, abv, srm, srm_color, brewery, origin,
   tags, hashtags, profile, is_verified)
VALUES

-- ============================================================
-- ① 라거 (LAGER)  |  axes: 단맛 신맛 쓴맛 몰티함 아로마
-- ============================================================

-- 한국
('테라',          'Lager',           '라거', '4.6%',  3, '#F5E27A', '하이트진로',      '대한민국',
 ARRAY['#청량함','#가벼운'],
 ARRAY['tex_watery','malt_grain'],
 '{"단맛":1.2,"신맛":0.5,"쓴맛":1.5,"몰티함":1.8,"아로마":1.3}'::jsonb, true),

('카스',          'Lager',           '라거', '4.5%',  3, '#F5E27A', 'OB맥주',          '대한민국',
 ARRAY['#청량함','#가벼운'],
 ARRAY['tex_watery','malt_grain'],
 '{"단맛":1.0,"신맛":0.5,"쓴맛":1.3,"몰티함":1.5,"아로마":1.2}'::jsonb, true),

('켈리',          'Lager',           '라거', '4.5%',  3, '#F5E27A', '하이트진로',      '대한민국',
 ARRAY['#부드러운','#청량함'],
 ARRAY['tex_silky','malt_grain'],
 '{"단맛":1.5,"신맛":0.5,"쓴맛":1.3,"몰티함":2.0,"아로마":1.5}'::jsonb, true),

('클라우드',      'Premium Lager',   '라거', '5.0%',  4, '#F0D060', '롯데주류',        '대한민국',
 ARRAY['#깔끔함','#프리미엄'],
 ARRAY['malt_grain','tex_dry'],
 '{"단맛":1.5,"신맛":0.5,"쓴맛":2.0,"몰티함":2.2,"아로마":1.8}'::jsonb, true),

('한맥',          'Lager',           '라거', '5.0%',  3, '#F5E27A', '하이트진로',      '대한민국',
 ARRAY['#청량함','#부드러운'],
 ARRAY['tex_watery','malt_grain'],
 '{"단맛":1.3,"신맛":0.5,"쓴맛":1.2,"몰티함":1.8,"아로마":1.3}'::jsonb, true),

('필라이트',      'Light Lager',     '라거', '3.5%',  2, '#F8EFA0', '하이트진로',      '대한민국',
 ARRAY['#가벼운','#저칼로리'],
 ARRAY['tex_watery','tex_dry'],
 '{"단맛":0.8,"신맛":0.3,"쓴맛":0.8,"몰티함":1.0,"아로마":0.8}'::jsonb, true),

-- 일본
('아사히 수퍼 드라이', 'Dry Lager',  '라거', '5.0%',  3, '#F5E27A', 'Asahi Breweries', '일본',
 ARRAY['#드라이','#청량함'],
 ARRAY['tex_dry','tex_watery'],
 '{"단맛":1.0,"신맛":0.5,"쓴맛":2.0,"몰티함":1.5,"아로마":1.5}'::jsonb, true),

('삿포로 프리미엄', 'Lager',         '라거', '4.7%',  4, '#F0D060', 'Sapporo Breweries','일본',
 ARRAY['#부드러운','#깔끔함'],
 ARRAY['tex_silky','malt_grain'],
 '{"단맛":1.5,"신맛":0.5,"쓴맛":1.8,"몰티함":2.0,"아로마":1.8}'::jsonb, true),

('에비스',        'Premium Lager',   '라거', '5.0%',  5, '#F0D060', 'Sapporo Breweries','일본',
 ARRAY['#프리미엄','#몰티한'],
 ARRAY['malt_grain','malt_toast','tex_silky'],
 '{"단맛":2.0,"신맛":0.5,"쓴맛":2.5,"몰티함":3.0,"아로마":2.5}'::jsonb, true),

('기린 이치방',   'All-Malt Lager',  '라거', '5.0%',  4, '#F0D060', 'Kirin Brewery',   '일본',
 ARRAY['#부드러운','#올몰트'],
 ARRAY['malt_grain','tex_silky','malt_biscuit'],
 '{"단맛":2.0,"신맛":0.5,"쓴맛":2.0,"몰티함":2.8,"아로마":2.0}'::jsonb, true),

('산토리 더 프리미엄 몰츠', 'Premium Lager', '라거', '5.5%', 5, '#F0D060', 'Suntory', '일본',
 ARRAY['#프리미엄','#홉향'],
 ARRAY['malt_grain','hop_flower','tex_silky'],
 '{"단맛":2.0,"신맛":0.5,"쓴맛":2.5,"몰티함":2.8,"아로마":2.8}'::jsonb, true),

-- 중국 / 동남아시아
('칭다오',        'Lager',           '라거', '4.7%',  3, '#F5E27A', 'Tsingtao Brewery','중국',
 ARRAY['#청량함','#부드러운'],
 ARRAY['tex_watery','malt_grain'],
 '{"단맛":1.2,"신맛":0.5,"쓴맛":1.5,"몰티함":1.5,"아로마":1.3}'::jsonb, true),

('타이거',        'Lager',           '라거', '5.0%',  3, '#F5E27A', 'Tiger Beer',      '싱가포르',
 ARRAY['#청량함','#가벼운'],
 ARRAY['tex_watery','tex_dry'],
 '{"단맛":1.0,"신맛":0.5,"쓴맛":1.8,"몰티함":1.5,"아로마":1.3}'::jsonb, true),

('창',            'Lager',           '라거', '5.0%',  3, '#F5E27A', 'Thai Beverage',   '태국',
 ARRAY['#청량함','#가벼운'],
 ARRAY['tex_watery','malt_grain'],
 '{"단맛":1.3,"신맛":0.5,"쓴맛":1.5,"몰티함":1.5,"아로마":1.2}'::jsonb, true),

('싱하',          'Lager',           '라거', '5.0%',  4, '#F0D060', 'Boon Rawd',       '태국',
 ARRAY['#쌉싸름','#청량함'],
 ARRAY['hop_herb','tex_dry'],
 '{"단맛":1.2,"신맛":0.5,"쓴맛":2.0,"몰티함":1.5,"아로마":1.8}'::jsonb, true),

-- 유럽
('하이네켄',      'Pale Lager',      '라거', '5.0%',  4, '#F0D060', 'Heineken',        '네덜란드',
 ARRAY['#청량함','#쌉싸름'],
 ARRAY['tex_dry','hop_herb','malt_grain'],
 '{"단맛":1.2,"신맛":0.5,"쓴맛":2.3,"몰티함":1.8,"아로마":2.0}'::jsonb, true),

('스텔라 아르투아','Pale Lager',     '라거', '5.0%',  4, '#F0D060', 'AB InBev',        '벨기에',
 ARRAY['#청량함','#유럽식'],
 ARRAY['tex_dry','malt_grain','hop_herb'],
 '{"단맛":1.5,"신맛":0.5,"쓴맛":2.0,"몰티함":2.0,"아로마":2.0}'::jsonb, true),

('칼스버그',      'Pilsner',         '라거', '5.0%',  4, '#F0D060', 'Carlsberg',       '덴마크',
 ARRAY['#부드러운','#청량함'],
 ARRAY['tex_silky','malt_grain','hop_herb'],
 '{"단맛":1.5,"신맛":0.5,"쓴맛":2.0,"몰티함":2.0,"아로마":2.0}'::jsonb, true),

('필스너 우르켈', 'Czech Pilsner',   '라거', '4.4%',  4, '#F0D060', 'Pilsner Urquell', '체코',
 ARRAY['#쌉싸름','#체코식'],
 ARRAY['hop_herb','malt_biscuit','tex_dry'],
 '{"단맛":1.5,"신맛":0.8,"쓴맛":3.5,"몰티함":2.5,"아로마":3.0}'::jsonb, true),

('코젤 다크',     'Dark Lager',      '라거', '3.8%', 20, '#5C2E0A', 'Kozel',           '체코',
 ARRAY['#다크','#달콤한'],
 ARRAY['malt_toast','sweet_caramel','tex_silky'],
 '{"단맛":3.0,"신맛":0.5,"쓴맛":2.0,"몰티함":3.5,"아로마":2.5}'::jsonb, true),

('파울라너 헬레스','Helles Lager',   '라거', '4.9%',  4, '#F0D060', 'Paulaner',        '독일',
 ARRAY['#부드러운','#바이에른'],
 ARRAY['malt_grain','tex_silky','malt_biscuit'],
 '{"단맛":2.0,"신맛":0.5,"쓴맛":1.8,"몰티함":2.8,"아로마":2.0}'::jsonb, true),

('벡스',          'Pilsner',         '라거', '5.0%',  4, '#F0D060', 'Beck''s',          '독일',
 ARRAY['#청량함','#쌉싸름'],
 ARRAY['tex_dry','hop_herb','malt_grain'],
 '{"단맛":1.2,"신맛":0.5,"쓴맛":2.5,"몰티함":1.8,"아로마":2.0}'::jsonb, true),

('비트부르거',    'Pilsner',         '라거', '4.8%',  4, '#F0D060', 'Bitburger',       '독일',
 ARRAY['#깔끔함','#쌉싸름'],
 ARRAY['tex_dry','hop_herb'],
 '{"단맛":1.2,"신맛":0.5,"쓴맛":2.8,"몰티함":1.8,"아로마":2.5}'::jsonb, true),

('크로넨버그 1664','Lager',          '라거', '5.0%',  4, '#F0D060', 'Kronenbourg',     '프랑스',
 ARRAY['#청량함','#부드러운'],
 ARRAY['tex_silky','malt_grain','hop_flower'],
 '{"단맛":1.5,"신맛":0.5,"쓴맛":1.8,"몰티함":2.0,"아로마":2.0}'::jsonb, true),

-- 아메리카
('코로나 엑스트라','Pale Lager',     '라거', '4.5%',  2, '#F8EFA0', 'Grupo Modelo',    '멕시코',
 ARRAY['#청량함','#라임향'],
 ARRAY['tex_watery','tex_dry'],
 '{"단맛":0.8,"신맛":0.5,"쓴맛":1.0,"몰티함":1.0,"아로마":1.0}'::jsonb, true),

('모델로 에스페시알','Pale Lager',   '라거', '4.4%',  3, '#F5E27A', 'Grupo Modelo',    '멕시코',
 ARRAY['#청량함','#부드러운'],
 ARRAY['tex_watery','malt_grain'],
 '{"단맛":1.0,"신맛":0.5,"쓴맛":1.2,"몰티함":1.5,"아로마":1.2}'::jsonb, true),

('버드와이저',    'American Lager',  '라거', '5.0%',  3, '#F5E27A', 'Anheuser-Busch',  '미국',
 ARRAY['#청량함','#아메리칸'],
 ARRAY['tex_watery','malt_grain'],
 '{"단맛":1.0,"신맛":0.5,"쓴맛":1.0,"몰티함":1.3,"아로마":1.0}'::jsonb, true),


-- ============================================================
-- ② IPA  |  axes: 단맛 신맛 쓴맛 아로마 부드러움
-- ============================================================

-- 한국 크래프트
('세인트 술사 IPA','India Pale Ale','IPA','6.0%', 6,'#D4A835','재주도 좋아','대한민국',
 ARRAY['#시트러스','#홉향'],
 ARRAY['sour_citrus','hop_pine','tex_dry'],
 '{"단맛":2.0,"신맛":2.0,"쓴맛":4.0,"아로마":4.0,"부드러움":2.5}'::jsonb, true),

('핑크 몬스터 IPA','India Pale Ale','IPA','6.5%', 5,'#D4A835','플레이그라운드 브루어리','대한민국',
 ARRAY['#트로피컬','#헤이지'],
 ARRAY['sweet_tropical','hop_flower','tex_creamy'],
 '{"단맛":3.0,"신맛":2.0,"쓴맛":3.5,"아로마":4.5,"부드러움":3.5}'::jsonb, true),

('아크 웨스트코스트 IPA','West Coast IPA','IPA','6.5%', 6,'#D4A835','아크 브루잉','대한민국',
 ARRAY['#솔잎향','#쌉싸름'],
 ARRAY['hop_pine','hop_resin','tex_dry'],
 '{"단맛":1.8,"신맛":1.0,"쓴맛":4.5,"아로마":4.0,"부드러움":2.0}'::jsonb, true),

('트레일헤드 IPA','American IPA','IPA','5.8%', 7,'#C9A227','서울 브루어리','대한민국',
 ARRAY['#홉향','#균형잡힌'],
 ARRAY['hop_herb','hop_flower','malt_grain'],
 '{"단맛":2.2,"신맛":1.5,"쓴맛":3.8,"아로마":3.8,"부드러움":3.0}'::jsonb, true),

('부산 IPA','American IPA','IPA','5.5%', 6,'#D4A835','부산 브루어리','대한민국',
 ARRAY['#홉향','#청량함'],
 ARRAY['hop_herb','tex_dry','malt_grain'],
 '{"단맛":2.0,"신맛":1.0,"쓴맛":3.8,"아로마":3.5,"부드러움":2.8}'::jsonb, true),

-- 글로벌
('시에라 네바다 토르치 IPA','American IPA','IPA','6.8%', 7,'#C9A227','Sierra Nevada','미국',
 ARRAY['#시트러스','#솔잎'],
 ARRAY['sour_citrus','hop_pine','hop_resin'],
 '{"단맛":2.0,"신맛":1.5,"쓴맛":4.2,"아로마":4.3,"부드러움":2.5}'::jsonb, true),

('도그피시헤드 60분 IPA','60 Minute IPA','IPA','6.0%', 6,'#D4A835','Dogfish Head','미국',
 ARRAY['#균형잡힌','#클래식'],
 ARRAY['hop_herb','malt_grain','tex_dry'],
 '{"단맛":2.2,"신맛":1.0,"쓴맛":4.0,"아로마":3.8,"부드러움":3.0}'::jsonb, true),

('라구니타스 IPA','India Pale Ale','IPA','6.2%', 8,'#C9A227','Lagunitas Brewing','미국',
 ARRAY['#허브','#레진'],
 ARRAY['hop_resin','hop_herb','malt_toast'],
 '{"단맛":2.5,"신맛":1.0,"쓴맛":4.2,"아로마":4.0,"부드러움":2.5}'::jsonb, true),

('구스 아일랜드 IPA','India Pale Ale','IPA','5.9%', 7,'#C9A227','Goose Island','미국',
 ARRAY['#클래식','#홉향'],
 ARRAY['hop_flower','hop_herb','malt_grain'],
 '{"단맛":2.2,"신맛":1.0,"쓴맛":4.0,"아로마":3.8,"부드러움":3.0}'::jsonb, true),

('브루독 펑크 IPA','India Pale Ale','IPA','5.6%', 6,'#D4A835','BrewDog','영국',
 ARRAY['#트로피컬','#패션프루츠'],
 ARRAY['sweet_tropical','hop_flower','tex_dry'],
 '{"단맛":2.5,"신맛":2.0,"쓴맛":3.5,"아로마":4.2,"부드러움":3.0}'::jsonb, true),

('더블 IPA 헤이지','Hazy Double IPA','IPA','8.2%', 5,'#D4A835','Craft','미국',
 ARRAY['#열대과일','#헤이지'],
 ARRAY['sweet_tropical','hop_resin','tex_creamy'],
 '{"단맛":3.2,"신맛":1.8,"쓴맛":3.0,"아로마":4.5,"부드러움":3.5}'::jsonb, true),

('뉴잉글랜드 IPA (NEIPA)','New England IPA','IPA','6.5%', 4,'#E8C040','Craft','미국',
 ARRAY['#헤이지','#크리미'],
 ARRAY['sweet_tropical','hop_flower','tex_creamy'],
 '{"단맛":3.0,"신맛":1.5,"쓴맛":2.5,"아로마":4.5,"부드러움":4.5}'::jsonb, true),

('사무엘 아담스 East IPA','East Coast IPA','IPA','5.8%', 6,'#D4A835','Samuel Adams','미국',
 ARRAY['#시트러스','#홉향'],
 ARRAY['sour_citrus','hop_flower','hop_herb'],
 '{"단맛":2.2,"신맛":1.5,"쓴맛":3.5,"아로마":3.8,"부드러움":3.0}'::jsonb, true),

('클라우드 크래프트 IPA','India Pale Ale','IPA','6.5%', 6,'#C9A227','Craft Korea','대한민국',
 ARRAY['#시트러스','#홉향'],
 ARRAY['sour_citrus','hop_pine','sweet_tropical','tex_dry'],
 '{"단맛":3.8,"신맛":1.2,"쓴맛":3.5,"아로마":4.0,"부드러움":3.0}'::jsonb, true),


-- ============================================================
-- ③ 에일  |  axes: 단맛 신맛 쓴맛 아로마 부드러움
-- ─── 밀맥주(Wheat Beer) ───────────────────────────────────
-- ============================================================

('호가든 오리지날','Witbier','에일','4.9%', 4,'#F0D870','Hoegaarden','벨기에',
 ARRAY['#오렌지필','#코리앤더'],
 ARRAY['sour_citrus','ferment_spice','tex_creamy'],
 '{"단맛":2.5,"신맛":1.5,"쓴맛":1.0,"아로마":3.5,"부드러움":4.0}'::jsonb, true),

('파울라너 헤페바이젠','Hefeweizen','에일','5.5%', 4,'#E8D060','Paulaner','독일',
 ARRAY['#바나나','#정향'],
 ARRAY['ferment_banana','ferment_spice','tex_creamy'],
 '{"단맛":2.8,"신맛":1.0,"쓴맛":1.0,"아로마":4.0,"부드러움":4.5}'::jsonb, true),

('에르딩어 바이스비어','Hefeweizen','에일','5.3%', 4,'#E8D060','Erdinger','독일',
 ARRAY['#바나나','#부드러운'],
 ARRAY['ferment_banana','malt_bread','tex_creamy'],
 '{"단맛":2.5,"신맛":1.0,"쓴맛":1.0,"아로마":3.8,"부드러움":4.5}'::jsonb, true),

('슈나이더 아벤투스','Kristallweizen','에일','7.7%', 5,'#E8C84A','Schneider Weisse','독일',
 ARRAY['#트로피컬','#강한'],
 ARRAY['sweet_tropical','ferment_banana','tex_creamy'],
 '{"단맛":3.5,"신맛":1.5,"쓴맛":1.5,"아로마":4.5,"부드러움":3.5}'::jsonb, true),

('블루문 벨지안 화이트','American Witbier','에일','5.4%', 4,'#F0D870','Blue Moon Brewing','미국',
 ARRAY['#오렌지','#부드러운'],
 ARRAY['sour_citrus','ferment_spice','tex_creamy'],
 '{"단맛":2.8,"신맛":1.5,"쓴맛":1.0,"아로마":3.5,"부드러움":4.0}'::jsonb, true),

('제주 위트 에일','Wheat Ale','에일','5.0%', 4,'#E8C84A','제주 맥주','대한민국',
 ARRAY['#오렌지필','#바나나'],
 ARRAY['sweet_vanilla','sour_citrus','ferment_banana'],
 '{"단맛":2.5,"신맛":2.0,"쓴맛":1.0,"아로마":3.5,"부드러움":4.0}'::jsonb, true),

('슈나이더 탈','Hefeweizen','에일','5.4%', 4,'#E8D060','Schneider Weisse','독일',
 ARRAY['#바나나','#정향'],
 ARRAY['ferment_banana','ferment_spice','malt_bread'],
 '{"단맛":2.5,"신맛":1.0,"쓴맛":1.0,"아로마":3.8,"부드러움":4.5}'::jsonb, true),

-- ─── Pale Ale ─────────────────────────────────────────────

('시에라 네바다 페일 에일','American Pale Ale','에일','5.6%', 8,'#C47A2A','Sierra Nevada','미국',
 ARRAY['#시트러스','#클래식'],
 ARRAY['sour_citrus','hop_herb','malt_grain'],
 '{"단맛":2.0,"신맛":1.5,"쓴맛":3.0,"아로마":3.5,"부드러움":3.5}'::jsonb, true),

('브루독 퀀틀리 페일','Pale Ale','에일','4.2%', 7,'#C47A2A','BrewDog','영국',
 ARRAY['#가벼운','#홉향'],
 ARRAY['hop_flower','hop_herb','tex_dry'],
 '{"단맛":2.0,"신맛":1.0,"쓴맛":2.5,"아로마":3.0,"부드러움":3.5}'::jsonb, true),

('스톤 페일 에일','American Pale Ale','에일','5.4%', 7,'#C47A2A','Stone Brewing','미국',
 ARRAY['#시트러스','#홉향'],
 ARRAY['hop_herb','sour_citrus','tex_dry'],
 '{"단맛":2.0,"신맛":1.5,"쓴맛":3.2,"아로마":3.8,"부드러움":3.0}'::jsonb, true),

('페일 에일 No.3','Pale Ale','에일','5.2%', 8,'#C47A2A','Craft Korea','대한민국',
 ARRAY['#풀향','#라이트홉'],
 ARRAY['hop_herb','malt_toast','tex_dry'],
 '{"단맛":2.0,"신맛":1.0,"쓴맛":2.8,"아로마":2.5,"부드러움":3.8}'::jsonb, true),

('개리슨 앰버 에일','American Amber Ale','에일','5.0%',14,'#C47A2A','Garrison Brewing','캐나다',
 ARRAY['#캐러멜','#균형잡힌'],
 ARRAY['sweet_caramel','malt_toast','hop_herb'],
 '{"단맛":3.0,"신맛":1.0,"쓴맛":2.5,"아로마":2.8,"부드러움":3.8}'::jsonb, true),

('뉴캐슬 브라운 에일','English Brown Ale','에일','4.7%',18,'#8B4513','Newcastle Breweries','영국',
 ARRAY['#너티','#캐러멜'],
 ARRAY['malt_toast','sweet_caramel','malt_biscuit'],
 '{"단맛":3.0,"신맛":0.8,"쓴맛":2.0,"아로마":2.8,"부드러움":4.5}'::jsonb, true),

-- ─── 벨기에 에일(Belgian Ale) ─────────────────────────────

('호가든 그랑 크뤼','Belgian Tripel','에일','8.7%', 4,'#F0D050','Hoegaarden','벨기에',
 ARRAY['#강한','#프루티'],
 ARRAY['sweet_tropical','ferment_spice','ferment_wine'],
 '{"단맛":3.5,"신맛":2.0,"쓴맛":2.5,"아로마":4.5,"부드러움":3.0}'::jsonb, true),

('시메이 화이트 (Tripel)','Belgian Tripel','에일','8.0%', 5,'#F0D050','Brasserie de Chimay','벨기에',
 ARRAY['#프루티','#향신료'],
 ARRAY['ferment_spice','sweet_tropical','ferment_apple'],
 '{"단맛":3.0,"신맛":2.0,"쓴맛":2.5,"아로마":4.0,"부드러움":3.0}'::jsonb, true),

('시메이 레드 (Dubbel)','Belgian Dubbel','에일','7.0%',22,'#6B3B1A','Brasserie de Chimay','벨기에',
 ARRAY['#다크프룻','#몰티한'],
 ARRAY['sweet_caramel','ferment_wine','malt_toast'],
 '{"단맛":3.5,"신맛":1.5,"쓴맛":2.0,"아로마":3.5,"부드러움":4.0}'::jsonb, true),

('시메이 블루 (Quadrupel)','Belgian Quadrupel','에일','9.0%',25,'#5C2E0A','Brasserie de Chimay','벨기에',
 ARRAY['#다크프룻','#강렬한'],
 ARRAY['ferment_wine','sweet_caramel','sweet_darkchoco'],
 '{"단맛":4.0,"신맛":1.5,"쓴맛":2.0,"아로마":4.0,"부드러움":4.0}'::jsonb, true),

('듀벨','Belgian Strong Golden Ale','에일','8.5%', 5,'#F0D050','Duvel Moortgat','벨기에',
 ARRAY['#드라이','#탄산'],
 ARRAY['hop_herb','ferment_spice','tex_dry'],
 '{"단맛":2.0,"신맛":1.5,"쓴맛":3.0,"아로마":3.5,"부드러움":2.5}'::jsonb, true),

('레페 브론드','Belgian Pale Ale','에일','6.6%',10,'#D4A217','Abbaye de Leffe','벨기에',
 ARRAY['#프루티','#부드러운'],
 ARRAY['sweet_caramel','ferment_apple','tex_silky'],
 '{"단맛":3.0,"신맛":1.5,"쓴맛":1.5,"아로마":3.5,"부드러움":4.5}'::jsonb, true),

('레페 다크','Belgian Dark Ale','에일','6.5%',22,'#6B3B1A','Abbaye de Leffe','벨기에',
 ARRAY['#초콜릿','#커피'],
 ARRAY['sweet_darkchoco','roast_coffee','malt_caramel'],
 '{"단맛":3.5,"신맛":1.0,"쓴맛":2.0,"아로마":3.8,"부드러움":4.0}'::jsonb, true),

('베스트말레 트리플','Belgian Tripel','에일','9.5%', 5,'#F0D050','Westmalle','벨기에',
 ARRAY['#프루티','#강한'],
 ARRAY['ferment_spice','sweet_tropical','hop_flower'],
 '{"단맛":3.0,"신맛":2.0,"쓴맛":3.0,"아로마":4.5,"부드러움":2.5}'::jsonb, true),

('오르발','Trappist Pale Ale','에일','6.2%', 7,'#C9A227','Brasserie d''Orval','벨기에',
 ARRAY['#펑키','#드라이'],
 ARRAY['ferment_funky','hop_herb','tex_dry'],
 '{"단맛":2.0,"신맛":2.5,"쓴맛":3.0,"아로마":4.0,"부드러움":2.0}'::jsonb, true),

('로슈포르 6','Belgian Dubbel','에일','7.5%',20,'#8B4513','Brasserie de Rochefort','벨기에',
 ARRAY['#다크프룻','#향신료'],
 ARRAY['ferment_wine','sweet_caramel','ferment_spice'],
 '{"단맛":3.5,"신맛":1.5,"쓴맛":2.5,"아로마":4.0,"부드러움":3.5}'::jsonb, true),

('로슈포르 10','Belgian Quadrupel','에일','11.3%',26,'#5C2E0A','Brasserie de Rochefort','벨기에',
 ARRAY['#다크프룻','#강렬한'],
 ARRAY['ferment_wine','sweet_darkchoco','sweet_caramel'],
 '{"단맛":4.2,"신맛":1.5,"쓴맛":2.0,"아로마":4.5,"부드러움":4.0}'::jsonb, true),

('굿 올드보이 앰버 에일','English Bitter','에일','4.2%',12,'#C47A2A','Wells & Young','영국',
 ARRAY['#캐러멜','#부드러운'],
 ARRAY['sweet_caramel','malt_biscuit','tex_silky'],
 '{"단맛":2.8,"신맛":0.8,"쓴맛":2.5,"아로마":2.5,"부드러움":4.5}'::jsonb, true),


-- ============================================================
-- ④ 스타우트  |  axes: 단맛 탄맛 몰티함 바디감 아로마
-- ─── Stout ───────────────────────────────────────────────
-- ============================================================

('기네스 드래프트','Dry Irish Stout','스타우트','4.2%',40,'#1A0505','Guinness','아일랜드',
 ARRAY['#크리미','#커피'],
 ARRAY['roast_coffee','tex_creamy','tex_silky'],
 '{"단맛":2.0,"탄맛":3.0,"몰티함":3.5,"바디감":4.0,"아로마":3.5}'::jsonb, true),

('기네스 엑스트라 스타우트','Extra Stout','스타우트','5.6%',40,'#1A0505','Guinness','아일랜드',
 ARRAY['#다크초콜릿','#로스티드'],
 ARRAY['roast_coffee','sweet_darkchoco','roast_char'],
 '{"단맛":2.0,"탄맛":3.8,"몰티함":4.0,"바디감":4.5,"아로마":3.8}'::jsonb, true),

('영스 더블 초콜릿 스타우트','Milk Stout','스타우트','5.2%',38,'#1A0505','Young''s Brewery','영국',
 ARRAY['#초콜릿','#크리미'],
 ARRAY['sweet_darkchoco','tex_creamy','roast_coffee'],
 '{"단맛":3.5,"탄맛":3.0,"몰티함":4.0,"바디감":4.0,"아로마":3.8}'::jsonb, true),

('사무엘 스미스 오트밀 스타우트','Oatmeal Stout','스타우트','5.0%',36,'#2C0A0A','Samuel Smith''s','영국',
 ARRAY['#크리미','#초콜릿'],
 ARRAY['tex_creamy','sweet_darkchoco','malt_toast'],
 '{"단맛":3.0,"탄맛":3.5,"몰티함":4.0,"바디감":4.5,"아로마":3.8}'::jsonb, true),

('오트밀 스타우트','Oatmeal Stout','스타우트','6.2%',35,'#2C0A0A','Craft','대한민국',
 ARRAY['#크리미','#커피'],
 ARRAY['sweet_darkchoco','roast_coffee','malt_caramel','tex_creamy','tex_heavy'],
 '{"단맛":2.8,"탄맛":3.8,"몰티함":4.5,"바디감":4.5,"아로마":3.5}'::jsonb, true),

('다크 스타우트 No.9','Stout','스타우트','7.8%',40,'#1A0505','Craft Korea','대한민국',
 ARRAY['#다크초콜릿','#로스티드'],
 ARRAY['sweet_darkchoco','roast_coffee','roast_smoke','malt_toast'],
 '{"단맛":3.0,"탄맛":4.5,"몰티함":4.8,"바디감":3.5,"아로마":4.0}'::jsonb, true),

('파운더스 임페리얼 스타우트','Imperial Stout','스타우트','10.5%',40,'#1A0505','Founders Brewing','미국',
 ARRAY['#강렬한','#다크초콜릿'],
 ARRAY['sweet_darkchoco','roast_coffee','roast_char','ferment_wine'],
 '{"단맛":3.5,"탄맛":4.5,"몰티함":5.0,"바디감":5.0,"아로마":4.5}'::jsonb, true),

('레이크프론트 크리미 다크','Milk Stout','스타우트','4.8%',35,'#2C0A0A','Lakefront Brewery','미국',
 ARRAY['#크리미','#달콤한'],
 ARRAY['tex_creamy','sweet_darkchoco','roast_coffee'],
 '{"단맛":3.0,"탄맛":3.0,"몰티함":4.0,"바디감":4.5,"아로마":3.5}'::jsonb, true),

('벨헤이번 블랙 스타우트','Stout','스타우트','4.2%',38,'#1A0505','Belhaven Brewery','스코틀랜드',
 ARRAY['#로스티드','#부드러운'],
 ARRAY['roast_coffee','tex_silky','malt_toast'],
 '{"단맛":2.5,"탄맛":3.0,"몰티함":3.8,"바디감":4.0,"아로마":3.5}'::jsonb, true),

-- ─── Porter ───────────────────────────────────────────────

('풀러스 런던 포터','London Porter','스타우트','5.4%',28,'#3C1510','Fuller''s Brewery','영국',
 ARRAY['#초콜릿','#토피'],
 ARRAY['sweet_darkchoco','malt_toast','tex_silky'],
 '{"단맛":3.0,"탄맛":3.0,"몰티함":3.8,"바디감":3.5,"아로마":3.5}'::jsonb, true),

('앵커 포터','American Porter','스타우트','5.6%',30,'#2C0A08','Anchor Brewing','미국',
 ARRAY['#로스티드','#초콜릿'],
 ARRAY['roast_coffee','sweet_darkchoco','malt_toast'],
 '{"단맛":2.8,"탄맛":3.5,"몰티함":4.0,"바디감":3.8,"아로마":3.5}'::jsonb, true),

('오코침 발틱 포터','Baltic Porter','스타우트','9.5%',32,'#2C0A08','Okocim','폴란드',
 ARRAY['#다크프룻','#강한'],
 ARRAY['ferment_wine','sweet_darkchoco','roast_coffee'],
 '{"단맛":3.5,"탄맛":3.8,"몰티함":4.5,"바디감":4.5,"아로마":4.0}'::jsonb, true),

('커피 포터','Coffee Porter','스타우트','5.8%',30,'#2C0A08','Craft','미국',
 ARRAY['#커피','#초콜릿'],
 ARRAY['roast_coffee','sweet_darkchoco','malt_toast'],
 '{"단맛":2.5,"탄맛":3.8,"몰티함":4.0,"바디감":4.0,"아로마":4.2}'::jsonb, true),

('초콜릿 포터','Chocolate Porter','스타우트','6.0%',30,'#2C0A08','Craft','영국',
 ARRAY['#초콜릿','#달콤한'],
 ARRAY['sweet_darkchoco','malt_toast','tex_silky'],
 '{"단맛":3.5,"탄맛":3.0,"몰티함":4.0,"바디감":4.0,"아로마":4.0}'::jsonb, true),

('로비슨 올드 탐','Old Ale/Porter','스타우트','8.5%',32,'#2C0A08','Robinson''s Brewery','영국',
 ARRAY['#다크','#강한'],
 ARRAY['roast_coffee','ferment_wine','sweet_darkchoco'],
 '{"단맛":3.5,"탄맛":4.0,"몰티함":4.5,"바디감":4.5,"아로마":4.0}'::jsonb, true),


-- ============================================================
-- ⑤ 사워  |  axes: 단맛 신맛 쓴맛 아로마 부드러움
-- ============================================================

-- 람빅 / Lambic
('린데만스 크릭','Cherry Lambic','사워','3.5%', 6,'#D4A835','Lindemans','벨기에',
 ARRAY['#체리','#새콤'],
 ARRAY['sour_berry','sour_citrus','sweet_vanilla'],
 '{"단맛":3.5,"신맛":4.5,"쓴맛":0.5,"아로마":4.0,"부드러움":2.5}'::jsonb, true),

('린데만스 프람부아즈','Framboise Lambic','사워','2.5%', 8,'#B87333','Lindemans','벨기에',
 ARRAY['#라즈베리','#달콤'],
 ARRAY['sweet_vanilla','sour_berry','sweet_tropical'],
 '{"단맛":4.0,"신맛":4.0,"쓴맛":0.3,"아로마":4.2,"부드러움":3.0}'::jsonb, true),

('린데만스 피치','Peach Lambic','사워','2.5%', 5,'#D4A835','Lindemans','벨기에',
 ARRAY['#복숭아','#달콤'],
 ARRAY['sweet_vanilla','sweet_tropical','sour_citrus'],
 '{"단맛":4.2,"신맛":3.5,"쓴맛":0.3,"아로마":4.0,"부드러움":3.0}'::jsonb, true),

('칸티용 구즈','Gueuze','사워','5.0%', 5,'#D4A835','Cantillon','벨기에',
 ARRAY['#시큼한','#와인'],
 ARRAY['sour_citrus','sour_grape','ferment_funky'],
 '{"단맛":1.5,"신맛":5.0,"쓴맛":1.0,"아로마":4.5,"부드러움":1.5}'::jsonb, true),

('칸티용 크릭','Cherry Kriek','사워','5.0%', 9,'#B87333','Cantillon','벨기에',
 ARRAY['#체리','#드라이'],
 ARRAY['sour_berry','sour_citrus','ferment_funky'],
 '{"단맛":2.0,"신맛":4.8,"쓴맛":1.0,"아로마":4.5,"부드러움":1.5}'::jsonb, true),

('체리 사워 람빅','Cherry Lambic','사워','5.0%', 9,'#B87333','Craft','대한민국',
 ARRAY['#체리','#와인향'],
 ARRAY['sweet_vanilla','sour_berry','sour_citrus'],
 '{"단맛":2.5,"신맛":4.8,"쓴맛":0.3,"아로마":3.8,"부드러움":2.5}'::jsonb, true),

-- 베를리너 바이세 / Berliner Weisse
('베를리너 킨들 바이세','Berliner Weisse','사워','3.0%', 3,'#F5E080','Kindl-Schultheiss','독일',
 ARRAY['#새콤한','#가벼운'],
 ARRAY['sour_citrus','tex_watery','sour_yogurt'],
 '{"단맛":1.5,"신맛":4.0,"쓴맛":0.5,"아로마":2.5,"부드러움":3.5}'::jsonb, true),

('패션 베를리너 바이세','Fruited Berliner Weisse','사워','4.0%', 3,'#F5E080','Craft','미국',
 ARRAY['#패션프루츠','#산미'],
 ARRAY['sweet_tropical','sour_citrus','tex_watery'],
 '{"단맛":3.5,"신맛":4.2,"쓴맛":0.3,"아로마":4.0,"부드러움":3.0}'::jsonb, true),

-- 고제 / Gose
('앤더슨 밸리 고제','Gose','사워','4.2%', 4,'#F0D870','Anderson Valley','미국',
 ARRAY['#짭짤한','#새콤'],
 ARRAY['sour_citrus','tex_dry','sour_grape'],
 '{"단맛":1.5,"신맛":4.0,"쓴맛":0.5,"아로마":3.0,"부드러움":3.0}'::jsonb, true),

('스트로베리 고제','Gose','사워','4.5%', 5,'#D4A835','Craft','미국',
 ARRAY['#딸기','#짭짤한'],
 ARRAY['sour_berry','sour_citrus','tex_dry'],
 '{"단맛":3.5,"신맛":4.0,"쓴맛":0.3,"아로마":3.8,"부드러움":2.8}'::jsonb, true),

-- Fruited Sour
('망고 사워 에일','Fruited Sour Ale','사워','5.5%', 5,'#D4A835','Craft','대한민국',
 ARRAY['#망고','#새콤달콤'],
 ARRAY['sweet_tropical','sour_berry','sour_citrus'],
 '{"단맛":4.0,"신맛":4.5,"쓴맛":0.5,"아로마":3.5,"부드러움":3.0}'::jsonb, true),

('뉴 벨지엄 라 폴리 사워','American Sour','사워','6.0%', 7,'#C9A227','New Belgium','미국',
 ARRAY['#프루티','#산미'],
 ARRAY['sour_berry','ferment_wine','sweet_tropical'],
 '{"단맛":2.5,"신맛":4.0,"쓴맛":0.8,"아로마":4.0,"부드러움":2.5}'::jsonb, true),

-- Wild Ale
('졸리 펌킨 아메리칸 와일드','American Wild Ale','사워','6.5%', 5,'#D4A835','Jolly Pumpkin','미국',
 ARRAY['#펑키','#드라이'],
 ARRAY['ferment_funky','sour_citrus','tex_dry'],
 '{"단맛":1.5,"신맛":4.5,"쓴맛":1.0,"아로마":4.0,"부드러움":1.5}'::jsonb, true),

('더 베일 리퍼 와일드 에일','Wild Ale','사워','8.0%', 6,'#D4A835','The Veil Brewing','미국',
 ARRAY['#펑키','#산미'],
 ARRAY['ferment_funky','sour_citrus','ferment_wine'],
 '{"단맛":2.0,"신맛":4.5,"쓴맛":1.0,"아로마":4.2,"부드러움":2.0}'::jsonb, true);
