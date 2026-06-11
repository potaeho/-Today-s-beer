// 레벨별 맥주 용기 — 실사 수준 SVG 아이콘

export function IconBarGlass() {  // Lv.1 식당 맥주잔 (Pasabahçe 필스너)
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="a1beer" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#7A3A06"/>
          <stop offset="14%"  stopColor="#C87618"/>
          <stop offset="42%"  stopColor="#F0B028"/>
          <stop offset="68%"  stopColor="#D89020"/>
          <stop offset="88%"  stopColor="#B06212"/>
          <stop offset="100%" stopColor="#6E3008"/>
        </linearGradient>
        <radialGradient id="a1foam" cx="50%" cy="62%" r="52%">
          <stop offset="0%"   stopColor="#FFFFFF"/>
          <stop offset="52%"  stopColor="#F3EEE3"/>
          <stop offset="100%" stopColor="#DDD4BF"/>
        </radialGradient>
        <linearGradient id="a1lh" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.94)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <linearGradient id="a1rs" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(0,0,0,0)"/>
          <stop offset="100%" stopColor="rgba(50,18,0,0.52)"/>
        </linearGradient>
        <clipPath id="a1clip">
          <path d="M13 11 C 11.5 26 14 42 17.5 49 L38.5 49 C 42 42 44.5 26 43 11 Z"/>
        </clipPath>
      </defs>

      {/* ── Beer fill ── */}
      <path d="M13 11 C 11.5 26 14 42 17.5 49 L38.5 49 C 42 42 44.5 26 43 11 Z"
            fill="url(#a1beer)"/>

      {/* Refraction: left edge dark */}
      <path d="M13 11 C 11.5 26 14 42 17.5 49 L20.5 49 C 17.5 42 15.5 26 15.5 11 Z"
            fill="rgba(90,38,4,0.4)"/>
      {/* Refraction: right edge dark */}
      <path d="M43 11 C 44.5 26 42 42 38.5 49 L35.5 49 C 38.5 42 40.5 26 40.5 11 Z"
            fill="rgba(50,18,0,0.45)"/>

      {/* Bubbles */}
      <circle cx="26"  cy="44" r="0.9"  fill="rgba(255,215,65,0.7)"/>
      <circle cx="31"  cy="38" r="0.85" fill="rgba(255,215,65,0.65)"/>
      <circle cx="28"  cy="31" r="0.9"  fill="rgba(255,215,65,0.6)"/>
      <circle cx="33.5"cy="23" r="0.8"  fill="rgba(255,215,65,0.55)"/>
      <circle cx="24"  cy="19" r="0.75" fill="rgba(255,215,65,0.5)"/>
      <circle cx="35"  cy="30" r="0.7"  fill="rgba(255,215,65,0.52)"/>
      <circle cx="22"  cy="37" r="0.7"  fill="rgba(255,215,65,0.48)"/>

      {/* ── Foam ── */}
      <path d="M13 11 Q15 7.5 20.5 9.5 Q24 6 28.5 7.5 Q32.5 5.5 36.5 8 Q40 6.5 43 11
               Q35.5 9.5 28.5 10 Q21.5 9.5 13 11 Z"
            fill="url(#a1foam)"/>
      {/* Foam dome highlight */}
      <ellipse cx="28" cy="8" rx="7.5" ry="2.5" fill="rgba(255,255,255,0.62)"/>
      {/* Foam-beer shadow line */}
      <path d="M14.5 12 Q28.5 14 41.5 12" stroke="rgba(175,132,52,0.38)"
            strokeWidth="0.9" fill="none" strokeLinecap="round"/>

      {/* ── Glass overlays ── */}
      {/* Left bright highlight */}
      <path d="M13 11 C 11.5 26 14 42 17.5 49 L20 49 C 16.5 42 14 26 15 11 Z"
            fill="url(#a1lh)" opacity="0.92"/>
      {/* Secondary soft highlight */}
      <path d="M17.5 12 C 16 26 17.5 41 20 48"
            stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      {/* Right edge shadow */}
      <path d="M43 11 C 44.5 26 42 42 38.5 49 L36 49 C 39.5 42 41.5 26 41 11 Z"
            fill="url(#a1rs)" opacity="0.82"/>

      {/* Glass contour outline */}
      <path d="M13 11 C 11.5 26 14 42 17.5 49"
            stroke="rgba(195,158,75,0.55)" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
      <path d="M43 11 C 44.5 26 42 42 38.5 49"
            stroke="rgba(140,96,32,0.48)" strokeWidth="0.9" fill="none" strokeLinecap="round"/>

      {/* Rim */}
      <path d="M12 11 Q28.5 13.5 44 11"
            stroke="rgba(225,196,120,0.78)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

      {/* ── Base / Foot ── */}
      <path d="M17.5 49 Q17.5 52.5 22 53 L35 53 Q39.5 52.5 38.5 49 Z"
            fill="rgba(185,128,28,0.36)"/>
      <path d="M8.5 54.5 Q28.5 52 47.5 54.5"
            stroke="rgba(165,115,30,0.72)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M11 54 Q28.5 52.5 46 54"
            stroke="rgba(240,195,90,0.32)" strokeWidth="1" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export function IconPintCan() {  // Lv.2 500ml 캔
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="a2body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#622808"/>
          <stop offset="14%"  stopColor="#B04E18"/>
          <stop offset="28%"  stopColor="#D87020"/>
          <stop offset="48%"  stopColor="#EC8C28"/>
          <stop offset="68%"  stopColor="#D06C1C"/>
          <stop offset="84%"  stopColor="#9C4410"/>
          <stop offset="100%" stopColor="#521E06"/>
        </linearGradient>
        <linearGradient id="a2chrome" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#787878"/>
          <stop offset="28%"  stopColor="#D4D4D4"/>
          <stop offset="50%"  stopColor="#F2F2F2"/>
          <stop offset="72%"  stopColor="#C4C4C4"/>
          <stop offset="100%" stopColor="#707070"/>
        </linearGradient>
        <radialGradient id="a2toprad" cx="42%" cy="38%" r="60%">
          <stop offset="0%"   stopColor="#F0F0F0"/>
          <stop offset="100%" stopColor="#8E8E8E"/>
        </radialGradient>
      </defs>

      {/* Can body */}
      <rect x="18" y="11" width="20" height="38" rx="0.5" fill="url(#a2body)"/>

      {/* Top neck taper */}
      <path d="M18 11 C 18 8 21 7 24 7 L32 7 C 35 7 38 8 38 11 Z" fill="url(#a2chrome)"/>
      {/* Bottom taper */}
      <path d="M18 49 C 18 52 21 53 24 53 L32 53 C 35 53 38 52 38 49 Z" fill="rgba(65,26,6,0.88)"/>

      {/* Top ellipse */}
      <ellipse cx="28" cy="7.5" rx="9.5" ry="2.5" fill="url(#a2toprad)"/>

      {/* Crimp rings */}
      <path d="M18 10.5 L38 10.5" stroke="rgba(0,0,0,0.28)" strokeWidth="0.9"/>
      <path d="M18 48.5 L38 48.5" stroke="rgba(0,0,0,0.28)" strokeWidth="0.9"/>

      {/* Label band */}
      <rect x="18" y="19" width="20" height="18" fill="rgba(0,0,0,0.22)"/>
      <path d="M18 19 L38 19" stroke="rgba(0,0,0,0.32)" strokeWidth="0.7"/>
      <path d="M18 37 L38 37" stroke="rgba(0,0,0,0.32)" strokeWidth="0.7"/>

      {/* Pull tab */}
      <ellipse cx="28" cy="5.2" rx="4.5" ry="1.3" fill="#ABABAB" stroke="#8C8C8C" strokeWidth="0.7"/>
      <rect x="26.8" y="3.5" width="2.4" height="2.2" rx="0.7" fill="#989898"/>
      <rect x="27.3" y="2.8" width="1.4" height="1" rx="0.4" fill="#B4B4B4"/>

      {/* Left highlight */}
      <rect x="20" y="13" width="3" height="34" rx="1.5" fill="rgba(255,255,255,0.2)"/>
      {/* Right shadow */}
      <rect x="35.5" y="13" width="2.5" height="34" rx="1.2" fill="rgba(0,0,0,0.24)"/>
    </svg>
  );
}

