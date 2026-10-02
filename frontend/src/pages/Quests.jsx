import { useState } from "react";
import { Link } from "react-router-dom";
import { assetUrl } from "../utils/assetUrl.js";
import { BookOpen, Camera, ChevronRight, CircleHelp, Coffee, Flame, Gift, MapPinned, Medal, MessageSquare, ScrollText, Trophy } from "lucide-react";

const dailyQuests = [
  { icon: Camera, title: "Check-in 1 quán mới", description: "Khám phá một quán cà phê mới trên bản đồ Vibe.", reward: "+100 XP" },
  { icon: MessageSquare, title: "Viết cảm nhận", description: "Để lại 1 review về hương vị bạn yêu thích.", reward: "+80 XP" },
  { icon: Coffee, title: "Thử một món đặc trưng", description: "Thưởng thức đồ uống signature của Hà Nội.", reward: "+120 XP" }
];
const stops = [
  { id: 1, name: "The Coffee House", state: "Đã khám phá", x: "23%", y: "28%", unlocked: true },
  { id: 2, name: "Cộng Cà Phê", state: "Đang thực hiện...", x: "39%", y: "61%", active: true },
  { id: 3, name: "Lofita", state: "Chưa mở khóa", x: "68%", y: "66%" },
  { id: 4, name: "The NOTE", state: "Chưa mở khóa", x: "81%", y: "37%" }
];

export default function Quests() {
  const [selectedStop, setSelectedStop] = useState(2);
  return <section className="quest-page">
    <div className="quest-map-bg" />
    <aside className="quest-panel quest-daily-panel">
      <div className="quest-panel-heading"><ScrollText /><div><h1>Nhiệm vụ hôm nay</h1><span>Thứ 5, 24/04</span></div></div>
      <p className="quest-intro">Hoàn thành nhiệm vụ để khám phá thêm những hương vị tuyệt vời!</p>
      <div className="daily-quest-list">{dailyQuests.map(({ icon: Icon, title, description, reward }) => <button type="button" className="daily-quest" key={title}><span className="daily-icon"><Icon /></span><span className="daily-copy"><b>{title}</b><small>{description}</small><span className="quest-meter"><i /></span></span><span className="quest-reward">0/1 <em>{reward}</em></span><ChevronRight className="quest-arrow" /></button>)}</div>
      <button type="button" className="quest-bonus"><Gift /> <span>Hoàn thành tất cả nhiệm vụ hôm nay<br />nhận thêm 200 XP!</span><ChevronRight /></button>
      <p className="quest-quote">“Mỗi tách cà phê là một câu chuyện,<br />mỗi hành trình là một phiên bản thú vị hơn của bạn.”<br /><strong>— VIBE COFFEE —</strong></p>
    </aside>
    <main className="quest-stage" aria-label="Hành trình cà phê">
      <div className="quest-title-sign"><Coffee /><h2>Hành trình cà phê</h2><p>Khám phá · Thưởng thức · Sưu tầm · Lan tỏa vibe</p></div>
      <div className="quest-route route-one" /><div className="quest-route route-two" /><div className="quest-route route-three" /><div className="lake-label"><MapPinned /> Hồ Gươm</div>
      {stops.map((stop) => <button type="button" aria-pressed={selectedStop === stop.id} onClick={() => setSelectedStop(stop.id)} key={stop.id} className={`quest-stop ${stop.unlocked ? "is-done" : ""} ${stop.active ? "is-active" : ""} ${selectedStop === stop.id ? "is-selected" : ""}`} style={{ left: stop.x, top: stop.y }}><span className="stop-pin">{stop.id}</span><span className="stop-cafe"><Coffee /></span><span className="stop-label"><b>{stop.name}</b><small>{stop.unlocked ? "✓ " : stop.active ? "◌ " : "🔒 "}{stop.state}</small></span></button>)}
      <div className="quest-scribble">Thêm cà phê<br />Thêm những ngày đẹp<br />ở Hà Nội ♡</div>
    </main>
    <aside className="quest-panel quest-reward-panel">
      <div className="reward-heading"><img src={assetUrl("quest-trophy.png")} alt="" /><h2>Phần thưởng & cấp độ</h2></div><div className="level-card"><span className="level-medallion"><img src={assetUrl("quest-coffee-medallion.png")} alt="" /></span><div><b>Lv. 4</b><span className="level-tag">Explorer</span><div className="level-progress"><i /></div><small>1,280 / 2,000 XP</small></div></div>
      <div className="collection-head"><b>Bộ sưu tập huy hiệu</b><button type="button" onClick={() => document.getElementById("collection")?.scrollIntoView({ block: "nearest" })}>Xem tất cả <ChevronRight /></button></div><div className="badge-row" id="collection"><Badge icon={Coffee} label="First Sip" /><Badge icon={BookOpen} label="Hanoi Lover" /><Badge icon={Camera} label="Foodie" /><Badge icon={CircleHelp} label="Secret" muted /></div>
      <div className="streak"><Flame /><b>Chuỗi ngày khám phá</b><strong>7 ngày liên tiếp</strong></div><div className="day-row">{["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day, index) => <span className={index < 4 ? "complete" : ""} key={day}>{index < 4 ? "✓" : ""}<small>{day}</small></span>)}</div><blockquote>“Đi thật xa để tìm những hương vị gần gũi nhất.”<br /><b>— VIBE COFFEE —</b></blockquote>
    </aside>
    <nav className="quest-dock" aria-label="Vibe tabs"><Link to="/map"><MapPinned />Tìm quán</Link><Link className="active" to="/quests"><ScrollText />Vibe Quest</Link><Link to="/leaderboard"><Medal />Vibe Board</Link><Link to="/profile"><Camera />Vibe Album</Link></nav>
  </section>;
}
function Badge({ icon: Icon, label, muted }) { return <div className={`collect-badge ${muted ? "is-muted" : ""}`}><span>{label === "First Sip" ? <img src={assetUrl("quest-coffee-medallion.png")} alt="" /> : <Icon />}</span><b>{label}</b></div>; }
