import React, { useState } from "react";
import ListingFilter from "./ListingFilter";
import { ListingTable } from "./ListingTable";
import { ReceiptModal } from "../../../../../../../../components/ReceiptModal";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../../../../_metronic/_partials/controls";

export default function Listing() {

    const [transactionsData, setTransactionsData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [id, setId] = useState("")
   
    const openReceipt = (id) => {
        setShowModal(true)
        setId(id)
    }
    const closeReceipt = () => {
        setShowModal(false)
    }
  
    return (
        <Card>
            <CardHeader title="Listado">
            <CardHeaderToolbar>
                    <ListingFilter setTransactionsData={setTransactionsData} transactionsData={transactionsData}/>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <ReceiptModal
                        show={showModal}
                        onHide={closeReceipt}
                        idTransaction={id}
                        setId={setId}
                    />
                 <ListingTable transactionsData={transactionsData} openReceipt={openReceipt} />
            </CardBody>
        </Card>
    )
}