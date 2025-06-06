/* eslint-disable eqeqeq */
import React from "react";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { useStatus } from "../../utils/apiHooks";
import { LayoutSplashScreen, useSubheader } from "../../../../../../_metronic/layout";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { statusAdapter } from "../../adapters/statusAdapter";
import ListingFilter from "./ListingFilter";

export default function Listing() {

    const isMountedRef = useIsMountedRef()
    const subHeader = useSubheader()
    subHeader.setTitle('Estados')
    const [statusData, statusCompleted] = useStatus(isMountedRef)

    if(!statusCompleted) return <LayoutSplashScreen />

    const status = statusAdapter(statusData)

    return (
        <Card>
            <CardHeader title="Listado" >
            <CardHeaderToolbar>
                <ListingFilter  
                    disabled={status.length === 0} 
                    data={status} 
                />
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody> 
                <ListingTable 
                    dataTable={status} 
                />
            </CardBody>
        </Card>
    )
}