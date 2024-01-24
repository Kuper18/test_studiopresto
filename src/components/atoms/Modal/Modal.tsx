import React, { ReactNode } from 'react';
import { Modal as CustomModal } from 'react-bootstrap';

type Props = {
  isShownModal: boolean;
  setIsShownModal: (value: boolean) => void;
  children: ReactNode;
};

export const Modal: React.FC<Props> = ({
  isShownModal,
  setIsShownModal,
  children,
}) => {
  return (
    <>
      <CustomModal
        size="sm"
        show={isShownModal}
        onHide={() => setIsShownModal(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
      >
        <CustomModal.Header closeButton style={{ borderBottom: 'none' }}>
          <CustomModal.Body id="example-modal-sizes-title-sm">
            {children}
          </CustomModal.Body>
        </CustomModal.Header>
      </CustomModal>
    </>
  );
};
