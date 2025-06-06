import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { formatAmountFromString } from "../../../../../../utils/formatData";
import { assignLost, assignLostQuota, forgiveDebt, forgiveDebtQuota } from "../../../utils/service";
import { useSnackBar } from "../../../../../../hooks/useSnackBar"
import { SnackbarMessage } from "../../../../../../components/SnackbarMessage";

export const AdjustmentModal = ({ show, onHide, modalInfo, values, action, id})=> {

  const { open, variant,message, handleClose, setOpenMessage } = useSnackBar()

  const handleConfirmation = async() => {
    const requestValues = {
      ...values,
      excecute: 1
    }
    if(action === 1){
      try {
        await forgiveDebt(requestValues)
        setOpenMessage("success", "Condonación realizada correctamente.")
        setTimeout(() => {
          onHide()
        }, 3000);
      } catch (error) {
        setOpenMessage("error", "No se a podido la condonación. Por favor, volvé a intentar.")
        setTimeout(() => {
          onHide()
        }, 3000);
      }
    } else if(action === 2 ){
      try {
        await assignLost(requestValues)
        setOpenMessage("success", "Asignación de perdida realizada correctamente.")
        setTimeout(() => {
          onHide()
        }, 3000);
      } catch (error) {
        setOpenMessage("error", "No se a podido la asignación de perdida. Por favor, volvé a intentar.")
        setTimeout(() => {
          onHide()
        }, 3000);
      }
    }else if(action === 3){
      try {
        await forgiveDebtQuota({excecute: 1}, id)
        setOpenMessage("success", "Condonación realizada correctamente.")
        setTimeout(() => {
          onHide()
        }, 3000);
      } catch (error) {
        setOpenMessage("error", "No se a podido la condonación. Por favor, volvé a intentar.")
        setTimeout(() => {
          onHide()
        }, 3000);
      }
    }else if(action === 4){
      try {
        await assignLostQuota({excecute: 1}, id)
        setOpenMessage("success", "Asignación de perdida realizada correctamente.")
        setTimeout(() => {
          onHide()
        }, 3000);
      } catch (error) {
        setOpenMessage("error", "No se a podido la asignación de perdida. Por favor, volvé a intentar.")
        setTimeout(() => {
          onHide()
        }, 3000);
      }
    }
  }
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Confirmación de Acción
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">            
        <div className="row mb-5 justify-content-around"> 
          <span className="font-size-lg font-weight-bold text-muted text-center"> Cantidad de Cuotas </span>
          <span className="font-size-lg font-weight-bold text-muted text-center"> Monto Total </span>
          <span className="font-size-lg font-weight-bold text-muted text-center"> Total de Créditos </span>
        </div>
        <div className="row mb-5 justify-content-around"> 
          <span className="font-size-lg font-weight-bold text-center pl-10"> {modalInfo?.totalFees} </span>
          <span className="font-size-lg font-weight-bold text-center">  ${formatAmountFromString(modalInfo?.totalAmount)}</span>
          <span className="font-size-lg font-weight-bold text-center"> {modalInfo?.totalCredits} </span>
        </div>
        <div style={{  display: 'flex', justifyContent: 'flex-end'}}> 
          <Button 
            variant="outlined" 
            color="secondary" 
            type="submit" 
            className="ml-4" 
            onClick={()=>{
              onHide()
            }}
            >
            Volver 
          </Button> 
          <Button 
            variant="contained" 
            color="secondary" 
            type="submit" 
            className="ml-4" 
            onClick={()=>{
              handleConfirmation()
            }}
            >
              Confirmar 
          </Button> 
        </div> 
      </Modal.Body>
        <SnackbarMessage
          handleClose={handleClose}
          open={open}
          variant={variant}
          message={message}
        />
    </Modal>
  );
}

