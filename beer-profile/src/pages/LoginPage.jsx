import { useAuth } from "../contexts/AuthContext";

/* ── 아이콘 SVG (인라인) ───────────────────────── */
function KakaoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3C6.477 3 2 6.589 2 11.012c0 2.867 1.845 5.39 4.633 6.843l-.93 3.47a.3.3 0 0 0 .437.336l4.127-2.743c.571.08 1.153.12 1.733.12 5.523 0 10-3.589 10-8.026C22 6.589 17.523 3 12 3z"
        fill="currentColor"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}

export default function LoginPage({ onClose }) {
  const { signInWithKakao, signInWithGoogle, signInWithApple } = useAuth();

  return (
    <div className="login-overlay">
      <div className="login-sheet">

        {/* 닫기 버튼 */}
        {onClose && (
          <button className="login-close-btn" onClick={onClose} aria-label="닫기">✕</button>
        )}

        {/* 로고 + 타이틀 */}
        <div className="login-hero">
          <div className="login-logo">🍺</div>
          <h1 className="login-title">오늘의 맥주</h1>
          <p className="login-subtitle">
            내 취향을 기록하고<br />
            맥주 여정을 시작해보세요
          </p>
        </div>

        {/* 소셜 로그인 버튼들 */}
        <div className="login-buttons">
          <button
            className="login-btn login-btn--kakao"
            onClick={signInWithKakao}
          >
            <KakaoIcon />
            카카오로 계속하기
          </button>

          <button
            className="login-btn login-btn--google"
            onClick={signInWithGoogle}
          >
            <GoogleIcon />
            구글로 계속하기
          </button>

          <button
            className="login-btn login-btn--apple"
            onClick={signInWithApple}
          >
            <AppleIcon />
            Apple로 계속하기
          </button>
        </div>

        {/* 개인정보 보호 안내 */}
        <div className="login-privacy">
          <ShieldIcon />
          <span>
            소셜 계정으로만 로그인하며, 비밀번호를 저장하지 않습니다.<br />
            개인정보는 암호화되어 안전하게 보호됩니다.
          </span>
        </div>

        <p className="login-terms">
          계속 진행하면 <a href="#" onClick={(e) => e.preventDefault()}>이용약관</a>과{" "}
          <a href="#" onClick={(e) => e.preventDefault()}>개인정보처리방침</a>에 동의하는 것으로 간주합니다.
        </p>
      </div>
    </div>
  );
}
