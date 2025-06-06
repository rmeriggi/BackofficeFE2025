/* eslint-disable eqeqeq */
import { Button } from '@material-ui/core';
import React  from 'react'
import { Modal } from 'react-bootstrap';

export const CreditModal = ({show, onHide, values, currency, country, sendFunction}) => {

  
 return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Confirmación de Acción para Crédito Externo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
          <div className='form-group row'> 
            <p className="col-lg-4 text-muted" style={{paddingTop:"20px", fontSize:"16px"}}> <span style={{color:'#303f9f'}}> Importe: $ {values.amount} </span> </p>            
            <div className="col-lg-4 text-dark" style={{paddingTop:"20px",fontSize:"16px"}}>  <span style={{color:'#303f9f'}}> CBU Origen:  {values.cbuOrigin} </span></div>
            <div className="col-lg-4 text-dark" style={{paddingTop:"20px", fontSize:"16px"}}> <span style={{color:'#303f9f'}}> CBU Destino:  {values.cbuDestination}</span> </div>
            <div className="col-lg-4 text-dark" style={{paddingTop:"20px", fontSize:"16px"}}> Pais: {country?.[(values.idCountry)-1].country} </div>
            <div className="col-lg-4 text-dark" style={{paddingTop:"20px", fontSize:"16px"}}> Moneda: {currency?.[(values.idCurrency)-1].currency}  </div>
            <div className="col-lg-4 text-dark" style={{paddingTop:"20px", fontSize:"16px"}}> ID Cuenta Recaudadora: {values.collectionAccount}  </div>
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
