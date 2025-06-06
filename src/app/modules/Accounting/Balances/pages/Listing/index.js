import React, { useEffect, useState } from "react";
import ListingFilter from "./ListingFilter";
import { ListingTable } from "./ListingTable";
import { Card, CardBody, CardHeader, CardHeaderToolbar } from "../../../../../../_metronic/_partials/controls";
import { getAllAuxAccounts } from "../../../AuxiliaryAccounts/utils/service";
import { initialParamsAuxAccounts } from "../../../initialParams";
import { accountsAuxAdapter } from "../../../adapters/accountsAuxAdapter";
import { useLoading } from "../../../../../hooks/useLoading";
import { CircularProgress, Button } from "@material-ui/core";
import * as XLSX from 'xlsx';

export default function Listing() {
    const { loading, enableLoading, disableLoading } = useLoading();
    const [accountsAux, setAccountsAux] = useState([]);
    const [balancesData, setBalancesData] = useState({ total: "", balances: [] });
    const [paramsAuxAccounts, setParamsAuxAccounts] = useState(initialParamsAuxAccounts);
    const [loadingSelect, setLoadingSelect] = useState(false);

    const [fromDate,] = useState("2023-01-01");
    const [toDate,] = useState("2023-12-31");

    useEffect(() => {
        disableLoading();
    }, [disableLoading]);

    useEffect(() => {
        setLoadingSelect(true);
        const getData = async () => {
            const responseAccountAux = await getAllAuxAccounts(paramsAuxAccounts);
            const dataAccountAux = accountsAuxAdapter(responseAccountAux.auxiliariesAccounts);
            setAccountsAux(dataAccountAux);
            setLoadingSelect(false);
        };
        getData();
    }, [paramsAuxAccounts]);

    const handleDownloadExcel = () => {
        if (!Array.isArray(balancesData.balances)) {
            console.error("Error: balancesData.balances no es un arreglo");
            return;
        }

        const visibleData = balancesData.balances.map(item => ({
            'Descripción': item.cuenta_contable.descripcion,
            'Código': item.cuenta_contable.codigo,
            'Saldo Inicial (Mensual)': item.mensual.saldo_inicial,
            'Débitos (Mensual)': item.mensual.debitos,
            'Créditos (Mensual)': item.mensual.creditos,
            'Saldo Inicial': item.saldo_inicial,
            'Débito': item.debitos,
            'Crédito': item.creditos,
            'Saldo Final': item.saldo,
            'Moneda/Descripción': item.moneda_d.descripcion
        }));

        const worksheet = XLSX.utils.json_to_sheet(visibleData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sumas y Saldos');

        XLSX.writeFile(workbook, 'Sumas_y_Saldos.xlsx');
    };

    return (
        <Card>
            <CardHeader title="Listado">
                <CardHeaderToolbar>
                    <ListingFilter
                        dataTable={balancesData}
                        accountsAux={accountsAux}
                        setBalancesData={setBalancesData}
                        paramsAuxAccounts={paramsAuxAccounts}
                        setParamsAuxAccounts={setParamsAuxAccounts}
                        enableLoading={enableLoading}
                        disableLoading={disableLoading}
                        loadingSelect={loadingSelect}
                        fromDate={fromDate} 
                        toDate={toDate} 
                    />
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={handleDownloadExcel} 
                        className="ml-2"
                    >
                        Descargar Excel
                    </Button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                {loading ? (
                    <CircularProgress size={20} color="secondary" />
                ) : (
                    <ListingTable 
                        fromDate={fromDate} 
                        toDate={toDate} 
                    />
                )}
            </CardBody>
        </Card>
    );
}
