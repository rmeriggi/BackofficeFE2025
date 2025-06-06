/* eslint-disable eqeqeq */
import React from "react";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { useTypes } from "../../utils/apiHooks";
import { LayoutSplashScreen, useSubheader } from "../../../../../../_metronic/layout";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { typesAdapter } from "../../adapters/typesAdapter";
import ListingFilter from "./ListingFilter";

export default function Listing() {

    const isMountedRef = useIsMountedRef()
    const subHeader = useSubheader()
    subHeader.setTitle('Tipos')
    const [typesData, typesCompleted] = useTypes(isMountedRef)

    if(!typesCompleted) return <LayoutSplashScreen />

    const types = typesAdapter(typesData)

    return (
        <Card>
            <CardHeader title="Listado" >
            <CardHeaderToolbar>
                <ListingFilter  
                    disabled={types.length === 0} 
                    data={types} 
                />
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody> 
                <ListingTable 
                    dataTable={types} 
                />
            </CardBody>
        </Card>
    )
}