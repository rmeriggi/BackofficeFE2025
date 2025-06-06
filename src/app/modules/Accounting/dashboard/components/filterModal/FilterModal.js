import React from "react";
import { Modal } from "react-bootstrap";
import {Filters} from "../Filters";

export const FilterModal = ({ show, onHide, setValues, currencies, entities, initialValues, groups, modules}) => {

    return (
        <Modal
            size='lg'
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
                initialValues={initialValues}
                currencies={currencies}
                entities ={entities}
                groups = {groups}
                modules = {modules}
                onHide={onHide}
                />
            )}
          </Modal.Body>
        </Modal>
      );
}