export function IconMass() {  // Lv.3 마스 1L (Bavarian Maß)
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="a3beer" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#7A3A06"/>
          <stop offset="18%"  stopColor="#C87618"/>
          <stop offset="44%"  stopColor="#ECA824"/>
          <stop offset="70%"  stopColor="#D08C18"/>
          <stop offset="88%"  stopColor="#A86010"/>
          <stop offset="100%" stopColor="#6C3006"/>
        </linearGradient>
        <radialGradient id="a3foam" cx="50%" cy="64%" r="54%">
          <stop offset="0%"   stopColor="#FFFFFF"/>
          <stop offset="52%"  stopColor="#F1ECDF"/>
          <stop offset="100%" stopColor="#DDD3BE"/>
        </radialGradient>
        <linearGradient id="a3handle" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#A8A8A8"/>
          <stop offset="35%"  stopColor="#E4E4E4"/>
          <stop offset="60%"  stopColor="#F2F2F2"/>
          <stop offset="100%" stopColor="#9C9C9C"/>
        </linearGradient>
        <linearGradient id="a3lh" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.9)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <linearGradient id="a3rs" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(0,0,0,0)"/>
          <stop offset="100%" stopColor="rgba(45,16,0,0.48)"/>
        </linearGradient>
      </defs>

      {/* Mug body — beer fill */}
      <path d="M10 14 L10 47 Q10 52 15 52 L38 52 Q43 52 43 47 L43 14 Z" fill="url(#a3beer)"/>

      {/* Left refraction */}
      <path d="M10 14 L10 47 Q10 52 15 52 L18 52 Q13.5 52 13.5 47 L13.5 14 Z"
            fill="rgba(88,35,4,0.36)"/>
      {/* Right refraction */}
      <path d="M43 14 L43 47 Q43 52 38 52 L35 52 Q39.5 52 39.5 47 L39.5 14 Z"
            fill="rgba(42,15,0,0.4)"/>

      {/* Bubbles */}
      <circle cx="23" cy="46" r="1.0"  fill="rgba(255,210,65,0.68)"/>
      <circle cx="33" cy="41" r="0.9"  fill="rgba(255,210,65,0.62)"/>
      <circle cx="26" cy="34" r="1.0"  fill="rgba(255,210,65,0.58)"/>
      <circle cx="36" cy="27" r="0.85" fill="rgba(255,210,65,0.52)"/>
      <circle cx="19" cy="28" r="0.85" fill="rgba(255,210,65,0.52)"/>
      <circle cx="29" cy="20" r="0.8"  fill="rgba(255,210,65,0.46)"/>

      {/* ── Foam ── */}
      <path d="M10 14 Q12.5 8.5 19 11 Q23 7 28 8.5 Q33 6.5 37.5 9.5 Q42 8.5 43 14
               Q36 11.5 28 12.5 Q20 11.5 10 14 Z"
            fill="url(#a3foam)"/>
      <ellipse cx="27.5" cy="9.5" rx="9" ry="3" fill="rgba(255,255,255,0.6)"/>
      <path d="M11.5 14.5 Q28 17 41.5 14.5"
            stroke="rgba(172,130,48,0.36)" strokeWidth="0.9" fill="none" strokeLinecap="round"/>

      {/* Glass overlays */}
      <path d="M10 14 L10 47 Q10 52 15 52 L17.5 52 Q12.5 52 12.5 47 L12.5 14 Z"
            fill="url(#a3lh)" opacity="0.92"/>
      <path d="M14 15.5 L14 48.5" stroke="rgba(255,255,255,0.26)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M43 14 L43 47 Q43 52 38 52 L35.5 52 Q40.5 52 40.5 47 L40.5 14 Z"
            fill="url(#a3rs)" opacity="0.82"/>

      {/* Outline + rim */}
      <path d="M10 14 L10 47 Q10 52 15 52 L38 52 Q43 52 43 47 L43 14"
            stroke="rgba(168,118,36,0.45)" strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.5 14 Q28 16.5 43.5 14"
            stroke="rgba(218,185,105,0.72)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

      {/* Handle */}
      <path d="M43 24 Q56 24 56 33 Q56 42 43 42"
            stroke="url(#a3handle)" strokeWidth="5.5" fill="none" strokeLinecap="round"/>
      <path d="M43 24 Q55 24 55 33 Q55 42 43 42"
            stroke="rgba(255,255,255,0.38)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M43 26 Q52.5 26 52.5 33 Q52.5 40 43 40"
            stroke="rgba(0,0,0,0.15)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function IconCraftKeg() {  // Lv.4 수제맥주 케그 20L
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="a4body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#505050"/>
          <stop offset="16%"  stopColor="#A4A4A4"/>
          <stop offset="35%"  stopColor="#D8D8D8"/>
          <stop offset="52%"  stopColor="#EEEEEE"/>
          <stop offset="68%"  stopColor="#D0D0D0"/>
          <stop offset="84%"  stopColor="#9C9C9C"/>
          <stop offset="100%" stopColor="#484848"/>
        </linearGradient>
        <linearGradient id="a4cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#D8D8D8"/>
          <stop offset="100%" stopColor="#848484"/>
        </linearGradient>
        <linearGradient id="a4band" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#333"/>
          <stop offset="50%"  stopColor="#686868"/>
          <stop offset="100%" stopColor="#333"/>
        </linearGradient>
        <radialGradient id="a4valve" cx="40%" cy="36%" r="60%">
          <stop offset="0%"   stopColor="#A0A0A0"/>
          <stop offset="100%" stopColor="#404040"/>
        </radialGradient>
      </defs>

      {/* Keg body */}
      <rect x="14" y="17" width="28" height="32" rx="2" fill="url(#a4body)"/>

      {/* Top cap */}
      <ellipse cx="28" cy="17" rx="14" ry="4.2" fill="url(#a4cap)"/>
      {/* Bottom */}
      <ellipse cx="28" cy="49" rx="14" ry="3.8" fill="#6C6C6C"/>

      {/* Metal bands */}
      <rect x="14" y="23" width="28" height="3.2" fill="url(#a4band)"/>
      <rect x="14" y="23" width="28" height="0.9" fill="rgba(255,255,255,0.1)"/>
      <rect x="14" y="42.8" width="28" height="3.2" fill="url(#a4band)"/>
      <rect x="14" y="42.8" width="28" height="0.9" fill="rgba(255,255,255,0.1)"/>

      {/* Top handle */}
      <path d="M20 17 Q20 9.5 28 9.5 Q36 9.5 36 17"
            stroke="#9C9C9C" strokeWidth="4.2" fill="none" strokeLinecap="round"/>
      <path d="M20 17 Q20 9.5 28 9.5 Q36 9.5 36 17"
            stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

      {/* Center valve assembly */}
      <circle cx="28" cy="33" r="6.5" fill="#585858" stroke="#3C3C3C" strokeWidth="0.8"/>
      <circle cx="28" cy="33" r="4.5" fill="url(#a4valve)"/>
      <circle cx="28" cy="33" r="2" fill="#3A3A3A"/>
      <circle cx="26.8" cy="31.8" r="0.7" fill="rgba(255,255,255,0.3)"/>
      <rect x="26.5" y="39" width="3" height="5" rx="1.2" fill="#545454"/>

      {/* Left highlight */}
      <rect x="16" y="19" width="3" height="28" rx="1.5" fill="rgba(255,255,255,0.3)"/>
      {/* Right shadow */}
      <rect x="39.5" y="19" width="2.5" height="28" rx="1.2" fill="rgba(0,0,0,0.18)"/>
    </svg>
  );
}

