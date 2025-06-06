/* eslint-disable eqeqeq */
import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useModal } from '../../../../../hooks/useModal';
import { FiltersModal } from '../../components/modals/FiltersModal';
import { getCurrencies, getEntities } from '../../../../../_redux/combos/combosActions';
import { useFetchCombos } from '../../../../../hooks';
import { getSumasSaldosPdf } from '../../../../../_redux/accounting/accountingCrud';

const ListingFilter = ({
    dataTable, 
    enableLoading, 
    disableLoading, 
    setBalancesData, 
    accountsAux,
    paramsAuxAccounts,
    setParamsAuxAccounts,
    loadingSelect,
    fromDate,
    toDate 
}) => {

    const [show, openModal, closeModal] = useModal();
    const [currencies] = useFetchCombos('currencies', getCurrencies);
    const [entities] = useFetchCombos('entities', getEntities);

    useEffect(() => {
        if (fromDate && toDate) {
            setParamsAuxAccounts(prev => ({
                ...prev,
                fromDate,
                toDate
            }));
        } else {
            console.error("Las fechas 'fromDate' y 'toDate' son requeridas en useEffect.");
        }
    }, [fromDate, toDate, setParamsAuxAccounts]);

 

    const handleDownloadReport = async () => {
        if (!paramsAuxAccounts.fromDate || !paramsAuxAccounts.toDate) {
            console.error("Las fechas 'fromDate' y 'toDate' son requeridas.");
            return;
        }
        const requestValues = {
            fromDate: paramsAuxAccounts.fromDate,
            toDate: paramsAuxAccounts.toDate
        };
        try {
            const response = await getSumasSaldosPdf(requestValues);
    
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "sumas_saldos_report.pdf");
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error("Error al descargar el reporte", error);
        }
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
           </div>
           <div 
                className="symbol-label ml-3" 
                onClick={handleDownloadReport}
           >
                <i className="flaticon2-download icon-xl text-primary" role="button"></i>
           </div>  
           <FiltersModal 
                show={show} 
                onHide={closeModal}
                entities={entities}
                currencies={currencies}
                accountsAux={accountsAux}
                paramsAuxAccounts={paramsAuxAccounts}
                setParamsAuxAccounts={setParamsAuxAccounts}
                setBalancesData={setBalancesData} 
                enableLoading={enableLoading}
                disableLoading={disableLoading}
                loadingSelect={loadingSelect}
            />
        </>
    );
}

export default ListingFilter;
