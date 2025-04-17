import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@heroui/react";

export default function Tmodal({ isOpen, onClose, title, children, footer }) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        {() => (
          <>
            {title && <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>}
            <ModalBody>{children}</ModalBody>
            {footer && <ModalFooter>{footer}</ModalFooter>}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
