import { extendTheme } from "@chakra-ui/react";

const colors = {
  pink: {
    50: "#FFF0F5",
    100: "#FFE0EC",
    200: "#FFC2D9",
    300: "#FF9EC4",
    400: "#FF6FA5",
    500: "#FF3D88",
    600: "#E91E63",
    700: "#C2185B",
    800: "#880E4F",
    900: "#560027"
  },
  pixel: {
    cream: "#FFF8F0",
    brown: "#8B5E3C",
    dark: "#2D1B2E",
    gold: "#FFD700",
    mint: "#A8E6CF",
    coral: "#FF8B94"
  }
};

const theme = extendTheme({
  colors,
  fonts: {
    heading: "'VT323', monospace",
    body: "'VT323', monospace"
  },
  styles: {
    global: {
      body: {
        bg: "pink.50",
        color: "pixel.dark"
      }
    }
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 0,
        border: "3px solid",
        borderColor: "pixel.dark",
        boxShadow: "4px 4px 0 0 #2D1B2E",
        fontFamily: "'VT323', monospace",
        fontSize: "1.25rem",
        _hover: {
          transform: "translate(2px, 2px)",
          boxShadow: "2px 2px 0 0 #2D1B2E"
        },
        _active: {
          transform: "translate(4px, 4px)",
          boxShadow: "none"
        }
      }
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 0,
          border: "3px solid",
          borderColor: "pixel.dark",
          boxShadow: "6px 6px 0 0 #2D1B2E",
          bg: "pink.100"
        }
      }
    }
  }
});

export default theme;
