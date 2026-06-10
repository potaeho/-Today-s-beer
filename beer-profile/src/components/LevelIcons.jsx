// 레벨별 맥주 용기 — 사실적 SVG 아이콘 (그라디언트 + 하이라이트)

export function IconBarGlass() {  // Lv.1 식당 맥주잔 — Pasabahce 필스너 스타일
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="l1beer" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8C5008"/>
          <stop offset="30%" stopColor="#DFA020"/>
          <stop offset="58%" stopColor="#F5C030"/>
          <stop offset="100%" stopColor="#A06010"/>
        </linearGradient>
        <linearGradient id="l1glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.58)"/>
          <stop offset="22%" stopColor="rgba(255,255,255,0.07)"/>
          <stop offset="78%" stopColor="rgba(255,255,255,0.04)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0.35)"/>
        </linearGradient>
        <linearGradient id="l1base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(200,160,60,0.4)"/>
          <stop offset="100%" stopColor="rgba(160,120,40,0.15)"/>
        </linearGradient>
      </defs>

      {/* Glass shape — pilsner: slightly narrower at bottom, wider at top */}
      <path d="M17 48 C 15 40 14 26 16 13 L40 13 C 42 26 41 40 39 48 Z" fill="url(#l1beer)"/>

      {/* Bottom shadow in beer */}
      <path d="M17 48 C 15.5 44 15 41 15 40 L41 40 C 41 41 40.5 44 39 48 Z" fill="rgba(0,0,0,0.16)"/>

      {/* Foam */}
      <ellipse cx="28" cy="13" rx="12" ry="4.5" fill="#F0F0F0"/>
      <ellipse cx="20.5" cy="10" rx="5.5" ry="4.5" fill="white"/>
      <ellipse cx="29" cy="8.5" rx="7" ry="5" fill="white"/>
      <ellipse cx="36.5" cy="10.5" rx="5" ry="4" fill="#F2F2F2"/>
      <ellipse cx="23.5" cy="7.5" rx="4" ry="3.2" fill="white"/>
      <ellipse cx="33" cy="7" rx="4.5" ry="3.5" fill="white"/>

      {/* Glass transparent overlay */}
      <path d="M17 48 C 15 40 14 26 16 13 L40 13 C 42 26 41 40 39 48 Z" fill="url(#l1glass)"/>

      {/* Glass outline */}
      <path d="M17 48 C 15 40 14 26 16 13 L40 13 C 42 26 41 40 39 48" stroke="rgba(200,170,80,0.2)" strokeWidth="0.8" fill="none"/>

      {/* Rim */}
      <ellipse cx="28" cy="12.5" rx="12.5" ry="2.8" fill="rgba(220,220,220,0.88)"/>

      {/* Thick base/foot */}
      <rect x="16" y="48" width="24" height="3" rx="0.5" fill="rgba(180,140,50,0.45)"/>
      <rect x="13" y="50.5" width="30" height="3.5" rx="2" fill="url(#l1base)"/>

      {/* Left strong highlight — key for glass feel */}
      <path d="M18.5 15 C 17 26 16.5 38 17.5 46" stroke="rgba(255,255,255,0.68)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M21.5 14 C 20.5 26 20.5 38 21 45" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" strokeLinecap="round"/>

      {/* Right edge shadow */}
      <path d="M37.5 15 C 39 26 39.5 38 38.5 46" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" strokeLinecap="round"/>

      {/* Bubbles rising */}
      <circle cx="26" cy="42" r="1.3" fill="rgba(255,215,80,0.45)"/>
      <circle cx="32" cy="36" r="1.1" fill="rgba(255,215,80,0.4)"/>
      <circle cx="27" cy="29" r="1.2" fill="rgba(255,215,80,0.38)"/>
      <circle cx="23" cy="22" r="0.9" fill="rgba(255,215,80,0.32)"/>
    </svg>
  );
}

