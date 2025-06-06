import React from "react";
import { Modal } from "react-bootstrap";
import { Button, Typography } from "@material-ui/core";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import { useSelector } from "react-redux";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

registerPlugin(FilePondPluginImagePreview);
registerPlugin(FilePondPluginFileValidateType);

export function UploadModal({
  show,
  onHide,
  title,
  id,
  idClient,
  action,
  type,
}) {
  const token = useSelector((state) => state.auth.authToken);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        <Typography variant="body2" style={{ marginBottom: '10px', color: '#2196F3'}}>Los documentos no pueden pesar más de 30MB</Typography>
        <FilePond
          acceptedFileTypes={type === "pictures" ? ["image/jpeg"] : null}
          allowRevert={false}
          server={{
            url:
              type === "pictures"
                ? `${process.env.REACT_APP_API_URL}/uploadPictures`
                : `${process.env.REACT_APP_API_URL}/uploadDocuments`,
            headers: {
              action,
              id,
              authorization: `Bearer ${token}`,
              idClient,
            },
            process: {
              onload: (response) => onHide(JSON.parse(response)),
            },
            revert: null,
            restore: null,
          }}
        />
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={onHide}
          >
            Volver
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
