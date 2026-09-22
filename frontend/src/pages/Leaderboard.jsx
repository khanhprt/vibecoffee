import { Heading, Stack } from "@chakra-ui/react";
import RankList from "../components/leaderboard/RankList.jsx";
import { leaderboard } from "../data/mockData.js";

export default function Leaderboard() {
  return (
    <Stack spacing={6}>
      <Heading size="md">Vibe Board</Heading>
      <RankList users={leaderboard} />
    </Stack>
  );
}
