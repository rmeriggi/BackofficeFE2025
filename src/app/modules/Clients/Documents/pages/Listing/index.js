import React, { useState } from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import useIsMountedRef from '../../../../../hooks/useIsMountedRef';
import { LayoutSplashScreen } from '../../../../../../_metronic/layout';
import { useDocuments } from "../../utils/apihook";
import { documentsAdapter } from "./adapters/documentsAdapters";
import { StatusModal } from "../../components/StatusModal";
import { useModal } from "../../../../../hooks/useModal";

export default function Listing() {

    const isMounted = useIsMountedRef(); 
    const [show, openModal, closeModal] = useModal()
    const [documentsInfo, documentsCompleted] = useDocuments(isMounted, show)
    const [idStatus, setIdStatus] = useState(1)
    const [id, setId] = useState(1)
    
    if(!(documentsCompleted)) return <LayoutSplashScreen />

    const documents = documentsAdapter(documentsInfo.documents)

    return (
        <>
            <Card>
                <CardHeader title="Listado">
                <CardHeaderToolbar>
                    <ListingFilter  
                        disabled={documents.length === 0} 
                        data={documents} 
                    />
                    </CardHeaderToolbar>
                </CardHeader>
                <CardBody>
                    <ListingTable 
                        documentsData={documents} openModal={openModal} setIdStatus={setIdStatus} setId={setId}
                    />
                </CardBody>
            </Card>
            <StatusModal 
                idStatus={idStatus}
                id={id}
                show={show}
                onHide={closeModal}
            />
        </>
    )
}