/* eslint-disable eqeqeq */
import React, { useState } from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { channelsadapter } from "../../../../../adapters/channelsAdapter";
import {useLoading} from "../../../../../hooks/useLoading"
import { CircularProgress } from "@material-ui/core";
import { useChannels } from '../../../../Credits/Collections/utils/apiHook';
import useIsMountedRef from  "../../../../../hooks/useIsMountedRef";
import { getCurrencies, getEntities } from "../../../../../_redux/combos/combosActions";
import { useFetchCombos } from "../../../../../hooks";

function Listing() {

    const [currencies] = useFetchCombos('currencies', getCurrencies)
    const [entities] = useFetchCombos('entities', getEntities)
    const [collections, setCollections] = useState([])   
    const {loading, enableLoading, disableLoading} = useLoading(false) 

    const isMounted = useIsMountedRef()
    const [channels] = useChannels(isMounted)  
    const channelsAdapted = channelsadapter(channels)

    return (
        <Card>
            <CardHeader>
            <CardHeaderToolbar>
                <ListingFilter  
                    dataTable={collections}
                    entities={entities}
                    currencies={currencies}
                    channels = {channelsAdapted}
                    setCollections={setCollections}
                    enableLoading={enableLoading}
                    disableLoading={disableLoading}
                />
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                {
                    loading ? 
                    <CircularProgress size={20} color="secondary" />
                    :   
                    <ListingTable 
                        dataTable={collections} 
                    />
                }
            </CardBody>
        </Card>
    )
}

export default Listing