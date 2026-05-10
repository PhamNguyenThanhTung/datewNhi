import { useRef } from "react";

export default function Avatar({ src, name, size = 48, editable = false, onUpload }) {
  const ref = useRef();
  const initials = (name || "?").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const colors = ["#ff6b9d", "#a78bfa", "#60efff", "#ffd166", "#ff8e53", "#27ae60"];
  const bg = colors[(name || "?").charCodeAt(0) % colors.length];

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    onUpload?.(file);
    e.target.value = "";
  };

  return (
    <div className="avt-wrap" style={{ position: "relative", width: size, height: size, cursor: editable ? "pointer" : "default", flexShrink: 0 }} onClick={() => editable && ref.current?.click()}>
      {src ? (
        <img src={src} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,255,255,0.12)", display: "block" }} alt={name} />
      ) : (
        <div style={{ width: size, height: size, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.34, fontWeight: 900, color: "#fff", border: "2px solid rgba(255,255,255,0.12)" }}>{initials}</div>
      )}
      {editable && (
        <>
          <div className="avt-overlay" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.2s" }}>
            <span style={{ fontSize: size * 0.3 }}>📷</span>
          </div>
          <input ref={ref} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
        </>
      )}
    </div>
  );
}
