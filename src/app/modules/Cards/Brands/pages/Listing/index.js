/* eslint-disable eqeqeq */
import React from "react";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { useBrands } from "../../utils/apiHooks";
import { LayoutSplashScreen, useSubheader } from "../../../../../../_metronic/layout";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { brandsAdapter } from "../../adapters/brandsAdapter";
import ListingFilter from "./ListingFilter";

export default function Listing() {

    const isMountedRef = useIsMountedRef()
    const subHeader = useSubheader()
    subHeader.setTitle('Marcas')
    const [brandsData, brandsCompleted] = useBrands(isMountedRef)

    if(!brandsCompleted) return <LayoutSplashScreen />

    const brands = brandsAdapter(brandsData)

    return (
        <Card>
            <CardHeader title="Listado" >
            <CardHeaderToolbar>
                <ListingFilter  
                    disabled={brands.length === 0} 
                    data={brands} 
                />
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody> 
                <ListingTable 
                    dataTable={brands} 
                />
            </CardBody>
        </Card>
    )
}