export function IconStandardCan() {  // Lv.2 표준 캔 355ml
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="l2b" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#787878"/>
          <stop offset="18%" stopColor="#D4D4D4"/>
          <stop offset="38%" stopColor="#F4F4F4"/>
          <stop offset="58%" stopColor="#E0E0E0"/>
          <stop offset="80%" stopColor="#B8B8B8"/>
          <stop offset="100%" stopColor="#808080"/>
        </linearGradient>
        <linearGradient id="l2lbl" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1A6E1A"/>
          <stop offset="50%" stopColor="#2E9A2E"/>
          <stop offset="100%" stopColor="#1A6E1A"/>
        </linearGradient>
        <linearGradient id="l2top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D8D8D8"/>
          <stop offset="100%" stopColor="#989898"/>
        </linearGradient>
      </defs>

      {/* Can body */}
      <rect x="17" y="15" width="22" height="30" rx="1.5" fill="url(#l2b)"/>

      {/* Label */}
      <rect x="17" y="23" width="22" height="14" fill="url(#l2lbl)"/>
      <text x="28" y="31.5" textAnchor="middle" fontSize="7" fontWeight="800" fill="white" fontFamily="sans-serif">355</text>
      <text x="28" y="37.5" textAnchor="middle" fontSize="4.5" fill="rgba(255,255,255,0.85)" fontFamily="sans-serif">ml</text>

      {/* Top crimp */}
      <ellipse cx="28" cy="15" rx="11" ry="3.5" fill="url(#l2top)"/>
      <ellipse cx="28" cy="15" rx="7" ry="2" fill="#C8C8C8"/>

      {/* Pull tab */}
      <ellipse cx="28" cy="12.8" rx="4.5" ry="1.4" fill="#B0B0B0" stroke="#909090" strokeWidth="0.7"/>
      <rect x="27" y="11" width="2" height="3" rx="0.6" fill="#A0A0A0"/>

      {/* Bottom */}
      <ellipse cx="28" cy="45" rx="11" ry="3.5" fill="#A0A0A0"/>

      {/* Left highlight */}
      <rect x="19.5" y="17" width="3" height="26" rx="1.5" fill="rgba(255,255,255,0.38)"/>

      {/* Right shadow */}
      <rect x="36.5" y="17" width="2.5" height="26" rx="1.2" fill="rgba(0,0,0,0.14)"/>
    </svg>
  );
}

export function IconPintCan() {  // Lv.3 500ml 캔
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="l3b" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7A3410"/>
          <stop offset="20%" stopColor="#C86020"/>
          <stop offset="42%" stopColor="#E87828"/>
          <stop offset="62%" stopColor="#D47020"/>
          <stop offset="82%" stopColor="#A04018"/>
          <stop offset="100%" stopColor="#682E0E"/>
        </linearGradient>
        <linearGradient id="l3top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D8D8D8"/>
          <stop offset="100%" stopColor="#989898"/>
        </linearGradient>
      </defs>

      {/* Tall can body */}
      <rect x="18" y="10" width="20" height="38" rx="1.5" fill="url(#l3b)"/>

      {/* Dark label band */}
      <rect x="18" y="20" width="20" height="20" fill="rgba(0,0,0,0.22)"/>
      <text x="28" y="31" textAnchor="middle" fontSize="8.5" fontWeight="900" fill="white" fontFamily="sans-serif" letterSpacing="-0.5">500</text>
      <text x="28" y="38.5" textAnchor="middle" fontSize="4.5" fill="rgba(255,255,255,0.8)" fontFamily="sans-serif">ml</text>

      {/* Top */}
      <ellipse cx="28" cy="10" rx="10" ry="3" fill="url(#l3top)"/>
      <ellipse cx="28" cy="10" rx="6.5" ry="1.8" fill="#C8C8C8"/>

      {/* Pull tab */}
      <ellipse cx="28" cy="8" rx="4" ry="1.3" fill="#B0B0B0" stroke="#909090" strokeWidth="0.7"/>
      <rect x="27" y="6.2" width="2" height="2.8" rx="0.5" fill="#A0A0A0"/>

      {/* Bottom */}
      <ellipse cx="28" cy="48" rx="10" ry="3" fill="#7A3810"/>

      {/* Highlight */}
      <rect x="20.5" y="12" width="2.5" height="34" rx="1.2" fill="rgba(255,255,255,0.24)"/>

      {/* Right shadow */}
      <rect x="36" y="12" width="2" height="34" rx="1" fill="rgba(0,0,0,0.2)"/>
    </svg>
  );
}

