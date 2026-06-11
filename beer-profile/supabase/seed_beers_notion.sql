-- ================================================
-- 노션 추가 맥주 데이터 (Notion Beers Append)
-- seed_beers.sql 이후에 실행 (기존 95개 제외)
-- 생성일: 2026-06-10
-- ================================================
-- 이 파일은 seed_beers.sql 실행 후 별도 실행
-- 또는 seed_beers.sql 마지막 세미콜론 제거 후 병합 가능
-- ================================================

INSERT INTO public.beers
  (name, type, category, abv, srm, srm_color, brewery, origin,
   tags, hashtags, profile, is_verified)
VALUES

-- ============================================================
-- ① 라거 추가  |  axes: 단맛 신맛 쓴맛 몰티함 아로마
-- ============================================================

-- 한국 추가
('카스 라이트',    'Light Lager',     '라거', '4.0%',  2, '#F8EFA0', 'OB맥주',          '대한민국',
 ARRAY['#가벼운','#저칼로리'],
 ARRAY['tex_watery','tex_dry'],
 '{"단맛":0.8,"신맛":0.3,"쓴맛":1.0,"몰티함":1.0,"아로마":0.8}'::jsonb, true),

('OB 라거',        'Lager',           '라거', '5.0%',  3, '#F5E27A', 'OB맥주',          '대한민국',
 ARRAY['#청량함','#가벼운'],
 ARRAY['tex_watery','malt_grain'],
 '{"단맛":1.0,"신맛":0.5,"쓴맛":1.2,"몰티함":1.5,"아로마":1.0}'::jsonb, true),

('맥스',           'All-Malt Lager',  '라거', '5.0%',  4, '#F0D060', 'OB맥주',          '대한민국',
 ARRAY['#올몰트','#깔끔함'],
 ARRAY['malt_grain','tex_dry'],
 '{"단맛":1.5,"신맛":0.5,"쓴맛":2.0,"몰티함":2.2,"아로마":1.8}'::jsonb, true),

('드라이피니시 D', 'Dry Lager',       '라거', '4.5%',  3, '#F5E27A', '하이트진로',      '대한민국',
 ARRAY['#드라이','#청량함'],
 ARRAY['tex_dry','tex_watery'],
 '{"단맛":0.8,"신맛":0.5,"쓴맛":2.0,"몰티함":1.5,"아로마":1.2}'::jsonb, true),

('클라우드 생 드래프트','Draft Lager', '라거', '5.0%',  4, '#F0D060', '롯데주류',        '대한민국',
 ARRAY['#드래프트','#깔끔함'],
 ARRAY['tex_dry','malt_grain'],
 '{"단맛":1.3,"신맛":0.5,"쓴맛":1.8,"몰티함":2.0,"아로마":1.5}'::jsonb, true),

('피츠',           'Light Lager',     '라거', '4.5%',  2, '#F8EFA0', '하이트진로',      '대한민국',
 ARRAY['#가벼운','#청량함'],
 ARRAY['tex_watery','tex_dry'],
 '{"단맛":0.8,"신맛":0.3,"쓴맛":1.0,"몰티함":1.0,"아로마":0.8}'::jsonb, true),

('필굿',           'Light Lager',     '라거', '4.0%',  2, '#F8EFA0', 'OB맥주',          '대한민국',
 ARRAY['#가벼운','#저칼로리'],
 ARRAY['tex_watery','tex_dry'],
 '{"단맛":0.8,"신맛":0.3,"쓴맛":0.8,"몰티함":1.0,"아로마":0.8}'::jsonb, true),

('하이트',         'Lager',           '라거', '4.5%',  3, '#F5E27A', '하이트진로',      '대한민국',
 ARRAY['#청량함','#클래식'],
 ARRAY['tex_watery','malt_grain'],
 '{"단맛":1.0,"신맛":0.5,"쓴맛":1.3,"몰티함":1.5,"아로마":1.2}'::jsonb, true),

-- 한국 크래프트 라거
('제주 라거',      'Craft Lager',     '라거', '4.3%',  3, '#F5E27A', '제주 맥주',       '대한민국',
 ARRAY['#청량함','#제주'],
 ARRAY['tex_watery','malt_grain','sour_citrus'],
 '{"단맛":1.5,"신맛":1.0,"쓴맛":1.5,"몰티함":1.8,"아로마":2.0}'::jsonb, true),

('갈매기 라거',    'Craft Lager',     '라거', '4.5%',  3, '#F5E27A', '갈매기 브루잉',   '대한민국',
 ARRAY['#청량함','#수제'],
 ARRAY['tex_watery','malt_grain'],
 '{"단맛":1.3,"신맛":0.5,"쓴맛":1.5,"몰티함":1.8,"아로마":1.5}'::jsonb, true),

('플레이그라운드 라거','Craft Lager',  '라거', '4.5%',  3, '#F5E27A', '플레이그라운드 브루어리','대한민국',
 ARRAY['#청량함','#수제'],
 ARRAY['tex_watery','malt_grain'],
 '{"단맛":1.3,"신맛":0.5,"쓴맛":1.5,"몰티함":2.0,"아로마":1.8}'::jsonb, true),

('ARC 라거',       'Craft Lager',     '라거', '4.5%',  3, '#F5E27A', '아크 브루잉',     '대한민국',
 ARRAY['#청량함','#수제'],
 ARRAY['tex_watery','malt_grain'],
 '{"단맛":1.2,"신맛":0.5,"쓴맛":1.5,"몰티함":1.8,"아로마":1.5}'::jsonb, true),

('ARC 필스너',     'Craft Pilsner',   '라거', '5.0%',  4, '#F0D060', '아크 브루잉',     '대한민국',
 ARRAY['#쌉싸름','#체코식'],
 ARRAY['hop_herb','malt_biscuit','tex_dry'],
 '{"단맛":1.5,"신맛":0.8,"쓴맛":3.0,"몰티함":2.5,"아로마":2.8}'::jsonb, true),

('더부스 대동강 필스너','Craft Pilsner','라거','5.0%', 4,'#F0D060','더 부스 브루잉','대한민국',
 ARRAY['#쌉싸름','#수제'],
 ARRAY['hop_herb','malt_grain','tex_dry'],
 '{"단맛":1.5,"신맛":0.8,"쓴맛":3.2,"몰티함":2.5,"아로마":2.8}'::jsonb, true),

('어메이징브루잉 성수라거','Craft Lager','라거','4.5%', 3,'#F5E27A','어메이징브루잉','대한민국',
 ARRAY['#청량함','#수제'],
 ARRAY['tex_watery','malt_grain'],
 '{"단맛":1.3,"신맛":0.5,"쓴맛":1.5,"몰티함":1.8,"아로마":1.5}'::jsonb, true),

('크래프트브로스 필스','Craft Pilsner','라거','5.2%', 4,'#F0D060','크래프트브로스','대한민국',
 ARRAY['#쌉싸름','#체코식'],
 ARRAY['hop_herb','malt_biscuit','tex_dry'],
 '{"단맛":1.5,"신맛":0.8,"쓴맛":3.2,"몰티함":2.5,"아로마":2.8}'::jsonb, true),

