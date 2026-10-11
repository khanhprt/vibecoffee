import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Select,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Camera,
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
import { getNearbyCafes, toggleFavorite } from "../../services/cafeService.js";
import { me } from "../../services/authService.js";
import VibeCheckModal from "./VibeCheckModal.jsx";
import CafeLocationModal from "./CafeLocationModal.jsx";
import { getLeaderboard } from "../../services/leaderboardService.js";
import { getQuests } from "../../services/questService.js";
import { filterCafes } from "../../data/filterCafes.js";

const filters = [
  { label: "Tat ca", icon: Coffee, vibe: "all" },
  { label: "Gan day", icon: LocateFixed, vibe: "nearby" },
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

function CafeListCard({ cafe, active, onCheckIn, onFavorite, onOpenMap }) {
  return (
    <Box className={`map-cafe-card ${active ? "is-active" : ""}`}>
      <Image src={cafe.coverUrl} alt={cafe.name} className="map-cafe-thumb" />
      <Box minW={0} flex="1">
        <Flex align="start" justify="space-between" gap={2}>
          <Text as="button" type="button" className="map-cafe-name map-cafe-map-link" onClick={() => onOpenMap(cafe)} aria-label={`Xem ban do ${cafe.name}`}>{cafe.name}</Text>
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

function RightPanels({ revision }) {
  const [quests, setQuests] = useState([]);
  const [board, setBoard] = useState([]);
  const { user: currentUser } = useAuth();
  const quest = quests[1] || quests[0];

  useEffect(() => {
    getQuests().then(setQuests);
    getLeaderboard({ period: "week" }).then((data) => setBoard(data.users || data));
  }, [revision]);

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
  const queryClient = useQueryClient();
  const { setUser } = useAuth();
  const [checkinCafe, setCheckinCafe] = useState(null);
  const [locationCafe, setLocationCafe] = useState(null);
  const [revision, setRevision] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [activeVibe, setActiveVibe] = useState("all");
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [maxDistance, setMaxDistance] = useState("");
  const [district, setDistrict] = useState("");
  const [minRating, setMinRating] = useState("");
  const [page, setPage] = useState(1);
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  async function loadCafes() {
    setCafes(await getNearbyCafes({ lat: 21.0286, lng: 105.8524, radius: 15000 }));
  }

  useEffect(() => {
    let cancelled = false;
    getNearbyCafes({ lat: 21.0286, lng: 105.8524, radius: 15000 })
      .then((data) => { if (!cancelled) setCafes(data); })
      .catch(() => { if (!cancelled) setLoadError("Khong the tai danh sach quan. Thu tai lai trang."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  function handleSearch(event) {
    event.preventDefault();
    setSearchTerm(query.trim());
    setPage(1);
  }

  function clearSearch() {
    setQuery("");
    setSearchTerm("");
    setPage(1);
  }

  function handleFilter(filter) {
    setActiveVibe(filter.vibe);
    setPage(1);
  }

  async function handleFavorite(cafeId) {
    await toggleFavorite(cafeId);
    await loadCafes();
    toast({ title: "Da cap nhat quan yeu thich", status: "success", duration: 1600, position: "top" });
  }

  function handleVerified() {
    setRevision(value => value + 1);
    queryClient.invalidateQueries();
    Promise.all([loadCafes(), me().then(setUser)]).catch(() => {
      toast({ title: "Da check-in. Tai lai trang de cap nhat diem.", status: "info", duration: 2400 });
    });
  }

  const filteredCafes = filterCafes(cafes, { q: searchTerm, vibe: activeVibe, district, maxDistance, minRating });
  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filteredCafes.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleCafes = filteredCafes.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const districts = [...new Set(cafes.map((cafe) => cafe.district).filter(Boolean))].sort();

  function changeFilter(setValue, value) {
    setValue(value);
    setPage(1);
  }

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
          {searchTerm ? (
              <Flex align="center" justify="space-between" gap={3}>
                <Text className="search-results-note">
                  Tim thay {filteredCafes.length} quan cho "{searchTerm}"
                </Text>
                <Button className="pager" onClick={clearSearch} aria-label="Xoa tim kiem">
                  <X size={18} />
                </Button>
              </Flex>
          ) : null}
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
                <Select className="select-chip" aria-label="Khoang cach" value={maxDistance} onChange={(event) => changeFilter(setMaxDistance, event.target.value)}>
                  <option value="">Khoang cach: Tat ca</option>
                  <option value="500">Trong 500 m</option>
                  <option value="1000">Trong 1 km</option>
                  <option value="3000">Trong 3 km</option>
                  <option value="5000">Trong 5 km</option>
                  <option value="10000">Trong 10 km</option>
                </Select>
                <Select className="select-chip" aria-label="Quan/Huyen" value={district} onChange={(event) => changeFilter(setDistrict, event.target.value)}>
                  <option value="">Quan/Huyen: Tat ca</option>
                  {districts.map((item) => <option key={item} value={item}>{item}</option>)}
                </Select>
                <Select className="select-chip" aria-label="Danh gia" value={minRating} onChange={(event) => changeFilter(setMinRating, event.target.value)}>
                  <option value="">Danh gia: Tat ca</option>
                  <option value="4">Tu 4 sao</option>
                  <option value="4.5">Tu 4.5 sao</option>
                  <option value="4.8">Tu 4.8 sao</option>
                  <option value="4.9">Tu 4.9 sao</option>
                </Select>
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
                {visibleCafes.map((cafe, index) => (
                  <CafeListCard key={cafe.id} cafe={cafe} active={index === 0} onCheckIn={setCheckinCafe} onFavorite={handleFavorite} onOpenMap={setLocationCafe} />
                ))}
              </Stack>
              {loading ? <Text role="status">Dang tai quan...</Text> : loadError ? <Text role="alert">{loadError}</Text> : !filteredCafes.length ? <Text className="no-results">Khong tim thay quan phu hop. Thu doi bo loc hoac tu khoa.</Text> : null}

              <Flex align="center" justify="space-between" mt={3}>
                <Text className="result-count">{filteredCafes.length ? `${(currentPage - 1) * pageSize + 1}-${Math.min(currentPage * pageSize, filteredCafes.length)}` : "0"}/{filteredCafes.length} quan</Text>
                <HStack>
                  <Button className="pager" aria-label="Trang truoc" isDisabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}><ChevronLeft size={18} /></Button>
                  <Text>{currentPage}/{totalPages}</Text>
                  <Button className="pager" aria-label="Trang sau" isDisabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)}><ChevronRight size={18} /></Button>
                </HStack>
              </Flex>
        </Box>

        <RightPanels revision={revision} />

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
      {checkinCafe ? <VibeCheckModal key={checkinCafe.id} cafe={checkinCafe} onClose={() => setCheckinCafe(null)} onVerified={handleVerified} /> : null}
      {locationCafe ? <CafeLocationModal key={locationCafe.id} cafe={locationCafe} cafes={cafes} onSelectCafe={setLocationCafe}
        onClose={() => setLocationCafe(null)} onCheckIn={cafe => { setLocationCafe(null); setCheckinCafe(cafe); }} /> : null}
    </Box>
  );
}
