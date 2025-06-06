import React from "react";
import {Card, CardBody, CardHeader} from "../../../../../../../../_metronic/_partials/controls";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import { useSubheader } from "../../../../../../../../_metronic/layout";

const benefitsMock = [
    {
        id: 1,
        fromDate: "10/10/2021",
        toDate: "20/10/2021",
        status: 'activo',
        description: "descripción",
        programId: 1,
        benefit: "beneficio"
    },
    {
        id: 2,
        fromDate: "10/10/2021",
        toDate: "20/10/2021",
        status: 'activo',
        description: "descripción",
        programId: 3,
        benefit: "beneficio"
    },
    {
        id: 3,
        fromDate: "10/10/2021",
        toDate: "20/10/2021",
        status: 'activo',
        description: "descripción",
        programId: 2,
        benefit: "beneficio"
    },
]

export default function Listing() {



    const suhbeader = useSubheader();
    suhbeader.setTitle("Beneficios");

    return (
        <Card>
            <CardHeader title="Listado" />
            <CardBody>
                <ListingFilter  disabled={benefitsMock.length === 0} />
                <ListingTable benefitsData={benefitsMock}/>
            </CardBody>
        </Card>
    )
}