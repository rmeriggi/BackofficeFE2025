import React, { useEffect, useState } from "react";
import { ListingTable } from "./ListingTable";
import { Card, CardBody, CardHeader, CardHeaderToolbar } from "../../../../../../_metronic/_partials/controls";
import { useLoading } from "../../../../../hooks/useLoading";
import { CircularProgress, Button } from "@material-ui/core";
import { getVatSales, getVatSalesPdf } from '../../../../../_redux/accounting/accountingCrud';
import { useModal } from '../../../../../hooks/useModal';
import { FiltersModal } from '../../components/modals/FiltersModal';
import * as XLSX from 'xlsx'; 

export default function Listing() {
    const initialValues = {
        month: 8,
        year: 2023
    };

    const { loading, enableLoading, disableLoading } = useLoading();
    const [vatSalesData, setVatSalesData] = useState([]);
    const [paramsVatSales, setParamsVatSales] = useState(initialValues);
    const [loadingSelect, setLoadingSelect] = useState(false);
    const [show, openModal, closeModal] = useModal();

    useEffect(() => {
        disableLoading();
    }, [disableLoading]);

    useEffect(() => {
        setLoadingSelect(true);
        const getVatSalesData = async () => {
            try {
                const responseVatSales = await getVatSales(paramsVatSales);

                setVatSalesData(Array.isArray(responseVatSales.ventas) ? responseVatSales.ventas : []);
            } catch (error) {
                setVatSalesData([]);
            }
            setLoadingSelect(false);
        };
        getVatSalesData();
    }, [paramsVatSales]);

    const handleDownloadReport = async () => {
        const requestValues = {
            month: paramsVatSales.month,
            year: paramsVatSales.year,
        };

        try {
            const response = await getVatSalesPdf(requestValues);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'vat_sales_report.pdf');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading the report', error);
        }
    };

    const handleDownloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(vatSalesData); 
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'IVA Ventas');

        const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
        for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
            const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
            if (worksheet[cellAddress]) {
                worksheet[cellAddress].s = { font: { bold: true } }; 
            }
        }

        XLSX.writeFile(workbook, 'IVA_Ventas.xlsx');
    };

    return (
        <Card>
            <CardHeader title="Listado">
                <CardHeaderToolbar>
                    <Button variant="contained" color="secondary" onClick={openModal}>
                        Filtros
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleDownloadExcel} className="ml-2">
                        Descargar Excel
                    </Button>
                    <div className="symbol-label ml-3" onClick={handleDownloadReport} style={{ cursor: 'pointer' }}>
                        <i className="flaticon2-download icon-xl text-primary" role="button"></i>
                    </div>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                {loading || loadingSelect ? (
                    <CircularProgress size={20} color="secondary" />
                ) : (
                    <ListingTable dataTable={vatSalesData} />
                )}
            </CardBody>
            <FiltersModal
                show={show}
                onHide={closeModal}
                setVatSalesData={setVatSalesData}
                enableLoading={enableLoading}
                disableLoading={disableLoading}
                paramsVatSales={paramsVatSales}
                setParamsVatSales={setParamsVatSales}
            />
        </Card>
    );
}
