import { Badge, Box, Button, Flex, HStack, IconButton, Image, Stack, Text, Tooltip } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Camera, Clock, LocateFixed, Map as MapIcon, MapPin, Minus, Plus, RefreshCw, Star } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import PixelModal from "../common/PixelModal.jsx";
import { cafeMapTileUrl, getCafeMapPoint } from "../../data/cafeMap.js";

export default function CafeLocationModal({ cafe, cafes, onSelectCafe, onClose, onCheckIn }) {
  const [container, setContainer] = useState(null);
  const mapRef = useRef(null);
  const tilesRef = useRef(null);
  const [tileError, setTileError] = useState(false);

  useEffect(() => {
    if (!container) return;
    const map = L.map(container, {
      minZoom: 3, maxZoom: 19,
      zoomControl: false,
      scrollWheelZoom: false
    });
    mapRef.current = map;
    map.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener noreferrer">Leaflet</a>');
    const tiles = L.tileLayer(cafeMapTileUrl, {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
    }).addTo(map);
    tilesRef.current = tiles;
    tiles.on("loading", () => setTileError(false));
    tiles.on("tileerror", () => setTileError(true));
    const selectedPoint = getCafeMapPoint(cafe);
    cafes.forEach(item => {
      const selected = item.id === cafe.id;
      const pin = document.createElement("span");
      pin.className = selected ? "cafe-location-pin is-selected" : "cafe-location-pin";
      pin.textContent = selected ? "C" : "";
      const marker = L.marker(getCafeMapPoint(item), {
        icon: L.divIcon({ html: pin, className: "cafe-location-marker", iconSize: selected ? [32, 40] : [18, 24], iconAnchor: selected ? [16, 40] : [9, 24] }),
        title: item.name, alt: item.name, zIndexOffset: selected ? 1000 : 0
      }).addTo(map);
      const label = document.createElement("span");
      label.textContent = item.name;
      marker.bindTooltip(label, { permanent: selected, direction: "top", offset: [0, selected ? -40 : -24], className: "cafe-location-label" });
      marker.on("click", () => onSelectCafe(item));
    });

    function resize() {
      map.invalidateSize();
    }
    map.setView(selectedPoint, 16, { animate: false });
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    const frame = requestAnimationFrame(resize);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      map.remove();
      mapRef.current = null;
      tilesRef.current = null;
    };
  }, [container, cafe, cafes, onSelectCafe]);

  function focusCafe() {
    const map = mapRef.current;
    if (map) map.stop().setView(getCafeMapPoint(cafe), 16, { animate: false });
  }

  const controls = [
    { label: "Phong to", icon: Plus, action: () => mapRef.current?.stop().zoomIn(1, { animate: false }) },
    { label: "Thu nho", icon: Minus, action: () => mapRef.current?.stop().zoomOut(1, { animate: false }) },
    { label: "Ve vi tri quan", icon: LocateFixed, action: focusCafe },
    { label: "Xem tat ca quan", icon: MapIcon, action: () => mapRef.current?.stop().fitBounds(cafes.map(getCafeMapPoint), { padding: [45, 60], maxZoom: 16, animate: false }) }
  ];

  return (
    <PixelModal isOpen onClose={onClose} title="Ban do quan" size="3xl" scrollBehavior="inside">
      <Stack spacing={4} pb={5}>
        <Flex gap={3} align="center">
          <Image src={cafe.coverUrl} alt={cafe.name} boxSize="64px" objectFit="cover" border="2px solid" borderColor="pixel.dark" />
          <Box minW={0} flex={1}>
            <Text fontSize="2xl" fontWeight="bold" overflowWrap="anywhere">{cafe.name}</Text>
            <Text>{cafe.address}</Text>
            <HStack flexWrap="wrap" mt={1} spacing={3}>
              <HStack spacing={1}><Star size={15} fill="#ffba2e" /><Text>{cafe.rating} ({cafe.reviews})</Text></HStack>
              <HStack spacing={1}><Clock size={15} /><Text>{cafe.openHours || "07:00 - 22:00"}</Text></HStack>
            </HStack>
          </Box>
        </Flex>
        <Box className="cafe-location-scene">
          <Box ref={setContainer} className="cafe-location-map" role="region" aria-label={`Ban do vi tri mo phong cua ${cafe.name}`} />
          <Badge className="cafe-location-badge">Vi tri mo phong</Badge>
          <Stack className="cafe-location-controls" spacing={2}>
            {controls.map(({ label, icon: Icon, action }) => (
              <Tooltip key={label} label={label} placement="left">
                <IconButton aria-label={label} icon={<Icon size={19} />} onClick={action} bg="white" color="pixel.dark" size="sm" />
              </Tooltip>
            ))}
          </Stack>
          {tileError ? <Flex className="cafe-location-error" role="alert" gap={2} align="center">
            <Text fontSize="sm">Khong tai duoc mot phan ban do. Kiem tra ket noi mang.</Text>
            <Tooltip label="Tai lai ban do"><IconButton aria-label="Tai lai ban do" size="sm" icon={<RefreshCw size={16} />} onClick={() => { setTileError(false); tilesRef.current?.redraw(); }} /></Tooltip>
          </Flex> : null}
        </Box>
        <Flex justify="space-between" align="center" gap={3} flexWrap="wrap">
          <HStack><MapPin size={18} /><Text>{cafe.district || "Ha Noi"} / {cafe.distance}</Text></HStack>
          <Button colorScheme="pink" leftIcon={<Camera size={17} />} onClick={() => onCheckIn(cafe)}>Vibe Check</Button>
        </Flex>
      </Stack>
    </PixelModal>
  );
}
