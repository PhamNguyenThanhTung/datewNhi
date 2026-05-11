import { useEffect, useState } from "react";
import Particles from "./components/Particles";
import useLS from "./hooks/useLS";
import { G } from "./styles/global";
import LoginScreen from "./screens/LoginScreen";
import SetupScreen from "./screens/SetupScreen";
import CodeShare from "./screens/CodeShare";
import MainApp from "./screens/MainApp/MainApp";
import { getMyRoom, getSessionProfile, profileToUser, signOut, updateProfile } from "./lib/coupleService";
import { isSupabaseConfigured, supabase } from "./lib/supabaseClient";
import OneSignal from 'react-onesignal';

// ✅ Biến ngoài component để giữ trạng thái OneSignal
let isOneSignalInitialized = false;
let oneSignalReady = false; // Đánh dấu SDK đã sẵn sàng để login

export default function App() {
  const [localUser, setLocalUser] = useLS("lhn_user", null);
  const [localCouple, setLocalCouple] = useLS("lhn_couple", null);
  const [user, setUser] = useState(localUser);
  const [couple, setCouple] = useState(localCouple);
  const [screen, setScreen] = useState(localUser ? (localCouple ? "app" : "setup") : "login");
  const [booting, setBooting] = useState(isSupabaseConfigured);
  const [bootError, setBootError] = useState("");


// Trong useEffect (giữ nguyên phần đầu)
useEffect(() => {
  if (!isSupabaseConfigured) return;
  let mounted = true;

  // Visibility change – refresh nhẹ, tránh spam
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible' && isSupabaseConfigured) {
      supabase.auth.refreshSession().catch(() => {});
    }
  };
  document.addEventListener('visibilitychange', handleVisibilityChange);

  // OneSignal init
  const initOneSignal = async () => {
    try {
      await OneSignal.init({
        appId: "7602eae8-63b0-4fe5-92e4-5c13f3bac45f",
        allowLocalhostAsSecureOrigin: true,
        notifyButton: { enable: false },
      });
      // Chờ cho đến khi OneSignal.initialized === true (tối đa 30s)
      for (let i = 0; i < 15; i++) {
        if (OneSignal.initialized) break;
        await new Promise(r => setTimeout(r, 1000));
      }
      if (OneSignal.initialized) {
        console.log("✅ OneSignal đã sẵn sàng");
        oneSignalReady = true;
        if (OneSignal.Slidedown) OneSignal.Slidedown.promptPush();
      } else {
        console.warn("⚠️ OneSignal không sẵn sàng sau 15s");
        oneSignalReady = true; // vẫn set để không treo
      }
    } catch (e) {
      if (!e.message?.includes("SDK already initialized")) {
        console.warn("🚨 OneSignal:", e);
      }
      oneSignalReady = true; // vẫn cho phép tiếp tục
    }
  };
  initOneSignal();

  // Hàm login OneSignal nhẹ nhàng
  const loginToOneSignal = async (userId) => {
    // Chờ oneSignalReady (tối đa 10s)
    for (let i = 0; i < 20; i++) {
      if (oneSignalReady || !mounted) break;
      await new Promise(r => setTimeout(r, 500));
    }
    if (!oneSignalReady || !mounted) return;
    try {
      if (OneSignal.initialized) {
        await OneSignal.login(String(userId));
        console.log("✅ Đăng nhập OneSignal thành công");
      }
    } catch (err) {
      console.warn("⚠️ Lỗi đăng nhập OneSignal:", err.message);
    }
  };

  // Timeout nếu khởi động quá lâu
  const timeout = window.setTimeout(() => {
    if (!mounted) return;
    setBootError("Đăng nhập mất quá lâu. Hãy kiểm tra kết nối mạng và thử lại.");
    setBooting(false);
  }, 12000);

  // Hàm applySession chính
  const applySession = async (authUser = null) => {
    try {
      // KHÔNG refresh session ở đây để tránh 429 – Supabase đã tự động refresh
      const { user: sessionUser, profile } = await getSessionProfile();
      if (!mounted) return;

      if (authUser && !profile) {
        console.log("Đang chờ khởi tạo profile...");
        return;
      }

      const nextUser = sessionUser || (authUser ? profileToUser(profile, authUser) : null);
      if (!nextUser) {
        // Thử lại lấy session một lần nữa
        const retry = await supabase.auth.getSession();
        if (retry?.data?.session?.user) {
          console.log("Session tồn tại, chờ profile...");
          return;
        }
        // Thực sự không có session
        setUser(null);
        setCouple(null);
        setLocalUser(null);
        setLocalCouple(null);
        setScreen("login");
        return;
      }

      // Login OneSignal không chặn
      loginToOneSignal(nextUser.id);

      const room = await getMyRoom(nextUser);
      if (!mounted) return;

      setUser(nextUser);
      setLocalUser(nextUser);
      setCouple(room);
      setLocalCouple(room);
      setScreen(room ? "app" : "setup");
    } catch (error) {
      console.error("Lỗi Apply Session:", error);
      if (mounted) setBootError(error.message || "Không thể hoàn tất đăng nhập.");
    } finally {
      window.clearTimeout(timeout);
      if (mounted) setBooting(false);
    }
  };

  // Xử lý auth error từ URL
  const params = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const authError = params.get("error_description") || hashParams.get("error_description") || params.get("error") || hashParams.get("error");
  if (authError) {
    setBootError(authError);
    setBooting(false);
  } else {
    applySession();
  }

  // Lắng nghe auth state change
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    if (!mounted) return;
    if (!session?.user) {
      setUser(null); setCouple(null);
      setLocalUser(null); setLocalCouple(null);
      setScreen("login");
      setBooting(false);
      return;
    }
    applySession(session.user);
  });

  return () => {
    mounted = false;
    window.clearTimeout(timeout);
    data.subscription.unsubscribe();
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}, [setLocalCouple, setLocalUser]);

  const handleLogin = (u) => {
    setUser(u);
    setLocalUser(u);
    setScreen("setup");
  };

  const handleSetup = (c) => {
    const full = { ...c, myName: user.name };
    setCouple(full);
    setLocalCouple(full);
    setScreen(c.role === "A" ? "share" : "app");
  };

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    setCouple(null);
    setLocalUser(null);
    setLocalCouple(null);
    setScreen("login");
  };

  const handleUpdateUser = async (u) => {
    const next = isSupabaseConfigured ? await updateProfile(user, u) : u;
    setUser(next);
    setLocalUser(next);
  };

  if (booting || bootError) {
    return (
      <>
        <style>{G}</style>
        <div style={{ fontFamily: "'Nunito',sans-serif", background: "radial-gradient(ellipse at 25% 15%,#1a0a1e,#0a0a12 55%,#0c0a18)", minHeight: "100vh", display: "grid", placeItems: "center", color: "#777", padding: 24, textAlign: "center" }}>
          <div style={{ maxWidth: 360 }}>
            <div style={{ fontSize: 42, marginBottom: 12 }}>{bootError ? "⚠️" : "🕯️"}</div>
            <div style={{ color: bootError ? "#ff8e53" : "#777", fontSize: 14, lineHeight: 1.6 }}>{bootError || "Đang mở Lửa Nhỏ..."}</div>
            {bootError && (
              <button onClick={() => window.location.assign(window.location.origin)} style={{ marginTop: 16, background: "linear-gradient(135deg,#ff6b9d,#a78bfa)", border: "none", borderRadius: 14, padding: "12px 18px", color: "#fff", fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>
                Quay lại đăng nhập
              </button>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{G}</style>
      <div style={{ fontFamily: "'Nunito',sans-serif", background: "radial-gradient(ellipse at 25% 15%,#1a0a1e,#0a0a12 55%,#0c0a18)", minHeight: "100vh" }}>
        <Particles />
        <div style={{ position: "relative", zIndex: 1 }}>
          {screen === "login" && <LoginScreen onLogin={handleLogin} />}
          {screen === "setup" && user && <SetupScreen user={user} onSetup={handleSetup} />}
          {screen === "share" && couple && <CodeShare couple={couple} onReady={() => setScreen("app")} />}
          {screen === "app" && user && couple && <MainApp user={user} couple={couple} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />}
        </div>
      </div>
    </>
  );
}
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}