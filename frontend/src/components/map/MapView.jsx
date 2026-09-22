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
  Text
} from "@chakra-ui/react";
import { useState } from "react";
import {
  Camera,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Crown,
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
import { cafes, leaderboard, quests } from "../../data/mockData.js";

const filters = [
  { label: "Tat ca", icon: Coffee, active: true },
  { label: "Gan day", icon: LocateFixed },
  { label: "Yeu thich", icon: Heart },
  { label: "Da check-in", icon: Camera }
];

const dockItems = [
  { label: "Tim quan", icon: MapIcon, active: true },
  { label: "Vibe Quest", icon: ListChecks },
  { label: "Vibe Board", icon: Trophy },
  { label: "Vibe Album", icon: Camera }
];

const regions = [
  { id: "hoan-kiem", label: "Hoan Kiem", image: "/assets/map-hoan-kiem-pixel.png" },
  { id: "pho-co", label: "Pho Co", image: "/assets/map-pho-co-pixel.png" },
  { id: "ho-tay", label: "Ho Tay", image: "/assets/map-ho-tay-pixel.png" }
];

function CafeListCard({ cafe, active }) {
  return (
    <Box className={`map-cafe-card ${active ? "is-active" : ""}`}>
      <Image src={cafe.coverUrl} alt={cafe.name} className="map-cafe-thumb" />
      <Box minW={0} flex="1">
        <Flex align="start" justify="space-between" gap={2}>
          <Text className="map-cafe-name">{cafe.name}</Text>
          <Heart className="map-heart" size={23} />
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
      </Box>
    </Box>
  );
}

function RightPanels() {
  const quest = quests[1];

  return (
    <Stack className="map-right-panels" spacing={4}>
      <Box className="map-side-panel">
        <Flex align="center" justify="space-between">
          <HStack><ListChecks size={19} /><Text className="side-title">Nhiem vu gan day</Text></HStack>
          <Text className="side-link">Xem tat ca</Text>
        </Flex>
        <Flex align="center" gap={3} mt={4}>
          <Box className="side-avatar"><Crown size={22} /></Box>
          <Box flex="1">
            <Text className="quest-title">{quest.description}</Text>
            <HStack>
              <Progress value={(quest.progress / quest.target) * 100} className="quest-progress" />
              <Text className="quest-count">{quest.progress}/{quest.target}</Text>
            </HStack>
          </Box>
          <Gift size={28} className="gift-icon" />
        </Flex>
      </Box>

      <Box className="map-side-panel">
        <Flex align="center" justify="space-between">
          <HStack><Gift size={19} /><Text className="side-title">Bang xep hang tuan</Text></HStack>
          <ChevronRight size={18} />
        </Flex>
        <Stack spacing={2} mt={3}>
          {leaderboard.map((user, index) => (
            <Flex key={user.id} className={user.id === "me" ? "rank-row current" : "rank-row"} align="center">
              <Text className="rank-number">{user.rank || index + 1}</Text>
              <Box className="rank-avatar" />
              <Text flex="1">{user.username}</Text>
              <Text fontWeight="900">{user.points.toLocaleString("en-US")}</Text>
            </Flex>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

export default function MapView() {
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);

  function handleSearch(event) {
    event.preventDefault();
    const keyword = query.trim().toLowerCase();
    if (!keyword) return;
    // TODO: thay bằng API Map — geocode vị trí từ `keyword`,
    // sau đó gợi ý các quán cà phê gần đó theo database quán.
    // Tạm thời lọc danh sách quán mẫu theo tên/địa chỉ.
    setResults(
      cafes.filter(
        (cafe) =>
          cafe.name.toLowerCase().includes(keyword) ||
          cafe.address.toLowerCase().includes(keyword)
      )
    );
  }

  function clearSearch() {
    setQuery("");
    setResults(null);
  }

  return (
    <Box className="map-tab-shell">
      <Box
        className="map-background scanlines"
      >
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
              placeholder="Nhập vị trí hoặc tên quán, ví dụ: Hồ Gươm..."
              aria-label="Tìm quán cà phê gần bạn"
              variant="unstyled"
            />
          </div>
          <Button type="submit" className="map-search-submit" aria-label="Tìm kiếm">
            <Search size={22} />
          </Button>
        </form>

        <Box className="map-left-panel">
          {results ? (
            <>
              <Flex align="center" justify="space-between" gap={3}>
                <Text className="search-results-note">
                  Tìm thấy {results.length} quán cho "{query}"
                </Text>
                <Button className="pager" onClick={clearSearch} aria-label="Xóa tìm kiếm">
                  <X size={18} />
                </Button>
              </Flex>
              {results.length > 0 ? (
                <Stack spacing={3} mt={3}>
                  {results.map((cafe) => (
                    <CafeListCard key={cafe.id} cafe={cafe} />
                  ))}
                </Stack>
              ) : (
                <Text className="no-results">
                  Không tìm thấy quán nào khớp. Thử từ khóa khác nhé!
                </Text>
              )}
            </>
          ) : (
            <>
              <Flex gap={3} wrap="wrap">
                {filters.map((filter) => {
                  const Icon = filter.icon;
                  return (
                    <Button key={filter.label} className={filter.active ? "filter-chip active" : "filter-chip"}>
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
                  <CafeListCard key={cafe.id} cafe={cafe} active={index === 0} />
                ))}
              </Stack>

              <Flex align="center" justify="space-between" mt={3}>
                <Text className="result-count">Hien thi 5/120 quan</Text>
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
