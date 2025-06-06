import React, { useMemo, useState } from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import {ReceiptModal} from "../modal/ReceiptModal"
import { formatDateWithHours } from "../../../../../utils/formatData";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";

export default function Listing() {

    const [cashin, setCashin] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [idTransaction, setIdTransaction] = useState("")

    const openReceipt = (id) => {
        setShowModal(true)
        setIdTransaction(id)
    }

    const closeReceipt = () => {
        setShowModal(false)
    }
        
    useMemo(() => {
        if(cashin !== []){
            formatDateWithHours(cashin.transactionsTypes)
        }   
    },[cashin])

    const propertiesData = {
        header: ['id','Fecha y Hora','Tipo de transacción', 'Importe'],
        properties:['id', 'date', "type", 'amount'] ,
        array: cashin.transactionsTypes,
    }

    return (
        <>
        <Card>
            <CardHeader title="Listado" className="mt-5">
                <CardHeaderToolbar>
                    <ListingFilter setCashin={setCashin}/>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <ReceiptModal
                    show={showModal}
                    onHide={closeReceipt}
                    idTransaction={idTransaction}
                />
                <ListingTable 
                    cashinData={cashin.transactionsTypes} 
                    columnsData={propertiesData}
                    openReceipt={openReceipt}
                />
            </CardBody>
        </Card>
        </>
    )
}