export function IconMass() {  // Lv.4 마스 1L
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="l4b" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8C5008"/>
          <stop offset="30%" stopColor="#D07C14"/>
          <stop offset="60%" stopColor="#E89020"/>
          <stop offset="100%" stopColor="#9A5C0C"/>
        </linearGradient>
        <linearGradient id="l4g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.52)"/>
          <stop offset="22%" stopColor="rgba(255,255,255,0.07)"/>
          <stop offset="78%" stopColor="rgba(255,255,255,0.03)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0.28)"/>
        </linearGradient>
        <linearGradient id="l4h" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B8B8B8"/>
          <stop offset="50%" stopColor="#F0F0F0"/>
          <stop offset="100%" stopColor="#A8A8A8"/>
        </linearGradient>
      </defs>

      {/* Big mug body */}
      <path d="M9 14 L9 47 Q9 52 14 52 L38 52 Q43 52 43 47 L43 14 Z" fill="url(#l4b)"/>

      {/* Bottom shadow */}
      <path d="M9 44 L9 47 Q9 52 14 52 L38 52 Q43 52 43 47 L43 44 Z" fill="rgba(0,0,0,0.2)"/>

      {/* Foam */}
      <ellipse cx="26" cy="13.5" rx="17" ry="5.5" fill="#ECECEC"/>
      <ellipse cx="16" cy="10" rx="6.5" ry="5" fill="white"/>
      <ellipse cx="27" cy="8.5" rx="8" ry="5.5" fill="white"/>
      <ellipse cx="36" cy="10" rx="6" ry="4.5" fill="#F0F0F0"/>
      <ellipse cx="21" cy="7.5" rx="4.5" ry="3.5" fill="white"/>
      <ellipse cx="32" cy="7" rx="5" ry="4" fill="white"/>
      <ellipse cx="28" cy="5.5" rx="3.5" ry="2.8" fill="white"/>

      {/* Glass overlay */}
      <path d="M9 14 L9 47 Q9 52 14 52 L38 52 Q43 52 43 47 L43 14 Z" fill="url(#l4g)"/>

      {/* Outline */}
      <path d="M9 14 L9 47 Q9 52 14 52 L38 52 Q43 52 43 47 L43 14" stroke="rgba(150,100,20,0.25)" strokeWidth="0.8" fill="none"/>

      {/* Rim */}
      <rect x="8" y="12.5" width="36" height="3" rx="1.5" fill="rgba(210,210,210,0.88)"/>

      {/* Handle */}
      <path d="M43 23 Q56 23 56 33 Q56 43 43 43" stroke="url(#l4h)" strokeWidth="5.5" fill="none" strokeLinecap="round"/>
      <path d="M43 23 Q56 23 56 33 Q56 43 43 43" stroke="rgba(255,255,255,0.42)" strokeWidth="2.2" fill="none" strokeLinecap="round"/>

      {/* Left highlight */}
      <path d="M12 16 L12 47" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M15.5 16 L15.5 45" stroke="rgba(255,255,255,0.18)" strokeWidth="1.3" strokeLinecap="round"/>

      {/* Bubbles */}
      <circle cx="22" cy="43" r="1.6" fill="rgba(255,210,70,0.45)"/>
      <circle cx="33" cy="38" r="1.3" fill="rgba(255,210,70,0.4)"/>
      <circle cx="26" cy="30" r="1.4" fill="rgba(255,210,70,0.38)"/>
      <circle cx="17" cy="36" r="1.1" fill="rgba(255,210,70,0.35)"/>

      {/* Level marks */}
      <line x1="10" y1="29" x2="12.5" y2="29" stroke="rgba(255,255,255,0.28)" strokeWidth="1"/>
      <line x1="10" y1="37" x2="12.5" y2="37" stroke="rgba(255,255,255,0.28)" strokeWidth="1"/>
    </svg>
  );
}

