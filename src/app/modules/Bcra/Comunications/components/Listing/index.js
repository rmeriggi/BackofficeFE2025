import React from "react";
import { useHistory } from "react-router-dom";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { formatDate } from "../../../../../utils/formatData";
import { useAllComunications } from "../../utils/apiHooks";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";

export default function Listing() {

    const isMounted = useIsMountedRef()
    const [allComunications, allComunicationsCompleted] = useAllComunications(isMounted)

    const history = useHistory()
    const openNewCategoryPage = () => {
        history.push(`/bcra/comunications/new-category`)
    }
    
    if(!allComunicationsCompleted){
        return <LayoutSplashScreen />
    }
    
    const communicationsFormated = formatDate(allComunications.comunications)
    return (
        <Card>
            <CardHeader title="Listado">
                <CardHeaderToolbar>
                     <ListingFilter  disabled={allComunications.comunications.length === 0}/>
                     <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => openNewCategoryPage()}
                    >
                        Comunicación D
                    </button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                 <ListingTable comunicationsData={communicationsFormated}/>
            </CardBody>
        </Card>
    )
}