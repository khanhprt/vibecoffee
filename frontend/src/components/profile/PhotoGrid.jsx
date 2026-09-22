import { Box, Image, SimpleGrid } from "@chakra-ui/react";

export default function PhotoGrid({ photos = [] }) {
  return (
    <SimpleGrid className="profile-photo-grid" columns={{ base: 2, md: 3 }} spacing={3}>
      {photos.map((photo) => (
        <Box className="profile-photo-tile" key={photo.id}>
          <Image src={photo.url} alt={photo.caption || "Anh check-in"} aspectRatio="1" objectFit="cover" />
        </Box>
      ))}
    </SimpleGrid>
  );
}
