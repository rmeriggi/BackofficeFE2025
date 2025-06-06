import React, { useMemo, useState } from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import { formatDateWithHours } from "../../../../../utils/formatData";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";
import { ReceiptModal } from "../../../Cashin/components/modal/ReceiptModal";

export default function Listing() {

    const [cashout, setCashout] = useState([])
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
        if(cashout !== []){
            formatDateWithHours(cashout.transactionsTypes)
        }   
    },[cashout])

    const propertiesData = {
        header: ['id','Fecha y Hora', 'Tipo de transacción', 'Importe'],
        properties:['id', 'date', "type", 'amount'] ,
        array: cashout.transactionsTypes,
    }

    return (
        <>
        <Card>
            <CardHeader title="Listado" className="mt-5">
                <CardHeaderToolbar>
                    <ListingFilter setCashout={setCashout}/>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <ReceiptModal
                    show={showModal}
                    onHide={closeReceipt}
                    idTransaction={idTransaction}
                    setId={setIdTransaction}
                />
                <ListingTable 
                    cashoutData={cashout.transactionsTypes} 
                    columnsData={propertiesData}
                    openReceipt={openReceipt}
                />
            </CardBody>
        </Card>
        </>
    )
}