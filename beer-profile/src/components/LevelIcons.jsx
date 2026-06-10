// 레벨별 맥주 용기 SVG 아이콘

export function IconBarGlass() {  // Lv.1 식당 맥주잔 225ml
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <rect x="18" y="8" width="20" height="28" rx="3" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2"/>
      <rect x="18" y="8" width="20" height="8" rx="3" fill="#FBBF24"/>
      <line x1="22" y1="20" x2="22" y2="33" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="27" y1="20" x2="27" y2="33" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round"/>
      <rect x="15" y="36" width="26" height="4" rx="2" fill="#D97706"/>
      <path d="M38 12 Q44 12 44 18 Q44 24 38 24" stroke="#F59E0B" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function IconStandardCan() {  // Lv.2 표준 캔 355ml
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <rect x="17" y="12" width="22" height="30" rx="4" fill="#6EE7B7" stroke="#059669" strokeWidth="2"/>
      <rect x="17" y="12" width="22" height="6" rx="4" fill="#34D399"/>
      <rect x="17" y="36" width="22" height="6" rx="4" fill="#34D399"/>
      <rect x="22" y="6" width="12" height="6" rx="3" fill="#6EE7B7" stroke="#059669" strokeWidth="1.5"/>
      <circle cx="28" cy="9" r="2" fill="#059669"/>
      <text x="28" y="28" textAnchor="middle" fontSize="7" fontWeight="700" fill="#065F46" fontFamily="sans-serif">355</text>
      <text x="28" y="35" textAnchor="middle" fontSize="5" fill="#065F46" fontFamily="sans-serif">ml</text>
    </svg>
  );
}

export function IconPintCan() {  // Lv.3 500ml 캔
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <rect x="16" y="10" width="24" height="34" rx="4" fill="#FED7AA" stroke="#EA580C" strokeWidth="2"/>
      <rect x="16" y="10" width="24" height="7" rx="4" fill="#FB923C"/>
      <rect x="16" y="37" width="24" height="7" rx="4" fill="#FB923C"/>
      <rect x="21" y="4" width="14" height="6" rx="3" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.5"/>
      <circle cx="28" cy="7" r="2.5" fill="#EA580C"/>
      <text x="28" y="29" textAnchor="middle" fontSize="8" fontWeight="800" fill="#7C2D12" fontFamily="sans-serif">500</text>
      <text x="28" y="36" textAnchor="middle" fontSize="5" fill="#7C2D12" fontFamily="sans-serif">ml</text>
    </svg>
  );
}

export function IconMass() {  // Lv.4 마스 1L
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <rect x="10" y="10" width="28" height="36" rx="4" fill="#FEF3C7" stroke="#D97706" strokeWidth="2"/>
      <rect x="10" y="10" width="28" height="10" rx="4" fill="#FDE68A"/>
      <path d="M38 18 Q47 18 47 26 Q47 34 38 34" stroke="#D97706" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <rect x="10" y="38" width="28" height="8" rx="3" fill="#D97706" opacity="0.4"/>
      <line x1="16" y1="24" x2="16" y2="37" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="22" y1="24" x2="22" y2="37" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round"/>
      <text x="24" y="33" textAnchor="middle" fontSize="7" fontWeight="800" fill="#92400E" fontFamily="sans-serif">1L</text>
    </svg>
  );
}

export function IconPETBottle() {  // Lv.5 대용량 페트 1.6L
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <rect x="20" y="4" width="16" height="5" rx="2.5" fill="#A7F3D0" stroke="#059669" strokeWidth="1.5"/>
      <path d="M18 12 Q14 14 14 20 L14 44 Q14 48 20 48 L36 48 Q42 48 42 44 L42 20 Q42 14 38 12 Z" fill="#D1FAE5" stroke="#059669" strokeWidth="2"/>
      <path d="M14 20 Q14 14 18 12 L38 12 Q42 14 42 20" fill="#A7F3D0"/>
      <text x="28" y="32" textAnchor="middle" fontSize="8" fontWeight="800" fill="#065F46" fontFamily="sans-serif">1.6L</text>
    </svg>
  );
}

export function IconCraftKeg() {  // Lv.6 수제맥주 케그 20L
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <ellipse cx="28" cy="14" rx="16" ry="5" fill="#FED7AA" stroke="#EA580C" strokeWidth="2"/>
      <rect x="12" y="14" width="32" height="26" fill="#FED7AA" stroke="#EA580C" strokeWidth="2"/>
      <ellipse cx="28" cy="40" rx="16" ry="5" fill="#FED7AA" stroke="#EA580C" strokeWidth="2"/>
      <line x1="12" y1="22" x2="44" y2="22" stroke="#EA580C" strokeWidth="1.5"/>
      <line x1="12" y1="32" x2="44" y2="32" stroke="#EA580C" strokeWidth="1.5"/>
      <circle cx="28" cy="27" r="5" fill="#EA580C" opacity="0.7"/>
      <text x="28" y="30" textAnchor="middle" fontSize="6" fontWeight="800" fill="white" fontFamily="sans-serif">20L</text>
    </svg>
  );
}

export function IconBarKeg() {  // Lv.7 호프집 케그 30L
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <ellipse cx="28" cy="12" rx="18" ry="6" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2"/>
      <rect x="10" y="12" width="36" height="30" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2"/>
      <ellipse cx="28" cy="42" rx="18" ry="6" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2"/>
      <line x1="10" y1="22" x2="46" y2="22" stroke="#0284C7" strokeWidth="1.5"/>
      <line x1="10" y1="32" x2="46" y2="32" stroke="#0284C7" strokeWidth="1.5"/>
      <circle cx="28" cy="27" r="6" fill="#0284C7" opacity="0.7"/>
      <text x="28" y="30" textAnchor="middle" fontSize="6" fontWeight="800" fill="white" fontFamily="sans-serif">30L</text>
      <rect x="34" y="39" width="6" height="10" rx="2" fill="#0284C7"/>
    </svg>
  );
}

