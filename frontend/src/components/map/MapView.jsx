import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  Camera,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Gift,
  Heart,
  ListChecks,
  LocateFixed,
  Map as MapIcon,
  MapPin,
  Search,
  Star,
  Trophy,
  X
} from "lucide-react";
import PixelAvatar from "../common/PixelAvatar.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { assetUrl } from "../../utils/assetUrl.js";
import { checkInCafe, getNearbyCafes, toggleFavorite } from "../../services/cafeService.js";
import { getLeaderboard } from "../../services/leaderboardService.js";
import { getQuests } from "../../services/questService.js";

const filters = [
  { label: "Tat ca", icon: Coffee, vibe: "all" },
  { label: "Gan day", icon: LocateFixed, vibe: "all" },
  { label: "Yeu thich", icon: Heart, vibe: "favorite" },
  { label: "Lam viec", icon: Camera, vibe: "lam-viec" }
];

const dockItems = [
  { label: "Tim quan", icon: MapIcon, active: true },
  { label: "Vibe Quest", icon: ListChecks },
  { label: "Vibe Board", icon: Trophy },
  { label: "Vibe Album", icon: Camera }
];

const regions = [
  { id: "hoan-kiem", label: "Hoan Kiem", image: assetUrl("map-hoan-kiem-pixel.png") },
  { id: "pho-co", label: "Pho Co", image: assetUrl("map-pho-co-pixel.png") },
  { id: "ho-tay", label: "Ho Tay", image: assetUrl("map-ho-tay-pixel.png") }
];

function CafeListCard({ cafe, active, onCheckIn, onFavorite }) {
  return (
    <Box className={`map-cafe-card ${active ? "is-active" : ""}`}>
      <Image src={cafe.coverUrl} alt={cafe.name} className="map-cafe-thumb" />
      <Box minW={0} flex="1">
        <Flex align="start" justify="space-between" gap={2}>
          <Text className="map-cafe-name">{cafe.name}</Text>
          <Button className="pager" onClick={() => onFavorite(cafe.id)} aria-label="Luu quan yeu thich">
            <Heart className="map-heart" size={18} fill={cafe.favorite ? "#ff6fa5" : "none"} />
          </Button>
        </Flex>
        <HStack className="map-meta-line" spacing={3}>
          <HStack spacing={1}><Star size={15} fill="#ffba2e" /> <span>{cafe.rating}</span></HStack>
          <span>({cafe.reviews})</span>
          <HStack spacing={1}><MapPin size={15} /> <span>{cafe.distance}</span></HStack>
        </HStack>
        <HStack className="map-address" spacing={1}>
          <MapPin size={14} />
          <span>{cafe.address}</span>
        </HStack>
        <Flex gap={2} wrap="wrap" mt={2}>
          {cafe.vibes.slice(0, 3).map((vibe) => (
            <Badge key={vibe} className="map-vibe-pill">{vibe.replaceAll("-", " ")}</Badge>
          ))}
        </Flex>
        <HStack mt={3} spacing={2}>
          <Button size="sm" className="filter-chip active" onClick={() => onCheckIn(cafe)}>
            <Camera size={15} /> Vibe Check
          </Button>
          {cafe.checkedIn ? <Badge className="map-vibe-pill">Da ghe</Badge> : null}
          <Badge className="map-vibe-pill">{cafe.priceRange}</Badge>
        </HStack>
      </Box>
    </Box>
  );
}