export function IconBarKeg() {  // Lv.5 호프집 케그 30L
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="a5body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#2C5260"/>
          <stop offset="18%"  stopColor="#5888A0"/>
          <stop offset="40%"  stopColor="#80AABC"/>
          <stop offset="58%"  stopColor="#92B8C8"/>
          <stop offset="76%"  stopColor="#6898A8"/>
          <stop offset="100%" stopColor="#244456"/>
        </linearGradient>
        <linearGradient id="a5cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#7AAEC0"/>
          <stop offset="100%" stopColor="#3C6878"/>
        </linearGradient>
        <linearGradient id="a5band" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#1C3840"/>
          <stop offset="50%"  stopColor="#385868"/>
          <stop offset="100%" stopColor="#1C3840"/>
        </linearGradient>
      </defs>

      {/* Body */}
      <rect x="11" y="13" width="34" height="38" rx="2" fill="url(#a5body)"/>

      {/* Top */}
      <ellipse cx="28" cy="13" rx="17" ry="5.2" fill="url(#a5cap)"/>
      {/* Bottom */}
      <ellipse cx="28" cy="51" rx="17" ry="4.6" fill="#3A6070"/>

      {/* Bands */}
      <rect x="11" y="20.5" width="34" height="3.5" fill="url(#a5band)"/>
      <rect x="11" y="20.5" width="34" height="1" fill="rgba(255,255,255,0.12)"/>
      <rect x="11" y="42.5" width="34" height="3.5" fill="url(#a5band)"/>
      <rect x="11" y="42.5" width="34" height="1" fill="rgba(255,255,255,0.12)"/>

      {/* Handle arc */}
      <path d="M18 13 Q18 4.5 28 4.5 Q38 4.5 38 13"
            stroke="#5888A0" strokeWidth="4.8" fill="none" strokeLinecap="round"/>
      <path d="M18 13 Q18 4.5 28 4.5 Q38 4.5 38 13"
            stroke="rgba(255,255,255,0.3)" strokeWidth="1.6" fill="none" strokeLinecap="round"/>

      {/* Tap fitting */}
      <rect x="21.5" y="27.5" width="13" height="8" rx="2.2" fill="#1E3440" stroke="#162832" strokeWidth="0.8"/>
      <rect x="25" y="35.5" width="6" height="6" rx="1.2" fill="#1E3440"/>
      <circle cx="28" cy="31.5" r="2.6" fill="#3A7090"/>
      <circle cx="28" cy="31.5" r="1.2" fill="#1E3440"/>
      <circle cx="27.1" cy="30.6" r="0.7" fill="rgba(160,210,230,0.45)"/>

      {/* Highlight */}
      <rect x="13" y="15" width="3.5" height="34" rx="1.7" fill="rgba(255,255,255,0.26)"/>
      {/* Shadow */}
      <rect x="39.5" y="15" width="3.5" height="34" rx="1.7" fill="rgba(0,0,0,0.18)"/>
    </svg>
  );
}

