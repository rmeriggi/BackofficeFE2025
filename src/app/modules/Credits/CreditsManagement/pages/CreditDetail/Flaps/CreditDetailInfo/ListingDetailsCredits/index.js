/* eslint-disable eqeqeq */
import React from "react";
import { useParams } from "react-router-dom";
import { LayoutSplashScreen } from "../../../../../../../../../_metronic/layout";
import useIsMountedRef from "../../../../../../../../hooks/useIsMountedRef";
import { useAllStatusQuota } from "../../../../../../../../utils/apiHooks";
import { useQuotasList } from "../../../../../../Collections/utils/apiHook";
import {ListingTable} from "./ListingTable";

export default function ListingDetailsCredits({openModal, openCollectionDetail, setIdCredit, setQuotaNumber, setQuotasDetail}) {

    const { id } = useParams()
    const isMounted = useIsMountedRef()
    const [quotasList, quotaListCompleted] = useQuotasList(isMounted, id)
    const [statusQuotaData, statusQuotaDataCompleted] = useAllStatusQuota(isMounted, id)


    if(!(quotaListCompleted && statusQuotaDataCompleted)) return <LayoutSplashScreen />

    const { quotas } = quotasList
    const { quotasStatus } = statusQuotaData

    setQuotasDetail(quotas)


    return (
        <>
            <ListingTable 
                collectionsData={quotas} 
                openModal={openModal} 
                quotasStatus={quotasStatus}
                openCollectionDetail={openCollectionDetail}
                setIdCredit={setIdCredit}
                setQuotaNumber={setQuotaNumber}
            />
        </>
    )
}