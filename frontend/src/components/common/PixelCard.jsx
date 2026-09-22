import { Box } from "@chakra-ui/react";

export default function PixelCard({ children, ...props }) {
  return (
    <Box className="pixel-border" bg="pink.100" p={5} {...props}>
      {children}
    </Box>
  );
}
