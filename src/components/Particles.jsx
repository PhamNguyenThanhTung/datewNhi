export default function Particles() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {[...Array(14)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            borderRadius: "50%",
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            background: ["#ff6b9d", "#ffd166", "#a78bfa", "#60efff"][i % 4],
            left: `${(i * 37 + 5) % 100}%`,
            top: `${(i * 53 + 10) % 100}%`,
            opacity: 0.18 + (i % 5) * 0.06,
            animation: `float ${7 + (i % 4) * 1.5}s ease-in-out ${(i * 0.6) % 4}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
