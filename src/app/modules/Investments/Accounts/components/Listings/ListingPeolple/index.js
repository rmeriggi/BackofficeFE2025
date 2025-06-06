import React from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../../_metronic/_partials/controls";
import { useSubheader } from '../../../../../../../_metronic/layout';
import { accountsAdapter } from "./adapters/accountsAdapters";

const accountMock = {
    accounts: [
        {
            accountName: "Cuenta 1",
            accountNumber: "124578",
            date: "2022-04-22T15:49:50",
            currency: "Moneda 1",
            status: "estado 1",
            client: "cliente 1",
            cuit: "20-25698745-2"
        },
        {
            accountName: "Cuenta 2",
            accountNumber: "124578",
            date: "2022-04-22T15:49:50",
            currency: "Moneda 2",
            status: "estado 2",
            client: "cliente 2",
            cuit: "20-25698745-2"
        }
    ]
}

export default function ListingPeople() {

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