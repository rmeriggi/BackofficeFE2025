import { format } from 'date-fns';
import React from 'react'
import { Modal } from "react-bootstrap";

export function DetailTaxModal({ show, onHide, oneTaxDetail }) {
  
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Detalle de Impuesto
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {!oneTaxDetail ? (
          <>
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div> 
          {/*end::Loading*/}
          </>
        ) : (
         <>
          <div className="row text-center">
            <div className="col-6">
              <p><strong>Desde</strong></p>
              {format(new Date(oneTaxDetail.date), "dd/MM/yyyy")}
            </div>
            <div className="col-6">
              <p><strong>Hasta</strong></p>
              {format(new Date(oneTaxDetail.expiration), "dd/MM/yyyy")}
            </div>
          </div>
          <div className="p-5 border-top">
            <div >
              <p><strong>Nombre del Impuesto: </strong>{oneTaxDetail.tax}</p>
            </div>
            <div >
              <p><strong>Descripcion: </strong>{oneTaxDetail.description}</p>
            </div>
            <div >
              <p><strong>Pais: </strong>{oneTaxDetail.idcountry}</p>
            </div>
            <div >
              <p><strong>Moneda: </strong>{oneTaxDetail.idcurrency}</p>
            </div>
            <div >
              <p><strong>Origen Destino: </strong>{oneTaxDetail.originDestiny}</p>
            </div>
            <div >
              <p><strong>Status: </strong>{oneTaxDetail.status === 0 ? "Inactivo" : "Activo"}</p>
            </div>
          </div>
        </>
        )}
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-primary btn-elevate mr-3"
          >
            Volver
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
