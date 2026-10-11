import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Camera, ChevronDown, Crown, Heart, Medal, Sparkles, Star, Trophy } from "lucide-react";
import AmbientPetals from "../components/common/AmbientPetals.jsx";
import PixelAvatar from "../components/common/PixelAvatar.jsx";
import { assetUrl } from "../utils/assetUrl.js";
import { getLeaderboard } from "../services/leaderboardService.js";

const tabs = [
  { id: "overall", label: "Bang xep hang chung", icon: Trophy },
  { id: "checkin", label: "Top Vibe Check", icon: Medal },
  { id: "photo", label: "Top Anh dep", icon: Camera },
  { id: "quest", label: "Top Hoan thanh Quest", icon: Star }
];

const filters = {
  time: ["Tuan nay", "Thang nay", "Tat ca thoi gian"],
  region: ["Toan quoc", "Ha Noi", "TP. Ho Chi Minh", "Da Nang", "Khac"]
};

function fmt(value) {
  return Number(value || 0).toLocaleString("en-US");
}

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("overall");
  const leaderboardQuery = useQuery({
    queryKey: ["leaderboard", activeTab],
    queryFn: () => getLeaderboard({ period: activeTab })
  });
  const leaders = leaderboardQuery.data?.users || [];
  const podium = [leaders[1], leaders[0], leaders[2]].filter(Boolean);
  const rows = leaders.slice(3);

  return (
    <section className="board-page">
      <div className="board-hero">
        <AmbientPetals />
        <div className="board-title-wrap">
          <Crown size={54} />
          <h1>Vibe Board</h1>
          <p>Nhung tam hon yeu ca phe toa sang</p>
        </div>
      </div>

      <nav className="board-tabs" aria-label="Vibe Board tabs">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            aria-pressed={activeTab === id}
            className={activeTab === id ? "active" : ""}
            key={id}
            onClick={() => setActiveTab(id)}
            type="button"
          >
            <Icon size={24} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="board-content">
        <aside className="board-filter-panel">
          <FilterGroup icon="calendar" title="Thoi gian" items={filters.time} />
          <FilterGroup icon="pin" title="Khu vuc" items={filters.region} withSelect />
          <div className="board-cat-note">
            <img src={assetUrl("board-calico-cat.png")} alt="Pixel companion" />
            <p>Cung nhau tao nen cong dong yeu ca phe that tuyet voi nhe!</p>
          </div>
        </aside>

        <main className="board-main">
          <div className="sparkle-field" aria-hidden="true">
            {Array.from({ length: 14 }).map((_, index) => (
              <i key={index}>{index % 3 === 0 ? <Heart size={15} fill="#ffc2db" /> : <Sparkles size={13} fill="#fff0a6" />}</i>
            ))}
          </div>
          <div className="podium-row">
            {podium.map((user) => (
              <article className={`podium-card place-${user.rank}`} key={user.username}>
                <span className={`podium-crown crown-${user.rank}`} aria-hidden="true" />
                <PixelAvatar user={user} className="board-avatar" />
                <h2>{user.username}</h2>
                <p>Lv. {user.level} <b>{user.badge}</b></p>
                <div className="podium-score">
                  <span className="podium-coffee" aria-hidden="true" />
                  <div><strong>{fmt(user.checkins)}</strong><small>Vibe Check</small></div>
                </div>
              </article>
            ))}
          </div>

          <div className="leader-table" role="table" aria-label="Bang xep hang Vibe Coffee">
            <div className="leader-head" role="row">
              <span>#</span>
              <span>Nguoi dung</span>
              <span>Cap do</span>
              <span>Vibe Check</span>
              <span>Quest</span>
              <span>Diem Vibe</span>
            </div>
            {rows.map((user) => (
              <div className={user.id === "me" ? "leader-row current" : "leader-row"} role="row" key={user.username}>
                <span>{user.rank}</span>
                <span><PixelAvatar user={user} className="mini-avatar" />{user.username}</span>
                <span>Lv. {user.level} <b>{user.badge}</b></span>
                <span><Medal size={17} />{fmt(user.checkins)}</span>
                <span>{user.quests}</span>
                <span><Star size={17} fill="currentColor" />{fmt(user.points || user.totalPoints)}</span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </section>
  );
}

function FilterGroup({ icon, title, items, withSelect }) {
  return (
    <section className="filter-group">
      <h2><span aria-hidden="true">{icon === "calendar" ? "*" : "+"}</span>{title}</h2>
      {items.map((item, index) => (
        <label className={index === 0 ? "active" : ""} key={item}>
          <input defaultChecked={index === 0} name={title} type="radio" />
          <span>{item}</span>
          {withSelect && index === items.length - 1 ? <ChevronDown size={15} /> : null}
        </label>
      ))}
    </section>
  );
}
