import { Coffee } from "lucide-react";

export default function CafeMarker({ cafe, onClick }) {
  return (
    <button className="pixel-btn" type="button" onClick={() => onClick?.(cafe)} aria-label={`Xem ${cafe.name}`}>
      <Coffee size={20} />
    </button>
  );
}
