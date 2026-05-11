import { useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import { uploadMemory, deleteMemory } from "../../../lib/coupleService";
import { isSupabaseConfigured } from "../../../lib/supabaseClient";
import { BS, IS } from "../../../styles/global";

export default function AlbumTab({ user, roomId, memories, setMemories, onDeleteMemory }) {
  const inputRef = useRef(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const longPressTimer = useRef(null);

  const compressImage = async (file) => {
    try {
      const options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 1080,
        useWebWorker: true,
      };
      return await imageCompression(file, options);
    } catch (err) {
      console.error("Compression error:", err);
      return file;
    }
  };

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
      const compressedFile = await compressImage(file);
      if (!isSupabaseConfigured) {
        addLocalMemory(compressedFile);
        return;
      }
      const memory = await uploadMemory(roomId, user.id, compressedFile, caption.trim());
      setMemories((items) => [memory, ...items]);
      setCaption("");
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleImagePress = (memory) => {
    setSelectedMemory(memory);
    setShowMenu(false);
  };

  const handleMouseDown = (memory) => {
    longPressTimer.current = setTimeout(() => {
      setSelectedMemory(memory);
      setShowMenu(true);
    }, 500);
  };

  const handleMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const handleTouchStart = (memory) => {
    longPressTimer.current = setTimeout(() => {
      setSelectedMemory(memory);
      setShowMenu(true);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

const handleDelete = async () => {
  if (!selectedMemory) return;
  if (onDeleteMemory) {
    await onDeleteMemory(selectedMemory);
  } else {
    console.warn("onDeleteMemory chưa được cung cấp, không thể xóa");
  }
  setSelectedMemory(null);
  setShowMenu(false);
};
  const handleSave = async () => {
    if (!selectedMemory) return;
    const a = document.createElement("a");
    a.href = selectedMemory.image_url;
    a.download = `memory-${selectedMemory.id}.jpg`;
    a.click();
    setSelectedMemory(null);
    setShowMenu(false);
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
          <div
            key={memory.id}
            onClick={() => handleImagePress(memory)}
            onMouseDown={() => handleMouseDown(memory)}
            onMouseUp={handleMouseUp}
            onMouseLeave={(e) => {
              handleMouseUp();
              e.currentTarget.style.transform = "scale(1)";
            }}
            onTouchStart={() => handleTouchStart(memory)}
            onTouchEnd={handleTouchEnd}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 14,
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
          >
            <img src={memory.image_url} alt={memory.caption || "Kỷ niệm"} style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover", display: "block" }} />
            {memory.caption && <div style={{ color: "#ccc", fontSize: 12, lineHeight: 1.4, padding: "8px 10px", background: "rgba(0,0,0,0.3)" }}>{memory.caption}</div>}
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {selectedMemory && !showMenu && (
        <div
          onClick={() => setSelectedMemory(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            padding: 20,
          }}
        >
          <img
            src={selectedMemory.image_url}
            alt={selectedMemory.caption || "Kỷ niệm"}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "100%", maxHeight: "90%", borderRadius: 12, animation: "pop 0.3s ease" }}
          />
          {selectedMemory.caption && (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "fixed",
                bottom: 80,
                left: 0,
                right: 0,
                padding: 16,
                background: "rgba(0,0,0,0.7)",
                color: "#ddd",
                textAlign: "center",
                fontSize: 14,
              }}
            >
              {selectedMemory.caption}
            </div>
          )}
          <div style={{ position: "fixed", bottom: 20, left: 0, right: 0, textAlign: "center", color: "#666", fontSize: 12 }}>Ấn giữ để xóa hoặc lưu • Ấn bất kỳ chỗ để đóng</div>
        </div>
      )}

      {/* Long Press Menu */}
      {showMenu && selectedMemory && (
        <div
          onClick={() => {
            setShowMenu(false);
            setSelectedMemory(null);
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 60,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(135deg, #0a0a12 0%, #1a0a1f 100%)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
            }}
          >
            <img src={selectedMemory.image_url} alt="Preview" style={{ width: 200, height: 200, objectFit: "cover" }} />
            <div style={{ padding: 16 }}>
              {selectedMemory.caption && <div style={{ color: "#aaa", fontSize: 12, marginBottom: 12 }}>{selectedMemory.caption}</div>}
              <button onClick={handleSave} style={{ ...BS("#2ecc71"), marginBottom: 8 }}>💾 Lưu ảnh</button>
              <button onClick={handleDelete} style={{ ...BS("#e74c3c") }}>🗑️ Xóa</button>
              <button onClick={() => setShowMenu(false)} style={{ ...BS("rgba(255,255,255,0.06)"), boxShadow: "none", border: "1px solid rgba(255,255,255,0.08)", color: "#888" }}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}