export function IconPETBottle() {  // Lv.5 대용량 페트 1.6L
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="l5liq" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8C6010"/>
          <stop offset="30%" stopColor="#D8901E"/>
          <stop offset="60%" stopColor="#ECA028"/>
          <stop offset="100%" stopColor="#966814"/>
        </linearGradient>
        <linearGradient id="l5g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)"/>
          <stop offset="22%" stopColor="rgba(255,255,255,0.07)"/>
          <stop offset="78%" stopColor="rgba(255,255,255,0.04)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0.3)"/>
        </linearGradient>
        <linearGradient id="l5cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3A3A3A"/>
          <stop offset="100%" stopColor="#181818"/>
        </linearGradient>
      </defs>

      {/* Bottle shoulder + body shape */}
      <path d="M22 10 L22 14 Q17 15.5 16 20 L14 24 L14 46 Q14 52 20 52 L36 52 Q42 52 42 46 L42 24 L40 20 Q39 15.5 34 14 L34 10 Z" fill="url(#l5liq)"/>

      {/* Glass overlay */}
      <path d="M22 10 L22 14 Q17 15.5 16 20 L14 24 L14 46 Q14 52 20 52 L36 52 Q42 52 42 46 L42 24 L40 20 Q39 15.5 34 14 L34 10 Z" fill="url(#l5g)"/>

      {/* Shoulder line */}
      <path d="M14 24 L42 24" stroke="rgba(255,255,255,0.28)" strokeWidth="1"/>

      {/* Bottom base shadow */}
      <path d="M14 46 Q14 52 20 52 L36 52 Q42 52 42 46" fill="rgba(0,0,0,0.15)" stroke="none"/>

      {/* Cap */}
      <rect x="22" y="4.5" width="12" height="6.5" rx="2" fill="url(#l5cap)"/>
      <rect x="22" y="4.5" width="12" height="2" rx="1" fill="#505050"/>
      <rect x="22" y="4.5" width="12" height="0.8" rx="0.4" fill="#606060"/>

      {/* Label */}
      <rect x="15" y="28" width="26" height="14" rx="2.5" fill="rgba(20,50,120,0.78)"/>
      <text x="28" y="35.5" textAnchor="middle" fontSize="5" fontWeight="800" fill="white" fontFamily="sans-serif" letterSpacing="0.5">DRAFT</text>
      <text x="28" y="41" textAnchor="middle" fontSize="4.5" fill="rgba(255,255,255,0.82)" fontFamily="sans-serif">1.6L</text>

      {/* Left highlight */}
      <path d="M17 24 L16 45" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M20.5 15 L20 21" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>

      {/* Right shadow */}
      <path d="M39 24 L40 45" stroke="rgba(0,0,0,0.14)" strokeWidth="2" strokeLinecap="round"/>

      {/* Outline */}
      <path d="M22 10 L22 14 Q17 15.5 16 20 L14 24 L14 46 Q14 52 20 52 L36 52 Q42 52 42 46 L42 24 L40 20 Q39 15.5 34 14 L34 10" stroke="rgba(140,100,20,0.22)" strokeWidth="0.8" fill="none"/>
    </svg>
  );
}

export function IconCraftKeg() {  // Lv.6 수제맥주 케그 20L
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="l6m" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#606060"/>
          <stop offset="18%" stopColor="#B8B8B8"/>
          <stop offset="38%" stopColor="#E8E8E8"/>
          <stop offset="58%" stopColor="#D0D0D0"/>
          <stop offset="80%" stopColor="#A0A0A0"/>
          <stop offset="100%" stopColor="#585858"/>
        </linearGradient>
        <linearGradient id="l6top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D0D0D0"/>
          <stop offset="100%" stopColor="#888888"/>
        </linearGradient>
        <linearGradient id="l6band" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#484848"/>
          <stop offset="50%" stopColor="#787878"/>
          <stop offset="100%" stopColor="#484848"/>
        </linearGradient>
      </defs>

      {/* Keg body */}
      <rect x="13" y="16" width="30" height="34" rx="3" fill="url(#l6m)"/>

      {/* Top lid */}
      <ellipse cx="28" cy="16" rx="15" ry="4.5" fill="url(#l6top)"/>

      {/* Bottom */}
      <ellipse cx="28" cy="50" rx="15" ry="4" fill="#787878"/>

      {/* Metal bands */}
      <rect x="13" y="22.5" width="30" height="3.5" fill="url(#l6band)"/>
      <rect x="13" y="22.5" width="30" height="1" fill="rgba(255,255,255,0.12)"/>
      <rect x="13" y="41" width="30" height="3.5" fill="url(#l6band)"/>
      <rect x="13" y="41" width="30" height="1" fill="rgba(255,255,255,0.12)"/>

      {/* Handle on top */}
      <path d="M19 16 Q19 8 28 8 Q37 8 37 16" stroke="#A0A0A0" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <path d="M19 16 Q19 8 28 8 Q37 8 37 16" stroke="rgba(255,255,255,0.38)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>

      {/* Center valve circle */}
      <circle cx="28" cy="33" r="6.5" fill="#686868" stroke="#484848" strokeWidth="1"/>
      <circle cx="28" cy="33" r="4" fill="#888888"/>
      <circle cx="28" cy="33" r="2" fill="#585858"/>

      {/* Valve stem */}
      <rect x="26.5" y="38.5" width="3" height="5" rx="1.2" fill="#606060"/>

      {/* Circle emboss */}
      <circle cx="28" cy="33" r="11" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none"/>

      {/* Left highlight */}
      <rect x="15" y="18" width="3" height="30" rx="1.5" fill="rgba(255,255,255,0.3)"/>

      {/* Right shadow */}
      <rect x="39" y="18" width="3" height="30" rx="1.5" fill="rgba(0,0,0,0.18)"/>
    </svg>
  );
}

