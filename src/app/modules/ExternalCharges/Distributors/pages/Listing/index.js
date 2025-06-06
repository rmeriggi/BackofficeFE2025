/* eslint-disable eqeqeq */
import React from "react";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader} from "../../../../../../_metronic/_partials/controls";
import { useDistributors } from "../../utils/apiHooks";
import { LayoutSplashScreen, useSubheader } from "../../../../../../_metronic/layout";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { distributorsAdapter } from "../../adapters/distributorsAdapter";

export default function Listing() {

    const isMountedRef = useIsMountedRef()
    const subHeader = useSubheader()
    subHeader.setTitle('Distribuidores')
    const [distributorsData, distributorsCompleted] = useDistributors(isMountedRef)

    if(!distributorsCompleted) return <LayoutSplashScreen />

    const distributors = distributorsAdapter(distributorsData)

    return (
        <Card>
            <CardHeader title="Listado" />
            <CardBody> 
                <ListingTable 
                    dataTable={distributors} 
                />
            </CardBody>
        </Card>
    )
}