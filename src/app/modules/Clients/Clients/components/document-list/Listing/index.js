import React, { useEffect, useState } from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import { useDocumentsClient } from "../../../utils/apiHooks";
import { documentsAdapter } from "./adapters/documentsAdapters";
import { Card, CardBody, CardHeader, CardHeaderToolbar } from "../../../../../../../_metronic/_partials/controls";
import { LayoutSplashScreen } from "../../../../../../../_metronic/layout";
import useIsMountedRef from "../../../../../../hooks/useIsMountedRef";
import { useModal } from "../../../../../../hooks/useModal";
import { StatusModal } from "../../../../Documents/components/StatusModal";
import { getUrlSolicityCC } from "../../../utils/service";

export default function Listing({idClient, passport, dni}) {

    const isMounted = useIsMountedRef(); 
    const [show, openModal, closeModal] = useModal()
    const [documentsInfo, documentsCompleted] = useDocumentsClient(isMounted, idClient ,show)
    const [idStatus, setIdStatus] = useState(1)
    const [id, setId] = useState(1)
    const [urlSolicity, setUrlSolicity] = useState()

    useEffect(() => {
        const getUrl = async() => {
            try {
                const url = await getUrlSolicityCC()  
                console.log('url de respuesta::::::::', url)
                setUrlSolicity(url) 
            } catch (error) {
                setUrlSolicity("")
            }
        }
        getUrl()
    }, [])
    
    
    if(!(documentsCompleted)) return <LayoutSplashScreen />

    const documents = documentsAdapter(documentsInfo.documentsList)

    return (
        <>
            <Card className="p-0 m-0">
                <CardHeader title="Documentos">
                <CardHeaderToolbar>
                    <ListingFilter  
                        disabled={documents.length === 0} 
                        data={documents} 
                        urlSolicity={urlSolicity}
                        passport={passport}
                        idClient={idClient}
                        dni={dni}
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