import React, { useState } from "react";
import {Card, CardBody} from "../../../../../../../_metronic/_partials/controls";
import {ListingTable} from "./ModalListingTable";
import installmentsMock from "../../../__mocks__/modalInstallmentsMocks";

export default function ModalListing() {
  
    const [setOpenMoreInfo] = useState(false);

    const openModalMoreInfo = () => {
        setOpenMoreInfo(true)
    }
    
    const { installments } = installmentsMock

    return (
        <Card className='mt-10'>
            <CardBody>
                <ListingTable 
                    cuotesData={installments} 
                    openModalMoreInfo={openModalMoreInfo} 
                />
            </CardBody>
        </Card>
    )
}