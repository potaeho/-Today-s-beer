// 맥주 profile 기반 더미 리뷰 자동 생성
// beer.name을 시드로 사용 → 같은 맥주는 항상 같은 리뷰

import { PROFILE_AXES, HASHTAG_MAP } from "./beerData";

const MY_USER_NAME   = "홉덕후";
const MY_USER_AVATAR = "🍺";

const DUMMY_USERS = [
  { user: "맥주여행자",    avatar: "✈️" },
  { user: "크래프트마니아", avatar: "🎨" },
  { user: "맥주초보",      avatar: "🌱" },
  { user: "여름맥주러",    avatar: "☀️" },
  { user: "위트에일팬",    avatar: "🌾" },
  { user: "스타우트러버",  avatar: "☕" },
  { user: "사워에일러",    avatar: "🍋" },
  { user: "필스너마스터",  avatar: "🏆" },
  { user: "벨기에스타일",  avatar: "🇧🇪" },
  { user: "과일맥주팬",    avatar: "🥭" },
  { user: "다크맥주탐험가", avatar: "🌑" },
  { user: "바텐더킴",      avatar: "🍻" },
  { user: "맥주소믈리에",  avatar: "🎩" },
  { user: "홈브루어",      avatar: "🔬" },
  { user: "치킨앤비어",    avatar: "🍗" },
  { user: "맥주여신",      avatar: "👸" },
  { user: "주말브루어",    avatar: "🛖" },
  { user: "홉탐험가",      avatar: "🌿" },
  { user: "람빅러버",      avatar: "🍷" },
  { user: "임페리얼덕후",  avatar: "👑" },
];

// 홉덕후 본인 코멘트 풀 (카테고리별)
const MY_COMMENTS = {
  라거: [
    (b) => `${b.name} 청량감이 기대 이상이에요. 더운 날 최고의 선택`,
    (b) => `${b.name} 마실수록 깔끔한 피니시가 마음에 들어요`,
    ()  => `라거 중에 이만한 게 없는 것 같아요. 균형감 최고`,
    ()  => `홉 쓴맛이 적당해서 부담 없이 즐길 수 있어요`,
    ()  => `드라이한 마무리가 일품이에요. 식사와 잘 어울려요`,
  ],
  IPA: [
    (b) => `${b.name} 홉향 정말 인상적이에요. 시트러스 + 레진 조합`,
    (b) => `${b.name} 마실수록 매력이 넘쳐요. 역시 IPA는 이맛`,
    ()  => `쓴맛이 강하지만 뒤에 오는 과일향이 절묘해요`,
    ()  => `헤이지 스타일 좋아하는 분께 강추. 홉향만 즐길 수 있어요`,
    ()  => `ABV가 높은데도 술술 넘어가서 위험해요 😅`,
  ],
  에일: [
    (b) => `${b.name} 에일 입문용으로 완벽해요. 부드럽고 향도 좋아요`,
    (b) => `${b.name} 오렌지필 + 바나나 향 조합이 이렇게 잘 어울릴 줄이야`,
    ()  => `목넘김이 부드러워서 여성분들도 좋아할 것 같아요`,
    ()  => `벨기에 효모향이 은은하게 올라와서 기분 좋아지는 맥주`,
    ()  => `달콤한 몰트향 + 플로럴 홉 조합. 에일의 정수`,
  ],
  스타우트: [
    (b) => `${b.name} 다크초콜릿 + 커피 조합이 완벽해요. 겨울에 딱`,
    (b) => `${b.name} 크리미한 질감이 인상적이에요. 스타우트는 이래야 해`,
    ()  => `로스팅 향이 진하게 나는데 전혀 거슬리지 않아요`,
    ()  => `묵직한 바디감이 디저트 대용이에요. 칼로리 폭탄이지만`,
    ()  => `임페리얼 스타우트치고 알코올이 잘 안 느껴져요. 무서운 맥주`,
  ],
  사워: [
    (b) => `${b.name} 새콤달콤 균형이 절묘해요. 완전 취향저격`,
    (b) => `${b.name} 처음엔 너무 셔서 당황했는데 결국 한 캔 더 땄어요`,
    ()  => `람빅 스타일은 처음인데 이렇게 맛있을 줄 몰랐어요`,
    ()  => `과일향이 맥주인지 주스인지 구분이 안 가요. 좋은 의미로`,
    ()  => `산미가 강한데 뒤에 오는 단맛이 딱 적당해요`,
  ],
};