export function IconBarKeg() {  // Lv.7 호프집 케그 30L
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="l7m" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3A6882"/>
          <stop offset="22%" stopColor="#7EB0CC"/>
          <stop offset="45%" stopColor="#AACED8"/>
          <stop offset="68%" stopColor="#8CBAC8"/>
          <stop offset="88%" stopColor="#5888A0"/>
          <stop offset="100%" stopColor="#2A5870"/>
        </linearGradient>
        <linearGradient id="l7top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8AB8CC"/>
          <stop offset="100%" stopColor="#487890"/>
        </linearGradient>
        <linearGradient id="l7band" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#304858"/>
          <stop offset="50%" stopColor="#587080"/>
          <stop offset="100%" stopColor="#304858"/>
        </linearGradient>
      </defs>

      {/* Larger keg */}
      <rect x="10" y="13" width="36" height="38" rx="3" fill="url(#l7m)"/>
      <ellipse cx="28" cy="13" rx="18" ry="5.5" fill="url(#l7top)"/>
      <ellipse cx="28" cy="51" rx="18" ry="5" fill="#487890"/>

      {/* Metal bands */}
      <rect x="10" y="20" width="36" height="4" fill="url(#l7band)"/>
      <rect x="10" y="20" width="36" height="1.2" fill="rgba(255,255,255,0.14)"/>
      <rect x="10" y="42" width="36" height="4" fill="url(#l7band)"/>
      <rect x="10" y="42" width="36" height="1.2" fill="rgba(255,255,255,0.14)"/>

      {/* Handle */}
      <path d="M18 13 Q18 5 28 5 Q38 5 38 13" stroke="#6898A8" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <path d="M18 13 Q18 5 28 5 Q38 5 38 13" stroke="rgba(255,255,255,0.35)" strokeWidth="2" fill="none" strokeLinecap="round"/>

      {/* Tap */}
      <rect x="22" y="28" width="12" height="8" rx="2.5" fill="#304858" stroke="#283848" strokeWidth="0.8"/>
      <rect x="25.5" y="36" width="5" height="6" rx="1.2" fill="#304858"/>
      <circle cx="28" cy="32" r="2.5" fill="#487890"/>
      <circle cx="28" cy="32" r="1.2" fill="#304858"/>

      {/* Highlight */}
      <rect x="12" y="15" width="3.5" height="34" rx="1.7" fill="rgba(255,255,255,0.28)"/>
      <rect x="40.5" y="15" width="3.5" height="34" rx="1.7" fill="rgba(0,0,0,0.18)"/>
    </svg>
  );
}

