import { Box, Heading, Progress, Text } from "@chakra-ui/react";
import PixelButton from "../common/PixelButton.jsx";
import PixelCard from "../common/PixelCard.jsx";

export default function QuestCard({ quest }) {
  const value = Math.min(100, (quest.progress / quest.target) * 100);

  return (
    <PixelCard>
      <Heading size="sm">{quest.title}</Heading>
      <Text fontSize="xl" mt={2}>{quest.description}</Text>
      <Box my={4}>
        <Progress value={value} colorScheme="pink" border="2px solid #2D1B2E" borderRadius="0" />
        <Text mt={1}>{quest.progress}/{quest.target}</Text>
      </Box>
      <Text>Thuong: {quest.reward}</Text>
      <PixelButton mt={4} isDisabled={value < 100}>Nhan thuong</PixelButton>
    </PixelCard>
  );
}
