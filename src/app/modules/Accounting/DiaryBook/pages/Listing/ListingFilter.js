/* eslint-disable eqeqeq */
import React from 'react';
import { Button } from '@material-ui/core';
import { useModal } from '../../../../../hooks/useModal';
import { FiltersModal } from '../../components/modals/FiltersModal';
import { getEntities, getCurrencies, getCountries } from '../../../../../_redux/combos/combosActions';
import { useFetchCombos } from '../../../../../hooks';
import { getDiaryBooksPdf } from '../../../../../_redux/accounting/accountingCrud';
import * as XLSX from 'xlsx'; 

const ListingFilter = ({
    dataTable, 
    enableLoading, 
    disableLoading, 
    setDiaryBookData, 
    accountsAux,
    paramsAuxAccounts,
    setParamsAuxAccounts,
    loadingSelect
}) => {

    const [show, openModal, closeModal] = useModal()

    const [currency] = useFetchCombos('currencies', getCurrencies)
    const [entities] = useFetchCombos('entities', getEntities)
    const [countries] = useFetchCombos('countries', getCountries)

    const handleDownloadReport = async () => {
        const requestValues = {
          id_client: 1,
          idEntity: paramsAuxAccounts.idEntity || 0, 
          idCurrency: paramsAuxAccounts.idCurrency || 0, 
          fromDate: paramsAuxAccounts.fromDate || "2023-01-01T00:00:00Z", 
          toDate: paramsAuxAccounts.toDate || "2023-12-31T23:59:59Z", 
          idAuxiliary: paramsAuxAccounts.idAuxiliary || 0, 
          country: paramsAuxAccounts.country || 1 
        }
        
        try {
          const response = await getDiaryBooksPdf(requestValues);
    
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "diary_book_report.pdf");
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          console.error("Error downloading the report", error);
        }
    };

    const handleDownloadExcel = () => {
        const headers = [
            { label: 'Número de Asiento', key: 'id' },
            { label: 'Descripción', key: 'description' },
            { label: 'Debe', key: 'debit' },
            { label: 'Haber', key: 'credit' }
        ];

        const visibleData = dataTable.flatMap(asiento =>
            asiento.data.map(entry => ({
                'Número de Asiento': asiento.id,
                'Descripción': entry.description,
                'Debe': `$${entry.debit?.toFixed(2) || "0.00"}`,
                'Haber': `$${entry.credit?.toFixed(2) || "0.00"}`
            }))
        );

        const worksheet = XLSX.utils.json_to_sheet(visibleData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Libro Diario');

        const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
        for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
            const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
            if (worksheet[cellAddress]) {
                worksheet[cellAddress].s = { font: { bold: true } };
            }
        }

        XLSX.writeFile(workbook, 'Libro_Diario.xlsx'); 
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
                setDiaryBookData={setDiaryBookData} 
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
