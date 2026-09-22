import { ButtonGroup } from "@chakra-ui/react";
import PixelButton from "../common/PixelButton.jsx";

const vibes = ["yen-tinh", "view-dep", "lam-viec", "chill", "song-ao"];

export default function VibeFilter({ active, onChange }) {
  return (
    <ButtonGroup flexWrap="wrap" gap={2}>
      {vibes.map((vibe) => (
        <PixelButton key={vibe} size="sm" bg={active === vibe ? "pink.500" : "pixel.cream"} onClick={() => onChange?.(vibe)}>
          #{vibe}
        </PixelButton>
      ))}
    </ButtonGroup>
  );
}
