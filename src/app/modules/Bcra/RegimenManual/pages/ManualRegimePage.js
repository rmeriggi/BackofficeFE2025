import React, { useState } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import {
  seatAproceso,
  seatBproceso,
  seatArchivos,
  seatPadron,
} from "../utils/service";
import { useModal } from "../../../../hooks/useModal";
import { CreditModal } from "../components/modals/CreditModal";
import { DebitModal } from "../components/modals/DebitModal";
import { CashInOutModal } from "../components/modals/CashInOutModal";
import { Button } from "@material-ui/core";
import { SnackbarMessage } from "../../../../components/SnackbarMessage";
import {
  getCountries,
  getCurrencies,
} from "../../../../_redux/combos/combosActions";
import { useFetchCombos } from "../../../../hooks";
import { AlertDialog } from "../../../../components";

const adjustSchema = Yup.object().shape({});

export default function ManualRegimePage() {
  const [show, openModal, closeModal] = useModal();
  const [showDebit, openDebitModal, closeDebitModal] = useModal();
  const [showCashIn, openCashInModal, closeCashInModal] = useModal();
  const [showCashOut, openCashOutModal, closeCashOutModal] = useModal();
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [variant, setVariant] = useState("success");
  const [message, setMessage] = useState(
    "El ajuste fue realizado correctamente."
  );
  const [countries] = useFetchCombos("countries", getCountries);
  const [currencies] = useFetchCombos("currencies", getCurrencies);
  const [isSuccessA, setIsSuccessA] = useState(false);
  const [isSuccessB, setIsSuccessB] = useState(false);
  const [isSuccessPadron, setIsSuccessPadron] = useState(false);
  const [isSuccessXML, setIsSuccessXML] = useState(false);
  const [isLoadingA, setIsLoadingA] = useState(false);
  const [isLoadingB, setIsLoadingB] = useState(false);
  const [isLoadingPadron, setIsLoadingPadron] = useState(false);
  const [isLoadingXML, setIsLoadingXML] = useState(false);

  const handleClickOpen = () => {
    // setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  function handleCloseSnackbar(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  }

  const sendAproceso = async (values) => {
    setIsLoadingA(true);
    try {
      await seatAproceso(values);
      setVariant("success");
      setMessage("El proceso fue realizado correctamente.");
      closeModal();
      setTimeout(() => {
        handleCloseDialog();
        setOpenSnackbar(true);
      }, 1000);
      setIsSuccessA(true);
      setIsLoadingA(false);
    } catch {
      setVariant("error");
      setMessage(
        "El proceso no pudo ser realizado correctamente. Por favor, volvé a intentar."
      );
      setOpenSnackbar(true);
      closeModal();
      setIsSuccessA(false);
      setIsLoadingA(false);
    }
  };

  const sendBproceso = async (values) => {
    setIsLoadingB(true);
    try {
      await seatBproceso(values);
      setVariant("success");
      setMessage("El proceso fue realizado correctamente.");
      closeDebitModal();
      setTimeout(() => {
        handleCloseDialog();
        setOpenSnackbar(true);
      }, 1000);
      setIsSuccessB(true);
      setIsLoadingB(false);
    } catch {
      setVariant("error");
      setMessage(
        "El proceso no pudo ser realizado correctamente. Por favor, volvé a intentar."
      );
      handleCloseDialog();
      setOpenSnackbar(true);
      closeDebitModal();
      setIsSuccessB(false);
      setIsLoadingB(false);
    }
  };

  const sendArchivos = async (values) => {
    setIsLoadingXML(true);
    try {
      await seatArchivos(values);
      setVariant("success");
      setMessage("El proceso fue realizado correctamente.");
      closeCashInModal();
      setTimeout(() => {
        handleCloseDialog();
        setOpenSnackbar(true);
      }, 1000);
      setIsSuccessXML(true);
      setIsLoadingXML(false);
    } catch {
      setVariant("error");
      setMessage(
        "El proceso no pudo ser realizado correctamente. Por favor, volvé a intentar."
      );
      handleCloseDialog();
      setOpenSnackbar(true);
      closeCashInModal();
      setIsSuccessXML(false);
      setIsLoadingXML(false);
    }
  };

  const sendPadron = async (values) => {
    setIsLoadingPadron(true);
    try {
      await seatPadron(values);
      setVariant("success");
      setMessage("El proceso fue realizado correctamente.");
      closeCashOutModal();
      setTimeout(() => {
        handleCloseDialog();
        setOpenSnackbar(true);
      }, 1000);
      setIsSuccessPadron(true);
      setIsLoadingPadron(false);
    } catch {
      setVariant("error");
      setMessage(
        "El proceso no pudo ser realizado correctamente. Por favor, volvé a intentar."
      );
      handleCloseDialog();
      setOpenSnackbar(true);
      closeCashOutModal();
      setIsSuccessPadron(false);
      setIsLoadingPadron(false);
    }
  };

  // Datos para las tarjetas de procesos
  const processCards = [
    {
      id: "A",
      title: "BCRA_A_PROCESO",
      description: "Procesamiento de datos para BCRA tipo A",
      isSuccess: isSuccessA,
      onClick: openModal,
      isLoading: isLoadingA,
    },
    {
      id: "B",
      title: "BCRA_B_PROCESO",
      description: "Procesamiento de datos para BCRA tipo B",
      isSuccess: isSuccessB,
      onClick: openDebitModal,
      isLoading: isLoadingB,
    },
    {
      id: "Padron",
      title: "BCRA PADRON",
      description: "Actualización de padrón BCRA",
      isSuccess: isSuccessPadron,
      onClick: openCashOutModal,
      isLoading: isLoadingPadron,
    },
    {
      id: "XML",
      title: "ARCHIVOSXML",
      description: "Procesamiento de archivos XML",
      isSuccess: isSuccessXML,
      onClick: () => setOpenDialog(true),
      isLoading: isLoadingXML,
    },
  ];

  return (
    <div className="container bg-white py-5">
      <div className="row mb-5">
        <div className="col-12">
          <h2 className="fw-bold text-primary">Regimen informativo MANUAL</h2>
          <p className="text-muted">Seleccione el proceso que desea ejecutar</p>
        </div>
      </div>

      <Formik
        enableReinitialize={false}
        validationSchema={adjustSchema}
        initialValues={{
          idCurrency: 2,
          idCountry: 1,
          collectionAccount: "1034",
          amount: "",
          description: "",
          cbuOrigin: "",
          cbuDestination: "",
        }}
        onSubmit={() => {
          handleClickOpen();
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <Form>
            <div className="row">
              {processCards.map((card) => (
                <div className="col-lg-3 col-md-6 mb-4" key={card.id}>
                  <div
                    className={`card h-100 shadow-sm border-0 rounded-3 overflow-hidden ${
                      card.isSuccess ? "border border-success border-2" : ""
                    }`}
                    style={{
                      transition: "transform 0.3s, box-shadow 0.3s",
                      cursor: "pointer",
                      ":hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <div className="card-header py-3">
                      <h5
                        style={{ color: "rgb(0, 51, 102)" }}
                        className="card-title mb-0 text-center"
                      >
                        {card.title}
                      </h5>
                    </div>
                    <div className="card-body py-4">
                      <p className="card-text text-center text-muted">
                        {card.description}
                      </p>
                    </div>
                    <div className="card-footer bg-white border-0 py-3">
                      <Button
                        variant="contained"
                        color="default"
                        size="large"
                        fullWidth
                        onClick={card.onClick}
                        onSubmit={() => handleSubmit()}
                        className="fw-bold"
                        style={{
                          backgroundColor: "#0d6efd",
                          color: "white",
                          borderRadius: "8px",
                          padding: "10px 0",
                          textTransform: "none",
                          fontSize: "1rem",
                        }}
                      >
                        {card.isLoading ? (
                          <span>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Procesando...
                          </span>
                        ) : (
                          "PROCESAR"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <AlertDialog
              open={openDialog}
              handleClose={handleCloseDialog}
              sendFunction={() => {
                handleCloseDialog();
                openCashInModal();
              }}
              title="¿Procesar?"
              description="Asegurate de haber corridos los procesos A Y B"
            />
            <CreditModal
              show={show}
              loading={isLoadingA}
              onHide={closeModal}
              currency={currencies}
              country={countries}
              sendFunction={sendAproceso}
            />
            <DebitModal
              loading={isLoadingB}
              showDebit={showDebit}
              onHide={closeDebitModal}
              currency={currencies}
              country={countries}
              sendFunction={sendBproceso}
            />
            <CashInOutModal
              title="ARCHIVOSXML"
              loading={isLoadingXML}
              showDebit={showCashIn}
              onHide={closeCashInModal}
              currency={currencies}
              country={countries}
              sendFunction={sendArchivos}
            />
            <CashInOutModal
              title="BCRA PADRON"
              loading={isLoadingPadron}
              showDebit={showCashOut}
              onHide={closeCashOutModal}
              currency={currencies}
              country={countries}
              sendFunction={sendPadron}
            />
          </Form>
        )}
      </Formik>
      <SnackbarMessage
        handleClose={handleCloseSnackbar}
        open={openSnackbar}
        variant={variant}
        message={message}
      />
    </div>
  );
}
