import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ImageModal = ({ isOpen, image, closeZoom }) => {
  const [modal, setModal] = useState(isOpen);
  const isPdf = image && image.includes(".pdf");
  const isDoc = image && (image.includes(".doc") || image.includes(".docx"));

  useEffect(() => {
    setModal(isOpen);
  }, [isOpen]);

  return (
    <Modal isOpen={modal} className={"modal-dialog-centered modal-xl"}>
      <ModalHeader
        toggle={() => {
          closeZoom();
          setModal(!modal);
        }}
      >
        Zoomed {isPdf || isDoc ? "File" : "Image"}
      </ModalHeader>
      <ModalBody className="d-flex align-items-center justify-content-center">
        {/* show image content */}
        {!(isPdf || isDoc) && <img style={{ width: "100%" }} src={image} />}

        {/* show pdf/doc */}
        {(isDoc || isPdf) && (
          <iframe
            style={{ width: "100%", height: "80vh" }}
            src={`https://docs.google.com/gview?url=${image}&embedded=true`}
          />
        )}
      </ModalBody>
    </Modal>
  );
};

export default ImageModal;
