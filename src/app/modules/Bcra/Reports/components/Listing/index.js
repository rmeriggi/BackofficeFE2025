import React from "react";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { formatDate } from "../../../../../utils/formatData";
import { useAllReports } from "../../utils/apiHooks";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";


export default function Listing() {
 
    const isMounted = useIsMountedRef()
    const [allReports, allArchivesCompleted] = useAllReports(isMounted)
  
    if(!allArchivesCompleted){
        return <LayoutSplashScreen />
    }

    const allReportsData = formatDate(allReports.reports)

    return (
        <Card>
            <CardHeader title="Listado">
            <CardHeaderToolbar>
                    <ListingFilter  disabled={allReportsData.length === 0}/>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                 <ListingTable reportsData={allReportsData}/>
            </CardBody>
        </Card>
    )
}