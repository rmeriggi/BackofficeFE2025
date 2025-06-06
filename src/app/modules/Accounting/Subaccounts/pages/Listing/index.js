/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { LayoutSplashScreen, useSubheader } from "../../../../../../_metronic/layout";
import { getAllSubaccounts } from "../../utils/service";
import { getAllAccountingGroup } from "../../../AccountingGroups/utils/service";
import { getAllAccounts } from "../../../Accounts/utils/service";
import { initialParamsAccounts, initialParamsGroups, initialParamsSubaccounts } from '../../../initialParams';
import { getCurrencies, getEntities } from "../../../../../_redux/combos/combosActions";
import { useFetchCombos } from "../../../../../hooks";

export default function Listing() {

    const suhbeader = useSubheader();
    suhbeader.setTitle("Subcuentas");

    const [groupsData, setGroupsData] = useState();  
    const [accountsData, setAccountsData] = useState();  
    const [subaccountsData, setSubaccountsData] = useState();
    const [subaccountsParams, setSubaccountsParams] = useState(initialParamsSubaccounts);
    const [currencies] = useFetchCombos('currencies', getCurrencies)
    const [entities] = useFetchCombos('entities', getEntities)
    
    useEffect(() => {
        const getAccountingGroup = async () => {
        const response = await getAllAccountingGroup(initialParamsGroups)
        setGroupsData(response)
        }
        getAccountingGroup()
    }, [])
    
    useEffect(() => {
        const getAccounts = async () => {
        const response = await getAllAccounts(initialParamsAccounts)
        setAccountsData(response)
        }
        getAccounts()
    }, [])

    useEffect(()=>{
        const getData = async() => {
            const response = await getAllSubaccounts(subaccountsParams)
            setSubaccountsData(response)
        }
        getData()
    }, [subaccountsParams])

    if(!(
            groupsData && 
            accountsData &&
            subaccountsData 
        )) return <LayoutSplashScreen />

    const { subAccounts } = subaccountsData;
    const { accounts } = accountsData;
    const { accountingGroups } = groupsData;

    const subaccountsFormatted = (subAccounts) => {
        const formatted = subAccounts.map(a => {

            const groupId = accounts.find(acc => acc.id == a.account)?.group
            
            const group = accountingGroups.find(ag => ag.id == groupId)
    
            const entityId =  group?.entity;
            const entity = entities.find(e => e.id == entityId)?.entity
            
            const currencyId = group?.currency
            const currencyName = currencies.find(e => e.id == currencyId)?.currency

            return {
              ...a,
              entity,
              currencyName,
            }
        })
        return formatted
    }

    return (
        <Card>
            <CardHeader title='Listado'>
                <CardHeaderToolbar>
                    <ListingFilter  
                        disabled={subaccountsFormatted(subAccounts).length === 0} 
                        data={subAccounts} 
                        accounts={accounts} 
                        accountingGroups={accountingGroups}
                        subaccountsParams={subaccountsParams}
                        setSubaccountsParams={setSubaccountsParams}
                    />
                    
                    </CardHeaderToolbar>
                </CardHeader>
            <CardBody>
                <ListingTable 
                    subaccountsData={subaccountsFormatted(subAccounts)} 
                    accounts={accounts} 
                    accountingGroups={accountingGroups}
                />
            </CardBody>
        </Card>
    )
}