export function IconHectoliter() {  // Lv.6 헥토리터 발효 탱크
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="a6body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#686868"/>
          <stop offset="18%"  stopColor="#B8B8B8"/>
          <stop offset="36%"  stopColor="#E8E8E8"/>
          <stop offset="54%"  stopColor="#D8D8D8"/>
          <stop offset="76%"  stopColor="#A8A8A8"/>
          <stop offset="100%" stopColor="#585858"/>
        </linearGradient>
        <linearGradient id="a6cone" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#505050"/>
          <stop offset="32%"  stopColor="#A8A8A8"/>
          <stop offset="58%"  stopColor="#CCCCCC"/>
          <stop offset="100%" stopColor="#484848"/>
        </linearGradient>
        <linearGradient id="a6dome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#E4E4E4"/>
          <stop offset="100%" stopColor="#9A9A9A"/>
        </linearGradient>
        <radialGradient id="a6port" cx="38%" cy="35%" r="62%">
          <stop offset="0%"   stopColor="#8898A8"/>
          <stop offset="100%" stopColor="#506070"/>
        </radialGradient>
      </defs>

      {/* Cylinder */}
      <rect x="13" y="7" width="30" height="30" rx="1.5" fill="url(#a6body)"/>

      {/* Top dome */}
      <ellipse cx="28" cy="7" rx="15" ry="4.8" fill="url(#a6dome)"/>

      {/* Conical bottom */}
      <path d="M13 37 L22 53 L34 53 L43 37 Z" fill="url(#a6cone)"/>
      {/* Cone left seam */}
      <path d="M13 37 L18.5 49" stroke="rgba(255,255,255,0.24)" strokeWidth="1.3" strokeLinecap="round"/>

      {/* Legs */}
      <line x1="21.5" y1="53" x2="18.5" y2="57" stroke="#8C8C8C" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="34.5" y1="53" x2="37.5" y2="57" stroke="#8C8C8C" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="17.5" y1="57" x2="38.5" y2="57" stroke="#848484" strokeWidth="1.5" strokeLinecap="round"/>

      {/* Bottom valve */}
      <rect x="26" y="53" width="4" height="3.5" rx="1" fill="#787878"/>
      <circle cx="28" cy="57" r="1.5" fill="#646464"/>

      {/* Porthole window */}
      <ellipse cx="28" cy="22" rx="6.5" ry="5.5" fill="#A4B0B0" stroke="#848484" strokeWidth="1.1"/>
      <ellipse cx="28" cy="22" rx="4.5" ry="3.8" fill="url(#a6port)"/>
      <ellipse cx="27.2" cy="20.8" rx="1.8" ry="1.2" fill="rgba(200,220,228,0.5)"/>
      <line x1="22.5" y1="22" x2="33.5" y2="22" stroke="rgba(200,200,200,0.5)" strokeWidth="0.8"/>
      <line x1="28" y1="16.5" x2="28" y2="27.5" stroke="rgba(200,200,200,0.5)" strokeWidth="0.8"/>

      {/* Top vent pipe */}
      <rect x="25.5" y="2" width="5" height="5" rx="1.5" fill="#B0B0B0" stroke="#909090" strokeWidth="0.8"/>
      <ellipse cx="28" cy="2" rx="2.5" ry="1" fill="#C4C4C4"/>

      {/* Highlight */}
      <rect x="15" y="9" width="3.5" height="26" rx="1.7" fill="rgba(255,255,255,0.38)"/>
      {/* Shadow */}
      <rect x="39.5" y="9" width="3.5" height="26" rx="1.7" fill="rgba(0,0,0,0.14)"/>
    </svg>
  );
}

