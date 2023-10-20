import React from "react";
import { Button, Modal } from "react-bootstrap";

interface IProps {
  confirmationModalText: string;
  onConfirm: () => void;
  closeModal: () => void;
}

const ConfirmationModal: React.FC<IProps> = ({
  confirmationModalText,
  onConfirm,
  closeModal,
}) => {
  return (
    <Modal show={true} onHide={closeModal}>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>{confirmationModalText}</Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="secondary" onClick={closeModal}>
          Zamknij
        </Button>
        <Button size="sm" variant="primary" onClick={onConfirm}>
          Zatwierdź
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