-- 독일 추가
('크롬바허 필스',  'German Pilsner',  '라거', '4.8%',  4, '#F0D060', 'Krombacher',      '독일',
 ARRAY['#쌉싸름','#청량함'],
 ARRAY['hop_herb','tex_dry','malt_grain'],
 '{"단맛":1.2,"신맛":0.5,"쓴맛":2.8,"몰티함":1.8,"아로마":2.2}'::jsonb, true),

('바슈타이너',     'German Pilsner',  '라거', '4.9%',  4, '#F0D060', 'Warsteiner',      '독일',
 ARRAY['#쌉싸름','#균형잡힌'],
 ARRAY['hop_herb','malt_grain','tex_dry'],
 '{"단맛":1.3,"신맛":0.5,"쓴맛":2.5,"몰티함":2.0,"아로마":2.0}'::jsonb, true),

('쾨닉 필스너',    'German Pilsner',  '라거', '4.9%',  4, '#F0D060', 'König Pilsener',  '독일',
 ARRAY['#쌉싸름','#깔끔함'],
 ARRAY['hop_herb','tex_dry'],
 '{"단맛":1.2,"신맛":0.5,"쓴맛":2.8,"몰티함":1.8,"아로마":2.2}'::jsonb, true),

('예버 필스너',    'German Pilsner',  '라거', '4.9%',  4, '#F0D060', 'Jever',           '독일',
 ARRAY['#쌉싸름','#드라이'],
 ARRAY['hop_herb','tex_dry'],
 '{"단맛":1.0,"신맛":0.5,"쓴맛":3.5,"몰티함":1.5,"아로마":2.5}'::jsonb, true),

('아우구스티너 헬레스','Helles Lager','라거','5.2%', 4,'#F0D060','Augustiner-Bräu','독일',
 ARRAY['#부드러운','#바이에른'],
 ARRAY['malt_grain','tex_silky','malt_biscuit'],
 '{"단맛":2.2,"신맛":0.5,"쓴맛":1.5,"몰티함":3.0,"아로마":2.0}'::jsonb, true),

('호프브로이 오리지널','Helles Lager','라거','5.1%', 4,'#F0D060','Hofbräuhaus','독일',
 ARRAY['#부드러운','#옥토버페스트'],
 ARRAY['malt_grain','tex_silky'],
 '{"단맛":2.0,"신맛":0.5,"쓴맛":1.5,"몰티함":2.8,"아로마":1.8}'::jsonb, true),

('뢰벤브로이',     'Munich Helles',   '라거', '5.1%',  4, '#F0D060', 'Löwenbräu',       '독일',
 ARRAY['#부드러운','#뮌헨'],
 ARRAY['malt_grain','tex_silky','malt_biscuit'],
 '{"단맛":2.0,"신맛":0.5,"쓴맛":1.8,"몰티함":2.5,"아로마":2.0}'::jsonb, true),

-- 체코 추가
('코젤 프리미엄',  'Czech Lager',     '라거', '4.6%',  6, '#D4A835', 'Kozel',           '체코',
 ARRAY['#균형잡힌','#몰티한'],
 ARRAY['malt_biscuit','hop_herb','tex_silky'],
 '{"단맛":2.0,"신맛":0.5,"쓴맛":2.2,"몰티함":2.8,"아로마":2.2}'::jsonb, true),

('부드바르',       'Czech Lager',     '라거', '5.0%',  4, '#F0D060', 'Budvar',          '체코',
 ARRAY['#균형잡힌','#체코식'],
 ARRAY['malt_grain','hop_herb','tex_dry'],
 '{"단맛":1.8,"신맛":0.5,"쓴맛":2.5,"몰티함":2.5,"아로마":2.5}'::jsonb, true),

('스타로프라멘',   'Czech Lager',     '라거', '5.0%',  4, '#F0D060', 'Staropramen',     '체코',
 ARRAY['#청량함','#체코식'],
 ARRAY['malt_grain','hop_herb','tex_dry'],
 '{"단맛":1.5,"신맛":0.5,"쓴맛":2.5,"몰티함":2.3,"아로마":2.2}'::jsonb, true),

-- 미국 추가
('밀러 라이트',    'Light Lager',     '라거', '4.2%',  2, '#F8EFA0', 'Miller Brewing',  '미국',
 ARRAY['#가벼운','#아메리칸'],
 ARRAY['tex_watery','tex_dry'],
 '{"단맛":0.8,"신맛":0.3,"쓴맛":1.0,"몰티함":1.0,"아로마":0.8}'::jsonb, true),

('쿠어스 라이트',  'Light Lager',     '라거', '4.2%',  2, '#F8EFA0', 'Coors Brewing',   '미국',
 ARRAY['#가벼운','#아메리칸'],
 ARRAY['tex_watery','tex_dry'],
 '{"단맛":0.8,"신맛":0.3,"쓴맛":0.8,"몰티함":1.0,"아로마":0.8}'::jsonb, true),

('미켈롭 울트라',  'Light Lager',     '라거', '4.2%',  2, '#F8EFA0', 'Anheuser-Busch',  '미국',
 ARRAY['#저칼로리','#가벼운'],
 ARRAY['tex_watery','tex_dry'],
 '{"단맛":0.5,"신맛":0.3,"쓴맛":0.8,"몰티함":0.8,"아로마":0.5}'::jsonb, true),

('유엔글링 트래디셔널 라거','Traditional Lager','라거','4.4%', 9,'#C9A227','Yuengling','미국',
 ARRAY['#앰버','#아메리칸'],
 ARRAY['malt_toast','sweet_caramel','tex_dry'],
 '{"단맛":2.0,"신맛":0.5,"쓴맛":2.0,"몰티함":2.5,"아로마":2.0}'::jsonb, true),

-- 일본 추가
('기린 라거',      'Lager',           '라거', '4.9%',  4, '#F0D060', 'Kirin Brewery',   '일본',
 ARRAY['#청량함','#클래식'],
 ARRAY['tex_watery','malt_grain'],
 '{"단맛":1.2,"신맛":0.5,"쓴맛":1.8,"몰티함":1.8,"아로마":1.5}'::jsonb, true),

('오리온 드래프트', 'Draft Lager',    '라거', '5.0%',  3, '#F5E27A', 'Orion Breweries', '일본',
 ARRAY['#청량함','#오키나와'],
 ARRAY['tex_watery','malt_grain'],
 '{"단맛":1.2,"신맛":0.5,"쓴맛":1.5,"몰티함":1.5,"아로마":1.3}'::jsonb, true),

-- 멕시코 추가
('퍼시피코',       'Pale Lager',      '라거', '4.4%',  2, '#F8EFA0', 'Grupo Modelo',    '멕시코',
 ARRAY['#청량함','#라임향'],
 ARRAY['tex_watery','tex_dry'],
 '{"단맛":0.8,"신맛":0.5,"쓴맛":1.0,"몰티함":1.0,"아로마":1.0}'::jsonb, true),

('도스 에퀴스',    'Vienna Lager',    '라거', '4.2%',  7, '#C9A227', 'Heineken MX',     '멕시코',
 ARRAY['#앰버','#몰티한'],
 ARRAY['malt_toast','sweet_caramel','tex_dry'],
 '{"단맛":2.0,"신맛":0.5,"쓴맛":1.8,"몰티함":2.5,"아로마":1.8}'::jsonb, true),

