import React from "react";
import { Modal } from "react-bootstrap";
import ListingFilter from "../Listing/ListingFilter";

export const FilterModal = ({ show, onHide, allBalances, setValues, isSubmitting, setIsSubmitting, setValuesToReport, setNameExcel, handleFilterModalClose}) => {

    return (
        <Modal
            size="lg"
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
                <ListingFilter 
                    balancesData={allBalances}  
                    setValues={setValues} 
                    isSubmitting={isSubmitting}
                    setIsSubmitting={setIsSubmitting}
                    setValuesToReport={setValuesToReport}
                    setNameExcel={setNameExcel}
                    handleFilterModalClose={handleFilterModalClose}
                /> 
            )}
          </Modal.Body>
        </Modal>
      );
}