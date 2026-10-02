import { useState } from "react";
import { Camera, ChevronDown, Crown, Heart, Medal, Sparkles, Star, Trophy } from "lucide-react";
import AmbientPetals from "../components/common/AmbientPetals.jsx";
import PixelAvatar from "../components/common/PixelAvatar.jsx";
import { assetUrl } from "../utils/assetUrl.js";

const tabs = [
  { id: "overall", label: "Bảng xếp hạng chung", icon: Trophy },
  { id: "checkin", label: "Top Vibe Check", icon: Medal },
  { id: "photo", label: "Top Ảnh đẹp", icon: Camera },
  { id: "quest", label: "Top Hoàn thành Quest", icon: Star }
];

const filters = {
  time: ["Tuần này", "Tháng này", "Tất cả thời gian"],
  region: ["Toàn quốc", "Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Khác"]
};

const leaders = [
  { rank: 1, username: "bean.master", level: 25, badge: "Legend", checkins: "1,248", quests: 42, points: "5,860", tone: "gold" },
  { rank: 2, username: "coffee.love", level: 18, badge: "Explorer", checkins: "892", quests: 31, points: "4,120", tone: "blue" },
  { rank: 3, username: "hanoicafe", level: 17, badge: "Explorer", checkins: "756", quests: 29, points: "3,860", tone: "coral" },
  { rank: 4, username: "latte.girl", level: 16, badge: "Explorer", checkins: "682", quests: 28, points: "3,420", tone: "pink" },
  { rank: 5, username: "cappu.holic", level: 15, badge: "Explorer", checkins: "641", quests: 25, points: "3,210", tone: "coral" },
  { rank: 6, username: "matcha.day", level: 14, badge: "Explorer", checkins: "598", quests: 24, points: "2,980", tone: "mint" },
  { rank: 7, username: "chill.brew", level: 13, badge: "Wanderer", checkins: "554", quests: 22, points: "2,760", tone: "pink" },
  { rank: 8, username: "saigon.coffee", level: 13, badge: "Wanderer", checkins: "521", quests: 20, points: "2,605", tone: "coral" },
  { rank: 9, username: "vietnam.beans", level: 12, badge: "Wanderer", checkins: "497", quests: 19, points: "2,485", tone: "mint" },
  { rank: 10, username: "cafe.traveler", level: 11, badge: "Wanderer", checkins: "468", quests: 18, points: "2,340", tone: "pink" }
];

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("overall");
  const podium = [leaders[1], leaders[0], leaders[2]];
  const rows = leaders.slice(3);

  return (
    <section className="board-page">
      <div className="board-hero">
        <AmbientPetals />
        <div className="board-title-wrap">
          <Crown size={54} />
          <h1>Vibe Board</h1>
          <p>Những tâm hồn yêu cà phê tỏa sáng</p>
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
          <FilterGroup icon="calendar" title="Thời gian" items={filters.time} />
          <FilterGroup icon="pin" title="Khu vực" items={filters.region} withSelect />
          <div className="board-cat-note">
            <img src={assetUrl("board-calico-cat.png")} alt="Mèo tam thể pixel" />
            <p>Cùng nhau tạo nên cộng đồng yêu cà phê thật tuyệt vời nhé!</p>
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
                  <div><strong>{user.checkins}</strong><small>Vibe Check</small></div>
                </div>
              </article>
            ))}
          </div>

          <div className="leader-table" role="table" aria-label="Bảng xếp hạng Vibe Coffee">
            <div className="leader-head" role="row">
              <span>#</span>
              <span>Người dùng</span>
              <span>Cấp độ</span>
              <span>Vibe Check</span>
              <span>Quest</span>
              <span>Điểm Vibe</span>
            </div>
            {rows.map((user) => (
              <div className="leader-row" role="row" key={user.username}>
                <span>{user.rank}</span>
                <span><PixelAvatar user={user} className="mini-avatar" />{user.username}</span>
                <span>Lv. {user.level} <b>{user.badge}</b></span>
                <span><Medal size={17} />{user.checkins}</span>
                <span>{user.quests}</span>
                <span><Star size={17} fill="currentColor" />{user.points}</span>
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
      <h2><span aria-hidden="true">{icon === "calendar" ? "▣" : "◇"}</span>{title}</h2>
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
