import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ArrowRight, Coffee, Gift, Heart, MapPinned, Minus, Plus, Settings, Star, Trophy, Users } from "lucide-react";
import { Link } from "react-router-dom";

const markers = [
  { name: "Lofita", distance: "1.2 km", x: "66%", y: "22%" },
  { name: "The NOTE", distance: "850 m", x: "42%", y: "63%" },
  { name: "C\u1ed9ng C\u00e0 Ph\u00ea", distance: "1.5 km", x: "84%", y: "48%" },
  { name: "T\u1ea7ng Tr\u1ec7t", distance: "2.1 km", x: "82%", y: "72%" }
];

/* Falling cherry-blossom petals. Negative animation-delay values make every
   petal start mid-fall so the hero is already alive on first paint. */
const petals = [
  { left: "6%", size: 11, duration: 11, delay: -2 },
  { left: "14%", size: 9, duration: 13, delay: -7.5 },
  { left: "24%", size: 12, duration: 10, delay: -4 },
  { left: "33%", size: 8, duration: 14, delay: -11 },
  { left: "47%", size: 10, duration: 12, delay: -6 },
  { left: "58%", size: 9, duration: 11, delay: -9.5 },
  { left: "70%", size: 12, duration: 13, delay: -3 },
  { left: "82%", size: 10, duration: 10.5, delay: -8 },
  { left: "91%", size: 8, duration: 12.5, delay: -5 }
];

const stats = [
  { label: "Qu\u00e1n c\u00e0 ph\u00ea", value: "500+", icon: Coffee },
  { label: "Vibe Check", value: "50K+", icon: Users },
  { label: "Voucher", value: "1,000+", icon: Gift },
  { label: "Th\u00e0nh vi\u00ean", value: "10K+", icon: Heart }
];

const featureLinks = [
  { label: "T\u00ecm qu\u00e1n c\u00e0 ph\u00ea \u0111\u1eb9p", icon: MapPinned },
  { label: "Vibe Check nh\u1eadn th\u01b0\u1edfng", icon: Coffee },
  { label: "Ho\u00e0n th\u00e0nh Vibe Quest", icon: Gift },
  { label: "Leo top Vibe Board", icon: Trophy }
];

const copy = {
  description:
    "Kh\u00e1m ph\u00e1 nh\u1eefng qu\u00e1n c\u00e0 ph\u00ea xinh x\u1eafn, check-in nh\u1eadn th\u01b0\u1edfng v\u00e0 l\u01b0u gi\u1eef nh\u1eefng kho\u1ea3nh kh\u1eafc th\u1eadt chill!",
  cta: "B\u1eaft \u0111\u1ea7u kh\u00e1m ph\u00e1",
  speech: "M\u1ed9t t\u00e1ch c\u00e0 ph\u00ea",
  speechSecond: "m\u1ed9t h\u00e0nh tr\u00ecnh m\u1edbi",
  mapLabel: "B\u1ea3n \u0111\u1ed3 pixel c\u00e1c qu\u00e1n c\u00e0 ph\u00ea n\u1ed5i b\u1eadt t\u1ea1i H\u00e0 N\u1ed9i",
  distancePrefix: "c\u00e1ch",
  cafeAlt: "Kh\u00f4ng gian qu\u00e1n c\u00e0 ph\u00ea \u1ea5m \u00e1p",
  rating: "4.8 (320 \u0111\u00e1nh gi\u00e1)",
  address: "123 Nguy\u1ec5n Hu\u1ec7, H\u00e0 N\u1ed9i",
  detail: "Xem chi ti\u1ebft",
  tools: "C\u00f4ng c\u1ee5 b\u1ea3n \u0111\u1ed3",
  zoomIn: "Ph\u00f3ng to",
  zoomOut: "Thu nh\u1ecf",
  settings: "C\u00e0i \u0111\u1eb7t b\u1ea3n \u0111\u1ed3"
};

export default function Home() {
  return (
    <section className="home-hero">
      {petals.map((petal, index) => (
        <span
          key={index}
          className="hero-petal"
          style={{
            left: petal.left,
            width: petal.size,
            height: petal.size,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`
          }}
          aria-hidden="true"
        />
      ))}
      <Box className="hero-copy">
        <Heading as="h1" className="hero-title">
          Vibe<br />Coffee
        </Heading>
        <Text className="hero-tagline">We Be Coffee. We Be Vibe.</Text>
        <Text className="hero-description">{copy.description}</Text>
        <Link className="hero-cta pixel-press" to="/map">
          {copy.cta} <ArrowRight size={25} />
        </Link>

        <Flex className="feature-strip" as="ul">
          {featureLinks.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <Icon size={31} />
                <span>{item.label}</span>
              </li>
            );
          })}
        </Flex>

        <div className="speech-note">
          {copy.speech}<br />{copy.speechSecond}
          <span><Coffee size={14} /> <Heart size={14} /></span>
        </div>
      </Box>

      <Box className="map-stage-home" aria-label={copy.mapLabel}>
        <div className="hanoi-sign">Hanoi</div>
        <div className="coffee-doodle doodle-left">Good Coffee<br />Better People</div>
        <div className="coffee-doodle doodle-right">Explore Coffee<br />Collect Good Vibes</div>

        {markers.map((marker) => (
          <button
            className="home-marker"
            key={marker.name}
            style={{ left: marker.x, top: marker.y }}
            type="button"
            aria-label={`${marker.name}, ${copy.distancePrefix} ${marker.distance}`}
          >
            <span className="marker-icon"><Coffee size={24} /></span>
            <span>
              <strong>{marker.name}</strong>
              <small>{marker.distance}</small>
            </span>
          </button>
        ))}

        <article className="featured-cafe-card">
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=700&q=80"
            alt={copy.cafeAlt}
          />
          <div>
            <Flex justify="space-between" align="center" gap={3}>
              <Heading as="h2">The Coffee House</Heading>
              <Heart size={21} />
            </Flex>
            <p className="rating-line"><Star size={17} fill="currentColor" /> {copy.rating}</p>
            <p className="address-line">{copy.address}</p>
            <Link to="/map" className="card-action">{copy.detail}</Link>
          </div>
        </article>

        <div className="map-tools-home" aria-label={copy.tools}>
          <button type="button" aria-label={copy.zoomIn}><Plus size={22} /></button>
          <button type="button" aria-label={copy.zoomOut}><Minus size={22} /></button>
          <button type="button" aria-label={copy.settings}><Settings size={22} /></button>
        </div>
      </Box>

      <Flex className="stats-bar" as="dl">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label}>
              <Icon size={32} />
              <span>
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </span>
            </div>
          );
        })}
      </Flex>
    </section>
  );
}
