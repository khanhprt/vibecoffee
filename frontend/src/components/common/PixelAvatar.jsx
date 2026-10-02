import { useState } from "react";

const boardUsernames = [
  "bean.master", "coffee.love", "hanoicafe", "latte.girl", "cappu.holic",
  "matcha.day", "chill.brew", "saigon.coffee", "vietnam.beans", "cafe.traveler"
];

function avatarIndex(user) {
  const identity = String(user?.username || user?.name || user?.id || "").replace(/^@/, "").toLowerCase();
  const boardIndex = boardUsernames.indexOf(identity);
  if (boardIndex >= 0) return boardIndex;
  let hash = 0;
  for (const character of identity) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  return hash % 10;
}

export default function PixelAvatar({ user, className = "" }) {
  const [failedUrl, setFailedUrl] = useState(null);
  const index = avatarIndex(user);
  const imageUrl = user?.avatarUrl;
  const customImage = imageUrl && imageUrl !== failedUrl;

  return (
    <span className={`pixel-avatar ${className}`} role="img" aria-label={`Avatar ${user?.username || user?.name || "Vibe Coffee"}`}>
      {customImage ? (
        <img className="pixel-avatar-image" src={imageUrl} alt="" onError={() => setFailedUrl(imageUrl)} />
      ) : (
        <span
          className="pixel-avatar-sprite"
          style={{ "--avatar-x": `${(index % 5) * 25}%`, "--avatar-y": index < 5 ? "35.5%" : "63%" }}
        />
      )}
    </span>
  );
}
