/* eslint-disable eqeqeq */
import React, { useState } from "react";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader} from "../../../../../../_metronic/_partials/controls";
import { useCollections } from "../../utils/apiHooks";
import { LayoutSplashScreen, useSubheader } from "../../../../../../_metronic/layout";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { collectionsNCAdapter } from "../../adapters/collectionsNCAdapter";
import InputModal from "../../components/InputModal";


export default function Listing() {

    const isMountedRef = useIsMountedRef()
    const subHeader = useSubheader()
    subHeader.setTitle('Cobranzas NC')
    const [showModal, setShowModal] = useState(false)
    const [collectionsData, collectionsCompleted] = useCollections(isMountedRef, showModal)
    const [id, setId] = useState(0)

    if(!collectionsCompleted) return <LayoutSplashScreen />

    const collections = collectionsNCAdapter(collectionsData)

    const openActionModal = (id) => {
        setShowModal(true)
    }

    const closeActionModal = () => {
        setShowModal(false)
    }

    return (
        <Card>
            <CardHeader title="Listado" />
            <CardBody> 
                <ListingTable 
                    dataTable={collections} 
                    openActionModal={openActionModal}
                    closeActionModal={closeActionModal}
                    setId={setId}
                />
            </CardBody>
            <InputModal show={showModal} onHide={closeActionModal} id={id}/>
        </Card>
    )
}