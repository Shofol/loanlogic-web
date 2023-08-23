import React, { useState } from "react";
import ImageModal from "../imageModal/imageModal";
import { FileText } from "react-feather";

const FileListViewer = ({ file }) => {
  const [zoomed, setZoomed] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  return (
    <>
      {file.map((photo, index) => {
        const isImage = photo.includes("png") || photo.includes("jpg");
        return (
          <div key={index}>
            {isImage && (
              <img
                src={photo}
                width="200px"
                height="150px"
                style={{ objectFit: "cover", borderRadius: "4px" }}
                className="mb-2 me-1 border cursor-pointer"
                onClick={(e) => {
                  setCurrentImage(photo);
                  setZoomed(true);
                }}
              />
            )}
            {!isImage && (
              <div
                className="d-flex align-items-center justify-content-center border mb-2 me-2 cursor-pointer"
                style={{
                  minWidth: "200px",
                  height: "150px",
                  borderRadius: "4px"
                }}
                onClick={(e) => {
                  setCurrentImage(photo);
                  setZoomed(true);
                }}
              >
                <FileText size={80} />
              </div>
            )}
          </div>
        );
      })}
      {file && (
        <ImageModal
          image={currentImage}
          isOpen={zoomed}
          closeZoom={(e) => {
            setZoomed(false);
          }}
        />
      )}
    </>
  );
};

export default FileListViewer;
