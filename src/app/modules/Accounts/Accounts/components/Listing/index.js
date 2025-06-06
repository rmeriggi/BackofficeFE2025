import React, { useEffect, useState } from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import { CircularProgress } from "@material-ui/core";
import { getAllAccountsList } from "../../utils/service";
import { CurrenciesEnum } from "../../utils/currenciesEnum";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";

export default function Listing() {

    const [accountsData, setAccountsData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getAllAccountsAPI() {
          const res = await getAllAccountsList(CurrenciesEnum.PESOS)
          setAccountsData(res.allAccounts)
          setLoading(false)
        }
        getAllAccountsAPI()
    }, [])

    return (
        <Card>
            <CardHeader title="Listado">
            <CardHeaderToolbar>
                    <ListingFilter  
                        disabled={accountsData.length === 0} 
                        data={accountsData} 
                        setAccountsData={setAccountsData}
                        setLoading={setLoading}
                    />
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                {loading ? 
                    <CircularProgress size={20} color="secondary"/>
                :
                    <ListingTable accountsData={accountsData}/>
                }
                 
            </CardBody>
        </Card>
    )
}
