import React from "react";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { formatDate } from "../../../../../utils/formatData";
import { useAllRos } from "../../utils/apiHooks";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";


export default function Listing() {
 
    const isMounted = useIsMountedRef()
    const [allRos, allRosCompleted] = useAllRos(isMounted)
   
    if(!allRosCompleted){
        return <LayoutSplashScreen />
    }

    const rosFormated = formatDate(allRos.ROS)

    return (
        <Card>
            <CardHeader title="Listado">
            <CardHeaderToolbar>
                    <ListingFilter  disabled={rosFormated.length === 0}/>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                 <ListingTable rosData={rosFormated}/>
            </CardBody>
        </Card>
    )
}