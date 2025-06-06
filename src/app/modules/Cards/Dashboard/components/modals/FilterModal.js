import React from "react";
import { Modal } from "react-bootstrap";
import {Filters} from "./Filters";

export const FilterModal = ({ show, onHide, productTypes}) => {

    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            Filtros
          </Modal.Header>
          <Modal.Body className="overlay overlay-block cursor-default">
            {/*begin::Loading*/}
            {false ? (
              <>
              <div className="overlay-layer">
                <div className="spinner spinner-lg spinner-primary" />
              </div> 
              {/*end::Loading*/}
              </>
            ) : (
              <Filters 
                productTypes={productTypes}
              />
            )}
          </Modal.Body>
        </Modal>
      );
}