export function IconUSBarrel() {  // Lv.7 양조 배럴 117L
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="a7wood" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#4C2006"/>
          <stop offset="18%"  stopColor="#8C3E14"/>
          <stop offset="48%"  stopColor="#AA5020"/>
          <stop offset="76%"  stopColor="#8A3C12"/>
          <stop offset="100%" stopColor="#401808"/>
        </linearGradient>
        <linearGradient id="a7end" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#7E3410"/>
          <stop offset="100%" stopColor="#4E2008"/>
        </linearGradient>
      </defs>

      {/* Barrel bulge body */}
      <path d="M18 8 Q7.5 28 18 48 L38 48 Q48.5 28 38 8 Z" fill="url(#a7wood)"/>

      {/* End caps */}
      <ellipse cx="28" cy="8"  rx="10" ry="3.8" fill="url(#a7end)"/>
      <ellipse cx="28" cy="48" rx="10" ry="3.8" fill="#4A1E08"/>

      {/* Wood stave lines */}
      <path d="M21 10  Q15 28 21 46" stroke="rgba(0,0,0,0.22)" strokeWidth="1.4" fill="none"/>
      <path d="M24.5 8.5 Q20 28 24.5 47.5" stroke="rgba(0,0,0,0.17)" strokeWidth="1.1" fill="none"/>
      <path d="M28 8 L28 48" stroke="rgba(0,0,0,0.16)" strokeWidth="1.1" fill="none"/>
      <path d="M31.5 8.5 Q36 28 31.5 47.5" stroke="rgba(0,0,0,0.17)" strokeWidth="1.1" fill="none"/>
      <path d="M35 10  Q41 28 35 46" stroke="rgba(0,0,0,0.22)" strokeWidth="1.4" fill="none"/>

      {/* Wood grain (subtle) */}
      <path d="M20 22 Q28 25 36 22" stroke="rgba(180,110,50,0.18)" strokeWidth="0.8" fill="none"/>
      <path d="M19 34 Q28 37 37 34" stroke="rgba(180,110,50,0.16)" strokeWidth="0.8" fill="none"/>

      {/* Metal hoops */}
      <path d="M15 16.5 Q28 20.5 41 16.5"
            stroke="#606060" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      <path d="M15 16.5 Q28 19.5 41 16.5"
            stroke="rgba(255,255,255,0.2)" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
      <path d="M13.5 28 Q28 32.5 42.5 28"
            stroke="#585858" strokeWidth="3.2" fill="none" strokeLinecap="round"/>
      <path d="M13.5 28 Q28 31.5 42.5 28"
            stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M15 39.5 Q28 43 41 39.5"
            stroke="#606060" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      <path d="M15 39.5 Q28 42 41 39.5"
            stroke="rgba(255,255,255,0.2)" strokeWidth="0.9" fill="none" strokeLinecap="round"/>

      {/* Left body highlight */}
      <path d="M18.5 13 Q13.5 28 18.5 43"
            stroke="rgba(255,255,255,0.3)" strokeWidth="2.2" strokeLinecap="round" fill="none"/>

      {/* Bung hole */}
      <ellipse cx="28" cy="28" rx="2.5" ry="1.8" fill="#3A1806" stroke="rgba(0,0,0,0.4)" strokeWidth="0.8"/>
    </svg>
  );
}

