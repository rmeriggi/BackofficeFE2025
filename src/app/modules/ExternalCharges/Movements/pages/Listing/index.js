/* eslint-disable eqeqeq */
import React from "react";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { useMovements, useStatus } from "../../utils/apiHooks";
import { LayoutSplashScreen, useSubheader } from "../../../../../../_metronic/layout";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { movementsAdapter } from "../../adapters/movementsAdapter";
import ListingFilter from "./ListingFilter";

export default function Listing() {

    const isMountedRef = useIsMountedRef()
    const subHeader = useSubheader()
    subHeader.setTitle('Movimientos')
    const [movementsData, movementsCompleted] = useMovements(isMountedRef)
    const [status, statusCompleted] = useStatus(isMountedRef)

    if(!(movementsCompleted && statusCompleted)) return <LayoutSplashScreen />

    const movements = movementsAdapter(movementsData)

    return (
        <Card>
            <CardHeader title="Listado" >
            <CardHeaderToolbar>
                <ListingFilter  
                    disabled={movements.length === 0} 
                    data={movements} 
                    status={status}
                />
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody> 
                <ListingTable 
                    dataTable={movements} 
                />
            </CardBody>
        </Card>
    )
}