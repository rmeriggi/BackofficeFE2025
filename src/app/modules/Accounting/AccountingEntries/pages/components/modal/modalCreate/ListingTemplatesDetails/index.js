import React from "react";
import { Card } from "react-bootstrap";
import { CardBody } from "../../../../../../../../../_metronic/_partials/controls";
import { ListingTable } from "./ListingTable";

export default function Listing(props) {

    return (
        <Card>
            <CardBody>
                <ListingTable 
                    data={props.data} 
                    amounts={props.amounts} 
                    setFieldValue={props.setFieldValue} 
                    setAmounts={props.setAmounts}
                />
            </CardBody>
        </Card>
    )
}