export function IconHectoliter() {  // Lv.8 헥토리터 100L — 콘형 발효 탱크
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="l8m" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#787878"/>
          <stop offset="18%" stopColor="#C8C8C8"/>
          <stop offset="36%" stopColor="#F2F2F2"/>
          <stop offset="54%" stopColor="#E0E0E0"/>
          <stop offset="76%" stopColor="#B0B0B0"/>
          <stop offset="100%" stopColor="#686868"/>
        </linearGradient>
        <linearGradient id="l8cone" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#606060"/>
          <stop offset="35%" stopColor="#C0C0C0"/>
          <stop offset="58%" stopColor="#D8D8D8"/>
          <stop offset="100%" stopColor="#585858"/>
        </linearGradient>
        <linearGradient id="l8top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E4E4E4"/>
          <stop offset="100%" stopColor="#A0A0A0"/>
        </linearGradient>
      </defs>

      {/* Cylinder body */}
      <rect x="12" y="6" width="32" height="32" rx="1.5" fill="url(#l8m)"/>

      {/* Top lid dome */}
      <ellipse cx="28" cy="6" rx="16" ry="5" fill="url(#l8top)"/>

      {/* Metallic reflection streaks */}
      <line x1="18" y1="8" x2="18" y2="37" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2"/>
      <line x1="23" y1="7" x2="23" y2="38" stroke="rgba(255,255,255,0.14)" strokeWidth="0.8"/>

      {/* Conical bottom */}
      <path d="M12 38 L23.5 53 L32.5 53 L44 38 Z" fill="url(#l8cone)"/>
      <path d="M12 38 L17 47" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" strokeLinecap="round"/>

      {/* Legs */}
      <line x1="18" y1="53" x2="15" y2="57" stroke="#909090" strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="38" y1="53" x2="41" y2="57" stroke="#909090" strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="15.5" y1="57" x2="40.5" y2="57" stroke="#888888" strokeWidth="1.8" strokeLinecap="round"/>

      {/* Bottom valve */}
      <rect x="26" y="53" width="4" height="3.5" rx="1" fill="#808080"/>
      <circle cx="28" cy="57" r="1.5" fill="#686868"/>

      {/* Inspection porthole */}
      <ellipse cx="28" cy="22" rx="7" ry="5.5" fill="#B0B8B8" stroke="#888888" strokeWidth="1.2"/>
      <ellipse cx="28" cy="22" rx="4.8" ry="3.8" fill="#7888A0"/>
      <line x1="23" y1="22" x2="33" y2="22" stroke="rgba(210,210,210,0.65)" strokeWidth="0.9"/>
      <line x1="28" y1="16.5" x2="28" y2="27.5" stroke="rgba(210,210,210,0.65)" strokeWidth="0.9"/>

      {/* Top vent pipe */}
      <rect x="25" y="1" width="6" height="5.5" rx="1.5" fill="#B8B8B8" stroke="#989898" strokeWidth="0.8"/>
      <ellipse cx="28" cy="1" rx="3" ry="1.2" fill="#C8C8C8"/>

      {/* Left highlight */}
      <rect x="14" y="8" width="3.5" height="28" rx="1.7" fill="rgba(255,255,255,0.38)"/>

      {/* Right shadow */}
      <rect x="40.5" y="8" width="3.5" height="28" rx="1.7" fill="rgba(0,0,0,0.15)"/>
    </svg>
  );
}

