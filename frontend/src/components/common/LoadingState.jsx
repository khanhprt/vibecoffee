import { Center, Text } from "@chakra-ui/react";

export default function LoadingState({ label = "Dang tai vibe..." }) {
  return (
    <Center minH="180px">
      <Text fontSize="2xl">{label}</Text>
    </Center>
  );
}
