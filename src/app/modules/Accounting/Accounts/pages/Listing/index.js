/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { getAllAccounts } from "../../utils/service"
import { getAllAccountingGroup } from "../../../AccountingGroups/utils/service";
import { initialParamsAccounts, initialParamsGroups } from '../../../initialParams';
import { getCurrencies, getEntities } from "../../../../../_redux/combos/combosActions";
import { useFetchCombos } from "../../../../../hooks";

export default function Listing() {

    const [groupsData, setGroupsData] = useState();  
    const [valuesAccounts, setValuesAccounts] = useState(initialParamsAccounts)
    const [accountsData, setAccounstData] = useState()
    const [currencies] = useFetchCombos('currencies', getCurrencies)
    const [entities] = useFetchCombos('entities', getEntities)
    
    useEffect(() => {
        const getAccountingGroup = async () => {
        const response = await getAllAccountingGroup(initialParamsGroups)
        setGroupsData(response)
        }
        getAccountingGroup()
    }, [])

    useEffect(()=> {
        const getData = async() => {
            const response = await getAllAccounts(valuesAccounts)
            setAccounstData(response)
        }
        getData()
    },[valuesAccounts])
    
    if(!(accountsData && groupsData)) return <LayoutSplashScreen />
    
    const { accounts } = accountsData;
    const { accountingGroups } = groupsData;    

    const accountsFormatted = accounts.map(a => {
        const entityId = accountingGroups?.find(ag => ag.id == a.group)?.entity;
        const entity = entities?.find(e => e.id == entityId)?.entity;
        const currencyId = accountingGroups?.find(ag => ag.id == a.group)?.currency 
        const currencyName = currencies?.find(c => c.id == currencyId)?.currency
        return {
          ...a,
          entity,
          currencyName,
        }
    })

    return (
        <Card>
            <CardHeader title="Listado">
            <CardHeaderToolbar>
                <ListingFilter  
                    disabled={accounts.length === 0}
                    data={accountsFormatted}
                    groups={accountingGroups}
                    groupId={valuesAccounts.idGroup}
                    valuesAccounts={valuesAccounts}
                    setValuesAccounts={setValuesAccounts}
                />
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <ListingTable 
                    accountsData={accountsFormatted}
                    accountingGroups={accountingGroups}
                    idGroup={valuesAccounts.idGroup}
                    />
            </CardBody>
        </Card>
    )
}