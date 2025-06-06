import React from "react";
import {Card, CardBody, CardHeader} from "../../../../../../../../_metronic/_partials/controls";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import { useSubheader } from "../../../../../../../../_metronic/layout";

const suscriptionsMock = [
    {
        id: 1,
        clientId: 1,
        programId: 6,
        status: 'activo',
        fromDate: '20/10/2021',
        toDate: '30/10/2021',
        frequency: 'mensual',
        price: 50
    },
    {
        id: 2,
        clientId: 2,
        programId: 5,
        status: 'activo',
        fromDate: '20/10/2021',
        toDate: '30/10/2021',
        frequency: 'mensual',
        price: 60
    },
    {
        id: 3,
        clientId: 3,
        programId: 4,
        status: 'activo',
        fromDate: '20/10/2021',
        toDate: '30/10/2021',
        frequency: 'mensual',
        price: 70
    },
]

export default function Listing() {

    const suhbeader = useSubheader();
    suhbeader.setTitle("Suscripciones");

    return (
        <Card>
            <CardHeader title="Listado" />
            <CardBody>
                <ListingFilter  disabled={suscriptionsMock.length === 0} />
                <ListingTable suscriptionsData={suscriptionsMock}/>
            </CardBody>
        </Card>
    )
}