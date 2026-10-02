import { Button } from "@chakra-ui/react";
import { CalendarDays, Camera, MapPin, Pencil } from "lucide-react";

import PixelAvatar from "../common/PixelAvatar.jsx";

export default function ProfileHeader({ user, coverUrl, onCoverSelect, onEdit }) {
  const counts = user._count || {};
  const joinedAt = new Intl.DateTimeFormat("vi-VN", {
    month: "long",
    year: "numeric"
  }).format(new Date(user.createdAt));

  const stats = [
    { value: counts.checkins || 0, label: "Vibe Check" },
    { value: counts.photos || 0, label: "Anh da dang" },
    { value: counts.following || 0, label: "Dang theo doi" },
    { value: counts.followers || 0, label: "Nguoi theo doi" }
  ];

  return (
    <section className="profile-hero-panel">
      <div className="profile-cover">
        <img src={coverUrl} alt="Ho Guom trong anh binh minh" />
        <label className="profile-cover-action">
          <Camera size={17} />
          <span>Thay anh bia</span>
          <input type="file" accept="image/*" onChange={onCoverSelect} />
        </label>
      </div>

      <div className="profile-identity">
        <PixelAvatar className="profile-avatar" user={user} />
        <div className="profile-copy">
          <div className="profile-name-row">
            <div>
              <h1>{user.username}</h1>
              <div className="profile-level-line">
                <span>Lv. {Math.max(1, Math.floor(user.totalPoints / 400) + 1)}</span>
                <strong>{user.level}</strong>
              </div>
            </div>
            <Button className="profile-edit-button" leftIcon={<Pencil size={17} />} onClick={onEdit}>
              Chinh sua ho so
            </Button>
          </div>
          <p className="profile-bio">
            {user.bio || "Di ca phe khong chi de uong, ma de song cham lai va luu nhung goc quan that dep."}
          </p>
          <div className="profile-meta">
            <span><MapPin size={15} /> Ha Noi, Viet Nam</span>
            <span><CalendarDays size={15} /> Tham gia {joinedAt}</span>
          </div>
        </div>
      </div>

      <dl className="profile-stats">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dd>{stat.value}</dd>
            <dt>{stat.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
