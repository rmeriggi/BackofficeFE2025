import { Button } from "@material-ui/core";
import React from "react";
import { Modal } from "react-bootstrap";
import {Filters} from "../filters/Filters";

export const FilterModal = ({ show, onHide, setValues, currencies, entities, values}) => {

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
                  currencies={currencies} 
                  entities={entities} 
                  setValues={setValues} 
                  values={values}
                  onHide={onHide}
                />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
                variant="contained"
                color="secondary"
                type="submit"
                className="mr-10"
                size="large"
                onClick={() => onHide()}
            >
                Volver
            </Button>
          </Modal.Footer>
        </Modal>
      );
}