('솔',             'Pale Lager',      '라거', '4.5%',  2, '#F8EFA0', 'Cuauhtémoc Moctezuma','멕시코',
 ARRAY['#청량함','#라임향'],
 ARRAY['tex_watery','tex_dry'],
 '{"단맛":0.8,"신맛":0.5,"쓴맛":1.0,"몰티함":1.0,"아로마":0.8}'::jsonb, true),


-- ============================================================
-- ② IPA 추가  |  axes: 단맛 신맛 쓴맛 아로마 부드러움
-- ============================================================

('스톤 IPA',       'American IPA',    'IPA', '6.9%',  7, '#C9A227', 'Stone Brewing',   '미국',
 ARRAY['#솔잎','#자몽'],
 ARRAY['hop_pine','sour_citrus','hop_resin'],
 '{"단맛":1.5,"신맛":1.5,"쓴맛":4.8,"아로마":4.5,"부드러움":2.0}'::jsonb, true),

('밸러스트 포인트 스컬핀','American IPA','IPA','7.0%', 9,'#C9A227','Ballast Point','미국',
 ARRAY['#망고','#자몽'],
 ARRAY['sweet_tropical','sour_citrus','hop_resin'],
 '{"단맛":2.5,"신맛":2.0,"쓴맛":4.5,"아로마":4.5,"부드러움":2.5}'::jsonb, true),

('벨스 투 하티드', 'American IPA',    'IPA', '7.0%',  8, '#C9A227', 'Bell''s Brewery', '미국',
 ARRAY['#시트러스','#허브'],
 ARRAY['sour_citrus','hop_herb','hop_flower'],
 '{"단맛":2.0,"신맛":1.5,"쓴맛":4.5,"아로마":4.5,"부드러움":2.5}'::jsonb, true),

('플리니 더 엘더', 'Double IPA',      'IPA', '8.0%', 10, '#B8860B', 'Russian River',   '미국',
 ARRAY['#더블IPA','#레전드'],
 ARRAY['hop_pine','hop_resin','sour_citrus','tex_dry'],
 '{"단맛":2.0,"신맛":1.5,"쓴맛":5.0,"아로마":5.0,"부드러움":2.0}'::jsonb, true),

('파이어스톤 유니온 잭','American IPA','IPA','7.5%', 7,'#C9A227','Firestone Walker','미국',
 ARRAY['#클래식','#홉향'],
 ARRAY['hop_herb','sour_citrus','malt_toast'],
 '{"단맛":2.2,"신맛":1.0,"쓴맛":4.5,"아로마":4.2,"부드러움":2.5}'::jsonb, true),

('브루클린 이스트 IPA','East Coast IPA','IPA','6.9%', 7,'#C9A227','Brooklyn Brewery','미국',
 ARRAY['#균형잡힌','#아이스티'],
 ARRAY['hop_herb','malt_grain','sour_citrus'],
 '{"단맛":2.5,"신맛":1.5,"쓴맛":4.0,"아로마":4.0,"부드러움":3.0}'::jsonb, true),

('그린 플래시 웨스트코스트 IPA','West Coast IPA','IPA','8.1%', 9,'#C9A227','Green Flash','미국',
 ARRAY['#솔잎','#레진'],
 ARRAY['hop_pine','hop_resin','tex_dry'],
 '{"단맛":1.8,"신맛":1.5,"쓴맛":5.0,"아로마":4.5,"부드러움":2.0}'::jsonb, true),

('데슈츠 프레시 스퀴즈','West Coast IPA','IPA','6.4%', 7,'#C9A227','Deschutes Brewery','미국',
 ARRAY['#자몽','#오렌지'],
 ARRAY['sour_citrus','hop_flower','tex_dry'],
 '{"단맛":2.0,"신맛":2.0,"쓴맛":4.5,"아로마":4.5,"부드러움":2.5}'::jsonb, true),

('파운더스 센테니얼 IPA','American IPA','IPA','7.2%', 7,'#C9A227','Founders Brewing','미국',
 ARRAY['#자몽','#솔잎'],
 ARRAY['sour_citrus','hop_pine','hop_resin'],
 '{"단맛":2.0,"신맛":1.5,"쓴맛":4.8,"아로마":4.5,"부드러움":2.0}'::jsonb, true),

('모던타임즈 오더빌','Hazy IPA','IPA','6.5%', 5,'#D4A835','Modern Times Beer','미국',
 ARRAY['#헤이지','#트로피컬'],
 ARRAY['sweet_tropical','hop_flower','tex_creamy'],
 '{"단맛":3.0,"신맛":1.5,"쓴맛":2.5,"아로마":4.5,"부드러움":4.0}'::jsonb, true),

('미켈러 IPA',     'Danish IPA',      'IPA', '7.0%',  7, '#C9A227', 'Mikkeller',       '덴마크',
 ARRAY['#홉향','#프루티'],
 ARRAY['hop_flower','sour_citrus','tex_dry'],
 '{"단맛":2.0,"신맛":1.5,"쓴맛":4.5,"아로마":4.5,"부드러움":2.5}'::jsonb, true),

('데드 포니 클럽', 'Session IPA',     'IPA', '3.8%',  5, '#D4A835', 'BrewDog',         '영국',
 ARRAY['#가벼운','#세션'],
 ARRAY['hop_flower','sour_citrus','tex_dry'],
 '{"단맛":1.5,"신맛":1.5,"쓴맛":3.5,"아로마":4.0,"부드러움":3.0}'::jsonb, true),

('헤이지 제인',    'Hazy IPA',        'IPA', '5.0%',  4, '#E8C040', 'BrewDog',         '영국',
 ARRAY['#헤이지','#망고'],
 ARRAY['sweet_tropical','hop_flower','tex_creamy'],
 '{"단맛":3.0,"신맛":1.5,"쓴맛":2.0,"아로마":4.5,"부드러움":4.5}'::jsonb, true),

('히타치노 네스트 IPA','Japanese IPA', 'IPA', '7.0%',  8, '#C9A227', 'Kiuchi Brewery',  '일본',
 ARRAY['#과일향','#균형잡힌'],
 ARRAY['hop_flower','sour_citrus','malt_grain'],
 '{"단맛":2.5,"신맛":1.5,"쓴맛":4.0,"아로마":4.2,"부드러움":2.8}'::jsonb, true),

('요호 아오오니 IPA','Japanese IPA',  'IPA', '7.0%',  8, '#C9A227', 'Yo-Ho Brewing',   '일본',
 ARRAY['#청량함','#허브'],
 ARRAY['hop_herb','hop_flower','tex_dry'],
 '{"단맛":2.0,"신맛":1.0,"쓴맛":4.5,"아로마":4.0,"부드러움":2.5}'::jsonb, true),

('타이완 헤드 IPA','Taiwan IPA',      'IPA', '6.0%',  7, '#C9A227', 'Taiwan Head Brewers','대만',
 ARRAY['#시트러스','#열대'],
 ARRAY['sour_citrus','sweet_tropical','hop_flower'],
 '{"단맛":2.5,"신맛":2.0,"쓴맛":4.0,"아로마":4.2,"부드러움":2.8}'::jsonb, true),

