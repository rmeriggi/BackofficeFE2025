import React from "react";
import { ListingTableOne} from "./ListingTableOne";
import {Card, CardBody} from "../../../../../_metronic/_partials/controls";
import { useSubheader } from "../../../../../_metronic/layout";
import { Graphics } from "../../components/Graphics";
import { mock } from "./mocks";

const mocks = mock;

export default function Listing() {

    const subHeader = useSubheader()
    subHeader.setTitle('Reporte Cliente Socio')

    return (
        <div> 
            <Card >
                <CardBody className="p-4"> 
                    <ListingTableOne
                        dataTable={mocks} 
                    />
                </CardBody>
            </Card>
            <Card>
                <CardBody className="row m-0 p-0">
                    <Graphics />
                </CardBody>
            </Card>
        </div>
    )
}