const COMMENTS = {
  라거: [
    (b) => `${b.name} 특유의 청량감이 최고예요. 더운 날엔 무조건 이거`,
    ()  => `목넘김이 부드럽고 깔끔해요. 식사 중에 마시기 딱`,
    ()  => `치킨이랑 먹으면 배가 두 배로 맛있어요. 강추`,
    ()  => `쓴맛이 강하지 않아서 맥주 입문자한테 추천해요`,
    ()  => `탄산감이 적당해서 부담없이 마실 수 있어요`,
    (b) => `${b.brewery || '이 브루어리'} 맥주 처음 마셔봤는데 생각보다 좋아요`,
    ()  => `퇴근 후 한 캔 하기 딱 좋은 맥주`,
    ()  => `몰트향이 은은하게 나서 고소한 느낌이에요`,
    ()  => `청량감 하나는 진짜 인정. 갈증 해소 최고`,
    ()  => `드라이하게 떨어지는 피니시가 인상적이에요`,
    ()  => `가성비 최고예요. 이 가격에 이 맛이면 충분`,
    ()  => `국산 라거 중에 이게 제일 맛있는 것 같아요`,
  ],
  IPA: [
    (b) => `${b.name} 홉향 진짜 강렬해요. 홉덕후 필수 구매`,
    ()  => `시트러스 향이 코끝에서 폭발해요. 상쾌함 최고`,
    ()  => `쓴맛이 강하지만 뒤에 오는 과일향이 중독성 있어요`,
    ()  => `IPA 중에서 이렇게 균형잡힌 건 처음인 것 같아요`,
    ()  => `홉 레진 향이 오래 남아요. 여운이 길어서 좋음`,
    ()  => `헤이지 스타일 특유의 부드러움이 좋아요. 쓴맛 없이 홉향만`,
    ()  => `퇴근 후 스트레스 풀기 딱 좋은 강도예요`,
    (b) => `${b.abv} ABV인데 술술 넘어가요. 위험한 맥주`,
    ()  => `열대과일 뉘앙스가 은은하게 올라와서 마실수록 좋아요`,
    ()  => `홉 포워드인데 몰트 베이스가 잘 받쳐줘서 균형감 훌륭`,
    ()  => `웨스트코스트 스타일인데 부드러운 편이에요. 입문용 IPA로 딱`,
    ()  => `IBU가 높은데도 전혀 거북하지 않아요. 신기해`,
  ],
  에일: [
    ()  => `플로럴 향이 은은하게 나서 기분 좋아지는 맥주예요`,
    ()  => `목넘김이 너무 부드러워요. 여성분들 강추`,
    ()  => `바나나 + 정향 조합이 이렇게 잘 어울릴 줄이야`,
    ()  => `오렌지필 향이 진짜예요. 상큼하고 깔끔`,
    (b) => `${b.name}는 에일 입문용으로 추천해요`,
    ()  => `달콤한 몰트향이 기분 좋게 퍼져요. 디저트 같은 맥주`,
    ()  => `벨기에 스타일 특유의 효모향이 매력적이에요`,
    ()  => `탄산이 풍부해서 청량감도 있고 향도 좋고 최고`,
    ()  => `과일향과 홉향 밸런스가 완벽해요. 두 캔 마셨어요`,
    ()  => `처음엔 낯설었는데 마실수록 매력 있는 맥주예요`,
    ()  => `트리플 스타일 특유의 과일향 + 스파이시함이 매력`,
    ()  => `페일 에일치고 몰트감이 풍부해서 의외로 든든해요`,
  ],
  스타우트: [
    ()  => `다크초콜릿 + 커피 조합 진짜 완벽해요`,
    ()  => `로스티드 커피향 가득. 밤에 혼술하기 딱`,
    ()  => `묵직한 바디감이 디저트 대신이에요. 배부름`,
    ()  => `처음엔 강해 보이는데 마시다 보면 중독됨`,
    (b) => `${b.name} 겨울에 마시면 훨씬 더 맛있을 것 같아요`,
    ()  => `크리미한 거품이 오래 유지돼요. 질감이 특이해서 좋음`,
    ()  => `스모키함이 처음엔 낯설었는데 마실수록 매력있어요`,
    ()  => `임페리얼 스타우트치고 알코올 티가 잘 안 나요`,
    ()  => `식후 디저트 맥주로 딱이에요. 달달하고 진해서 만족`,
    ()  => `기네스보다 바디감 있어요. 스타우트 좋아하면 강추`,
    ()  => `오트밀 덕분에 정말 크리미해요. 스타우트 중 최고`,
    ()  => `발틱 포터 스타일이라 라거처럼 깔끔한 피니시예요`,
  ],
  사워: [
    ()  => `새콤달콤 과일 폭탄! 기분 전환 최고예요`,
    ()  => `맥주인지 주스인지 헷갈릴 만큼 과일향이 진해요`,
    ()  => `신맛 좋아하면 진짜 취향저격이에요`,
    (b) => `${b.name} 처음엔 너무 셔서 당황했는데 중독됐어요`,
    ()  => `람빅 스타일은 처음인데 이렇게 맛있을 줄 몰랐어요`,
    ()  => `여름 야외에서 마시면 완전 꿀조합이에요`,
    ()  => `산미가 강한데 뒤에 오는 단맛이 절묘해요`,
    ()  => `맥주 싫어하는 친구한테 추천했더니 좋아하더라고요`,
    ()  => `와일드 에일 특유의 펑키함이 오히려 매력적이에요`,
    ()  => `신맛과 단맛의 균형이 절묘해요. 질리지 않아`,
    ()  => `고제 스타일 짭짤한 뒷맛이 신기하면서 맛있어요`,
    ()  => `베를리너 바이세 특유의 가벼운 산미가 좋아요`,
  ],
};

