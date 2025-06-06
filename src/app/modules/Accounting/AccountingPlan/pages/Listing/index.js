import React, { useEffect, useState } from "react";
import { CircularProgress } from "@material-ui/core";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import { getAll } from "../../utils/service";
import { accountingAdapter } from "../../adapter/accountingAdapter"
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { useLoading } from "../../../../../hooks/useLoading";
import { getCurrencies, getEntities } from "../../../../../_redux/combos/combosActions";
import { useFetchCombos } from "../../../../../hooks";


export default function Listing() {

    const {loading, enableLoading, disableLoading} = useLoading()
    const [currencies] = useFetchCombos('currencies', getCurrencies)
    const [entities] = useFetchCombos('entities', getEntities)
    const [accountingsData, setAccountingData] = useState([])
    const [values, setValues] = useState({idEntity: 0, idCurrency: 0})

    useEffect(() => {
        enableLoading()
        const getAccountingsPlan = async () => {
            try {
                const response = await getAll(values)
                const accountingsFormatted =  accountingAdapter(response.accountingPlan)
                setAccountingData(accountingsFormatted)
                disableLoading()
            } catch (error) {
                setAccountingData([])
                disableLoading()
            }
            
        }
        getAccountingsPlan()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values])    

    return (
        <Card>
            <CardHeader title="Listado">
            <CardHeaderToolbar>
                <ListingFilter  
                    disabled={accountingsData.length === 0 }
                    data ={accountingsData}
                    currency={currencies}
                    entities ={entities}
                    paramsValues={values}
                    setValues={setValues}
                />
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                {
                loading ? 
                    <CircularProgress size={20} color="secondary"/>
                :
                    <ListingTable 
                        accountingData={accountingsData} 
                        currency={currencies}
                        entities ={entities}
                    />
                }
                
            </CardBody>
        </Card>
    )
}