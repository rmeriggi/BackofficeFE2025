/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { ListingTable } from "./ListingTable";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { usePaymentLinks } from "../../utils/apiHooks";
import {
  LayoutSplashScreen,
  useSubheader,
} from "../../../../../../_metronic/layout";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { paymentLinksAdapter } from "../../adapters/paymentLinksAdapter";
import ModalDetail from "../../components/ModalDetail";
import { useModal } from "../../../../../hooks/useModal";
import ListingFilter from "./ListingFilter";

export default function Listing() {
  const isMountedRef = useIsMountedRef();
  const subHeader = useSubheader();
  subHeader.setTitle("Links de Pago");
  const [paymentLinksData, linksCompleted] = usePaymentLinks(isMountedRef);
  const [show, showModal, closeModal] = useModal();
  const [dataModal, setDataModal] = useState();

  const openModal = (row) => {
    setDataModal(row);
    showModal();
  };

  if (!linksCompleted) return <LayoutSplashScreen />;

  const paymentLinks = paymentLinksAdapter(paymentLinksData);

  return (
    <>
      <Card>
        <CardHeaderToolbar title="Listado">
          <ListingFilter />
        </CardHeaderToolbar>
        <CardBody>
          <ListingTable dataTable={paymentLinks} openModal={openModal} />
        </CardBody>
      </Card>
      <ModalDetail show={show} onHide={closeModal} dataModal={dataModal} />
    </>
  );
}
