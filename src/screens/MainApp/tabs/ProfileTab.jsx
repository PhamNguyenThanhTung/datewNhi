import Avatar from "../../../components/Avatar";
import { uploadAvatar } from "../../../lib/coupleService";
import { isSupabaseConfigured } from "../../../lib/supabaseClient";
import { GB, IS } from "../../../styles/global";

export default function ProfileTab({ user, couple, streak, history, bucket, editMode, setEditMode, editName, setEditName, saveProfile, onLogout, onUpdateUser }) {
  const handleAvatar = async (file) => {
    if (isSupabaseConfigured) {
      const url = await uploadAvatar(user, file);
      onUpdateUser({ ...user, avatar: url });
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => onUpdateUser({ ...user, avatar: event.target.result });
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      <div style={{ textAlign: "center", marginBottom: 26 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <Avatar src={user.avatar} name={user.name} size={86} editable onUpload={handleAvatar} />
        </div>
        <div style={{ color: "#555", fontSize: 11, marginBottom: 10 }}>📷 Nhấn vào ảnh để đổi avatar</div>

        {!editMode ? (
          <>
            <div style={{ fontSize: 21, fontWeight: 800, color: "#fff" }}>{user.name}</div>
            <div style={{ color: "#555", fontSize: 13, marginTop: 2 }}>{user.email}</div>
            <button onClick={() => { setEditName(user.name); setEditMode(true); }} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(255,107,157,0.1)", border: "1px solid rgba(255,107,157,0.2)", borderRadius: 99, padding: "5px 14px", color: "#ff6b9d", fontSize: 12, fontWeight: 700, cursor: "pointer", marginTop: 10, fontFamily: "inherit" }}>
              ✏️ Sửa tên
            </button>
          </>
        ) : (
          <div style={{ animation: "fadeUp 0.3s ease", marginTop: 6 }}>
            <input value={editName} onChange={(e) => setEditName(e.target.value)} style={{ ...IS, textAlign: "center", marginBottom: 10 }} autoFocus />
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <button onClick={saveProfile} style={{ background: "linear-gradient(135deg,#ff6b9d,#a78bfa)", border: "none", borderRadius: 10, padding: "9px 22px", color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Lưu</button>
              <button onClick={() => setEditMode(false)} style={{ ...GB }}>Huỷ</button>
            </div>
          </div>
        )}
      </div>

      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "14px 16px", marginBottom: 14 }}>
        <div style={{ color: "#555", fontSize: 11, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Người ấy</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar name={couple.partnerName} size={42} />
          <div>
            <div style={{ color: "#fff", fontWeight: 700 }}>{couple.partnerName}</div>
            <div style={{ color: "#ff6b9d", fontSize: 12, fontFamily: "monospace", letterSpacing: 2 }}>#{couple.coupleCode}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
        {[{ label: "Streak", value: streak.count, icon: "🔥" }, { label: "Kỷ niệm", value: history.length, icon: "📖" }, { label: "Danh sách", value: bucket.length, icon: "🌟" }, { label: "Hoàn thành", value: bucket.filter((b) => b.done).length, icon: "✅" }].map((s) => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "15px", textAlign: "center" }}>
            <div style={{ fontSize: 22 }}>{s.icon}</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#fff", marginTop: 4 }}>{s.value}</div>
            <div style={{ color: "#555", fontSize: 12 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <button onClick={onLogout} style={{ width: "100%", background: "transparent", border: "1px solid rgba(255,100,100,0.18)", borderRadius: 14, padding: "13px", color: "#ff6b6b", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
        🚪 Đăng xuất
      </button>
    </div>
  );
}
