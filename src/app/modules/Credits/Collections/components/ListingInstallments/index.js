import React from "react";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader} from "../../../../../../_metronic/_partials/controls";

export default function Listing({data}) {

    return (
        <Card style={{width: "100%"}}>
            <CardHeader title="Detalle"/>
            <CardBody>
                <ListingTable data={data}/>
            </CardBody>
        </Card>
    )
}