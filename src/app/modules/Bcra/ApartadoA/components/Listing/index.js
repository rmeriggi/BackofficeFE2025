import React, { useMemo, useState } from "react";
import ListingFilter from "./ListingFilter";
import {ListingTable} from "./ListingTable";
import { formatAmountReport } from "../../../../../utils/formatData";
import {Card, CardBody, CardHeader, CardHeaderToolbar} from "../../../../../../_metronic/_partials/controls";

export default function Listing() {

    const [sectionAList, setSectionAList] = useState([])
    const [reportData, setReportData] = useState()
    
    useMemo(() => {
        const toReport = formatAmountReport(sectionAList.sectionA)
        setReportData(toReport)
    }, [sectionAList])

    const propertiesData = {
        header: ['Año','Mes', 'Día', 'Código', 'Concepto', 'Cantidad', 'CBU', 'Saldo'],
        properties:['year', 'month', 'day', "code", "concept", "quantity", "cbu", "amount"] ,
        array: reportData,
    }

    return (
        <>
        <Card>
            <CardHeader title="Listado" className="mt-5">
                <CardHeaderToolbar>
                    <ListingFilter setSectionAList={setSectionAList} propertiesData={propertiesData}/>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                 <ListingTable 
                    sectionAData={sectionAList.sectionA} 
                    columnsData={propertiesData} 
                />
            </CardBody>
        </Card>
        </>
    )
}