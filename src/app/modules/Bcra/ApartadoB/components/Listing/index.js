import React, { useMemo, useState } from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import { formatAmountReport } from "../../../../../utils/formatData";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";

export default function Listing() {

    const [sectionBList, setSectionBList] = useState([])
    const [reportData, setReportData] = useState()
    
    useMemo(() => {
        const toReport = formatAmountReport(sectionBList.sectionB)
        setReportData(toReport)
    }, [sectionBList])

    const propertiesData = {
        header: ['Año','Mes', 'Código', 'Concepto', 'Medio de pago', 'Esquema de pago', 'Cantidad', 'Monto'],
        properties:['year', 'month', "code", "concept", "paymentMethod", "paymentScheme", "quantity", "amount"] ,
        array: reportData,
    }

    return (
        <>
        <Card>
            <CardHeader title="Listado" className="mt-5">
                <CardHeaderToolbar>
                    <ListingFilter setSectionBList={setSectionBList} propertiesData={propertiesData}/>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                 <ListingTable 
                    sectionBData={sectionBList.sectionB} 
                    columnsData={propertiesData} 
                />
            </CardBody>
        </Card>
        </>
    )
}