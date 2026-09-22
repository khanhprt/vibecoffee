import { Flex, Text } from "@chakra-ui/react";

export default function RankItem({ user, rank }) {
  return (
    <Flex align="center" justify="space-between" border="3px solid #2D1B2E" bg="pixel.cream" p={4}>
      <Text fontSize="2xl">#{rank} {user.username}</Text>
      <Text fontWeight="bold">{user.points} diem</Text>
    </Flex>
  );
}
