import React from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../../_metronic/_partials/controls";
import { useSubheader } from '../../../../../../../_metronic/layout';
import { accountsAdapter } from "./adapters/accountsAdapters";

const accountMock = {
    accounts: [
        {
            id: "805",
            cuit: 30710779496,
            bussinesName: "INSUMOS Y ACOPIOS DEL SUR S.A.",
            alias: "INSUMOSYACOPIOSDELSUR3411                                                                           ",
            cvu: "865764754547",
            amount: 506.08
        }
    ]
}

export default function ListingAccounts() {

    const suhbeader = useSubheader();
    suhbeader.setTitle("Cuentas Comitentes");

    const accounts = accountsAdapter(accountMock.accounts);

    return (
        <Card>
            <CardHeader title="Listado">
            <CardHeaderToolbar>
                <ListingFilter  
                    disabled={accounts.length === 0} 
                    data={accounts} 
                />
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <ListingTable 
                    data={accounts} 
                />
            </CardBody>
        </Card>
    )
}