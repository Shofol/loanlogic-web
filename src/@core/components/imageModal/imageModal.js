import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ImageModal = ({ isOpen, image, closeZoom }) => {
  const [modal, setModal] = useState(isOpen);

  useEffect(() => {
    setModal(isOpen);
  }, [isOpen]);

  return (
    <Modal
      isOpen={modal}
      //   toggle={() => setModal(!modal)}
      className={"modal-dialog-centered modal-xl"}
    >
      <ModalHeader
        toggle={() => {
          closeZoom();
          setModal(!modal);
        }}
      >
        Zoomed Image
      </ModalHeader>
      <ModalBody className="d-flex align-items-center justify-content-center ">
        <img style={{ width: "100%" }} src={image} />
      </ModalBody>
    </Modal>
  );
};

export default ImageModal;
