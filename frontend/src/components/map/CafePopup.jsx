import { Heading, Image, Text } from "@chakra-ui/react";
import PixelButton from "../common/PixelButton.jsx";
import PixelCard from "../common/PixelCard.jsx";

export default function CafePopup({ cafe }) {
  if (!cafe) return null;

  return (
    <PixelCard>
      <Image src={cafe.coverUrl} alt={cafe.name} w="100%" h="160px" objectFit="cover" border="3px solid #2D1B2E" />
      <Heading size="sm" mt={4}>{cafe.name}</Heading>
      <Text>{cafe.address}</Text>
      <PixelButton mt={4}>Check-in</PixelButton>
    </PixelCard>
  );
}
