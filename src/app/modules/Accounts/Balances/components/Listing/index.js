import React, { useState } from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import CardAmountSum from "../CardAmountSum";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { getCurrencies, getEntities } from "../../../../../_redux/combos/combosActions";
import { useFetchCombos } from "../../../../../hooks/useFetchCombos";

export default function Listing() {

    const [balances, setBalances] = useState([])
    const [sum, setSum] = useState([])
    const [nameExcel, setNameExcel] = useState()
    const [currencies] = useFetchCombos('currencies', getCurrencies)
    const [entitiesData] = useFetchCombos('entities', getEntities)

    const balancesFiltered = balances.accountsBalances?.filter(b => b.businessName !== "")
    
    const propertiesData = {
        header: ['Razón social', 'Cuit', 'Cvu', 'Número de cuenta','Saldo', "Alias"],
        properties:['businessName', 'cuit', "cvu", "account" ,"amount", "alias"] ,
        array: balancesFiltered,
    }
    
    return (
        <>
        <CardAmountSum sum={sum.total} valuesToExcel={propertiesData} nameExcel={nameExcel}/>
        <Card>
            <CardHeader title="Listado" className="mt-5">
                <CardHeaderToolbar>
                    <ListingFilter 
                        setBalances={setBalances} 
                        setSum={setSum} 
                        disabled={balances.length === 0 || balancesFiltered?.length === 0 }
                        setNameExcel={setNameExcel}
                        currencies={currencies}
                        entities={entitiesData}
                    />
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                 <ListingTable 
                    accountsBalancesData={balancesFiltered} 
                    columnsData={propertiesData} 
                />
            </CardBody>
        </Card>
        </>
    )
}