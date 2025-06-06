/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { initialParamsAccounts, initialParamsGroups, initialParamsSubaccounts, initialParamsAuxAccounts } from '../../../initialParams';
import { getAllAccountingGroup } from "../../../AccountingGroups/utils/service";
import { getAllAccounts } from "../../../Accounts/utils/service";
import { getAllSubaccounts } from "../../../Subaccounts/utils/service";
import { getAllAuxAccounts } from "../../utils/service";
import { getCurrencies, getEntities } from "../../../../../_redux/combos/combosActions";
import { useFetchCombos } from "../../../../../hooks";

export default function Listing() {

    const [groupsData, setGroupsData] = useState();  
    const [accountsData, setAccountsData] = useState();  
    const [subaccountsData, setSubaccountsData] = useState()
    const [auxParams, setAuxParams] = useState(initialParamsAuxAccounts)
    const [auxiliaryAccountsData, setAuxiliaryAccountsData] = useState()
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
            const response = await getAllSubaccounts(initialParamsSubaccounts)
            setSubaccountsData(response)
        }
        getData()
    }, [])
    
    useEffect(() => {
        const getAuxAccounts = async () => {
        const response = await getAllAuxAccounts(auxParams)
        setAuxiliaryAccountsData(response)
        }
        getAuxAccounts()
    }, [auxParams])

    if(!(
        groupsData && 
        accountsData &&
        subaccountsData &&
        auxiliaryAccountsData 
    )) return <LayoutSplashScreen />

    const auxiliariesAccounts = auxiliaryAccountsData.auxiliariesAccounts? auxiliaryAccountsData.auxiliariesAccounts : [];
    const { subAccounts } = subaccountsData;
    const { accounts } = accountsData;
    const { accountingGroups } = groupsData;

    const auxAccountsFormatted = (auxAccounts) => {

        if(auxAccounts.length === 0) return []

        const formatted = auxAccounts.map(a => {
            
            const accountId = subAccounts.find(sa => sa.id == a.idSubAccount).account

            const groupId = accounts.find(acc => acc.id == accountId)?.group
            
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

    const data = auxAccountsFormatted(auxiliariesAccounts)

    return (
        <Card>
            <CardHeader title="Listado">
            <CardHeaderToolbar>
                <ListingFilter  
                    disabled={data.length === 0}
                    subAccounts={subAccounts}
                    data={auxiliariesAccounts}
                    setAuxParams={setAuxParams}
                    auxParams={auxParams}
                />
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <ListingTable auxiliaryAccountsData={data} subAccounts={subAccounts}/>
            </CardBody>
        </Card>
    )
}