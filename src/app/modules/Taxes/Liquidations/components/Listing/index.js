import React, { useMemo, useState } from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import CardAmountSum from "../CardAmountSum";
import {ReceiptModal } from "../../../../../components/ReceiptModal"
import { formatAmountReport } from "../../../../../utils/formatData";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";

export default function Listing() {

    const [showModal, setShowModal] = useState(false)
    const [idTransaction, setIdTransaction] = useState("")
    const [liquidations, setLiquidations] = useState([])
    const [sum, setSum] = useState([])
    const [nameExcel, setNameExcel] = useState([])
    const [reportData, setReportData] = useState()

    const openReceipt = (id) => {
        setShowModal(true)
        setIdTransaction(id)
      }
      const closeReceipt = () => {
        setShowModal(false)
      }

    useMemo(() => {
        const toReport = formatAmountReport(liquidations.liquidationsList)
        setReportData(toReport)
    },[liquidations])

    const propertiesData = {
        header: ["id","Fecha", "Tipo de transacción", "Cuenta Origen", "Cliente Origen", "CUIT Origen", "Origen Operación", "Importe"],
        properties:["id", "date", "transactionType", "originAccount", "originClient", "originCUIT", "origenOper", "amount"] ,
        array: reportData,
    }
    
    return (
        <>
        <CardAmountSum sum={sum.total} valuesToExcel={propertiesData} nameExcel={nameExcel}/>
        <Card>
            <CardHeader title="Listado" className="mt-5">
                <CardHeaderToolbar>
                    <ListingFilter setLiquidations={setLiquidations} setSum={setSum} setNameExcel={setNameExcel}/>
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
                    liquidationsData={liquidations.liquidationsList} 
                    openReceipt={openReceipt}
                    columnsData={propertiesData}
                />
            </CardBody>
        </Card>
        </>
    )
}