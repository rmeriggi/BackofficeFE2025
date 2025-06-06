import React from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import { useAllScoreSource } from "../../utils/apiHooks";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import {LayoutSplashScreen} from "../../../../../../_metronic/layout"
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";

export default function Listing() {

    const isMounted = useIsMountedRef()

    const [scoreSourceData, scoreSourceCompleted] = useAllScoreSource(isMounted);

    if (!(scoreSourceCompleted )) {
        return <LayoutSplashScreen />;
    }
    const { scoreSource } = scoreSourceData
  
    return (
        <Card>
            <CardHeader title="Listado">
                <CardHeaderToolbar>
                    <ListingFilter  disabled={scoreSource.length === 0}/>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                 <ListingTable scoreSourceData={scoreSource}/>
            </CardBody>
        </Card>
    )
}