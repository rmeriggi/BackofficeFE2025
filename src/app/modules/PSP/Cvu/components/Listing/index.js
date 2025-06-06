import React, { useState } from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";

export default function Listing() {

    const [cvuList, setCvuList] = useState([])

    const propertiesData = {
        header: ['Fecha','Cantidad'],
        properties:['date', 'quantity'] ,
        array: cvuList.altasCVU,
    }

    return (
        <>
        <Card>
            <CardHeader title="Listado" className="mt-5">
                <CardHeaderToolbar>
                    <ListingFilter setCvu={setCvuList} propertiesData={propertiesData}/>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <ListingTable 
                    cvuListData={cvuList.altasCVU} 
                    columnsData={propertiesData}
                />
            </CardBody>
        </Card>
        </>
    )
}