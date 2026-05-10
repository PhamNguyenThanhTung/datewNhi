import { bucketSuggestions } from "../../../data/questions";
import { IS } from "../../../styles/global";

export default function BucketTab({ bucket, newItem, setNewItem, addItem, addSuggestion, toggleItem, removeItem }) {
  return (
    <div style={{ animation: "fadeUp 0.4s ease" }}>
      <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 4 }}>🌟 Danh sách ước mơ</div>
      <div style={{ color: "#555", fontSize: 13, marginBottom: 18 }}>Những điều muốn làm cùng nhau. Lỡ thêm nhầm thì có thể xóa.</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <input value={newItem} onChange={(e) => setNewItem(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addItem()} placeholder="Thêm điều mới..." style={{ ...IS, flex: 1, padding: "11px 13px" }} />
        <button onClick={addItem} style={{ background: "linear-gradient(135deg,#ff6b9d,#a78bfa)", border: "none", borderRadius: 12, padding: "0 16px", color: "#fff", fontSize: 18, cursor: "pointer" }}>+</button>
      </div>
      <div style={{ marginBottom: 12 }}>
        {bucketSuggestions.filter((s) => !bucket.find((b) => b.text === s)).map((s, i) => (
          <span key={s} onClick={() => addSuggestion(s, i)} style={{ display: "inline-flex", cursor: "pointer", background: "rgba(255,255,255,0.04)", border: "1px dashed rgba(255,255,255,0.09)", borderRadius: 99, padding: "4px 11px", fontSize: 12, color: "#555", margin: "0 6px 6px 0" }}>
            + {s}
          </span>
        ))}
      </div>
      {bucket.map((item, i) => (
        <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 11, background: item.done ? "rgba(39,174,96,0.08)" : "rgba(255,255,255,0.04)", border: `1px solid ${item.done ? "rgba(39,174,96,0.22)" : "rgba(255,255,255,0.06)"}`, borderRadius: 14, padding: "10px 12px", marginBottom: 9, animation: `fadeUp 0.3s ease ${i * 0.04}s both`, transition: "all 0.2s" }}>
          <button onClick={() => toggleItem(item.id)} style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: 18, padding: 4 }}>{item.done ? "✅" : "⭕"}</button>
          <span onClick={() => toggleItem(item.id)} style={{ color: item.done ? "#555" : "#ddd", fontSize: 14, textDecoration: item.done ? "line-through" : "none", flex: 1, cursor: "pointer" }}>{item.text}</span>
          <button onClick={() => removeItem(item.id)} aria-label="Xóa mục" style={{ background: "rgba(255,100,100,0.08)", border: "1px solid rgba(255,100,100,0.14)", borderRadius: 10, color: "#ff6b6b", cursor: "pointer", fontSize: 13, padding: "6px 9px" }}>Xóa</button>
        </div>
      ))}
    </div>
  );
}
