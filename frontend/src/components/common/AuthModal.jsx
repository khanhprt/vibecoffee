import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Text
} from "@chakra-ui/react";
import { Coffee, Heart } from "lucide-react";
import PixelModal from "./PixelModal.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import * as authService from "../../services/authService.js";
import { isDemoMode } from "../../services/demoService.js";

const copy = {
  login: {
    title: "Đăng nhập",
    cta: "Vào Vibe",
    switch: "Chưa có tài khoản?",
    switchCta: "Đăng ký ngay"
  },
  register: {
    title: "Tạo tài khoản",
    cta: "Bắt đầu",
    switch: "Đã có tài khoản?",
    switchCta: "Đăng nhập"
  },
  hint: "Mật khẩu tối thiểu 8 ký tự"
};

const initialForm = { username: "", email: "", password: "" };

const inputStyle = {
  bg: "pixel.cream",
  border: "3px solid #2D1B2E",
  borderRadius: "0",
  height: "3rem",
  fontFamily: "'VT323', monospace",
  fontSize: "1.3rem"
};

export default function AuthModal({ mode, onClose }) {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [view, setView] = useState(mode);
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setView(isDemoMode && mode ? "login" : mode);
    setError("");
  }, [mode]);

  const isOpen = Boolean(mode);
  const isLogin = view === "login";

  function updateField(field) {
    return (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));
  }

  function switchView(next) {
    setView(next);
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : { username: form.username, email: form.email, password: form.password };
      const session = isLogin
        ? await authService.login(payload)
        : await authService.register(payload);
      setSession(session);
      setForm(initialForm);
      onClose();
      if (isDemoMode) navigate("/profile");
    } catch (err) {
      const responseData = err?.response?.data;
      const data = {
        ...responseData,
        error: responseData?.error?.message || responseData?.error
      };
      setError(data?.error || data?.message || err.message || "Có lỗi xảy ra, thử lại nhé!");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PixelModal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      title={copy[view]?.title}
      closeOnOverlayClick
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          {!isLogin ? (
            <FormControl isRequired>
              <FormLabel fontFamily="'VT323', monospace" fontSize="1.2rem">
                Tên đăng nhập
              </FormLabel>
              <Input
                value={form.username}
                onChange={updateField("username")}
                placeholder="vibecoffee_fan"
                minLength={3}
                maxLength={30}
                {...inputStyle}
              />
            </FormControl>
          ) : null}

          <FormControl isRequired>
            <FormLabel fontFamily="'VT323', monospace" fontSize="1.2rem">
              {isDemoMode ? "Tên đăng nhập" : "Email"}
            </FormLabel>
            <Input
              type={isDemoMode ? "text" : "email"}
              autoComplete={isDemoMode ? "username" : "email"}
              value={form.email}
              onChange={updateField("email")}
              placeholder={isDemoMode ? "admin" : "ban@vibecoffee.vn"}
              {...inputStyle}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel fontFamily="'VT323', monospace" fontSize="1.2rem">
              Mật khẩu
            </FormLabel>
            <Input
              type="password"
              value={form.password}
              onChange={updateField("password")}
              placeholder="••••••••"
              minLength={isLogin ? 1 : 8}
              {...inputStyle}
            />
            {!isLogin ? (
              <FormHelperText fontFamily="'VT323', monospace" fontSize="1.05rem">
                {copy.hint}
              </FormHelperText>
            ) : null}
          </FormControl>

          {error ? (
            <Alert status="error" borderRadius="0" border="2px solid #2D1B2E" fontFamily="'VT323', monospace" fontSize="1.1rem">
              <AlertIcon />
              {error}
            </Alert>
          ) : null}

          <Button
            type="submit"
            className="pixel-btn"
            isLoading={submitting}
            loadingText="Đang xử lý..."
            bg="pink.400"
            color="pixel.dark"
            height="3.2rem"
            fontFamily="'VT323', monospace"
            fontSize="1.35rem"
            fontWeight="800"
            _hover={{ bg: "pink.500", color: "pixel.cream" }}
            width="100%"
          >
            {copy[view]?.cta}
          </Button>

          {isDemoMode ? <Text textAlign="center">Tài khoản demo: admin / admin</Text> : <Text
            fontFamily="'VT323', monospace"
            fontSize="1.2rem"
            textAlign="center"
            color="pixel.dark"
          >
            {copy[view]?.switch}{" "}
            <Button
              variant="link"
              onClick={() => switchView(isLogin ? "register" : "login")}
              color="#E91E63"
              fontFamily="'VT323', monospace"
              fontSize="1.25rem"
              fontWeight="800"
              textDecoration="underline"
              _hover={{ color: "#C2185B" }}
            >
              {copy[view]?.switchCta}
            </Button>
          </Text>}

          <Text
            fontFamily="'VT323', monospace"
            fontSize="1.15rem"
            textAlign="center"
            color="#7A4762"
          >
            <Coffee size={14} style={{ display: "inline", marginRight: 4 }} />
            We Be Coffee. We Be Vibe.
            <Heart size={14} style={{ display: "inline", marginLeft: 4 }} />
          </Text>
        </Stack>
      </form>
    </PixelModal>
  );
}
