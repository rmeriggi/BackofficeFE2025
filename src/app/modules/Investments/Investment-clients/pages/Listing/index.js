import React from "react";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import ListingFilter from "./ListingFilter";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { useAllInvestmentClients } from "../../utils/apiHooks";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";


export function Listing() {
    const isMounted = useIsMountedRef()
    const [clientsList, clientsCompleted] = useAllInvestmentClients(isMounted)
   
    if(!clientsCompleted){
      return <LayoutSplashScreen />
    }
    const {clients} = clientsList
   
    return (
        <Card>
            <CardHeader title="Listado">
                <CardHeaderToolbar>
                    <ListingFilter  disabled={clients.length === 0} data={clients}/>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                 <ListingTable clients={clients}/>
            </CardBody>
        </Card>
    )
}