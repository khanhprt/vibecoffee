import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link as ChakraLink
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Coffee, Map, Medal, Search, ScrollText } from "lucide-react";
import { Link as RouterLink, NavLink, useLocation, useOutlet } from "react-router-dom";
import AuthModal from "../components/common/AuthModal.jsx";

const navItems = [
  { to: "/", label: "Home", icon: Coffee },
  { to: "/map", label: "Map", icon: Map },
  { to: "/quests", label: "Vibe Quest", icon: ScrollText },
  { to: "/leaderboard", label: "Vibe Board", icon: Medal }
];

const headerCopy = {
  search: "T\u00ecm qu\u00e1n c\u00e0 ph\u00ea",
  searchPlaceholder: "T\u00ecm qu\u00e1n c\u00e0 ph\u00ea...",
  login: "\u0110\u0103ng nh\u1eadp",
  register: "\u0110\u0103ng k\u00fd"
};

export default function MainLayout() {
  const location = useLocation();
  const outlet = useOutlet();
  const [authMode, setAuthMode] = useState(null);
  const isHome = location.pathname === "/";
  const isMap = location.pathname === "/map";
  const isQuest = location.pathname === "/quests";
  const animatedOutlet = (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className="page-transition"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <Box
      bg="pink.50"
      className={isHome || isMap || isQuest ? "app-shell app-shell-full" : "app-shell"}
      minH={isHome || isMap || isQuest ? undefined : "100vh"}
    >
      <Box as="header" className="site-header">
        <Container maxW="none" px={{ base: 4, lg: 8 }} py={3}>
          <Flex align="center" justify="space-between" gap={5} wrap={{ base: "wrap", xl: "nowrap" }}>
            <ChakraLink
              as={RouterLink}
              to="/"
              className="brand-lockup"
              _hover={{ textDecoration: "none" }}
              aria-label="Vibe Coffee home"
            >
              <span className="brand-cup"><Coffee size={23} /></span>
              <Heading as="span" size="sm">Vibe Coffee</Heading>
            </ChakraLink>

            <Flex as="nav" className="top-nav" gap={{ base: 3, md: 7 }} wrap="wrap">
              {navItems.map((item) => {
                return (
                  <ChakraLink
                    as={NavLink}
                    key={item.to}
                    to={item.to}
                    className="nav-link"
                    _hover={{ textDecoration: "none" }}
                    end={item.to === "/"}
                  >
                    {item.label}
                  </ChakraLink>
                );
              })}
              <ChakraLink href="#about" className="nav-link" _hover={{ textDecoration: "none" }}>
                About
              </ChakraLink>
            </Flex>

            <Flex className="header-actions" align="center" gap={4}>
              <InputGroup className="search-box" display={{ base: "none", lg: "block" }}>
                <InputLeftElement pointerEvents="none">
                  <Search size={18} />
                </InputLeftElement>
                <Input aria-label={headerCopy.search} placeholder={headerCopy.searchPlaceholder} />
              </InputGroup>
              <Button onClick={() => setAuthMode("login")} variant="outline" className="auth-btn auth-outline">
                {headerCopy.login}
              </Button>
              <Button onClick={() => setAuthMode("register")} className="auth-btn auth-solid">
                {headerCopy.register}
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>
      {isHome || isMap || isQuest ? (
        <Box as="main">
          {animatedOutlet}
        </Box>
      ) : (
        <Container as="main" maxW="6xl" py={8}>
          {animatedOutlet}
        </Container>
      )}

      <AuthModal mode={authMode} onClose={() => setAuthMode(null)} />
    </Box>
  );
}
