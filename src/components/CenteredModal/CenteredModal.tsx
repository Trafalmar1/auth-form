import { ReactNode } from "react";
import { Modal } from "react-bootstrap";

type ModalProps = {
  show: boolean;
  onToggle: VoidFunction;
  children: ReactNode;
};

function CenteredModal({ show, onToggle, children }: ModalProps) {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      style={{ maxWidth: "500px", left: 0, right: 0, margin: "0 auto" }}
      onHide={onToggle}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Sign up</Modal.Title>
      </Modal.Header>
      <Modal.Body className={"px-5 py-4 pb-5"}>{children}</Modal.Body>
    </Modal>
  );
}

export default CenteredModal;