function RightPanels() {
  const [quests, setQuests] = useState([]);
  const [board, setBoard] = useState([]);
  const { user: currentUser } = useAuth();
  const quest = quests[1] || quests[0];

  useEffect(() => {
    getQuests().then(setQuests);
    getLeaderboard({ period: "week" }).then((data) => setBoard(data.users || data));
  }, []);

  return (
    <Stack className="map-right-panels" spacing={4}>
      <Box className="map-side-panel">
        <Flex align="center" justify="space-between">
          <HStack><ListChecks size={19} /><Text className="side-title">Nhiem vu gan day</Text></HStack>
          <Text className="side-link">Xem tat ca</Text>
        </Flex>
        {quest ? (
          <Flex align="center" gap={3} mt={4}>
            <PixelAvatar user={currentUser} className="side-avatar" />
            <Box flex="1">
              <Text className="quest-title">{quest.description}</Text>
              <HStack>
                <Progress value={(quest.progress / quest.target) * 100} className="quest-progress" />
                <Text className="quest-count">{quest.progress}/{quest.target}</Text>
              </HStack>
            </Box>
            <Gift size={28} className="gift-icon" />
          </Flex>
        ) : null}
      </Box>

      <Box className="map-side-panel">
        <Flex align="center" justify="space-between">
          <HStack><Gift size={19} /><Text className="side-title">Bang xep hang tuan</Text></HStack>
          <ChevronRight size={18} />
        </Flex>
        <Stack spacing={2} mt={3}>
          {board.slice(0, 5).map((user, index) => (
            <Flex key={user.id} className={user.id === "me" ? "rank-row current" : "rank-row"} align="center">
              <Text className="rank-number">{user.rank || index + 1}</Text>
              <PixelAvatar user={user.id === "me" && currentUser ? currentUser : user} className="rank-avatar" />
              <Text flex="1">{user.username}</Text>
              <Text fontWeight="900">{Number(user.points || user.totalPoints || 0).toLocaleString("en-US")}</Text>
            </Flex>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

export default function MapView() {
  const toast = useToast();
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [activeVibe, setActiveVibe] = useState("all");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [cafes, setCafes] = useState([]);

  async function loadCafes(nextVibe = activeVibe) {
    const data = await getNearbyCafes({
      lat: 21.0286,
      lng: 105.8524,
      radius: 5000,
      vibe: nextVibe === "favorite" ? "all" : nextVibe
    });
    const filtered = nextVibe === "favorite" ? data.filter((cafe) => cafe.favorite) : data;
    setCafes(filtered);
    return filtered;
  }

  useEffect(() => {
    loadCafes();
  }, []);

  async function handleSearch(event) {
    event.preventDefault();
    const keyword = query.trim().toLowerCase();
    if (!keyword) return;
    setResults(await getNearbyCafes({ q: keyword }));
  }

  function clearSearch() {
    setQuery("");
    setResults(null);
  }

  async function handleFilter(filter) {
    setActiveVibe(filter.vibe);
    setResults(null);
    await loadCafes(filter.vibe);
  }

  async function handleFavorite(cafeId) {
    await toggleFavorite(cafeId);
    await loadCafes();
    toast({ title: "Da cap nhat quan yeu thich", status: "success", duration: 1600, position: "top" });
  }

  async function handleCheckIn(cafe) {
    try {
      const result = await checkInCafe({ cafeId: cafe.id, lat: cafe.lat, lng: cafe.lng, photoUrl: cafe.coverUrl });
      await loadCafes();
      toast({
        title: `Vibe Check thanh cong tai ${cafe.name}`,
        description: `+${result.pointsAdded || result.points || 10} diem. Anh da duoc them vao My Vibe.`,
        status: "success",
        duration: 2600,
        position: "top"
      });
    } catch (error) {
      toast({ title: error.message || "Khong the check-in", status: "warning", duration: 2200, position: "top" });
    }
  }

  const visibleCafes = results || cafes;

  return (
    <Box className="map-tab-shell">
      <Box className="map-background scanlines">
        <Box
          key={selectedRegion.id}
          className="map-bg-fade"
          style={{ backgroundImage: `url("${selectedRegion.image}")` }}
        />

        <form className="map-search-wrap" onSubmit={handleSearch}>
          <div className="map-search-bar">
            <Search size={22} />
            <Input
              className="map-search-input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Nhap vi tri hoac ten quan, vi du: Ho Guom..."
              aria-label="Tim quan ca phe gan ban"
              variant="unstyled"
            />
          </div>
          <Button type="submit" className="map-search-submit" aria-label="Tim kiem">
            <Search size={22} />
          </Button>
        </form>

        <Box className="map-left-panel">
          {results ? (
            <>
              <Flex align="center" justify="space-between" gap={3}>
                <Text className="search-results-note">
                  Tim thay {results.length} quan cho "{query}"
                </Text>
                <Button className="pager" onClick={clearSearch} aria-label="Xoa tim kiem">
                  <X size={18} />
                </Button>
              </Flex>
              {visibleCafes.length > 0 ? (
                <Stack spacing={3} mt={3}>
                  {visibleCafes.map((cafe) => (
                    <CafeListCard key={cafe.id} cafe={cafe} onCheckIn={handleCheckIn} onFavorite={handleFavorite} />
                  ))}
                </Stack>
              ) : (
                <Text className="no-results">
                  Khong tim thay quan nao khop. Thu tu khoa khac nhe!
                </Text>
              )}
            </>
          ) : (
            <>
              <Flex gap={3} wrap="wrap">
                {filters.map((filter) => {
                  const Icon = filter.icon;
                  return (
                    <Button
                      key={filter.label}
                      className={activeVibe === filter.vibe ? "filter-chip active" : "filter-chip"}
                      onClick={() => handleFilter(filter)}
                    >
                      <Icon size={16} />
                      {filter.label}
                    </Button>
                  );
                })}
              </Flex>

              <SimpleGrid columns={3} gap={3} className="select-row">
                {["Khoang cach", "Quan/Huyen", "Danh gia"].map((item) => (
                  <Button key={item} className="select-chip">{item}<ChevronDown size={16} /></Button>
                ))}
              </SimpleGrid>

              <Flex className="region-switcher" gap={2} wrap="wrap">
                {regions.map((region) => (
                  <Button
                    key={region.id}
                    className={selectedRegion.id === region.id ? "region-chip active" : "region-chip"}
                    onClick={() => setSelectedRegion(region)}
                  >
                    {region.label}
                  </Button>
                ))}
              </Flex>

              <Stack spacing={3}>
                {cafes.map((cafe, index) => (
                  <CafeListCard key={cafe.id} cafe={cafe} active={index === 0} onCheckIn={handleCheckIn} onFavorite={handleFavorite} />
                ))}
              </Stack>

              <Flex align="center" justify="space-between" mt={3}>
                <Text className="result-count">Hien thi {cafes.length}/120 quan</Text>
                <HStack>
                  <Button className="pager" isDisabled><ChevronLeft size={18} /></Button>
                  <Button className="pager"><ChevronRight size={18} /></Button>
                </HStack>
              </Flex>
            </>
          )}
        </Box>

        <RightPanels />

        <Flex className="map-bottom-dock">
          {dockItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button key={item.label} className={item.active ? "dock-item active" : "dock-item"}>
                <Icon size={29} />
                <span>{item.label}</span>
              </Button>
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
}
