import {
  Badge, Box, Button, Flex, FormControl, FormErrorMessage, FormLabel,
  HStack, Image, Input, Stack, Text
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { CheckCircle2, Coffee, ReceiptText, RefreshCw, ShieldCheck } from "lucide-react";
import PixelModal from "../common/PixelModal.jsx";
import { checkInCafe, issueCafeReceipt } from "../../services/cafeService.js";

export default function VibeCheckModal({ cafe, onClose, onVerified }) {
  const inputRef = useRef(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [receiptError, setReceiptError] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [issuing, setIssuing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  async function issueReceipt() {
    setIssuing(true);
    setReceiptError("");
    try {
      setReceipt(await issueCafeReceipt(cafe.id));
    } catch (error) {
      setReceiptError(error.response?.data?.message || error.message);
    } finally {
      setIssuing(false);
    }
  }

  async function submit(event) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const result = await checkInCafe({ cafeId: cafe.id, receiptCode: code });
      setSuccess(result);
      onVerified(result);
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Khong the xac nhan hoa don.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PixelModal isOpen onClose={onClose} title="Vibe Check" size="md" initialFocusRef={inputRef}
      scrollBehavior="inside" closeOnOverlayClick={!submitting} closeOnEsc={!submitting}>
      <Stack spacing={5} pb={5}>
        <Flex gap={3} align="center">
          <Image src={cafe.coverUrl} alt={cafe.name} boxSize="64px" objectFit="cover" border="2px solid" borderColor="pixel.dark" />
          <Box minW={0}>
            <Text fontSize="xl" fontWeight="bold" overflowWrap="anywhere">{cafe.name}</Text>
            <Text fontSize="md">{cafe.address}</Text>
          </Box>
        </Flex>
        {success ? (
          <Stack align="center" spacing={3} textAlign="center" py={3} role="status">
            <CheckCircle2 size={48} color="#22865f" />
            <Text fontSize="2xl" fontWeight="bold">Vibe Check thanh cong!</Text>
            <Badge bg="pixel.mint" color="pixel.dark" fontSize="lg">+{success.pointsAdded || 30} diem</Badge>
            <Text>Da ghi nhan ban ghe {cafe.name}. Hoa don nay da duoc su dung.</Text>
            <Button onClick={onClose} width="full" colorScheme="pink">Hoan tat</Button>
          </Stack>
        ) : (
          <>
            <Box>
              <HStack mb={2}><ReceiptText size={20} /><Text fontSize="xl" fontWeight="bold">Ma tren hoa don cua ban</Text></HStack>
              <Text>Tim ma Vibe Check o cuoi hoa don sau khi thanh toan tai quan, sau do nhap ma ben duoi de xac nhan lan ghe.</Text>
              <Text mt={2} fontSize="sm">Moi hoa don co mot ma rieng, chi dung mot lan tai dung quan va co hieu luc 24 gio.</Text>
            </Box>
            <form onSubmit={submit}>
              <Stack spacing={4}>
                <FormControl isInvalid={Boolean(error)} isRequired>
                  <FormLabel htmlFor="vibe-receipt-code">Ma hoa don</FormLabel>
                  <Input id="vibe-receipt-code" ref={inputRef} value={code} onChange={event => { setCode(event.target.value.toUpperCase()); setError(""); }}
                    placeholder="VD: AB3D7K9M" maxLength={8} autoComplete="off" autoCapitalize="characters" spellCheck={false}
                    isDisabled={submitting} bg="white" border="2px solid" borderColor="pixel.dark" borderRadius={0} fontFamily="monospace" />
                  <FormErrorMessage role="alert">{error}</FormErrorMessage>
                </FormControl>
                <Button type="submit" colorScheme="pink" leftIcon={<ShieldCheck size={18} />} isLoading={submitting}
                  loadingText="Dang xac nhan" isDisabled={code.trim().length !== 8 || issuing} width="full">Xac nhan Vibe Check</Button>
              </Stack>
            </form>
            <Box borderTop="2px dashed" borderColor="pink.300" pt={4}>
              <Button variant="ghost" size="sm" leftIcon={receipt ? <RefreshCw size={16} /> : <ReceiptText size={16} />}
                onClick={issueReceipt} isLoading={issuing} isDisabled={submitting} width="full">
                {receipt ? "Tao hoa don mau moi" : "Lay hoa don mau"}
              </Button>
              {receiptError ? <Text role="alert" color="red.700" mt={2}>{receiptError}</Text> : null}
              {receipt ? (
                <Box className="vibe-demo-receipt" mt={4}>
                  <HStack justify="center"><Coffee size={18} /><Text fontWeight="bold">HOA DON MAU</Text></HStack>
                  <Text textAlign="center" fontSize="lg" mt={2}>{cafe.name}</Text>
                  <Text textAlign="center" fontSize="sm">#{receipt.id.slice(0, 8).toUpperCase()} / {new Date(receipt.createdAt).toLocaleString("vi-VN")}</Text>
                  <Flex justify="space-between" gap={3} py={3} borderBottom="1px dashed" borderColor="pink.300">
                    <Text>{receipt.item}</Text><Text flexShrink={0}>{receipt.amount.toLocaleString("vi-VN")} d</Text>
                  </Flex>
                  <Text textAlign="center" mt={3}>MA VIBE CHECK</Text>
                  <Text textAlign="center" fontFamily="monospace" fontSize="2xl" fontWeight="bold" userSelect="all" overflowWrap="anywhere">{receipt.code}</Text>
                  <Text textAlign="center" fontSize="sm" mt={2}>Hieu luc den {new Date(receipt.expiresAt).toLocaleString("vi-VN")}</Text>
                </Box>
              ) : null}
            </Box>
          </>
        )}
      </Stack>
    </PixelModal>
  );
}
