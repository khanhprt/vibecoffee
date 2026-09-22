import { Box, Image, SimpleGrid } from "@chakra-ui/react";

export default function PhotoGrid({ photos = [] }) {
  return (
    <SimpleGrid columns={{ base: 2, md: 3 }} spacing={3}>
      {photos.map((photo) => (
        <Box key={photo.id} border="3px solid #2D1B2E" bg="pink.100">
          <Image src={photo.url} alt={photo.caption || "Anh check-in"} aspectRatio="1" objectFit="cover" />
        </Box>
      ))}
    </SimpleGrid>
  );
}