export function IconUSBarrel() {  // Lv.9 양조 배럴 117L
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="l9w" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5E2A08"/>
          <stop offset="22%" stopColor="#A84E20"/>
          <stop offset="50%" stopColor="#C86030"/>
          <stop offset="78%" stopColor="#A04518"/>
          <stop offset="100%" stopColor="#4E2008"/>
        </linearGradient>
        <linearGradient id="l9end" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#964015"/>
          <stop offset="100%" stopColor="#602808"/>
        </linearGradient>
      </defs>

      {/* Barrel bulge shape */}
      <path d="M17 10 Q7 27 17 46 L39 46 Q49 27 39 10 Z" fill="url(#l9w)"/>

      {/* Barrel ends */}
      <ellipse cx="28" cy="10" rx="11" ry="3.8" fill="url(#l9end)"/>
      <ellipse cx="28" cy="46" rx="11" ry="3.8" fill="#5A2808"/>

      {/* Wood plank lines */}
      <path d="M20.5 12 Q15 27 20.5 44" stroke="rgba(0,0,0,0.22)" strokeWidth="1.5" fill="none"/>
      <path d="M24 10.5 Q20 27 24 45.5" stroke="rgba(0,0,0,0.18)" strokeWidth="1.2" fill="none"/>
      <path d="M28 10 L28 46" stroke="rgba(0,0,0,0.16)" strokeWidth="1.2" fill="none"/>
      <path d="M32 10.5 Q36 27 32 45.5" stroke="rgba(0,0,0,0.18)" strokeWidth="1.2" fill="none"/>
      <path d="M35.5 12 Q41 27 35.5 44" stroke="rgba(0,0,0,0.22)" strokeWidth="1.5" fill="none"/>

      {/* Metal hoops */}
      <path d="M14.5 17.5 Q28 21 41.5 17.5" stroke="#707070" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      <path d="M13 28 Q28 32 43 28" stroke="#606060" strokeWidth="3.2" fill="none" strokeLinecap="round"/>
      <path d="M14.5 38.5 Q28 42 41.5 38.5" stroke="#707070" strokeWidth="2.8" fill="none" strokeLinecap="round"/>

      {/* Hoop highlight */}
      <path d="M14.5 17.5 Q28 20 41.5 17.5" stroke="rgba(255,255,255,0.22)" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M13 28 Q28 31 43 28" stroke="rgba(255,255,255,0.22)" strokeWidth="1" fill="none" strokeLinecap="round"/>

      {/* Center text */}
      <text x="28" y="30" textAnchor="middle" fontSize="7" fontWeight="900" fill="rgba(255,215,170,0.88)" fontFamily="sans-serif">117L</text>

      {/* Left highlight */}
      <path d="M18 15 Q13 27 18 42" stroke="rgba(255,255,255,0.32)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export function IconTankTruck() {  // Lv.10 맥주 탱크로리 20,000L
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="l10tk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D8DEE4"/>
          <stop offset="28%" stopColor="#F8FAFA"/>
          <stop offset="50%" stopColor="#FFFFFF"/>
          <stop offset="72%" stopColor="#EAECEE"/>
          <stop offset="100%" stopColor="#B4BCBE"/>
        </linearGradient>
        <linearGradient id="l10sh" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <linearGradient id="l10cb" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F2F2F2"/>
          <stop offset="100%" stopColor="#D8D8D8"/>
        </linearGradient>
        <linearGradient id="l10end" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D0D4D4"/>
          <stop offset="100%" stopColor="#A8ACAC"/>
        </linearGradient>
      </defs>

      {/* Tank — horizontal cylinder */}
      <ellipse cx="39" cy="25" rx="15" ry="11" fill="url(#l10tk)"/>
      <rect x="17" y="14" width="37" height="22" fill="url(#l10tk)"/>
      <ellipse cx="54" cy="25" rx="4.5" ry="11" fill="url(#l10end)"/>
      <ellipse cx="17" cy="25" rx="4" ry="11" fill="#D4D8D8"/>

      {/* Top shine strip */}
      <ellipse cx="37" cy="17" rx="13" ry="3" fill="url(#l10sh)" opacity="0.75"/>

      {/* Vertical reflection streaks on tank */}
      <line x1="25" y1="14.5" x2="25" y2="35.5" stroke="rgba(255,255,255,0.45)" strokeWidth="2"/>
      <line x1="33" y1="14" x2="33" y2="36" stroke="rgba(255,255,255,0.28)" strokeWidth="1.2"/>
      <line x1="44" y1="14" x2="44" y2="36" stroke="rgba(255,255,255,0.22)" strokeWidth="0.9"/>

      {/* Tank band seams */}
      <line x1="30" y1="14" x2="30" y2="36" stroke="rgba(160,168,168,0.35)" strokeWidth="1"/>
      <line x1="48" y1="14" x2="48" y2="36" stroke="rgba(160,168,168,0.35)" strokeWidth="1"/>

      {/* Cab — white */}
      <rect x="2" y="16" width="17" height="22" rx="2.5" fill="url(#l10cb)"/>
      <rect x="3.5" y="18" width="14" height="9.5" rx="1.5" fill="#A8D8F0" opacity="0.88"/>
      <line x1="10.5" y1="18" x2="10.5" y2="27.5" stroke="rgba(255,255,255,0.55)" strokeWidth="0.8"/>

      {/* Mirror */}
      <rect x="1" y="21" width="2" height="3.5" rx="0.6" fill="#C8C8C8"/>

      {/* Chassis bar */}
      <rect x="2" y="36" width="52" height="4" rx="1.2" fill="#484848"/>

      {/* Front wheel */}
      <circle cx="9" cy="42" r="5.5" fill="#282828"/>
      <circle cx="9" cy="42" r="3" fill="#444444"/>
      <circle cx="9" cy="42" r="1.4" fill="#686868"/>

      {/* Rear dual wheels (triple axle look) */}
      <circle cx="31" cy="42.5" r="5" fill="#282828"/>
      <circle cx="31" cy="42.5" r="2.7" fill="#444444"/>
      <circle cx="31" cy="42.5" r="1.2" fill="#686868"/>

      <circle cx="43" cy="42.5" r="5" fill="#282828"/>
      <circle cx="43" cy="42.5" r="2.7" fill="#444444"/>
      <circle cx="43" cy="42.5" r="1.2" fill="#686868"/>
    </svg>
  );
}

