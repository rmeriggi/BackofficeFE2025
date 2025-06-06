import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "@material-ui/core";
import useIsMountedRef from "../hooks/useIsMountedRef";
import { useOneTransaction } from "../modules/Accounts/Accounts/utils/apiHooks";
import { reversarTransaction } from "../modules/Accounts/Transactions/utils/service";

const defaultValues = {
  amount: "",
  creditAccount: "",
  creditCuit: "",
  day: "",
  debitAccount: "",
  debitCuit: "",
  description: "",
  destiny: "",
  hour: "",
  id: "",
  origin: "",
  person: "",
  status: "",
  transactionType: "",
}

export function ReceiptModal({ allowReversar, show, onHide, idTransaction, setId, setOpenSnackbar, setVariant, setMessage }) {

  const isMounted = useIsMountedRef()
  const [oneTransaction, oneTransactionCompleted] = useOneTransaction(isMounted, idTransaction)
  const [transactionData, setTransactionData] = useState(defaultValues)

  useEffect(() => {
    setTransactionData(oneTransaction?.transaction?.[0])
  }, [oneTransaction.transaction])

  if(!oneTransactionCompleted || oneTransaction.length === 0){
    return null
  }

  const reversar = async () => {
    try {
      await reversarTransaction(idTransaction)
      setVariant('success')
      setMessage('La transaccion se reverso correctamente.')
      onHide()
      setOpenSnackbar(true)
    } catch {
      setVariant('error')
      setMessage('La transaccion no se pudo reversar correctamente. Por favor, volvé a intentar.')
      setOpenSnackbar(true)
      onHide()
    }
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      onExited={() => {
        setTransactionData(defaultValues)
        setId("")
      }}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {transactionData?.description}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {transactionData === defaultValues  ? (
          <>
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div> 
          {/*end::Loading*/}
          </>
        ) : (
         <>
          <div className="row text-center justify-content-center">
            <div className="col-4">
              <p><strong>Fecha</strong></p>
              <p>{transactionData?.day}</p>
            </div>
            <div className="col-4">
              <p><strong>Hora</strong></p>
              <p>{transactionData?.hour}</p>
            </div>
            <div className="col-4">
              <p><strong>Nro de transacción</strong></p>
              <p>{transactionData?.id}</p>
            </div>
          </div>
          <div className="px-5 pt-5 border-top">
            <div >
              <span className="text-muted">Cuenta Débito</span>
              <p className="font-weight-bold">{transactionData?.debitAccount}</p>
              <span className="text-muted">CUIL</span>
              <p className="font-weight-bold">{transactionData?.debitCuit}</p>
            </div>
            <div >
            <span className="text-muted">Importe Debitado</span>
              <p className="font-weight-bold">{transactionData?.amount}</p>
            </div>
            <div >
              <span className="text-muted">Cuenta Crédito</span>
              <p className="font-weight-bold">{transactionData?.creditAccount}</p>
              <span className="text-muted">CUIL</span>
              <p className="font-weight-bold">{transactionData?.creditCuit}</p>
              <span className="text-muted">Denominación</span>
              <p className="font-weight-bold">
                {transactionData?.owner}
              </p>
            </div>
            <div >
              <span className="text-muted">Transferido a</span>
              <p className="font-weight-bold">{transactionData?.destiny}</p> 
            </div>
            <div >
              <span className="text-muted">Importe Acreditado</span>
              <p className="font-weight-bold">{transactionData?.amount}</p>
            </div>
          </div>
        </>
        )}
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          {allowReversar && (
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={reversar}
              style={{marginRight: 10}}
            >
              Reversar
            </Button>
          )}
        
          <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={onHide}
          >
              Volver
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
