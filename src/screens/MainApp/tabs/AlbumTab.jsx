import { useRef, useState } from "react";
import { uploadMemory } from "../../../lib/coupleService";
import { isSupabaseConfigured } from "../../../lib/supabaseClient";
import { BS, IS } from "../../../styles/global";

export default function AlbumTab({ user, roomId, memories, setMemories }) {
  const inputRef = useRef(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const addLocalMemory = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setMemories((items) => [{ id: Date.now(), image_url: event.target.result, caption, created_at: new Date().toISOString() }, ...items]);
      setCaption("");
    };
    reader.readAsDataURL(file);
  };

  const handleFile = async (event) => {
    const file = event.target.files[0];
    event.target.value = "";
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      if (!isSupabaseConfigured) {
        addLocalMemory(file);
        return;
      }
      const memory = await uploadMemory(roomId, user.id, file, caption.trim());
      setMemories((items) => [memory, ...items]);
      setCaption("");
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 4 }}>🖼️ Album kỷ niệm</div>
      <div style={{ color: "#555", fontSize: 13, marginBottom: 18 }}>
        Ảnh được lưu trong Supabase Storage bucket <span style={{ color: "#777", fontFamily: "monospace" }}>memories</span>; bảng <span style={{ color: "#777", fontFamily: "monospace" }}>memories</span> chỉ giữ đường dẫn và chú thích.
      </div>

      <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Chú thích ảnh..." style={{ ...IS, marginBottom: 10 }} />
      <button onClick={() => inputRef.current?.click()} disabled={uploading} style={BS("linear-gradient(135deg,#ff6b9d,#a78bfa)")}>{uploading ? "Đang tải ảnh..." : "Thêm ảnh"}</button>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
      {error && <div style={{ color: "#ff8e53", fontSize: 13, marginBottom: 12 }}>{error}</div>}

      <div style={{ display: "grid", gridTemplateColumns: memories.length ? "1fr 1fr" : "1fr", gap: 10, marginTop: 14 }}>
        {memories.length === 0 ? (
          <div style={{ textAlign: "center", color: "#444", marginTop: 44 }}><div style={{ fontSize: 42 }}>📷</div><p style={{ fontSize: 14 }}>Chưa có ảnh nào.</p></div>
        ) : memories.map((memory) => (
          <div key={memory.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, overflow: "hidden" }}>
            <img src={memory.image_url} alt={memory.caption || "Kỷ niệm"} style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover", display: "block" }} />
            {memory.caption && <div style={{ color: "#ccc", fontSize: 12, lineHeight: 1.4, padding: "8px 10px" }}>{memory.caption}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
