/* eslint-disable eqeqeq */
import React from 'react'
import { Modal } from 'react-bootstrap';
import { Button } from '@material-ui/core';

export const CashInOutModal = ({title, showDebit, onHide, values, currency, country, sendFunction}) => {
  
  return (
    <Modal
      show={showDebit}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
          <div className='form-group row'> 
            <p className="col-lg-4 text-muted" style={{paddingTop:"20px", fontSize:"16px"}}> <span className="text-dark"> Importe: $ {values.amount} </span> </p>
            <div className="col-lg-4 text-dark" style={{paddingTop:"20px", fontSize:"16px"}}> Pais: {country?.[(values.idCountry)-1].country} </div>
            <div className="col-lg-4 text-dark" style={{paddingTop:"20px", fontSize:"16px"}}> Moneda: {currency?.[(values.idCurrency)-1].currency}  </div>
            <div className="col-lg-4 text-dark" style={{paddingTop:"20px", fontSize:"16px"}}> ID Cuenta Recaudadora: {values.collectionAccount}  </div>
            <div className="col-lg-4 text-dark" style={{paddingTop:"20px",fontSize:"16px"}}> CBU Origen:  {values.cbuOrigin} </div>
            <div className="col-lg-4 text-dark" style={{paddingTop:"20px", fontSize:"16px"}}> CBU Destino:  {values.cbuDestination} </div>
          </div>

        <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{float:'right', marginTop:'20px'}}
            className="col-lg-2"
            onClick={sendFunction}
          >
            Confirmar
          </Button>

          
           
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            style={{float:'right', marginRight:'20px', marginTop:'20px'}}
            className="col-lg-2"
            onClick={onHide}
          >
            Volver
          </Button>
      </Modal.Body>

      
    </Modal>
  );
}
