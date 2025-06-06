/* eslint-disable eqeqeq */
import React, { useState } from "react";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader} from "../../../../../../_metronic/_partials/controls";
import { usePaymentLinks } from "../../utils/apiHooks";
import { LayoutSplashScreen, useSubheader } from "../../../../../../_metronic/layout";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { paymentLinksAdapter } from "../../adapters/paymentLinksAdapter";
import ModalDetail from "../../components/ModalDetail";
import { useModal } from "../../../../../hooks/useModal";

export default function Listing() {

    const isMountedRef = useIsMountedRef()
    const subHeader = useSubheader()
    subHeader.setTitle('Links de Pago')
    const [paymentLinksData, linksCompleted] = usePaymentLinks(isMountedRef)
    const [show, showModal, closeModal] = useModal()
    const [dataModal, setDataModal] = useState()

    const openModal = (row) => {
        setDataModal(row)
        showModal()
    }

    if(!linksCompleted) return <LayoutSplashScreen />

    const paymentLinks = paymentLinksAdapter(paymentLinksData)

    return (
        <>
        <Card>
            <CardHeader title="Listado" />
            <CardBody> 
                <ListingTable 
                    dataTable={paymentLinks} 
                    openModal={openModal}
                />
            </CardBody>
        </Card>
        <ModalDetail show={show} onHide={closeModal} dataModal={dataModal}/>
        </>
    )
}