import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { assetUrl } from "../utils/assetUrl.js";
import { BookOpen, Camera, ChevronRight, CircleHelp, Coffee, Flame, Gift, MapPinned, Medal, MessageSquare, ScrollText } from "lucide-react";
import { claimQuest, getQuests } from "../services/questService.js";

const stops = [
  { id: 1, name: "Pink Pixel Brew", state: "Da kham pha", x: "23%", y: "28%", unlocked: true },
  { id: 2, name: "Cong Ca Phe", state: "Dang thuc hien...", x: "39%", y: "61%", active: true },
  { id: 3, name: "Lofita", state: "Chua mo khoa", x: "68%", y: "66%" },
  { id: 4, name: "The Note", state: "Chua mo khoa", x: "81%", y: "37%" }
];

const questIcons = [Camera, MessageSquare, Coffee, BookOpen, Gift];

export default function Quests() {
  const toast = useToast();
  const [selectedStop, setSelectedStop] = useState(2);
  const [quests, setQuests] = useState([]);

  async function loadQuests() {
    setQuests(await getQuests());
  }

  useEffect(() => {
    loadQuests();
  }, []);

  async function handleClaim(quest) {
    try {
      await claimQuest(quest.id);
      await loadQuests();
      toast({
        title: `Da nhan thuong ${quest.title}`,
        description: `+${quest.rewardPoints || 0} diem${quest.voucher ? ` va voucher ${quest.voucher}` : ""}`,
        status: "success",
        duration: 2400,
        position: "top"
      });
    } catch (error) {
      toast({ title: error.message || "Chua the nhan thuong", status: "warning", duration: 2200, position: "top" });
    }
  }

  const featuredQuests = quests.slice(0, 3);
  const completedCount = quests.filter((quest) => quest.completed).length;

  return <section className="quest-page">
    <div className="quest-map-bg" />
    <aside className="quest-panel quest-daily-panel">
      <div className="quest-panel-heading"><ScrollText /><div><h1>Nhiem vu hom nay</h1><span>Demo data live</span></div></div>
      <p className="quest-intro">Hoan thanh nhiem vu de mo khoa diem, voucher va huy hieu cho My Vibe.</p>
      <div className="daily-quest-list">{featuredQuests.map((quest, index) => {
        const Icon = questIcons[index] || Coffee;
        const percent = Math.min(100, (quest.progress / quest.target) * 100);
        return (
          <button type="button" className="daily-quest" key={quest.id} onClick={() => quest.completed && !quest.claimedAt ? handleClaim(quest) : null}>
            <span className="daily-icon"><Icon /></span>
            <span className="daily-copy"><b>{quest.title}</b><small>{quest.description}</small><span className="quest-meter"><i style={{ width: `${percent}%` }} /></span></span>
            <span className="quest-reward">{quest.progress}/{quest.target} <em>{quest.claimedAt ? "Da nhan" : quest.completed ? "Nhan thuong" : quest.reward}</em></span>
            <ChevronRight className="quest-arrow" />
          </button>
        );
      })}</div>
      <button type="button" className="quest-bonus"><Gift /> <span>Hoan thanh {completedCount}/{quests.length} nhiem vu<br />de day diem demo len bang xep hang!</span><ChevronRight /></button>
      <p className="quest-quote">"Moi tach ca phe la mot cau chuyen,<br />moi hanh trinh la mot phien ban thu vi hon cua ban."<br /><strong>- VIBE COFFEE -</strong></p>
    </aside>
    <main className="quest-stage" aria-label="Hanh trinh ca phe">
      <div className="quest-title-sign"><Coffee /><h2>Hanh trinh ca phe</h2><p>Kham pha - Thuong thuc - Suu tam - Lan toa vibe</p></div>
      <div className="quest-route route-one" /><div className="quest-route route-two" /><div className="quest-route route-three" /><div className="lake-label"><MapPinned /> Ho Guom</div>
      {stops.map((stop) => <button type="button" aria-pressed={selectedStop === stop.id} onClick={() => setSelectedStop(stop.id)} key={stop.id} className={`quest-stop ${stop.unlocked ? "is-done" : ""} ${stop.active ? "is-active" : ""} ${selectedStop === stop.id ? "is-selected" : ""}`} style={{ left: stop.x, top: stop.y }}><span className="stop-pin">{stop.id}</span><span className="stop-cafe"><Coffee /></span><span className="stop-label"><b>{stop.name}</b><small>{stop.unlocked ? "OK " : stop.active ? "* " : "LOCK "}{stop.state}</small></span></button>)}
      <div className="quest-scribble">Them ca phe<br />Them nhung ngay dep<br />o Ha Noi</div>
    </main>
    <aside className="quest-panel quest-reward-panel">
      <div className="reward-heading"><img src={assetUrl("quest-trophy.png")} alt="" /><h2>Phan thuong & cap do</h2></div><div className="level-card"><span className="level-medallion"><img src={assetUrl("quest-coffee-medallion.png")} alt="" /></span><div><b>Lv. 14</b><span className="level-tag">Explorer</span><div className="level-progress"><i /></div><small>{completedCount} quest da hoan thanh</small></div></div>
      <div className="collection-head"><b>Bo suu tap huy hieu</b><button type="button" onClick={() => document.getElementById("collection")?.scrollIntoView({ block: "nearest" })}>Xem tat ca <ChevronRight /></button></div><div className="badge-row" id="collection"><Badge icon={Coffee} label="First Sip" /><Badge icon={BookOpen} label="Hanoi Lover" /><Badge icon={Camera} label="Foodie" /><Badge icon={CircleHelp} label="Secret" muted /></div>
      <div className="streak"><Flame /><b>Chuoi ngay kham pha</b><strong>7 ngay lien tiep</strong></div><div className="day-row">{["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day, index) => <span className={index < 4 ? "complete" : ""} key={day}>{index < 4 ? "OK" : ""}<small>{day}</small></span>)}</div><blockquote>"Di that xa de tim nhung huong vi gan gui nhat."<br /><b>- VIBE COFFEE -</b></blockquote>
    </aside>
    <nav className="quest-dock" aria-label="Vibe tabs"><Link to="/map"><MapPinned />Tim quan</Link><Link className="active" to="/quests"><ScrollText />Vibe Quest</Link><Link to="/leaderboard"><Medal />Vibe Board</Link><Link to="/profile"><Camera />Vibe Album</Link></nav>
  </section>;
}
function Badge({ icon: Icon, label, muted }) { return <div className={`collect-badge ${muted ? "is-muted" : ""}`}><span>{label === "First Sip" ? <img src={assetUrl("quest-coffee-medallion.png")} alt="" /> : <Icon />}</span><b>{label}</b></div>; }
