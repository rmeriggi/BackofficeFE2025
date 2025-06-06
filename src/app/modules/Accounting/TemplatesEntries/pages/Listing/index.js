import React from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import { useAllSeatingTemplates } from "../../utils/apiHook";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { seatingTemplatesAdapter } from "../../adapters/seatingTemplatesAdapter";

export default function Listing() {

    const isMounted = useIsMountedRef();

    const [seatingTemplatesData, seatingTemplatesCompleted] = useAllSeatingTemplates(isMounted)

    if(!(seatingTemplatesCompleted)) return <LayoutSplashScreen />

    const data = seatingTemplatesAdapter(seatingTemplatesData)
    
    return (
        <Card>
            <CardHeader title="Listado">
            <CardHeaderToolbar>
                <ListingFilter  
                    disabled={data.length === 0}
                    data={data}
                />
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <ListingTable seatingTemplates={data}/>
            </CardBody>
        </Card>
    )
}