import React, { ReactNode } from 'react';
import Modal from 'react-bootstrap/Modal';

type Props = {
  isShownModal: boolean;
  setIsShownModal: (value: boolean) => void;
  children: ReactNode;
};

export const ModalItem: React.FC<Props> = ({
  isShownModal,
  setIsShownModal,
  children,
}) => {
  return (
    <>
      <Modal
        size="sm"
        show={isShownModal}
        onHide={() => setIsShownModal(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
      >
        <Modal.Header closeButton style={{ borderBottom: 'none' }}>
          <Modal.Body id="example-modal-sizes-title-sm">
            {children}
          </Modal.Body>
        </Modal.Header>
      </Modal>
    </>
  );
};
