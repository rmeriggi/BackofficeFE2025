/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { ListingTable } from "./ListingTable";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import {
  useCashoutTransactions /* useCashoutTransactionsConsult */,
} from "../../utils/apiHooks";
/* import ConfirmationModal from "../../components/modals/ConfirmationModal"; */
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { cashoutsAdapter } from "../../adapters/cashoutsAdapter";
import ListingFilter from "./ListingFilter";
import { useModal } from "../../../../../hooks/useModal";
import ModalDetail from "../../components/modals/ModalDetail";
import ModalDetailBankCashout from "../../components/modals/ModalTwo";

export default function Listing({ data }) {
  const isMountedRef = useIsMountedRef();
  const [transactionsData, transactionsCompleted] = useCashoutTransactions(
    isMountedRef
  );
  const [show, showModal, closeModal] = useModal();
  const [
    showConsultBank,
    showModalConsultBank,
    closeModalConsultBank,
  ] = useModal();
  const [dataModal, setDataModal] = useState();
  const [dataConsultBank, setDataModalConsultBank] = useState();

  const openModal = (row) => {
    setDataModal(row);
    showModal();
  };

  const openModalConsultBank = (row) => {
    setDataModalConsultBank(row.id);
    showModalConsultBank();
  };

  if (!transactionsCompleted) return <LayoutSplashScreen />;

  const cashOuts = cashoutsAdapter(transactionsData);

  return (
    <Card>
      <CardHeader title="Transacciones">
        <CardHeaderToolbar>
          <ListingFilter disabled={cashOuts.length === 0} data={cashOuts} />
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ListingTable
          dataTable={cashOuts}
          openModal={openModal}
          openModal1={openModalConsultBank}
        />
      </CardBody>
      <ModalDetail show={show} onHide={closeModal} dataModal={dataModal} />
      <ModalDetailBankCashout
        show={showConsultBank}
        onHide={closeModalConsultBank}
        id={dataConsultBank}
      />
    </Card>
  );
}
