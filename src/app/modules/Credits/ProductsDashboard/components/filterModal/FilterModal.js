import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import {Filters} from "../Filters";

export const FilterModal = ({ show, onHide, setValues, currencies, entities, initialValues, products, users }) => {

  const [initial, setInitial] = useState(initialValues)

    return (
        <Modal
            size='xl'
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
                  setValues ={setValues}
                  initial ={initial}
                  setInitial={setInitial}
                  currencies={currencies}
                  entities ={entities}
                  products = {products}
                  onHide={onHide}
                  users={users}
                />
            )}
          </Modal.Body>
        </Modal>
      );
}