// djb2 해시 → 양수 시드
function strHash(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(h, 31) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

// 선형 합동 생성기
function makeRng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

// 날짜 생성 (최근 60일 이내, 정렬 내림차순)
function makeDates(rng, count) {
  const dates = [];
  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(rng() * 56) + 1;
    const d = new Date(2026, 5, 12);
    d.setDate(d.getDate() - daysAgo);
    dates.push(
      `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`
    );
  }
  return dates.sort().reverse();
}

export function generateDummyReviews(beer) {
  if (!beer?.name) return [];

  const rng    = makeRng(strHash(beer.name));
  const count  = 4 + Math.floor(rng() * 4); // 4~7개
  const axes   = PROFILE_AXES[beer.category] || PROFILE_AXES["에일"];
  const pool   = COMMENTS[beer.category]     || COMMENTS["에일"];
  const myPool = MY_COMMENTS[beer.category]  || MY_COMMENTS["에일"];
  const dates  = makeDates(makeRng(strHash(beer.name + "d")), count);

  // 35% 확률로 홉덕후 isMe 리뷰 포함 (해시 기반 → 항상 동일)
  const includeMyReview = (strHash(beer.name + "isMe") % 20) < 7;

  const usedUsers = new Set();
  const reviews   = [];
  const starBases = [4, 4, 4, 5, 5, 3];
  const baseStar  = starBases[Math.floor(rng() * starBases.length)];

  for (let i = 0; i < count; i++) {
    const isMe = (i === 0 && includeMyReview);

    let user, avatar;
    if (isMe) {
      user   = MY_USER_NAME;
      avatar = MY_USER_AVATAR;
      usedUsers.add(-1);
    } else {
      let uIdx, tries = 0;
      do {
        uIdx = Math.floor(rng() * DUMMY_USERS.length);
        tries++;
      } while (usedUsers.has(uIdx) && tries < 20);
      usedUsers.add(uIdx);
      user   = DUMMY_USERS[uIdx].user;
      avatar = DUMMY_USERS[uIdx].avatar;
    }

    const delta = [-1, 0, 0, 0, 1][Math.floor(rng() * 5)];
    const star  = isMe
      ? Math.min(5, Math.max(4, baseStar + delta))
      : Math.min(5, Math.max(2, baseStar + delta));

    const profile = {};
    axes.forEach((axis) => {
      const base = typeof (beer.profile || {})[axis] === "number" ? beer.profile[axis] : 2.5;
      const v = base + (rng() - 0.5) * 1.6;
      profile[axis] = Math.round(Math.min(5, Math.max(0, v)) * 10) / 10;
    });

    const commentPool = isMe ? myPool : pool;
    const commentIdx  = Math.floor(rng() * commentPool.length);
    const comment     = commentPool[commentIdx](beer);

    const tags    = (beer.hashtags || []).filter((id) => HASHTAG_MAP[id]).slice(0, 3);
    const numTags = tags.length > 0 ? 1 + Math.floor(rng() * Math.min(2, tags.length)) : 0;
    const startT  = Math.floor(rng() * Math.max(1, tags.length));
    const hashtags = tags.length > 0
      ? Array.from({ length: numTags }, (_, j) => tags[(startT + j) % tags.length])
      : [];

    reviews.push({
      id: i + 1,
      user, avatar,
      date: dates[i],
      profile, hashtags, star, comment,
      ...(isMe ? { isMe: true } : {}),
    });
  }

  return reviews;
}

// 전체 맥주 목록 중 홉덕후가 리뷰한 더미 맥주 반환
export function getMyDummyReviewedBeers(beerList = []) {
  return beerList
    .map((beer) => {
      const reviews = generateDummyReviews(beer);
      const mine    = reviews.find((r) => r.isMe);
      return mine ? { ...mine, beer } : null;
    })
    .filter(Boolean);
}
