const petals = [
  { left: "9%", duration: "17s", delay: "-3s" },
  { left: "27%", duration: "20s", delay: "-12s" },
  { left: "46%", duration: "18s", delay: "-7s" },
  { left: "65%", duration: "22s", delay: "-17s" },
  { left: "81%", duration: "19s", delay: "-9s" },
  { left: "94%", duration: "21s", delay: "-14s" }
];

export default function AmbientPetals() {
  return (
    <div className="ambient-petals" aria-hidden="true">
      {petals.map(({ left, duration, delay }) => (
        <i key={left} style={{ left, animationDuration: duration, animationDelay: delay }} />
      ))}
    </div>
  );
}
