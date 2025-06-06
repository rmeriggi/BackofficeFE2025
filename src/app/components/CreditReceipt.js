import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { useOneCreditForReceipt } from "../modules/Clients/Clients/utils/apiHooks";
import useIsMountedRef from "../hooks/useIsMountedRef";
import moment from 'moment';
import { formatAmountFromString } from "../utils/formatData";

const statusesMock = [
  {
      id: 1,
      status: 'Pendiente'
  },
  {
      id: 2,
      status: 'Otorgado'
  },
  {
      id: 7,
      status: 'Rechazado'
  },
  {
      id: 5,
      status: 'En curso'
  },
  {
      id: 3,
      status: 'Finalizado'
  },
  {
      id: 6,
      status: 'En Mora'
  },
  {
      id: 7,
      status: 'Cancelado'
  },
  {
      id: 8,
      status: 'Arrepentimiento'
  }
]

export function CreditReceipt({ show, onHide, id }) {

  const idMounted = useIsMountedRef();

  const [creditInfo, creditInfoCompleted] = useOneCreditForReceipt(id, idMounted)

  const getStatus = (status) => {
    const response = statusesMock.find(c => c.id === Number(status)).status
    return response;
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
           Crédito solicitado
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {!(creditInfoCompleted) ? (
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
              <p><strong>Fecha </strong></p>
              <p>{moment(creditInfo?.credit.date).format("DD/MM/YYYY")}</p>
            </div>
            <div className="col-4">
              <p><strong>Hora</strong></p>
              <p>{moment(creditInfo?.credit.date).format("hh:mm:ss a")}</p>
            </div>
            <div className="col-4">
              <p><strong>Nro de operación</strong></p>
              <p>{creditInfo?.credit.id}</p>
            </div>
          </div>
          <div className="p-5 border-top">
            <div >
              <span className="text-muted">Cuotas totales</span>
              <p className="font-weight-bold">{creditInfo?.credit.quota}</p>
              <span className="text-muted">Saldo pendiente</span>
              <p className="font-weight-bold">${formatAmountFromString(creditInfo?.credit.pending)}</p>
            </div>
            <div >
            <span className="text-muted">Importe</span>
              <p className="font-weight-bold">${formatAmountFromString(creditInfo?.credit.amount)}</p>
            </div>
            <div >
              <span className="text-muted">Estado</span>
              <p className="font-weight-bold">{getStatus(creditInfo?.credit.status)}</p>
            </div>
          </div>
        </>
        )}
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
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
