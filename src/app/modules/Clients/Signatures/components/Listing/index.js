import React from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import { CircularProgress } from "@material-ui/core";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { useFetchSignaturesClients } from "../../../../../hooks/useFetchSignaturesClients";

export default function Listing() {

    const [signaturesClients , signaturesClientsloading]=useFetchSignaturesClients()

    if(!signaturesClients || signaturesClientsloading ){
        return <LayoutSplashScreen />
      }

    return (
        <>
        <Card>
            <CardHeader title="Clientes">
            <CardHeaderToolbar>
                    <ListingFilter  
                        disabled={signaturesClients.length === 0} 
                        data={signaturesClients} 
                    />
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                {signaturesClientsloading ? 
                    <CircularProgress size={20} color="secondary"/>
                :
                    <ListingTable
                    signaturesClientsData={signaturesClients}/>
                }
                 
            </CardBody>
        </Card>        
        </>
    )
}
