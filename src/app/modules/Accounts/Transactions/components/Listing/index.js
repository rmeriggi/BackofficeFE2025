import React, { useState } from "react";
import ListingFilter from "./ListingFilter";
import { ListingTable } from "./ListingTable";
import { ReceiptModal } from "../../../../../components/ReceiptModal";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import {
  getCurrencies,
  getEntities,
} from "../../../../../_redux/combos/combosActions";
import { useFetchCombos } from "../../../../../hooks/useFetchCombos";
import { SnackbarMessage } from "../../../../../components";
import { shallowEqual, useSelector } from "react-redux";
import { AccusationModal } from "../../../../../components/AccusationModal";

export default function Listing() {
  const [transactionsData, setTransactionsData] = useState({
    transactionsTypes: [],
  });
  const [currencies] = useFetchCombos("currencies", getCurrencies);
  const [entitiesData] = useFetchCombos("entities", getEntities);
  const [showModal, setShowModal] = useState(false);
  const [showAccusationModal, setShowAccusationModal] = useState(false);
  const [id, setId] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [variant, setVariant] = useState("success");
  const [message, setMessage] = useState(
    "El ajuste fue realizado correctamente."
  );
  const { hasAccountsSettingasAccess } = useSelector(
    ({ auth }) => ({
      hasAccountsSettingasAccess: auth.access["accounts.Ajustes"],
    }),
    shallowEqual
  );

  const openReceipt = (id) => {
    setShowModal(true);
    setId(id);
  };
  const closeReceipt = () => {
    setShowModal(false);
  };

  const openAccusation = (id) => {
    setShowAccusationModal(true);
    setId(id);
  };
  const closeAccusation = () => {
    setShowAccusationModal(false);
  };

  function handleCloseSnackbar(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  }

  return (
    <Card>
      <CardHeader noWrap title="">
        <CardHeaderToolbar>
          <ListingFilter
            setTransactionsData={setTransactionsData}
            transactionsData={transactionsData.transactionsTypes}
            currencies={currencies}
            entities={entitiesData}
          />
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ReceiptModal
          allowReversar={hasAccountsSettingasAccess}
          show={showModal}
          onHide={closeReceipt}
          idTransaction={id}
          setId={setId}
          setOpenSnackbar={setOpenSnackbar}
          setVariant={setVariant}
          setMessage={setMessage}
        />
        <AccusationModal
          show={showAccusationModal}
          onHide={closeAccusation}
          idTransaction={id}
          setId={setId}
          setOpenSnackbar={setOpenSnackbar}
          setVariant={setVariant}
          setMessage={setMessage}
        />
        <ListingTable
          transactionsData={transactionsData.transactionsTypes}
          openReceipt={openReceipt}
          openAccusation={openAccusation}
        />
        <SnackbarMessage
          handleClose={handleCloseSnackbar}
          open={openSnackbar}
          variant={variant}
          message={message}
        />
      </CardBody>
    </Card>
  );
}
