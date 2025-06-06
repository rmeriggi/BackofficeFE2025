/* eslint-disable eqeqeq */
import React from 'react';
import { Button } from '@material-ui/core';
import { useModal } from '../../../../../hooks/useModal';
import { FiltersModal } from '../../components/modals/FiltersModal';
import { getCountries, getCurrencies, getEntities } from '../../../../../_redux/combos/combosActions';
import { useFetchCombos } from '../../../../../hooks';
import { getMayorPdf } from '../../../../../_redux/accounting/accountingCrud';
import * as XLSX from 'xlsx'; 

const ListingFilter = ({
    dataTable, 
    enableLoading, 
    disableLoading, 
    setMayorBookData, 
    accountsAux,
    paramsAuxAccounts,
    setParamsAuxAccounts,
    loadingSelect
}) => {

    const [show, openModal, closeModal] = useModal();

    const [currency] = useFetchCombos('currencies', getCurrencies);
    const [entities] = useFetchCombos('entities', getEntities);
    const [countries] = useFetchCombos('countries', getCountries);

    const handleDownloadReport = async () => {
        const requestValues = {
            fromDate: paramsAuxAccounts.fromDate,
            toDate: paramsAuxAccounts.toDate
        };
        try {
          const response = await getMayorPdf(requestValues);
    
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "mayor_book_report.pdf");
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          console.error("Error downloading the report", error);
        }
    };

    const handleDownloadExcel = () => {
        const headers = [
            { label: 'Fecha', key: 'date' },
            { label: 'Número', key: 'num_asiento' },
            { label: 'Leyenda', key: 'txt_asiento' },
            { label: 'Débito', key: 'monto_debe' },
            { label: 'Crédito', key: 'monto_haber' },
            { label: 'Periodo', key: 'saldo_per' },
            { label: 'Ejercicio', key: 'saldo_eje' }
        ];

        const visibleData = dataTable.map(item => {
            const filteredItem = {};
            headers.forEach(header => {
                filteredItem[header.label] = header.key === 'monto_debe' || header.key === 'monto_haber' || header.key === 'saldo_per' || header.key === 'saldo_eje' 
                    ? `$${item[header.key]?.toFixed(2) || "0.00"}`
                    : item[header.key];
            });
            return filteredItem;
        });

        const worksheet = XLSX.utils.json_to_sheet(visibleData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Libro Mayor');

        const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
        for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
            const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
            if (worksheet[cellAddress]) {
                worksheet[cellAddress].s = { font: { bold: true } };
            }
        }

        XLSX.writeFile(workbook, 'Libro_Mayor.xlsx'); 
    };

    return (
        <>
           <div>
                <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={openModal}
                >
                    Filtros
                </Button>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={handleDownloadExcel} 
                    className="ml-2"
                >
                    Descargar Excel
                </Button>
           </div>
           {dataTable.length > 0 ? 
            (
                <div 
                    className="symbol-label ml-3" 
                    onClick={handleDownloadReport}
                >
                    <i className="flaticon2-download icon-xl text-primary" role="button"></i>
                </div>  
            ): 
            (
                <div className="symbol-label ml-7">
                    <i className="flaticon2-download icon-xl text-secondary"></i>
                </div>
            )}
            
            <FiltersModal 
                show={show} 
                onHide={closeModal}
                entities={entities}
                currencies={currency}
                countries={countries}
                accountsAux={accountsAux}
                setMayorBookData={setMayorBookData} 
                paramsAuxAccounts={paramsAuxAccounts}
                setParamsAuxAccounts={setParamsAuxAccounts}
                enableLoading={enableLoading}
                disableLoading={disableLoading}
                loadingSelect={loadingSelect}
            />
        </>
    );
}

export default ListingFilter;