export function IconTankTruck() {  // Lv.8 맥주 탱크로리
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="a8tank" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#CCD4D8"/>
          <stop offset="28%"  stopColor="#F0F4F6"/>
          <stop offset="52%"  stopColor="#FCFCFC"/>
          <stop offset="76%"  stopColor="#E4E8EA"/>
          <stop offset="100%" stopColor="#A8B4B8"/>
        </linearGradient>
        <linearGradient id="a8end" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#C0C8CC"/>
          <stop offset="100%" stopColor="#98A4A8"/>
        </linearGradient>
        <linearGradient id="a8cab" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#E4E4E4"/>
          <stop offset="100%" stopColor="#CCCCCC"/>
        </linearGradient>
      </defs>

      {/* Tank cylinder body */}
      <rect x="16" y="15" width="38" height="21" fill="url(#a8tank)"/>
      {/* Right end cap */}
      <ellipse cx="54" cy="25.5" rx="4.2" ry="10.5" fill="url(#a8end)"/>
      {/* Left end */}
      <ellipse cx="16" cy="25.5" rx="3.8" ry="10.5" fill="#C0C8CC"/>

      {/* Tank top shine strip */}
      <path d="M20 15.5 Q38 13.8 52 15.5"
            stroke="rgba(255,255,255,0.65)" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      {/* Secondary highlight */}
      <path d="M22 16.5 Q38 15 50 16.5"
            stroke="rgba(255,255,255,0.32)" strokeWidth="1.2" fill="none" strokeLinecap="round"/>

      {/* Circumferential seams */}
      <line x1="30" y1="15" x2="30" y2="36" stroke="rgba(140,155,160,0.3)" strokeWidth="0.9"/>
      <line x1="44" y1="15" x2="44" y2="36" stroke="rgba(140,155,160,0.3)" strokeWidth="0.9"/>

      {/* Ladder on tank */}
      <rect x="19" y="15" width="1.5" height="21" fill="rgba(140,155,160,0.28)"/>

      {/* Cab */}
      <rect x="2" y="17" width="16" height="21" rx="2.2" fill="url(#a8cab)"/>
      {/* Windshield */}
      <rect x="3.5" y="19" width="13" height="9.5" rx="1.8" fill="#A8D8F2" opacity="0.88"/>
      {/* Windshield divider */}
      <line x1="10" y1="19" x2="10" y2="28.5" stroke="rgba(255,255,255,0.52)" strokeWidth="0.8"/>
      {/* Cab bottom grill */}
      <rect x="3.5" y="30" width="13" height="5" rx="1" fill="rgba(0,0,0,0.12)"/>
      <line x1="6" y1="30" x2="6" y2="35" stroke="rgba(0,0,0,0.18)" strokeWidth="0.7"/>
      <line x1="10" y1="30" x2="10" y2="35" stroke="rgba(0,0,0,0.18)" strokeWidth="0.7"/>
      <line x1="14" y1="30" x2="14" y2="35" stroke="rgba(0,0,0,0.18)" strokeWidth="0.7"/>

      {/* Side mirror */}
      <rect x="0.5" y="21" width="2" height="3.5" rx="0.7" fill="#C0C0C0"/>

      {/* Chassis beam */}
      <rect x="2" y="36" width="52" height="4" rx="1.2" fill="#404040"/>

      {/* Wheels */}
      <circle cx="9"  cy="43" r="5.2" fill="#202020"/>
      <circle cx="9"  cy="43" r="3"   fill="#383838"/>
      <circle cx="9"  cy="43" r="1.3" fill="#606060"/>
      <circle cx="9"  cy="43" r="0.5" fill="#484848"/>

      <circle cx="31" cy="43" r="4.8" fill="#202020"/>
      <circle cx="31" cy="43" r="2.7" fill="#383838"/>
      <circle cx="31" cy="43" r="1.2" fill="#606060"/>

      <circle cx="43" cy="43" r="4.8" fill="#202020"/>
      <circle cx="43" cy="43" r="2.7" fill="#383838"/>
      <circle cx="43" cy="43" r="1.2" fill="#606060"/>
    </svg>
  );
}

