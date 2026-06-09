// 맥주 1잔 = 500ml 기준
export const ML_PER_BEER = 500;

// ml 기준으로 정렬 (오름차순)
export const LEVELS = [
  {
    level: 1,
    name: "식당 맥주잔",
    nameEn: "Korean Bar Glass",
    minMl: 0,
    icon: "🍺",
    desc: "225ml · 고깃집 소맥의 황금비율 잔",
    color: "#FEF3C7",
  },
  {
    level: 2,
    name: "표준 캔",
    nameEn: "Standard Can",
    minMl: 355,
    icon: "🥫",
    desc: "355ml · 전 세계 표준 캔 규격",
    color: "#D1FAE5",
  },
  {
    level: 3,
    name: "500ml 캔",
    nameEn: "Korean Pint",
    minMl: 500,
    icon: "🍺",
    desc: "500ml · 편의점 4캔의 주인공",
    color: "#FFEDD5",
  },
  {
    level: 4,
    name: "마스 (Maß)",
    nameEn: "Oktoberfest Maß",
    minMl: 1000,
    icon: "🏆",
    desc: "1,000ml · 옥토버페스트 1L 조끼",
    color: "#FEF3C7",
  },
  {
    level: 5,
    name: "대용량 페트",
    nameEn: "PET Bottle",
    minMl: 1600,
    icon: "🧴",
    desc: "1.6L · 캠핑·홈파티용 마트 피처",
    color: "#ECFDF5",
  },
  {
    level: 6,
    name: "수제맥주 케그",
    nameEn: "Craft Keg",
    minMl: 20000,
    icon: "🛢️",
    desc: "20L · 브루어리에서 펍으로 유통되는 통",
    color: "#FFF7ED",
  },
  {
    level: 7,
    name: "호프집 케그",
    nameEn: "Bar Keg",
    minMl: 30000,
    icon: "🪣",
    desc: "30L · 동네 호프집 싱크대 밑 생맥주통",
    color: "#F0F9FF",
  },
  {
    level: 8,
    name: "헥토리터",
    nameEn: "Hectoliter",
    minMl: 100000,
    icon: "🏭",
    desc: "100L = 500ml 캔 200개 · 유럽 표준",
    color: "#F0FDF4",
  },
  {
    level: 9,
    name: "양조 배럴",
    nameEn: "US Barrel",
    minMl: 117300,
    icon: "🏗️",
    desc: "117.3L · 양조장 생산량 측정 기준 단위",
    color: "#FDF4FF",
  },
  {
    level: 10,
    name: "맥주 탱크로리",
    nameEn: "Tank Truck",
    minMl: 20000000,
    icon: "🚚",
    desc: "20,000L · 공장에서 원액 실어 나르는 유조차",
    color: "#FFF1F2",
  },
  {
    level: 11,
    name: "공장 저장 탱크",
    nameEn: "Factory Tank",
    minMl: 500000000,
    icon: "🏙️",
    desc: "500,000L · 1기에서 캔 100만 개가 나오는 탱크",
    color: "#EFF6FF",
  },
];

export function getCurrentLevel(ratedCount) {
  const totalMl = ratedCount * ML_PER_BEER;

  let current = LEVELS[0];
  let nextIndex = 1;

  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalMl >= LEVELS[i].minMl) {
      current = LEVELS[i];
      nextIndex = i + 1;
      break;
    }
  }

  const next = LEVELS[nextIndex] || null;

  const progress = next
    ? (totalMl - current.minMl) / (next.minMl - current.minMl)
    : 1;

  return { current, next, progress, totalMl };
}

export function formatMl(ml) {
  if (ml >= 1000000000) return `${(ml / 1000000000).toFixed(1)}kL`;
  if (ml >= 1000000) return `${(ml / 1000000).toFixed(0)}kL`;
  if (ml >= 1000) return `${(ml / 1000).toFixed(1)}L`;
  return `${ml}ml`;
}

export function formatNextMl(ml) {
  if (ml >= 1000000) return `${(ml / 1000000).toFixed(0)}kL`;
  if (ml >= 1000) return `${(ml / 1000).toFixed(1)}L`;
  return `${ml}ml`;
}
