import React, { useEffect, useMemo, useState } from "react";
import {ListingTable} from "./ListingTable";
import { useAllBalances } from "../../utils/apiHooks";
import SectionGraphics from "../Graphics/SectionGraphics";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import {Card, CardBody, CardHeader, CardHeaderToolbar } from "../../../../../../_metronic/_partials/controls";
import { FilterModal } from "../filterModal/FilterModal";
import { Button } from "@material-ui/core";
import { getExcel } from "../../../../../utils/exportExcel";
import { formatAmountReport } from "../../../../../utils/formatData";
import { format } from "date-fns";

let dateLessWeek= new Date();
dateLessWeek.setDate(dateLessWeek.getDate() - 7)

let yesterday= new Date();
yesterday.setDate(yesterday.getDate() - 1)

export default function Listing() {

    const isMounted = useIsMountedRef()
    const [values, setValues] = useState({ idCurrency: 2, 
        fromDate: new Date(dateLessWeek).toISOString(), 
        toDate: new Date(yesterday).toISOString(),
        idEntity: 1
    })
 
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [allBalances, allBalancesComplete] = useAllBalances(isMounted, values )  
    const [open, setOpen] = useState(false)    
    const [nameExcel, setNameExcel] = useState(`Saldos desde ${format(new Date(), "dd-MM-yyyy")} hasta ${format(new Date(), "dd-MM-yyyy")}`)
    const [reportData, setReportData] = useState()

    useMemo(() => {
        const toReport = formatAmountReport(allBalances?.balances)
        setReportData(toReport)
     }, [allBalances])

    const openFilterModal = () => {
        setOpen(true)
    }

    const handleFilterModalClose = () => {
        setOpen(false)
    }
    
    useEffect(() => {
        setIsSubmitting(false)
    }, [allBalances])

    if(!allBalancesComplete){
        return <LayoutSplashScreen />
    }

    const { balances } = allBalances    

    const propertiesData = {
        header: ['Fecha','Día', 'Saldos', 'Variación vs día anterior'],
        properties:['date', 'day', 'balances', "variation"] ,
        array: reportData,
    }
    
    return (
        <>
            <Card className='d-flex justify-content-between'>
                <CardHeader title='Dashboard de Cuentas'>
                    <CardHeaderToolbar >
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            className="ml-4"
                            size="large"
                            onClick={() => openFilterModal()}
                        >
                            Filtros
                        </Button>
                        {allBalances?.balances?.length > 0 ? 
                        (
                        <div className="symbol-label ml-7 mt-2" onClick={() => getExcel(propertiesData, nameExcel)}>
                            <i className="flaticon2-download icon-xl text-primary" role="button"></i>
                        </div>
                        ):(
                        <div className="symbol-label ml-7 mt-2">
                            <i className="flaticon2-download icon-xl text-secondary"></i>
                        </div>
                        )}
                    </CardHeaderToolbar>
                </CardHeader>
                <CardBody>
                    <SectionGraphics data={allBalances}/>  
                    <ListingTable balancesData={balances}/>
                </CardBody>
            </Card>
            <FilterModal
                show={open}
                onHide={handleFilterModalClose}
                balancesData={allBalances}  
                setValues={setValues} 
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                setNameExcel={setNameExcel}
                handleFilterModalClose={handleFilterModalClose}
            />
        </>
    )
}