export function IconHectoliter() {  // Lv.8 헥토리터 100L
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <ellipse cx="28" cy="10" rx="20" ry="6" fill="#E9D5FF" stroke="#7C3AED" strokeWidth="2"/>
      <rect x="8" y="10" width="40" height="34" fill="#E9D5FF" stroke="#7C3AED" strokeWidth="2"/>
      <ellipse cx="28" cy="44" rx="20" ry="6" fill="#E9D5FF" stroke="#7C3AED" strokeWidth="2"/>
      <line x1="8" y1="20" x2="48" y2="20" stroke="#7C3AED" strokeWidth="1.5"/>
      <line x1="8" y1="34" x2="48" y2="34" stroke="#7C3AED" strokeWidth="1.5"/>
      <text x="28" y="30" textAnchor="middle" fontSize="8" fontWeight="800" fill="#4C1D95" fontFamily="sans-serif">100L</text>
    </svg>
  );
}

export function IconUSBarrel() {  // Lv.9 양조 배럴 117L
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <ellipse cx="28" cy="10" rx="18" ry="5" fill="#FCA5A5" stroke="#DC2626" strokeWidth="2"/>
      <path d="M10 10 Q6 27 10 44 L46 44 Q50 27 46 10 Z" fill="#FCA5A5" stroke="#DC2626" strokeWidth="2"/>
      <ellipse cx="28" cy="44" rx="18" ry="5" fill="#FCA5A5" stroke="#DC2626" strokeWidth="2"/>
      <line x1="9" y1="19" x2="47" y2="19" stroke="#DC2626" strokeWidth="1.5"/>
      <line x1="7" y1="27" x2="49" y2="27" stroke="#DC2626" strokeWidth="2"/>
      <line x1="9" y1="35" x2="47" y2="35" stroke="#DC2626" strokeWidth="1.5"/>
      <text x="28" y="30" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#7F1D1D" fontFamily="sans-serif">117L</text>
    </svg>
  );
}

export function IconTankTruck() {  // Lv.10 맥주 탱크로리 20,000L
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      {/* 탱크 몸체 */}
      <ellipse cx="30" cy="22" rx="18" ry="12" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2"/>
      <rect x="12" y="22" width="36" height="12" fill="#FEE2E2"/>
      <line x1="12" y1="22" x2="12" y2="34" stroke="#EF4444" strokeWidth="2"/>
      <line x1="48" y1="22" x2="48" y2="34" stroke="#EF4444" strokeWidth="2"/>
      <ellipse cx="30" cy="34" rx="18" ry="6" fill="#FECACA" stroke="#EF4444" strokeWidth="2"/>
      {/* 바퀴 */}
      <circle cx="18" cy="42" r="5" fill="#374151" stroke="#1F2937" strokeWidth="1.5"/>
      <circle cx="18" cy="42" r="2" fill="#6B7280"/>
      <circle cx="38" cy="42" r="5" fill="#374151" stroke="#1F2937" strokeWidth="1.5"/>
      <circle cx="38" cy="42" r="2" fill="#6B7280"/>
      {/* 운전석 */}
      <rect x="4" y="26" width="10" height="14" rx="2" fill="#FECACA" stroke="#EF4444" strokeWidth="1.5"/>
      <rect x="5" y="28" width="8" height="5" rx="1" fill="#BAE6FD"/>
      <circle cx="7" cy="42" r="4" fill="#374151" stroke="#1F2937" strokeWidth="1.5"/>
      <circle cx="7" cy="42" r="1.5" fill="#6B7280"/>
    </svg>
  );
}

export function IconFactoryTank() {  // Lv.11 공장 저장 탱크 500,000L
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      {/* 메인 탱크 */}
      <ellipse cx="28" cy="8" rx="16" ry="5" fill="#BFDBFE" stroke="#2563EB" strokeWidth="2"/>
      <rect x="12" y="8" width="32" height="36" fill="#BFDBFE" stroke="#2563EB" strokeWidth="2"/>
      <ellipse cx="28" cy="44" rx="16" ry="5" fill="#BFDBFE" stroke="#2563EB" strokeWidth="2"/>
      {/* 가로 밴드 */}
      <line x1="12" y1="18" x2="44" y2="18" stroke="#2563EB" strokeWidth="1.5"/>
      <line x1="12" y1="28" x2="44" y2="28" stroke="#2563EB" strokeWidth="1.5"/>
      <line x1="12" y1="38" x2="44" y2="38" stroke="#2563EB" strokeWidth="1.5"/>
      {/* 파이프 */}
      <rect x="24" y="44" width="8" height="8" fill="#2563EB"/>
      <rect x="20" y="50" width="16" height="4" rx="2" fill="#1D4ED8"/>
      {/* 돔 */}
      <ellipse cx="28" cy="8" rx="8" ry="3" fill="#93C5FD"/>
      <rect x="26" y="3" width="4" height="5" rx="1" fill="#1D4ED8"/>
      <text x="28" y="35" textAnchor="middle" fontSize="5.5" fontWeight="800" fill="#1E3A8A" fontFamily="sans-serif">500kL</text>
    </svg>
  );
}

export const LEVEL_ICONS = [
  IconBarGlass,
  IconStandardCan,
  IconPintCan,
  IconMass,
  IconPETBottle,
  IconCraftKeg,
  IconBarKeg,
  IconHectoliter,
  IconUSBarrel,
  IconTankTruck,
  IconFactoryTank,
];