export function IconFactoryTank() {  // Lv.9 공장 저장 탱크
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="a9fa" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#747474"/>
          <stop offset="20%"  stopColor="#C0C0C0"/>
          <stop offset="40%"  stopColor="#E8E8E8"/>
          <stop offset="60%"  stopColor="#D4D4D4"/>
          <stop offset="100%" stopColor="#6C6C6C"/>
        </linearGradient>
        <linearGradient id="a9fb" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#646464"/>
          <stop offset="28%"  stopColor="#B0B0B0"/>
          <stop offset="55%"  stopColor="#D4D4D4"/>
          <stop offset="100%" stopColor="#5C5C5C"/>
        </linearGradient>
        <linearGradient id="a9dome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#DCDCDC"/>
          <stop offset="100%" stopColor="#9C9C9C"/>
        </linearGradient>
        <radialGradient id="a9port" cx="38%" cy="35%" r="62%">
          <stop offset="0%"   stopColor="#8898A8"/>
          <stop offset="100%" stopColor="#506070"/>
        </radialGradient>
      </defs>

      {/* Left silo (background) */}
      <rect x="4" y="20" width="18" height="33" rx="1.5" fill="url(#a9fb)" opacity="0.78"/>
      {/* Left silo dome */}
      <path d="M4 20 Q4 11 13 9 Q22 11 22 20" fill="#BCBCBC" opacity="0.8"/>
      <ellipse cx="13" cy="53" rx="9" ry="2.5" fill="#808080" opacity="0.8"/>
      {/* Left highlight */}
      <rect x="6" y="22" width="2.5" height="29" rx="1.2" fill="rgba(255,255,255,0.26)" opacity="0.8"/>

      {/* Right silo (foreground) */}
      <rect x="26" y="13" width="24" height="40" rx="1.5" fill="url(#a9fa)"/>
      {/* Right silo dome */}
      <path d="M26 13 Q26 2.5 38 1.5 Q50 2.5 50 13" fill="#D0D0D0"/>
      <ellipse cx="38" cy="13" rx="12" ry="4" fill="url(#a9dome)"/>
      <ellipse cx="38" cy="53" rx="12" ry="3.2" fill="#888888"/>

      {/* Band seams */}
      <rect x="26" y="23" width="24" height="1.3" fill="rgba(90,90,90,0.24)"/>
      <rect x="26" y="33" width="24" height="1.3" fill="rgba(90,90,90,0.24)"/>
      <rect x="26" y="43" width="24" height="1.3" fill="rgba(90,90,90,0.24)"/>

      {/* Porthole */}
      <ellipse cx="38" cy="28" rx="5.5" ry="4.5" fill="#A4B0B0" stroke="#888" strokeWidth="1.1"/>
      <ellipse cx="38" cy="28" rx="3.8" ry="3"    fill="url(#a9port)"/>
      <ellipse cx="37" cy="27" rx="1.5" ry="1"    fill="rgba(200,220,228,0.45)"/>
      <line x1="32.5" y1="28" x2="43.5" y2="28" stroke="rgba(200,200,200,0.5)" strokeWidth="0.8"/>
      <line x1="38" y1="23.5" x2="38" y2="32.5" stroke="rgba(200,200,200,0.5)" strokeWidth="0.8"/>

      {/* Red access ladder */}
      <rect x="49.5" y="13" width="2.5" height="40" fill="#C02020"/>
      <rect x="47.5" y="20" width="6.5" height="1.2" fill="#C02020"/>
      <rect x="47.5" y="28" width="6.5" height="1.2" fill="#C02020"/>
      <rect x="47.5" y="36" width="6.5" height="1.2" fill="#C02020"/>
      <rect x="47.5" y="44" width="6.5" height="1.2" fill="#C02020"/>
      <rect x="49.5" y="13" width="2.5" height="1"   fill="#D83030"/>

      {/* Right silo highlights */}
      <rect x="28" y="15" width="3.5" height="36" rx="1.7" fill="rgba(255,255,255,0.38)"/>
      <rect x="33" y="15" width="1.5" height="36" rx="0.7" fill="rgba(255,255,255,0.18)"/>

      {/* Ground line */}
      <rect x="1" y="53" width="54" height="2" rx="1" fill="#989898"/>
    </svg>
  );
}

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
