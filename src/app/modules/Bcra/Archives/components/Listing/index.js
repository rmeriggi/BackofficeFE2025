import React from "react";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { formatDate } from "../../../../../utils/formatData";
import {useAllArchives } from "../../utils/apiHooks";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";


export default function Listing() {

    const isMounted = useIsMountedRef()
    const [allArchives, allArchivesCompleted] = useAllArchives(isMounted)

    if(!allArchivesCompleted){
        return <LayoutSplashScreen />
    }

    const allArchivesData = formatDate(allArchives.files)
 
    return (
        <Card>
            <CardHeader title="Listado">
            <CardHeaderToolbar>
                    <ListingFilter  disabled={allArchivesData.length === 0}/>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                 <ListingTable archivesData={allArchivesData}/>
            </CardBody>
        </Card>
    )
}