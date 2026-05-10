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

export default function App() {
  const [localUser, setLocalUser] = useLS("lhn_user", null);
  const [localCouple, setLocalCouple] = useLS("lhn_couple", null);
  const [user, setUser] = useState(localUser);
  const [couple, setCouple] = useState(localCouple);
  const [screen, setScreen] = useState(localUser ? (localCouple ? "app" : "setup") : "login");
  const [booting, setBooting] = useState(isSupabaseConfigured);
  const [bootError, setBootError] = useState("");

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let mounted = true;

    // 1. KHỞI TẠO ONESIGNAL
    import("react-onesignal").then((OneSignal) => {
      OneSignal.default.init({
        appId: "7602eae8-63b0-4fe5-92e4-5c13f3bac45f",
        allowLocalhostAsSecureOrigin: true,
        notifyButton: { enable: false },
      });
    });

    const timeout = window.setTimeout(() => {
      if (!mounted) return;
      setBootError("Đăng nhập mất quá lâu. Hãy kiểm tra kết nối mạng và thử lại.");
      setBooting(false);
    }, 12000);

    // 2. HÀM XỬ LÝ ĐĂNG NHẬP (APPLY SESSION)
    const applySession = async (authUser = null) => {
      try {
        const { user: sessionUser, profile } = await getSessionProfile();
        if (!mounted) return;

        // Nếu đang trong quá trình đăng ký (có auth nhưng chưa có profile) thì chờ
        if (authUser && !profile) {
          console.log("Đang chờ khởi tạo profile...");
          return; 
        }

        const nextUser = sessionUser || (authUser ? profileToUser(profile, authUser) : null);
        
        if (!nextUser) {
          setUser(null);
          setCouple(null);
          setLocalUser(null);
          setLocalCouple(null);
          setScreen("login");
          return;
        }

        // Đồng bộ ID với OneSignal để nhận thông báo chuẩn
        import("react-onesignal").then((OneSignal) => {
          OneSignal.default.login(nextUser.id);
        });

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

    // 3. XỬ LÝ AUTH STATE CHANGE & URL PARAMS
    const params = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const authError = params.get("error_description") || hashParams.get("error_description") || params.get("error") || hashParams.get("error");
    
    if (authError) {
      setBootError(authError);
      setBooting(false);
    } else {
      applySession();
    }

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      if (!session?.user) {
        setUser(null);
        setCouple(null);
        setLocalUser(null);
        setLocalCouple(null);
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