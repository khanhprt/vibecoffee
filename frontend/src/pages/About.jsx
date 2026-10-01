import { BookOpen, CheckSquare, Gift, Heart, MapPinned, Users } from "lucide-react";
import AmbientPetals from "../components/common/AmbientPetals.jsx";

const features = [
  {
    icon: MapPinned,
    title: "Khám phá quán cà phê",
    text: "Tìm những quán cà phê đẹp gần bạn hoặc ở bất kỳ đâu."
  },
  {
    icon: CheckSquare,
    title: "Vibe Check",
    text: "Check-in tại quán để hoàn thành nhiệm vụ."
  },
  {
    icon: Gift,
    title: "Nhận phần thưởng",
    text: "Tích điểm, nhận voucher và nhiều phần thưởng hấp dẫn."
  },
  {
    icon: Users,
    title: "Cộng đồng",
    text: "Kết nối với những người cùng đam mê cà phê."
  }
];

export default function About() {
  return (
    <section className="about-page">
      <div className="about-hero">
        <AmbientPetals />
        <div className="about-copy">
          <span className="about-kicker"><Heart size={30} fill="currentColor" /> About</span>
          <h1>About<br />Vibe Coffee</h1>
          <p className="about-slogan">We Be Coffee. We Be Vibe.</p>
          <p className="about-intro">
            Vibe Coffee dành cho một nàng công chúa có sở thích đi tìm những góc nhỏ bình yên trong
            thành phố vội vã này. Cô ấy thích những chú mèo, thích mọi đồ vật có màu hồng. Và có thể, thích
            cả những niềm vui nho nhỏ được dành tặng cho mình... Trang web này được tạo ra như thế đó.
          </p>
        </div>
      </div>

      <div className="about-feature-grid" aria-label="Tính năng Vibe Coffee">
        {features.map(({ icon: Icon, title, text }) => (
          <article className="about-feature-card" key={title}>
            <span><Icon size={42} /></span>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </div>

      <div className="about-story">
        <img src="/assets/about-cafe-scene.png" alt="Quán cà phê pixel bên bờ sông lúc hoàng hôn" />
        <article>
          <h2>Tại sao là Vibe Coffee?</h2>
          <p>
            Chúng tôi tin rằng cà phê không chỉ là một thức uống, mà còn là
            những câu chuyện, những cuộc gặp gỡ và những khoảnh khắc đáng nhớ.
            Vibe Coffee ra đời để biến những trải nghiệm đó thành một hành
            trình thú vị và ý nghĩa hơn, thông qua gamification và cộng đồng.
          </p>
          <div className="about-quote">
            <BookOpen size={24} />
            <strong>"Good Coffee. Better People."</strong>
            <Heart size={22} fill="currentColor" />
          </div>
        </article>
      </div>
    </section>
  );
}
