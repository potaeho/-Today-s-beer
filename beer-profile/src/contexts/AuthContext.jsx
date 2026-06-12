import { createContext, useContext, useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);   // Supabase auth user
  const [profile, setProfile] = useState(null);   // public.users row
  const [loading, setLoading] = useState(true);

  // 가장 최근 fetchProfile 요청 식별 — 늦게 끝난 옛 요청이 최신 profile을 덮어쓰지 않도록
  const profileReqId = useRef(0);

  // 프로필 fetch
  async function fetchProfile(userId) {
    const reqId = ++profileReqId.current;
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();
    if (reqId !== profileReqId.current) return; // stale 응답 폐기
    setProfile(data ?? null);
  }

  useEffect(() => {
    // 초기 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) fetchProfile(u.id);
      setLoading(false);
    });

    // 로그인 / 로그아웃 상태 변화 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const u = session?.user ?? null;
        setUser(u);
        if (u) fetchProfile(u.id);
        else setProfile(null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  /* ─── 소셜 로그인 ─────────────────────────────── */
  const signInWithKakao = () =>
    supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: { redirectTo: window.location.origin },
    });

  const signInWithGoogle = () =>
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });

  const signInWithApple = () =>
    supabase.auth.signInWithOAuth({
      provider: "apple",
      options: { redirectTo: window.location.origin },
    });

  const signOut = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider
      value={{
        user,           // auth user (id, email, …)
        profile,        // public.users row (username, handle, avatar_url, …)
        loading,
        isLoggedIn: !!user,
        signInWithKakao,
        signInWithGoogle,
        signInWithApple,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
