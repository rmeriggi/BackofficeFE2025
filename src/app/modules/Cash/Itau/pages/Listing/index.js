/* eslint-disable eqeqeq */
import React, { useState } from "react";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { useMovements } from "../../utils/apiHooks";
import { LayoutSplashScreen, useSubheader } from "../../../../../../_metronic/layout";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { movementsAdapter } from "../../adapters/movementsAdapter";
import ListingFilter from "./ListingFilter";
import { CircularProgress } from "@material-ui/core";
import { useModal } from "../../../../../hooks/useModal";
import { ModalWrapper } from "../../../../../components/ModalWrapper";
import { ProofOfPayment } from "../../../BankValues/components/ProofOfPayment";

export default function Listing() {

    const isMountedRef = useIsMountedRef()
    const subHeader = useSubheader()
    subHeader.setTitle('Banco Itaú')
    const [show, openModal, closeModal] = useModal()
    const [dataModal, setDataModal ] = useState()
    const [loading, setLoading ] = useState(false)
    const [dates, setDates] = useState({fromDate: new Date().toISOString(), toDate: new Date().toISOString()})
    const [movementsData, movementsCompleted] = useMovements(isMountedRef, dates, setLoading)

    if(!movementsCompleted) return <LayoutSplashScreen />

    const movements = movementsAdapter(movementsData)
    
    return (
        <>
        <ModalWrapper
            show={show}
            onHide={closeModal}
            title="Comprobante"
        >
            <ProofOfPayment dataModal={dataModal}/>
        </ModalWrapper>
        <Card>
            <CardHeader title="Movimientos" >
                <CardHeaderToolbar>
                    <ListingFilter 
                        disabled={movements.length === 0}
                        movementsData={movements}
                        dates={dates}
                        setDates={setDates}
                        setLoading={setLoading}
                        loading={loading}
                    />
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody> 
                {loading ? 
                    <CircularProgress size={20} color="secondary"/> 
                :
                    <ListingTable 
                        dataTable={movements} 
                        openModal={openModal}
                        setDataModal={setDataModal}
                    />
                }
            </CardBody>
        </Card>
        </>
    )
}