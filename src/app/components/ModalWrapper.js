import React from 'react'
import { Modal } from 'react-bootstrap'

export const ModalWrapper = ({show, onHide, title, children, footer, size="xl"}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size={size}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {children}
      </Modal.Body>
      {footer ? 
        <Modal.Footer className="form">
          {footer()}
        </Modal.Footer>
        :
        null
      }
    </Modal>
  )
}
