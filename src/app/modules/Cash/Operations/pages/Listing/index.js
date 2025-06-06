/* eslint-disable eqeqeq */
import React, { useState } from "react";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader} from "../../../../../../_metronic/_partials/controls";
import { useOperations } from "../../utils/apiHooks";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { operationsAdapter } from "../../adapters/collectionsAdapter";

export default function Listing() {

    const isMountedRef = useIsMountedRef()
    const [actionModal, setActionModal] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [operationsData, operationsCompleted] = useOperations(isMountedRef, showModal)
    const [operationId, setOperationId] = useState()

    if(!operationsCompleted) return <LayoutSplashScreen />

    const operations = operationsAdapter(operationsData.operations)

    const openActionModal = (id) => {
        setOperationId(id)
        setShowModal(true)
    }

    const closeActionModal = () => {
        setShowModal(false)
    }

    return (
        <Card>
            <CardHeader title="Autorización de operaciones" />
            <CardBody> 
                <ListingTable 
                    dataTable={operations} 
                    setActionModal={setActionModal}
                    openActionModal={openActionModal}
                />
            </CardBody>
            <ConfirmationModal show={showModal} onHide={closeActionModal} action={actionModal} id={operationId}/>
        </Card>
    )
}