-- 한국 크래프트 IPA 추가
('제주 IPA',       'American IPA',    'IPA', '6.0%',  7, '#C9A227', '제주 맥주',       '대한민국',
 ARRAY['#시트러스','#열대'],
 ARRAY['sour_citrus','sweet_tropical','hop_flower'],
 '{"단맛":2.5,"신맛":2.0,"쓴맛":4.0,"아로마":4.2,"부드러움":2.8}'::jsonb, true),

('갈매기 IPA',     'American IPA',    'IPA', '6.2%',  7, '#C9A227', '갈매기 브루잉',   '대한민국',
 ARRAY['#시트러스','#홉향'],
 ARRAY['sour_citrus','hop_pine','hop_herb'],
 '{"단맛":2.0,"신맛":1.5,"쓴맛":4.2,"아로마":4.0,"부드러움":2.5}'::jsonb, true),

('성수 IPA',       'American IPA',    'IPA', '6.0%',  6, '#D4A835', '어메이징브루잉',  '대한민국',
 ARRAY['#홉향','#청량함'],
 ARRAY['hop_herb','sour_citrus','tex_dry'],
 '{"단맛":2.0,"신맛":1.5,"쓴맛":4.0,"아로마":3.8,"부드러움":2.5}'::jsonb, true),

('곰표 IPA',       'American IPA',    'IPA', '6.5%',  7, '#C9A227', '세븐브로이',      '대한민국',
 ARRAY['#홉향','#수제'],
 ARRAY['hop_flower','sour_citrus','tex_dry'],
 '{"단맛":2.0,"신맛":1.5,"쓴맛":4.2,"아로마":4.0,"부드러움":2.5}'::jsonb, true),


-- ============================================================
-- ③ 에일 추가  |  axes: 단맛 신맛 쓴맛 아로마 부드러움
-- ─── 밀맥주 추가 ─────────────────────────────────────────
-- ============================================================

('프란치스카너 헤페바이젠','Hefeweizen','에일','5.0%', 4,'#E8D060','Franziskaner','독일',
 ARRAY['#바나나','#정향'],
 ARRAY['ferment_banana','ferment_spice','tex_creamy'],
 '{"단맛":2.8,"신맛":1.0,"쓴맛":1.0,"아로마":4.2,"부드러움":4.5}'::jsonb, true),

('바이엔슈테판 헤페바이젠','Hefeweizen','에일','5.4%', 4,'#E8D060','Weihenstephan','독일',
 ARRAY['#바나나','#크리미'],
 ARRAY['ferment_banana','ferment_spice','malt_bread','tex_creamy'],
 '{"단맛":3.0,"신맛":1.0,"쓴맛":1.0,"아로마":4.5,"부드러움":4.8}'::jsonb, true),

('쉐퍼호퍼 크리스탈바이젠','Kristallweizen','에일','4.9%', 3,'#F0D870','Schöfferhofer','독일',
 ARRAY['#맑은','#깔끔함'],
 ARRAY['ferment_banana','malt_grain','tex_dry'],
 '{"단맛":2.0,"신맛":1.0,"쓴맛":1.0,"아로마":3.0,"부드러움":4.0}'::jsonb, true),

('에델바이스',     'Wheat Beer',      '에일', '5.0%',  3, '#F0D870', 'Heineken Austria','오스트리아',
 ARRAY['#허브향','#청량함'],
 ARRAY['ferment_spice','hop_herb','tex_dry'],
 '{"단맛":2.0,"신맛":1.0,"쓴맛":1.5,"아로마":3.0,"부드러움":3.5}'::jsonb, true),

('1664 블랑',      'French Wheat Beer','에일','5.0%', 4,'#F0D870','Kronenbourg','프랑스',
 ARRAY['#오렌지필','#부드러운'],
 ARRAY['sour_citrus','ferment_spice','tex_creamy'],
 '{"단맛":2.5,"신맛":1.5,"쓴맛":1.0,"아로마":3.5,"부드러움":4.0}'::jsonb, true),

('알라가쉬 화이트','American Witbier','에일','5.0%', 3,'#F0D870','Allagash Brewing','미국',
 ARRAY['#코리앤더','#오렌지필'],
 ARRAY['ferment_spice','sour_citrus','tex_creamy'],
 '{"단맛":2.5,"신맛":1.5,"쓴맛":1.0,"아로마":4.0,"부드러움":4.5}'::jsonb, true),

('벨스 오베론',    'Wheat Ale',       '에일', '5.8%',  4, '#E8C84A', 'Bell''s Brewery', '미국',
 ARRAY['#여름','#오렌지향'],
 ARRAY['sour_citrus','ferment_spice','malt_bread'],
 '{"단맛":2.8,"신맛":1.5,"쓴맛":1.5,"아로마":3.5,"부드러움":4.0}'::jsonb, true),

('바이엔슈테판 비투스','Weizenbock','에일','7.7%', 7,'#C47A2A','Weihenstephan','독일',
 ARRAY['#바이젠복','#강한'],
 ARRAY['ferment_banana','sweet_caramel','malt_toast'],
 '{"단맛":3.5,"신맛":1.0,"쓴맛":1.5,"아로마":4.5,"부드러움":3.5}'::jsonb, true),

('에르딩어 둔켈','Dark Wheat Beer','에일','5.6%',15,'#8B6914','Erdinger','독일',
 ARRAY['#다크','#바나나'],
 ARRAY['ferment_banana','malt_toast','sweet_caramel'],
 '{"단맛":3.0,"신맛":1.0,"쓴맛":1.5,"아로마":3.8,"부드러움":4.0}'::jsonb, true),

('곰표 밀맥주',    'Korean Wheat Beer','에일','4.5%', 4,'#E8D060','세븐브로이','대한민국',
 ARRAY['#밀맥주','#바나나'],
 ARRAY['ferment_banana','malt_bread','tex_creamy'],
 '{"단맛":2.5,"신맛":1.0,"쓴맛":1.0,"아로마":3.5,"부드러움":4.5}'::jsonb, true),

('히타치노 네스트 화이트에일','Japanese Witbier','에일','5.5%', 4,'#F0D870','Kiuchi Brewery','일본',
 ARRAY['#넛맥','#오렌지필'],
 ARRAY['ferment_spice','sour_citrus','malt_grain'],
 '{"단맛":2.5,"신맛":1.5,"쓴맛":1.5,"아로마":4.2,"부드러움":4.0}'::jsonb, true),

('코에도 시로',    'Japanese Witbier','에일','5.5%', 4,'#F0D870','Coedo Brewery',   '일본',
 ARRAY['#오렌지필','#부드러운'],
 ARRAY['sour_citrus','ferment_spice','tex_creamy'],
 '{"단맛":2.5,"신맛":1.5,"쓴맛":1.0,"아로마":3.8,"부드러움":4.5}'::jsonb, true),

-- ─── Pale Ale 추가 ─────────────────────────────────────────

