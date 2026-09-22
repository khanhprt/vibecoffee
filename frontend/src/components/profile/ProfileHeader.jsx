import { Avatar, Flex, Heading, Text } from "@chakra-ui/react";
import PixelCard from "../common/PixelCard.jsx";

export default function ProfileHeader({ user }) {
  return (
    <PixelCard>
      <Flex gap={5} align="center" wrap="wrap">
        <Avatar size="xl" name={user.username} src={user.avatarUrl} border="4px solid #2D1B2E" />
        <div>
          <Heading size="md">{user.username}</Heading>
          <Text fontSize="2xl">Level: {user.level}</Text>
          <Text fontWeight="bold">{user.totalPoints} diem</Text>
        </div>
      </Flex>
    </PixelCard>
  );
}
