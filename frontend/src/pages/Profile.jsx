import { Heading, Stack } from "@chakra-ui/react";
import ProfileHeader from "../components/profile/ProfileHeader.jsx";
import PhotoGrid from "../components/profile/PhotoGrid.jsx";

const user = {
  username: "pinkwizard",
  level: "Explorer",
  totalPoints: 1250,
  avatarUrl: ""
};

const photos = [
  { id: "p1", url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80", caption: "Latte vibe" },
  { id: "p2", url: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80", caption: "Pink morning" }
];

export default function Profile() {
  return (
    <Stack spacing={6}>
      <Heading size="md">My Vibe</Heading>
      <ProfileHeader user={user} />
      <PhotoGrid photos={photos} />
    </Stack>
  );
}