('사무엘 스미스 페일 에일','English Pale Ale','에일','5.0%', 8,'#C47A2A','Samuel Smith''s','영국',
 ARRAY['#너티','#균형잡힌'],
 ARRAY['malt_biscuit','hop_herb','tex_silky'],
 '{"단맛":2.5,"신맛":0.8,"쓴맛":2.5,"아로마":2.8,"부드러움":4.5}'::jsonb, true),

('풀러스 런던 프라이드','English Pale Ale','에일','4.7%',10,'#C47A2A','Fuller''s Brewery','영국',
 ARRAY['#영국식','#캐러멜'],
 ARRAY['sweet_caramel','malt_biscuit','hop_herb'],
 '{"단맛":2.8,"신맛":0.8,"쓴맛":2.5,"아로마":3.0,"부드러움":4.0}'::jsonb, true),

('파이어스톤 페일 31','American Pale Ale','에일','4.9%', 8,'#C47A2A','Firestone Walker','미국',
 ARRAY['#균형잡힌','#영국스타일'],
 ARRAY['hop_herb','malt_biscuit','tex_dry'],
 '{"단맛":2.2,"신맛":1.0,"쓴맛":3.0,"아로마":3.0,"부드러움":3.8}'::jsonb, true),

('오스카 블루스 데일스 페일 에일','American Pale Ale','에일','6.5%', 9,'#C47A2A','Oskar Blues','미국',
 ARRAY['#쌉싸름','#시트러스'],
 ARRAY['hop_herb','sour_citrus','malt_grain'],
 '{"단맛":2.0,"신맛":1.5,"쓴맛":3.5,"아로마":3.8,"부드러움":3.0}'::jsonb, true),

('앵커 리버티 에일','American Pale Ale','에일','5.9%', 9,'#C47A2A','Anchor Brewing','미국',
 ARRAY['#홉향','#클래식'],
 ARRAY['hop_flower','hop_herb','tex_dry'],
 '{"단맛":2.0,"신맛":1.5,"쓴맛":3.5,"아로마":4.0,"부드러움":3.0}'::jsonb, true),

('쓰리플로이즈 좀비 더스트','Pale Ale','에일','6.2%', 7,'#C9A227','3 Floyds Brewing','미국',
 ARRAY['#케스케이드홉','#레전드'],
 ARRAY['hop_flower','sour_citrus','tex_dry'],
 '{"단맛":2.0,"신맛":2.0,"쓴맛":4.0,"아로마":5.0,"부드러움":3.0}'::jsonb, true),

('제주 펠롱 에일', 'Pale Ale',        '에일', '5.3%',  8, '#C47A2A', '제주 맥주',       '대한민국',
 ARRAY['#제주감귤','#청량함'],
 ARRAY['sour_citrus','hop_flower','malt_grain'],
 '{"단맛":2.5,"신맛":2.0,"쓴맛":2.5,"아로마":3.5,"부드러움":3.5}'::jsonb, true),

('갈매기 페일 에일','Pale Ale',       '에일', '5.0%',  8, '#C47A2A', '갈매기 브루잉',   '대한민국',
 ARRAY['#홉향','#수제'],
 ARRAY['hop_herb','sour_citrus','malt_grain'],
 '{"단맛":2.2,"신맛":1.5,"쓴맛":3.0,"아로마":3.5,"부드러움":3.5}'::jsonb, true),

('플레이그라운드 페일 에일','Pale Ale','에일','5.0%', 8,'#C47A2A','플레이그라운드 브루어리','대한민국',
 ARRAY['#홉향','#균형잡힌'],
 ARRAY['hop_flower','hop_herb','malt_grain'],
 '{"단맛":2.2,"신맛":1.5,"쓴맛":3.0,"아로마":3.5,"부드러움":3.5}'::jsonb, true),

('곰표 페일 에일', 'Pale Ale',        '에일', '4.5%',  8, '#C47A2A', '세븐브로이',      '대한민국',
 ARRAY['#수제','#균형잡힌'],
 ARRAY['hop_herb','malt_grain','tex_dry'],
 '{"단맛":2.0,"신맛":1.5,"쓴맛":2.8,"아로마":3.0,"부드러움":3.5}'::jsonb, true),

-- ─── 벨기에 에일 추가 ──────────────────────────────────────

('로슈포르 8',     'Belgian Dubbel',  '에일', '9.2%', 24, '#6B3B1A', 'Brasserie de Rochefort','벨기에',
 ARRAY['#다크프룻','#향신료'],
 ARRAY['ferment_wine','sweet_caramel','ferment_spice'],
 '{"단맛":3.8,"신맛":1.5,"쓴맛":2.5,"아로마":4.2,"부드러움":3.5}'::jsonb, true),

('베스트말레 더블', 'Belgian Dubbel', '에일', '7.0%', 22, '#6B3B1A', 'Westmalle',       '벨기에',
 ARRAY['#다크프룻','#몰티한'],
 ARRAY['sweet_caramel','ferment_wine','malt_toast'],
 '{"단맛":3.5,"신맛":1.5,"쓴맛":2.0,"아로마":3.8,"부드러움":4.0}'::jsonb, true),

('델리리움 트레멘스','Belgian Golden Strong','에일','8.5%', 4,'#F0D050','Brouwerij Huyghe','벨기에',
 ARRAY['#트로피컬','#강한'],
 ARRAY['sweet_tropical','ferment_spice','hop_herb'],
 '{"단맛":3.0,"신맛":2.0,"쓴맛":2.5,"아로마":4.5,"부드러움":3.0}'::jsonb, true),

('델리리움 녹터넘','Belgian Dark Strong','에일','8.5%',27,'#5C2E0A','Brouwerij Huyghe','벨기에',
 ARRAY['#다크프룻','#복잡한'],
 ARRAY['ferment_wine','sweet_darkchoco','ferment_spice'],
 '{"단맛":4.0,"신맛":1.5,"쓴맛":2.0,"아로마":4.0,"부드러움":3.5}'::jsonb, true),

('세인트 버나두스 압트 12','Belgian Quadrupel','에일','10.0%',26,'#5C2E0A','St. Bernardus','벨기에',
 ARRAY['#강렬한','#다크프룻'],
 ARRAY['ferment_wine','sweet_darkchoco','sweet_caramel'],
 '{"단맛":4.2,"신맛":1.5,"쓴맛":2.0,"아로마":4.5,"부드러움":4.0}'::jsonb, true),

('굴든 드락',      'Belgian Golden Strong','에일','10.5%', 4,'#F0D050','Van Honsebrouck','벨기에',
 ARRAY['#강한','#황금색'],
 ARRAY['sweet_tropical','ferment_spice','ferment_wine'],
 '{"단맛":3.5,"신맛":2.0,"쓴맛":2.5,"아로마":4.5,"부드러움":2.5}'::jsonb, true),

('웨스트블레테런 12','Belgian Quadrupel','에일','10.2%',28,'#5C2E0A','Westvleteren','벨기에',
 ARRAY['#레전드','#다크프룻'],
 ARRAY['ferment_wine','sweet_darkchoco','sweet_caramel','ferment_spice'],
 '{"단맛":4.5,"신맛":1.5,"쓴맛":2.0,"아로마":5.0,"부드러움":4.5}'::jsonb, true),

