import React, { useEffect, useState } from "react";
import { getAll } from "../../utils/service";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import { CircularProgress } from "@material-ui/core";
import { useLoading } from "../../../../../hooks/useLoading"
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { useAllQuotaStatus } from "../../../Wallets/utils/apiHooks";
import { queryAsignAdapter } from "../../../adapters/queryAsignAdapter";
import { quotaStatusAdapter } from "../../../adapters/quotaStatusAdapter";
import { LayoutSplashScreen, useSubheader } from "../../../../../../_metronic/layout";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";

export default function Listing() {

    const isMounted = useIsMountedRef();
    const [statusQuota, setStatusQuota] = useState(0)
    const [listQueryAsing, setListQueryAsign] = useState([])
    const {loading, enableLoading, disableLoading} = useLoading()

    const suhbeader = useSubheader();
    suhbeader.setTitle("Consulta Asignación");

    const [quotaStatus, quotaStatusCompleted] = useAllQuotaStatus(isMounted);

    useEffect(() => {
        enableLoading()
        const getList = async() => {
            const list = await getAll({statusQuota})
            const queryAsignFormatted = queryAsignAdapter(list.queryAsign)
            setListQueryAsign(queryAsignFormatted)
            disableLoading()
      }
      getList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusQuota])
    

    if(!(quotaStatusCompleted)) return <LayoutSplashScreen />

    const quotasStatus = quotaStatusAdapter(quotaStatus.quotasStatus)

    const getTotals = (list) => {
        const noTotal = list.find(e=> e.manager === 'TOTAL')
        if(noTotal === undefined){
            let totalAmount=0;
            let cuotes=0
            
            for(let i = 0; i < list.length; i++) {
                totalAmount = totalAmount + list[i].capital;
                cuotes = cuotes + list[i].cuotes;
            }
            const total= {
                manager: 'TOTAL',
                capital: totalAmount,
                cuotes: cuotes,
            }
            list.push(total)
            return list
        } else {
            return list
        }
    }

    return (
        <Card>
             <CardHeader title={`Total Asignado: ${loading ?  "..." : listQueryAsing.length}`}>
                <CardHeaderToolbar >
                    <ListingFilter  
                        disabled={getTotals(listQueryAsing).length === 0} 
                        quotasStatus={quotasStatus}
                        setStatusQuota={setStatusQuota}
                    />
                </CardHeaderToolbar>
            </CardHeader>        
            <CardBody>
            {loading ? 
                
                <CircularProgress size={20} color="secondary"/> 
                :
                <ListingTable 
                    collectionsData={getTotals(listQueryAsing)} 
                /> 
            }            
            </CardBody>
        </Card>
    )
}