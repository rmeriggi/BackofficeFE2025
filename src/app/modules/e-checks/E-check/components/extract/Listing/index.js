import React, { useState, useMemo } from "react";
import { isToday } from "date-fns";
import { useParams } from "react-router";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import CardAmountBalances from "../CardAmountBalances";
import { useOneAccount } from "../../../utils/apiHooks";
import useIsMountedRef from "../../../../../../hooks/useIsMountedRef";
import { LayoutSplashScreen } from "../../../../../../../_metronic/layout";
import { formatReportExtract } from "../../../../../../utils/formatData"
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../../_metronic/_partials/controls";

export function Listing() {
    const {id} = useParams()
    const isMounted = useIsMountedRef()
    const [oneAccount, oneAccountCompleted] = useOneAccount(id, isMounted)
    const [extracts, setExtracts] = useState({})
    const [balances, setBalances] = useState({})
    const [date, setDate] = useState()
    const [nameExcel, setNameExcel] = useState("")
    const [reportData, setReportData] = useState()

    useMemo(() => {
        const toReport = formatReportExtract(extracts.extract)
        setReportData(toReport)
    }, [extracts])

    if(!oneAccountCompleted){
        return <LayoutSplashScreen />
    }

    if(isToday(date) && balances.finalBalance === 0 && extracts.extract?.length !== 0){
        balances.finalBalance = extracts?.extract[extracts.extract.length - 1]?.amount
    }

    if(isToday(date) && balances.initialBalance !== 0 && extracts.extract?.length === 0){
        balances.finalBalance = balances.initialBalance
    }

    if(balances.initialBalance !== 0 && extracts.extract?.length === 0){
        balances.finalBalances = balances.initialBalance
    }

    const { account } = oneAccount

    const propertiesData = {
        header: ['id','Fecha', 'Origen', 'Concepto', "Débito", "Crédito", "Saldo"],
        properties:['id', 'date', 'origin', "concept", "debit", "credit", "amount"] ,
        array: reportData,
    }
  
    return (
        <>
        <CardAmountBalances 
            balances={balances} 
            valuesToExcel={propertiesData} 
            account={account}
            nameExcel={nameExcel}
        />
        <Card>
            <CardHeader title="Extracto" className="mt-5">
                <CardHeaderToolbar >
                    <ListingFilter 
                        setExtracts={setExtracts} 
                        setBalances={setBalances}
                        setDate={setDate}
                        setNameExcel={setNameExcel}
                        idAccount={id}
                    />
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                 <ListingTable 
                    extractsData={extracts.extract} 
                    columnsData={propertiesData} 
                />
            </CardBody>
        </Card>
        </>
    )
}