('트리펠 카멜리트', 'Belgian Tripel', '에일', '8.4%',  5, '#F0D050', 'Brouwerij Bosteels','벨기에',
 ARRAY['#복잡한','#향신료'],
 ARRAY['ferment_spice','sweet_tropical','hop_flower'],
 '{"단맛":3.5,"신맛":2.0,"쓴맛":2.5,"아로마":4.5,"부드러움":3.0}'::jsonb, true),

('파울라너 살바토르','Doppelbock','에일','7.9%',20,'#8B4513','Paulaner','독일',
 ARRAY['#몰티한','#강한'],
 ARRAY['malt_toast','sweet_caramel','malt_grain'],
 '{"단맛":4.0,"신맛":0.5,"쓴맛":2.0,"아로마":4.0,"부드러움":4.0}'::jsonb, true),

('크바크',         'Belgian Amber',   '에일', '8.4%', 12, '#C47A2A', 'Brouwerij Bosteels','벨기에',
 ARRAY['#캐러멜','#클로버'],
 ARRAY['sweet_caramel','ferment_spice','malt_toast'],
 '{"단맛":3.5,"신맛":1.5,"쓴맛":2.0,"아로마":3.5,"부드러움":3.5}'::jsonb, true),

('그림베르겐 블론드','Belgian Blonde','에일','6.7%', 7,'#D4A217','Alken-Maes','벨기에',
 ARRAY['#부드러운','#황금색'],
 ARRAY['ferment_spice','sweet_caramel','tex_silky'],
 '{"단맛":2.8,"신맛":1.5,"쓴맛":2.0,"아로마":3.5,"부드러움":4.0}'::jsonb, true),

('마레드수 8',     'Belgian Dubbel',  '에일', '8.0%', 20, '#8B4513', 'Abbaye de Maredsous','벨기에',
 ARRAY['#다크프룻','#몰티한'],
 ARRAY['sweet_caramel','ferment_wine','malt_toast'],
 '{"단맛":3.5,"신맛":1.5,"쓴맛":2.0,"아로마":3.8,"부드러움":4.0}'::jsonb, true),


-- ============================================================
-- ④ 스타우트 추가  |  axes: 단맛 탄맛 몰티함 바디감 아로마
-- ─── Stout 추가 ───────────────────────────────────────────
-- ============================================================

('머피스 아이리시 스타우트','Dry Irish Stout','스타우트','4.0%',38,'#1A0505','Murphy''s Brewery','아일랜드',
 ARRAY['#크리미','#부드러운'],
 ARRAY['roast_coffee','tex_creamy','tex_silky'],
 '{"단맛":2.0,"탄맛":2.8,"몰티함":3.5,"바디감":3.8,"아로마":3.0}'::jsonb, true),

('파운더스 브렉퍼스트 스타우트','Imperial Oatmeal Stout','스타우트','8.3%',40,'#1A0505','Founders Brewing','미국',
 ARRAY['#커피','#아침'],
 ARRAY['roast_coffee','sweet_darkchoco','tex_creamy'],
 '{"단맛":3.0,"탄맛":4.5,"몰티함":5.0,"바디감":5.0,"아로마":5.0}'::jsonb, true),

('파운더스 KBS',   'Barrel-Aged Imperial Stout','스타우트','11.2%',40,'#1A0505','Founders Brewing','미국',
 ARRAY['#버번통숙성','#커피'],
 ARRAY['roast_coffee','sweet_darkchoco','ferment_wine','roast_char'],
 '{"단맛":3.5,"탄맛":4.5,"몰티함":5.0,"바디감":5.0,"아로마":5.0}'::jsonb, true),

('올드 라스푸틴', 'Russian Imperial Stout','스타우트','9.0%',40,'#1A0505','North Coast Brewing','미국',
 ARRAY['#임페리얼','#다크초콜릿'],
 ARRAY['sweet_darkchoco','roast_coffee','roast_char','ferment_wine'],
 '{"단맛":3.0,"탄맛":4.8,"몰티함":5.0,"바디감":5.0,"아로마":4.5}'::jsonb, true),

('레프트핸드 밀크 스타우트','Milk Stout','스타우트','6.0%',36,'#2C0A0A','Left Hand Brewing','미국',
 ARRAY['#크리미','#달콤한'],
 ARRAY['tex_creamy','sweet_darkchoco','roast_coffee'],
 '{"단맛":3.5,"탄맛":3.0,"몰티함":4.0,"바디감":4.5,"아로마":3.5}'::jsonb, true),

('미켈러 비어긱 브렉퍼스트','Oatmeal Stout','스타우트','7.5%',40,'#1A0505','Mikkeller','덴마크',
 ARRAY['#커피','#오트밀'],
 ARRAY['roast_coffee','sweet_darkchoco','tex_creamy'],
 '{"단맛":2.8,"탄맛":4.5,"몰티함":4.5,"바디감":5.0,"아로마":5.0}'::jsonb, true),

('구스 아일랜드 버번 카운티','Barrel-Aged Imperial Stout','스타우트','13.0%',40,'#1A0505','Goose Island','미국',
 ARRAY['#버번통숙성','#레전드'],
 ARRAY['roast_coffee','sweet_darkchoco','ferment_wine','roast_char'],
 '{"단맛":4.0,"탄맛":4.5,"몰티함":5.0,"바디감":5.0,"아로마":5.0}'::jsonb, true),

('알레스미스 스피드웨이 스타우트','Imperial Stout','스타우트','12.0%',40,'#1A0505','AleSmith Brewing','미국',
 ARRAY['#커피','#강렬한'],
 ARRAY['roast_coffee','sweet_darkchoco','roast_char'],
 '{"단맛":3.5,"탄맛":4.8,"몰티함":5.0,"바디감":5.0,"아로마":5.0}'::jsonb, true),

('덕래빗 밀크 스타우트','Milk Stout','스타우트','5.7%',38,'#2C0A0A','Duck-Rabbit Craft Brewery','미국',
 ARRAY['#크리미','#달콤한'],
 ARRAY['tex_creamy','sweet_darkchoco','roast_coffee'],
 '{"단맛":3.5,"탄맛":3.0,"몰티함":4.0,"바디감":4.5,"아로마":3.5}'::jsonb, true),

('브루클린 블랙 초콜릿 스타우트','Imperial Stout','스타우트','10.0%',40,'#1A0505','Brooklyn Brewery','미국',
 ARRAY['#초콜릿','#강렬한'],
 ARRAY['sweet_darkchoco','roast_coffee','roast_char'],
 '{"단맛":3.5,"탄맛":4.5,"몰티함":5.0,"바디감":5.0,"아로마":4.5}'::jsonb, true),

('텐 피프티',      'Imperial Stout',  '스타우트', '10.5%',40,'#1A0505','Oskar Blues','미국',
 ARRAY['#초콜릿','#커피'],
 ARRAY['sweet_darkchoco','roast_coffee','malt_toast'],
 '{"단맛":3.0,"탄맛":4.5,"몰티함":5.0,"바디감":5.0,"아로마":4.5}'::jsonb, true),

