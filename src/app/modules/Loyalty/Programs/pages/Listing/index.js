import React from "react";
import {Card, CardBody, CardHeader} from "../../../../../../_metronic/_partials/controls";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import { useSubheader } from "../../../../../../_metronic/layout";

const programsMock = [
    {
        id: 1,
        country: 1,
        description: 'description 1',
        status: 'activo',
        fromDate: '20/10/2021',
        toDate: '30/10/2021',
        frequency: 'mensual'
    },
    {
        id: 2,
        country: 2,
        description: 'description 2',
        status: 'activo',
        fromDate: '20/10/2021',
        toDate: '30/10/2021',
        frequency: 'mensual'
    },
    {
        id: 3,
        country: 3,
        description: 'description 3',
        status: 'activo',
        fromDate: '20/10/2021',
        toDate: '30/10/2021',
        frequency: 'mensual'
    },
]

export default function Listing() {

    const suhbeader = useSubheader();
    suhbeader.setTitle("Programas");

    return (
        <Card>
            <CardHeader title="Listado" />
            <CardBody>
                <ListingFilter  disabled={programsMock.length === 0}/>
                <ListingTable programsData={programsMock} />
            </CardBody>
        </Card>
    )
}