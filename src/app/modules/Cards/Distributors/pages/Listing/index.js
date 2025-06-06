import React from "react";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import ListingFilter from "./ListingFilter";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { useAllDistributors } from "../../utils/apiHooks";
import { LayoutSplashScreen} from "../../../../../../_metronic/layout"
import { distributorsAdapter } from "../../adapters/distributorsAdapter";

export function Listing() {
    
    const isMounted = useIsMountedRef()
    const [distributors, distributorsCompleted] = useAllDistributors(isMounted)
   
    if(!distributorsCompleted){
      return <LayoutSplashScreen />
    }

    const distributorsAdapted = distributorsAdapter(distributors)

    return (
        <Card>
            <CardHeader title="Listado">
                <CardHeaderToolbar>
                    <ListingFilter  disabled={distributorsAdapted.length === 0} data={distributorsAdapted}/>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                 <ListingTable products={distributorsAdapted}/>
            </CardBody>
        </Card>
    )
}