export function IconFactoryTank() {  // Lv.11 공장 저장 탱크 500,000L
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="l11sa" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#888888"/>
          <stop offset="22%" stopColor="#D0D0D0"/>
          <stop offset="42%" stopColor="#F0F0F0"/>
          <stop offset="62%" stopColor="#E0E0E0"/>
          <stop offset="100%" stopColor="#808080"/>
        </linearGradient>
        <linearGradient id="l11sb" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#787878"/>
          <stop offset="30%" stopColor="#C0C0C0"/>
          <stop offset="55%" stopColor="#E4E4E4"/>
          <stop offset="100%" stopColor="#707070"/>
        </linearGradient>
        <linearGradient id="l11tp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E0E0E0"/>
          <stop offset="100%" stopColor="#A0A0A0"/>
        </linearGradient>
      </defs>

      {/* Left silo — slightly behind */}
      <rect x="3" y="18" width="20" height="36" rx="1.5" fill="url(#l11sb)" opacity="0.82"/>
      <ellipse cx="13" cy="18" rx="10" ry="3.5" fill="#C4C4C4" opacity="0.88"/>
      {/* Left silo dome */}
      <path d="M3 18 Q3 9 13 7 Q23 9 23 18" fill="#C8C8C8" opacity="0.85"/>
      <ellipse cx="13" cy="54" rx="10" ry="2.8" fill="#888888" opacity="0.8"/>
      {/* Left silo highlight */}
      <rect x="5" y="20" width="2.5" height="32" rx="1.2" fill="rgba(255,255,255,0.28)" opacity="0.8"/>

      {/* Right silo — main, front */}
      <rect x="27" y="12" width="24" height="42" rx="1.5" fill="url(#l11sa)"/>
      {/* Right silo dome */}
      <path d="M27 12 Q27 2 39 1 Q51 2 51 12" fill="#D8D8D8"/>
      <ellipse cx="39" cy="12" rx="12" ry="4" fill="url(#l11tp)"/>
      <ellipse cx="39" cy="54" rx="12" ry="3.5" fill="#909090"/>

      {/* Horizontal band seams */}
      <rect x="27" y="22" width="24" height="1.5" fill="rgba(120,120,120,0.28)"/>
      <rect x="27" y="32" width="24" height="1.5" fill="rgba(120,120,120,0.28)"/>
      <rect x="27" y="42" width="24" height="1.5" fill="rgba(120,120,120,0.28)"/>

      {/* Porthole on right silo */}
      <ellipse cx="39" cy="27" rx="5" ry="4" fill="#B0B8B8" stroke="#909090" strokeWidth="1"/>
      <ellipse cx="39" cy="27" rx="3.2" ry="2.5" fill="#7888A0"/>
      <line x1="34" y1="27" x2="44" y2="27" stroke="rgba(200,200,200,0.6)" strokeWidth="0.8"/>
      <line x1="39" y1="23" x2="39" y2="31" stroke="rgba(200,200,200,0.6)" strokeWidth="0.8"/>

      {/* Red scaffold on right side */}
      <rect x="50" y="12" width="3" height="42" fill="#C42020"/>
      <rect x="50" y="12" width="3" height="1" fill="#E03030"/>

      {/* Red scaffold rungs */}
      <rect x="48" y="18" width="7" height="1.5" fill="#C42020"/>
      <rect x="48" y="26" width="7" height="1.5" fill="#C42020"/>
      <rect x="48" y="34" width="7" height="1.5" fill="#C42020"/>
      <rect x="48" y="42" width="7" height="1.5" fill="#C42020"/>
      <rect x="48" y="50" width="7" height="1.5" fill="#C42020"/>

      {/* Right silo highlights */}
      <rect x="29" y="14" width="3.5" height="38" rx="1.7" fill="rgba(255,255,255,0.38)"/>
      <rect x="34" y="14" width="1.5" height="38" rx="0.7" fill="rgba(255,255,255,0.2)"/>

      {/* Ground base */}
      <rect x="1" y="54" width="54" height="2" rx="1" fill="#A0A0A0"/>
    </svg>
  );
}

// Lv.2(표준 캔), Lv.5(페트) 제거 후 9레벨
export const LEVEL_ICONS = [
  IconBarGlass,    // Lv.1 식당 맥주잔
  IconPintCan,     // Lv.2 500ml 캔
  IconMass,        // Lv.3 마스
  IconCraftKeg,    // Lv.4 수제맥주 케그
  IconBarKeg,      // Lv.5 호프집 케그
  IconHectoliter,  // Lv.6 헥토리터
  IconUSBarrel,    // Lv.7 양조 배럴
  IconTankTruck,   // Lv.8 탱크로리
  IconFactoryTank, // Lv.9 공장 저장 탱크
];
