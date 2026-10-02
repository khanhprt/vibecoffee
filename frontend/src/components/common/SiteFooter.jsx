import { ArrowRight, ArrowUp, Coffee, Heart, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import PixelAvatar from "./PixelAvatar.jsx";
import { isDemoMode } from "../../services/demoService.js";
import { assetUrl } from "../../utils/assetUrl.js";

const exploreLinks = [
  { to: "/", label: "Trang chủ" },
  { to: "/map", label: "Bản đồ quán cà phê" },
  { to: "/quests", label: "Vibe Quest" },
  { to: "/leaderboard", label: "Vibe Board" }
];

export default function SiteFooter({ user, onOpenAuth, motionEnabled }) {
  const scrollToTop = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: motionEnabled && !reducedMotion ? "smooth" : "instant" });
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-brand-link" aria-label="Vibe Coffee - Trang chủ">
              <span className="brand-cup"><Coffee size={23} aria-hidden="true" /></span>
              <span>Vibe Coffee</span>
            </Link>
            <p className="footer-tagline">We Be Coffee. We Be Vibe.</p>
            <p>Một quán cà phê mới, một câu chuyện mới. Kết nối những tâm hồn yêu cà phê qua từng khoảnh khắc.</p>
            <Link to="/map" className="footer-discover">
              <MapPin size={17} aria-hidden="true" />
              Tìm điểm hẹn tiếp theo
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>

          <nav className="footer-link-group" aria-label="Khám phá Vibe Coffee">
            <h2>Khám phá</h2>
            {exploreLinks.map(({ to, label }) => <Link key={to} to={to}>{label}</Link>)}
          </nav>

          <div className="footer-community">
            <h2>Cùng nhau tạo nên Vibe</h2>
            <Link to="/about" className="footer-about-link">Về Vibe Coffee <ArrowRight size={16} aria-hidden="true" /></Link>
            <div className="footer-community-note">
              <img src={assetUrl("board-calico-cat.png")} alt="" width="64" height="72" loading="lazy" />
              <p>Good Coffee.<br />Better People.</p>
            </div>
            {user ? (
              <Link to="/profile" className="footer-join"><PixelAvatar user={user} className="header-avatar" /> My Vibe <ArrowRight size={17} aria-hidden="true" /></Link>
            ) : (
              <div className="footer-auth">
                <button type="button" className="footer-join" onClick={() => onOpenAuth(isDemoMode ? "login" : "register")}>{isDemoMode ? "Vào tài khoản demo" : "Tham gia cộng đồng"} <ArrowRight size={17} aria-hidden="true" /></button>
                <button type="button" className="footer-login" onClick={() => onOpenAuth("login")}>Đăng nhập</button>
              </div>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Vibe Coffee. All rights reserved.</p>
          <p className="footer-made-with"><Heart size={14} aria-hidden="true" /> Dành cho những tâm hồn yêu cà phê.</p>
          <button type="button" className="footer-top" onClick={scrollToTop} aria-label="Về đầu trang" title="Về đầu trang"><ArrowUp size={19} aria-hidden="true" /></button>
        </div>
      </div>
    </footer>
  );
}
