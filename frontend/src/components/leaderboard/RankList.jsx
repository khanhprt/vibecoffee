import { Stack } from "@chakra-ui/react";
import RankItem from "./RankItem.jsx";

export default function RankList({ users }) {
  return (
    <Stack spacing={3}>
      {users.map((user, index) => <RankItem key={user.id} user={user} rank={index + 1} />)}
    </Stack>
  );
}
