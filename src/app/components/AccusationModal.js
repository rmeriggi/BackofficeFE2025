import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Button, CircularProgress } from "@material-ui/core";
import useIsMountedRef from "../hooks/useIsMountedRef";
import {
  useAccusationsSourcesList,
  useOneTransaction,
} from "../modules/Accounts/Accounts/utils/apiHooks";
import { makeAccusation } from "../modules/Accounts/Transactions/utils/service";
import { Formik } from "formik";
import { GeneralSelector } from "./Fields/GeneralSelector";

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
};

export function AccusationModal({
  show,
  onHide,
  idTransaction,
  setId,
  setOpenSnackbar,
  setVariant,
  setMessage,
}) {
  const isMounted = useIsMountedRef();
  const [oneTransaction, oneTransactionCompleted] = useOneTransaction(
    isMounted,
    idTransaction
  );
  const [accusations, accusationsCompleted] = useAccusationsSourcesList(
    isMounted
  );
  const [transactionData, setTransactionData] = useState(defaultValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setTransactionData(oneTransaction?.transaction?.[0]);
  }, [oneTransaction.transaction]);

  if (!oneTransactionCompleted || oneTransaction.length === 0) {
    return null;
  }

  if (!accusationsCompleted || accusations.length === 0) {
    return null;
  }

  const accusationHandler = async (idTransaction, idextrasource, reference) => {
    try {
      setIsSubmitting(true);
      await makeAccusation(idTransaction, idextrasource, reference);
      setVariant("success");
      setMessage("La transaccion se imputo correctamente.");
      onHide();
      setOpenSnackbar(true);
      setIsSubmitting(false);
    } catch {
      setVariant("error");
      setMessage(
        "La transaccion no se pudo imputar correctamente. Por favor, volvé a intentar."
      );
      setOpenSnackbar(true);
      onHide();
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      onExited={() => {
        setTransactionData(defaultValues);
        setId("");
      }}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Formik
        initialValues={{
          idextrasource: accusations.accusations[0].id,
          reference: "",
        }}
        onSubmit={(values) => {
          accusationHandler(
            idTransaction,
            values.idextrasource,
            values.reference
          );
        }}
      >
        {({ values, handleSubmit, handleBlur, setFieldValue }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                {transactionData?.description}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="overlay overlay-block cursor-default">
              {/*begin::Loading*/}
              {transactionData === defaultValues ? (
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
                      <p>
                        <strong>Fecha</strong>
                      </p>
                      <p>{transactionData?.day}</p>
                    </div>
                    <div className="col-4">
                      <p>
                        <strong>Hora</strong>
                      </p>
                      <p>{transactionData?.hour}</p>
                    </div>
                    <div className="col-4">
                      <p>
                        <strong>Nro de transacción</strong>
                      </p>
                      <p>{transactionData?.id}</p>
                    </div>
                  </div>
                  <div className="px-5 pt-5 border-top">
                    <div>
                      <span className="text-muted">Cuenta Plataforma</span>
                      <p className="font-weight-bold">
                        {transactionData?.debitAccount}
                      </p>
                      <span className="text-muted">CUIT Plataforma</span>
                      <p className="font-weight-bold">
                        {transactionData?.debitCuit}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted">Importe</span>
                      <p className="font-weight-bold">
                        {transactionData?.amount}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted">CBU</span>
                      <p className="font-weight-bold">{transactionData?.cbu}</p>
                      <span className="text-muted">Alias</span>
                      <p className="font-weight-bold">
                        {transactionData?.alias}
                      </p>
                      <span className="text-muted">CUIT</span>
                      <p className="font-weight-bold">
                        {transactionData?.cuit}
                      </p>
                      <span className="text-muted">Denominación</span>
                      <p className="font-weight-bold">
                        {transactionData?.owner}
                      </p>
                    </div>
                    <div>
                      <span className="text-muted">Imputar a</span>
                      <GeneralSelector
                        values={values}
                        valueName="idextrasource"
                        keyName="source"
                        data={accusations.accusations}
                        setFieldValue={setFieldValue}
                      />
                    </div>
                    <div>
                      <span className="text-muted">Referencia</span>
                      <input
                        type="text"
                        className="form-control"
                        name="reference"
                        placeholder="Referencia"
                        onBlur={handleBlur}
                        value={values.reference}
                        onChange={(e) => {
                          setFieldValue("reference", e.target.value);
                        }}
                      />
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
                  onClick={() => handleSubmit()}
                  style={{ marginRight: 10 }}
                  endIcon={
                    isSubmitting && (
                      <CircularProgress size={20} color="secondary" />
                    )
                  }
                  disabled={isSubmitting}
                >
                  Imputar
                </Button>
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
          </form>
        )}
      </Formik>
    </Modal>
  );
}
