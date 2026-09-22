import { SimpleGrid } from "@chakra-ui/react";
import QuestCard from "./QuestCard.jsx";

export default function QuestList({ quests }) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
      {quests.map((quest) => <QuestCard key={quest.id} quest={quest} />)}
    </SimpleGrid>
  );
}
