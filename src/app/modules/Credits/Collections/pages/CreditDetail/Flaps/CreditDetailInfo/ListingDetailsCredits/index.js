/* eslint-disable eqeqeq */
import React from "react";
import {ListingTable} from "./ListingTable";
import { useParams } from "react-router-dom";
import { useQuotasList } from "../../../../../utils/apiHook";
import useIsMountedRef from "../../../../../../../../hooks/useIsMountedRef"
import { LayoutSplashScreen } from "../../../../../../../../../_metronic/layout";
import { useAllStatusQuota } from "../../../../../../../../utils/apiHooks";

export default function ListingDetailsCredits({openModal, setAction, openCollectionDetail, setIdCredit, setQuotaNumber, setQuotasDetail}) {
    
    const { id } = useParams()
    const isMounted = useIsMountedRef()
    const [quotasList, quotaListCompleted] = useQuotasList(isMounted, id)
    const [statusQuotaData, statusQuotaDataCompleted] = useAllStatusQuota(isMounted, id)

    if(!(
        quotaListCompleted 
        && statusQuotaDataCompleted
        )) return <LayoutSplashScreen />

    const { quotas } = quotasList
    const { quotasStatus } = statusQuotaData

    setQuotasDetail(quotas)

    return (
        <ListingTable 
            collectionsData={quotas} 
            openModal={openModal} 
            setAction={setAction} 
            quotasStatus={quotasStatus}
            openCollectionDetail={openCollectionDetail}
            setIdCredit={setIdCredit}
            setQuotaNumber={setQuotaNumber}
        />
    )
}