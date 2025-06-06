import React, { useState, useEffect } from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { LayoutSplashScreen } from '../../../../../../_metronic/layout';
import { getAllAccountingGroup } from "../../utils/service";
import { initialParamsGroups } from '../../../initialParams';
import { getCurrencies, getEntities } from "../../../../../_redux/combos/combosActions";
import { useFetchCombos } from "../../../../../hooks";

export default function Listing() {

    const [currencies] = useFetchCombos('currencies', getCurrencies)
    const [entities] = useFetchCombos('entities', getEntities)
    const [values, setValues] = useState(initialParamsGroups);  
    const [data, setData] = useState();  
    
    useEffect(() => {
        const getAccountingGroup = async () => {
        const response = await getAllAccountingGroup(values)
        setData(response)
        }
        getAccountingGroup()
    }, [values])
    
    if(!data) return <LayoutSplashScreen />

    const { accountingGroups } = data

    return (
        <Card>
            <CardHeader title="Listado">
            <CardHeaderToolbar>
                <ListingFilter  
                    disabled={accountingGroups.length === 0} 
                    data={accountingGroups} 
                    currency={currencies} 
                    entities={entities} 
                    values={values}
                    setValues={setValues}
                    initialValues={initialParamsGroups}
                />
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <ListingTable 
                    accountingGroupsData={accountingGroups} 
                    currency={currencies} 
                    entities={entities} 
                />
            </CardBody>
        </Card>
    )
}