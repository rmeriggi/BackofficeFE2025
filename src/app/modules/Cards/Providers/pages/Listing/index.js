import React from "react";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import ListingFilter from "./ListingFilter";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { useAllProviders } from "../../utils/apiHooks";
import { LayoutSplashScreen} from "../../../../../../_metronic/layout"
import { providersAdapter } from "../../adapters/providersAdapter";

export function Listing() {
    
    const isMounted = useIsMountedRef()
    const [providers, providersCompleted] = useAllProviders(isMounted)
   
    if(!providersCompleted){
      return <LayoutSplashScreen />
    }

    const providerAdapted = providersAdapter(providers)

    return (
        <Card>
            <CardHeader title="Listado">
                <CardHeaderToolbar>
                    <ListingFilter  disabled={providerAdapted.length === 0} data={providerAdapted}/>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                 <ListingTable products={providerAdapted}/>
            </CardBody>
        </Card>
    )
}