('제주 스타우트',  'Stout',           '스타우트', '5.0%', 36,'#2C0A0A','제주 맥주','대한민국',
 ARRAY['#초콜릿','#제주'],
 ARRAY['sweet_darkchoco','roast_coffee','tex_silky'],
 '{"단맛":2.5,"탄맛":3.5,"몰티함":4.0,"바디감":4.0,"아로마":3.5}'::jsonb, true),

('갈매기 스타우트', 'Stout',          '스타우트', '5.0%', 38,'#1A0505','갈매기 브루잉','대한민국',
 ARRAY['#커피','#수제'],
 ARRAY['roast_coffee','sweet_darkchoco','tex_silky'],
 '{"단맛":2.5,"탄맛":3.5,"몰티함":4.0,"바디감":4.0,"아로마":3.5}'::jsonb, true),

('크래프트브로스 임페리얼 스타우트','Imperial Stout','스타우트','10.0%',40,'#1A0505','크래프트브로스','대한민국',
 ARRAY['#강렬한','#다크초콜릿'],
 ARRAY['sweet_darkchoco','roast_coffee','roast_char'],
 '{"단맛":3.0,"탄맛":4.5,"몰티함":5.0,"바디감":5.0,"아로마":4.5}'::jsonb, true),

-- ─── Porter 추가 (category = 스타우트) ────────────────────

('파운더스 포터',  'American Porter', '스타우트', '6.5%',28,'#3C1510','Founders Brewing','미국',
 ARRAY['#초콜릿','#커피'],
 ARRAY['sweet_darkchoco','roast_coffee','malt_toast'],
 '{"단맛":3.0,"탄맛":3.5,"몰티함":4.0,"바디감":4.0,"아로마":4.0}'::jsonb, true),

('데슈츠 블랙 버트 포터','American Porter','스타우트','5.2%',30,'#2C0A08','Deschutes Brewery','미국',
 ARRAY['#초콜릿','#토피'],
 ARRAY['sweet_darkchoco','malt_toast','tex_silky'],
 '{"단맛":3.0,"탄맛":3.0,"몰티함":4.0,"바디감":3.8,"아로마":3.8}'::jsonb, true),

('그레이트레이크스 에드먼드 피츠제럴드','American Porter','스타우트','6.0%',32,'#2C0A08','Great Lakes Brewing','미국',
 ARRAY['#커피','#초콜릿'],
 ARRAY['roast_coffee','sweet_darkchoco','malt_toast'],
 '{"단맛":3.0,"탄맛":3.8,"몰티함":4.2,"바디감":4.0,"아로마":4.0}'::jsonb, true),

('코나 파이프라인 포터','Coffee Porter','스타우트','5.4%',30,'#2C0A08','Kona Brewing','미국',
 ARRAY['#커피','#코나'],
 ARRAY['roast_coffee','sweet_darkchoco','tex_silky'],
 '{"단맛":2.5,"탄맛":3.5,"몰티함":4.0,"바디감":4.0,"아로마":4.5}'::jsonb, true),

('스톤 스모크드 포터','Smoked Porter','스타우트','5.9%',32,'#2C0A08','Stone Brewing','미국',
 ARRAY['#스모키','#초콜릿'],
 ARRAY['roast_smoke','sweet_darkchoco','malt_toast'],
 '{"단맛":2.5,"탄맛":4.0,"몰티함":4.5,"바디감":4.0,"아로마":4.0}'::jsonb, true),

('플라잉독 곤조 임페리얼 포터','Imperial Porter','스타우트','7.8%',34,'#2C0A08','Flying Dog Brewery','미국',
 ARRAY['#임페리얼','#강한'],
 ARRAY['roast_coffee','sweet_darkchoco','ferment_wine'],
 '{"단맛":3.0,"탄맛":4.0,"몰티함":4.5,"바디감":4.5,"아로마":4.2}'::jsonb, true),

('지비에츠 발틱 포터','Baltic Porter','스타우트','9.0%',36,'#2C0A08','Żywiec','폴란드',
 ARRAY['#발틱','#다크프룻'],
 ARRAY['ferment_wine','sweet_darkchoco','roast_coffee'],
 '{"단맛":3.5,"탄맛":3.8,"몰티함":4.5,"바디감":4.5,"아로마":4.0}'::jsonb, true),

('제주 포터',      'Craft Porter',    '스타우트', '5.5%',28,'#3C1510','제주 맥주','대한민국',
 ARRAY['#초콜릿','#제주'],
 ARRAY['sweet_darkchoco','malt_toast','tex_silky'],
 '{"단맛":2.8,"탄맛":3.0,"몰티함":3.8,"바디감":3.8,"아로마":3.5}'::jsonb, true),

('갈매기 포터',    'Craft Porter',    '스타우트', '5.5%',30,'#2C0A08','갈매기 브루잉','대한민국',
 ARRAY['#커피','#수제'],
 ARRAY['roast_coffee','sweet_darkchoco','malt_toast'],
 '{"단맛":2.5,"탄맛":3.5,"몰티함":4.0,"바디감":4.0,"아로마":3.8}'::jsonb, true),

('곰표 흑맥주',    'Dark Lager',      '스타우트', '4.5%',28,'#3C1510','세븐브로이','대한민국',
 ARRAY['#흑맥주','#달콤한'],
 ARRAY['malt_toast','sweet_darkchoco','tex_silky'],
 '{"단맛":3.0,"탄맛":2.5,"몰티함":3.8,"바디감":3.5,"아로마":3.0}'::jsonb, true),

('말표 흑맥주',    'Dark Lager',      '스타우트', '4.5%',28,'#3C1510','코리아크래프트브류어리','대한민국',
 ARRAY['#흑맥주','#달콤한'],
 ARRAY['malt_toast','sweet_darkchoco','tex_silky'],
 '{"단맛":3.0,"탄맛":2.5,"몰티함":3.8,"바디감":3.5,"아로마":3.0}'::jsonb, true),

('코에도 시코쿠',  'Japanese Porter', '스타우트', '5.0%',30,'#2C0A08','Coedo Brewery','일본',
 ARRAY['#초콜릿','#부드러운'],
 ARRAY['sweet_darkchoco','malt_toast','tex_silky'],
 '{"단맛":3.0,"탄맛":3.0,"몰티함":4.0,"바디감":3.8,"아로마":3.5}'::jsonb, true),

('요호 도쿄 블랙', 'Japanese Porter', '스타우트', '5.0%',32,'#2C0A08','Yo-Ho Brewing','일본',
 ARRAY['#커피','#초콜릿'],
 ARRAY['roast_coffee','sweet_darkchoco','malt_toast'],
 '{"단맛":2.8,"탄맛":3.5,"몰티함":4.0,"바디감":4.0,"아로마":3.8}'::jsonb, true),


-- ============================================================
-- ⑤ 사워 추가  |  axes: 단맛 신맛 쓴맛 아로마 부드러움
-- ============================================================

-- Flanders Red Ale
('로덴바흐 그랑 크뤼','Flanders Red Ale','사워','6.0%',10,'#B87333','Brouwerij Rodenbach','벨기에',
 ARRAY['#와인','#새콤한'],
 ARRAY['sour_berry','ferment_wine','sour_citrus'],
 '{"단맛":2.0,"신맛":4.5,"쓴맛":1.0,"아로마":4.5,"부드러움":2.5}'::jsonb, true),

