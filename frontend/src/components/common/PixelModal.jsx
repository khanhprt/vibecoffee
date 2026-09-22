import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";

export default function PixelModal({ title, children, footer, overlayProps, ...props }) {
  return (
    <Modal {...props}>
      <ModalOverlay
        bg="rgba(45, 27, 46, 0.55)"
        backdropFilter="blur(6px)"
        {...overlayProps}
      />
      <ModalContent borderRadius="0" border="4px solid #2D1B2E" boxShadow="6px 6px 0 #2D1B2E" bg="pink.100">
        {title ? <ModalHeader>{title}</ModalHeader> : null}
        <ModalCloseButton borderRadius="0" border="2px solid #2D1B2E" />
        <ModalBody>{children}</ModalBody>
        {footer ? <ModalFooter>{footer}</ModalFooter> : null}
      </ModalContent>
    </Modal>
  );
}

