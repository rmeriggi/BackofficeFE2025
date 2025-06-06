import React from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import { useAllScoreParams } from "../../utils/apiHooks";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import {LayoutSplashScreen} from "../../../../../../_metronic/layout"
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";

export default function Listing() {

    const isMounted = useIsMountedRef()

    const [scoreParamsData, scoreParamsCompleted] = useAllScoreParams(isMounted);

    if (!(scoreParamsCompleted )) {
        return <LayoutSplashScreen />;
    }
    const { scoreParams } = scoreParamsData
    
    return (
        <Card>
            <CardHeader title="Listado">
                <CardHeaderToolbar>
                    <ListingFilter  disabled={scoreParams.length === 0}/>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                 <ListingTable scoreParamsData={scoreParams}/>
            </CardBody>
        </Card>
    )
}