('뒤세스 드 부르고뉴','Flanders Red Ale','사워','6.2%',12,'#B87333','Brouwerij Verhaeghe','벨기에',
 ARRAY['#체리','#레드와인'],
 ARRAY['sour_berry','ferment_wine','sweet_caramel'],
 '{"단맛":2.5,"신맛":4.0,"쓴맛":0.8,"아로마":4.5,"부드러움":3.0}'::jsonb, true),

-- 구즈 / Gueuze
('분 우드 구즈',   'Gueuze',          '사워', '6.0%',  5, '#D4A835', 'Brouwerij Boon',  '벨기에',
 ARRAY['#드라이','#펑키'],
 ARRAY['sour_citrus','ferment_funky','sour_grape'],
 '{"단맛":1.5,"신맛":4.8,"쓴맛":1.0,"아로마":4.2,"부드러움":1.5}'::jsonb, true),

('쓰리 폰테이넨 구즈','Gueuze','사워','6.0%', 5,'#D4A835','3 Fonteinen','벨기에',
 ARRAY['#레전드','#람빅'],
 ARRAY['sour_citrus','ferment_funky','sour_grape'],
 '{"단맛":1.3,"신맛":5.0,"쓴맛":1.0,"아로마":4.5,"부드러움":1.5}'::jsonb, true),

('미켈러 스폰탄체리','Cherry Lambic','사워','7.0%', 8,'#B87333','Mikkeller','덴마크',
 ARRAY['#체리','#람빅'],
 ARRAY['sour_berry','ferment_funky','sour_citrus'],
 '{"단맛":2.0,"신맛":4.8,"쓴맛":1.0,"아로마":4.5,"부드러움":1.5}'::jsonb, true),

('칸티용 로제 드 감브리누스','Raspberry Lambic','사워','5.0%', 8,'#B87333','Cantillon','벨기에',
 ARRAY['#라즈베리','#드라이'],
 ARRAY['sour_berry','ferment_funky','sour_citrus'],
 '{"단맛":1.8,"신맛":4.8,"쓴맛":1.0,"아로마":4.5,"부드러움":1.5}'::jsonb, true),

-- American Wild / Barrel Aged Sour
('러시안 리버 서플리케이션','American Wild Ale','사워','7.0%',10,'#B87333','Russian River Brewing','미국',
 ARRAY['#체리','#오크'],
 ARRAY['sour_berry','ferment_funky','ferment_wine'],
 '{"단맛":2.0,"신맛":4.5,"쓴맛":1.0,"아로마":4.5,"부드러움":2.0}'::jsonb, true),

('러시안 리버 컨세크레이션','American Wild Ale','사워','10.0%',12,'#B87333','Russian River Brewing','미국',
 ARRAY['#커런트','#오크'],
 ARRAY['sour_berry','ferment_wine','ferment_funky'],
 '{"단맛":2.5,"신맛":4.5,"쓴맛":1.5,"아로마":4.5,"부드러움":2.0}'::jsonb, true),

-- Gose 추가
('웨스트브룩 고제','Gose','사워','4.0%', 4,'#F0D870','Westbrook Brewing','미국',
 ARRAY['#짭짤한','#레몬'],
 ARRAY['sour_citrus','tex_dry'],
 '{"단맛":1.5,"신맛":4.2,"쓴맛":0.3,"아로마":3.0,"부드러움":3.0}'::jsonb, true),

('분 크릭',        'Kriek',           '사워', '4.0%',  8, '#B87333', 'Brouwerij Boon',  '벨기에',
 ARRAY['#체리','#드라이'],
 ARRAY['sour_berry','ferment_funky'],
 '{"단맛":2.0,"신맛":4.5,"쓴맛":0.8,"아로마":4.2,"부드러움":2.0}'::jsonb, true),

-- 한국 크래프트 사워
('제주 감귤 사워',  'Fruited Sour Ale','사워','4.5%', 4,'#F0D870','제주 맥주','대한민국',
 ARRAY['#감귤','#제주'],
 ARRAY['sour_citrus','sweet_tropical','tex_watery'],
 '{"단맛":3.0,"신맛":4.2,"쓴맛":0.3,"아로마":4.0,"부드러움":3.0}'::jsonb, true),

('갈매기 사워',    'Sour Ale',        '사워', '4.5%',  4, '#F0D870', '갈매기 브루잉',   '대한민국',
 ARRAY['#산미','#수제'],
 ARRAY['sour_citrus','tex_watery'],
 '{"단맛":2.0,"신맛":4.0,"쓴맛":0.5,"아로마":3.5,"부드러움":3.0}'::jsonb, true),

('크래프트브로스 체리 사워','Fruited Sour','사워','5.0%', 7,'#B87333','크래프트브로스','대한민국',
 ARRAY['#체리','#수제'],
 ARRAY['sour_berry','sour_citrus'],
 '{"단맛":2.5,"신맛":4.2,"쓴맛":0.5,"아로마":3.8,"부드러움":2.8}'::jsonb, true),

('아트몬스터 유자 사워','Yuzu Sour','사워','4.5%', 3,'#F5E080','아트몬스터 브루잉','대한민국',
 ARRAY['#유자','#산미'],
 ARRAY['sour_citrus','sweet_tropical','tex_watery'],
 '{"단맛":2.8,"신맛":4.5,"쓴맛":0.3,"아로마":4.2,"부드러움":3.5}'::jsonb, true),

-- 아시아 사워
('히타치노 유자 사워','Yuzu Sour Ale','사워','4.5%', 3,'#F5E080','Kiuchi Brewery','일본',
 ARRAY['#유자','#레몬'],
 ARRAY['sour_citrus','sweet_tropical'],
 '{"단맛":2.5,"신맛":4.2,"쓴맛":0.3,"아로마":4.2,"부드러움":3.5}'::jsonb, true),

('타이후 패션프루츠 사워','Fruited Sour','사워','4.5%', 3,'#F5E080','Taihu Brewing','대만',
 ARRAY['#패션프루츠','#열대'],
 ARRAY['sweet_tropical','sour_citrus','tex_watery'],
 '{"단맛":3.5,"신맛":4.5,"쓴맛":0.3,"아로마":4.5,"부드러움":3.0}'::jsonb, true),

-- Berliner Weisse 추가
('어메이징브루잉 베를리너 바이세','Berliner Weisse','사워','3.5%', 3,'#F5E080','어메이징브루잉','대한민국',
 ARRAY['#산미','#가벼운'],
 ARRAY['sour_citrus','tex_watery','sour_yogurt'],
 '{"단맛":1.5,"신맛":4.2,"쓴맛":0.3,"아로마":2.8,"부드러움":3.5}'::jsonb, true),

('뉴 벨지엄 레이밍 고제','Gose','사워','4.2%', 4,'#F0D870','New Belgium Brewing','미국',
 ARRAY['#짭짤한','#라임'],
 ARRAY['sour_citrus','tex_dry'],
 '{"단맛":2.0,"신맛":4.2,"쓴맛":0.3,"아로마":3.2,"부드러움":3.0}'::jsonb, true);
