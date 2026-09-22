import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link as ChakraLink,
  Tooltip
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Coffee, LogOut, Map, Medal, Pause, Play, Search, ScrollText, UserRound } from "lucide-react";
import { Link as RouterLink, NavLink, useLocation, useOutlet } from "react-router-dom";
import AuthModal from "../components/common/AuthModal.jsx";
import { useAuth } from "../hooks/useAuth.js";
import * as authService from "../services/authService.js";

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
  register: "\u0110\u0103ng k\u00fd",
  profile: "My Vibe",
  logout: "\u0110\u0103ng xu\u1ea5t",
  motionOn: "T\u1ea1m d\u1eebng chuy\u1ec3n \u0111\u1ed9ng",
  motionOff: "B\u1eadt chuy\u1ec3n \u0111\u1ed9ng"
};

export default function MainLayout() {
  const location = useLocation();
  const outlet = useOutlet();
  const { user, token, setUser, logout: clearSession } = useAuth();
  const [authMode, setAuthMode] = useState(null);
  const [motionEnabled, setMotionEnabled] = useState(
    () => localStorage.getItem("vibe-coffee-motion") !== "off"
  );
  const isHome = location.pathname === "/";
  const isMap = location.pathname === "/map";
  const isQuest = location.pathname === "/quests";
  const isProfile = location.pathname === "/profile";

  useEffect(() => {
    if (!token || user) return;

    authService.me().then(setUser).catch(clearSession);
  }, [clearSession, setUser, token, user]);

  const animatedOutlet = (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className="page-transition"
        initial={motionEnabled ? { opacity: 0, y: 10 } : false}
        animate={{ opacity: 1, y: 0 }}
        exit={motionEnabled ? { opacity: 0, y: -8 } : undefined}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  );

  const toggleMotion = () => {
    setMotionEnabled((currentValue) => {
      const nextValue = !currentValue;
      localStorage.setItem("vibe-coffee-motion", nextValue ? "on" : "off");
      return nextValue;
    });
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
    } finally {
      clearSession();
    }
  };

  return (
    <Box
      bg="pink.50"
      className={`${isHome || isMap || isQuest ? "app-shell app-shell-full" : "app-shell"}${isProfile ? " profile-shell" : ""}`}
      data-motion={motionEnabled ? "on" : "off"}
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
              <Tooltip label={motionEnabled ? headerCopy.motionOn : headerCopy.motionOff}>
                <IconButton
                  aria-label={motionEnabled ? headerCopy.motionOn : headerCopy.motionOff}
                  aria-pressed={motionEnabled}
                  className="motion-toggle"
                  icon={motionEnabled ? <Pause size={18} /> : <Play size={18} />}
                  onClick={toggleMotion}
                  variant="outline"
                />
              </Tooltip>
              {user ? (
                <>
                  <Button
                    as={RouterLink}
                    to="/profile"
                    className="auth-btn auth-outline"
                    leftIcon={<UserRound size={18} />}
                    variant="outline"
                  >
                    {user.username || headerCopy.profile}
                  </Button>
                  <Tooltip label={headerCopy.logout}>
                    <IconButton
                      aria-label={headerCopy.logout}
                      className="motion-toggle"
                      icon={<LogOut size={18} />}
                      onClick={handleLogout}
                      variant="outline"
                    />
                  </Tooltip>
                </>
              ) : (
                <>
                  <Button onClick={() => setAuthMode("login")} variant="outline" className="auth-btn auth-outline">
                    {headerCopy.login}
                  </Button>
                  <Button onClick={() => setAuthMode("register")} className="auth-btn auth-solid">
                    {headerCopy.register}
                  </Button>
                </>
              )}
            </Flex>
          </Flex>
        </Container>
      </Box>
      {isHome || isMap || isQuest || isProfile ? (
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
