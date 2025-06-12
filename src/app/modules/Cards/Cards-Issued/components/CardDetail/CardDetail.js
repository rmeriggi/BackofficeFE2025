/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useState, useRef } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { Button, CircularProgress } from "@material-ui/core";
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";
import CardEdit from "./flaps/CardEdit/CardEdit";
import editCardsMock from "../../__mocks__/editCardsMock";
import TransactionsCard from "./flaps/Transactions/TransactionsCard";
import CardPaymentList from "./flaps/CardPayment/CardPaymentList";
import usePrint from "../../../../hooks/usePrint";
import { cardIssuedLinks } from "../../utils/cardIssuedLinks";

export function CardDetail({
  history,
  match: {
    params: { id },
  },
}) {
  const [tab, setTab] = useState("card");
  const btnRef = useRef();
  const { printRef, handlePrint } = usePrint();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [variant, setVariant] = useState("success");
  const [message, setMessage] = useState(
    "Los datos fueron modificados correctamente"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const backToCardsList = () => {
    history.push(`${cardIssuedLinks.list}`);
  };

  function handleCloseSnackbar(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  }

  const saveEditCard = async (values) => {
    try {
      setVariant("success");
      setMessage("Los datos fueron modificados correctamente.");
      setOpenSnackbar(true);
    } catch {
      setVariant("error");
      setMessage(
        "Los datos no pudieron ser modificados correctamente. Por favor, volvé a intentar."
      );
      setOpenSnackbar(true);
    }
  };

  const saveCardClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  return (
    <Card>
      <CardHeader
        title={
          tab === "card" || tab === "transactions" ? "Editar" : "Últimos pagos"
        }
      >
        <CardHeaderToolbar>
          <Button
            variant="outlined"
            color="secondary"
            className="ml-4"
            size="large"
            onClick={backToCardsList}
          >
            Volver
          </Button>
          {tab === "card" || tab === "transactions" ? (
            <Button
              variant="contained"
              color="secondary"
              className="ml-4"
              size="large"
              disabled={isSubmitting || tab === "transactions"}
              onClick={saveCardClick}
              endIcon={
                isSubmitting && <CircularProgress size={20} color="secondary" />
              }
            >
              Actualizar
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              onClick={handlePrint}
              className="ml-4 btn btn-primary no-print"
            >
              Imprimir
            </Button>
          )}
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ul className="nav nav-tabs nav-tabs-line " role="tablist">
          <li className="nav-item" onClick={() => setTab("card")}>
            <a
              className={`nav-link ${tab === "card" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "card").toString()}
            >
              Tarjeta
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("transactions")}>
            <a
              className={`nav-link ${tab === "transactions" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "transactions").toString()}
            >
              Transacciones
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("pagos")}>
            <a
              className={`nav-link ${tab === "pagos" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "pagos").toString()}
            >
              Pagos
            </a>
          </li>
        </ul>
        <div className="mt-5">
          {tab === "card" && (
            <CardEdit
              idCard={id}
              cardInfo={editCardsMock}
              btnRef={btnRef}
              setIsSubmitting={setIsSubmitting}
              saveEditCard={saveEditCard}
            />
          )}
          {tab === "transactions" && <TransactionsCard />}
          {tab === "pagos" && <CardPaymentList printRef={printRef} />}
        </div>
      </CardBody>
      <SnackbarMessage
        handleClose={handleCloseSnackbar}
        open={openSnackbar}
        variant={variant}
        message={message}
      />
    </Card>
  );
}
