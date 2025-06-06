/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import ListingFilter from "./ListingFilter";
import { ListingTable } from "./ListingTable";
import { Card, CardBody, CardHeader, CardHeaderToolbar } from "../../../../../../_metronic/_partials/controls";
import { useLoading } from "../../../../../hooks/useLoading";
import { CircularProgress } from "@material-ui/core";
import { getVatPurchasesVista } from "../../../../../_redux/accounting/accountingCrud";

export default function Listing() {
    const initialValues = {
       month: 8,
       year: 2023
    };

    const { loading, enableLoading, disableLoading } = useLoading();
    const [vatPurchasesData, setVatPurchasesData] = useState([]);
    const [paramsAuxAccounts, setParamsAuxAccounts] = useState(initialValues);
    const [loadingSelect, setLoadingSelect] = useState(false);

    useEffect(() => {
        disableLoading();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setLoadingSelect(true);
        const getVatPurchases = async () => {
            try {
                const response = await getVatPurchasesVista(paramsAuxAccounts);

                if (response && Array.isArray(response.compras)) {
                    const comprasMapped = response.compras.map(compra => ({
                        id: compra.id,
                        date: compra.date,
                        comprobante: compra.comprobante,
                        numero: compra.numero,
                        provider: compra.provider,
                        cond_IVA: compra.cond_IVA,
                        cuit: compra.cuit,
                        importeGravado: compra.grav_21 || 0,
                        importeNoGravado: compra.no_grav || 0,
                        iva105: compra.iva_10_5 || 0,
                        iva21: compra.iva_21 || 0,
                        iva27: compra.iva_27 || 0,
                        percepcionIVA: compra.perc_iva || 0,
                        percepcionIIBB: compra.perc_llbb || 0,
                        importeExento: compra.exento || 0,
                        importeOtros: compra.per_mn_int_otr || 0,
                        total: compra.total || 0,
                    }));
                    setVatPurchasesData(comprasMapped);
                } else {
                    setVatPurchasesData([]);
                }
            } catch (error) {
                console.error('Error fetching VAT Purchases:', error);
                setVatPurchasesData([]); 
            } finally {
                setLoadingSelect(false);
            }
        };
        getVatPurchases();
    }, [paramsAuxAccounts]);

    return (
        <Card>
            <CardHeader title="Listado">
                <CardHeaderToolbar>
                    <ListingFilter  
                        dataTable={vatPurchasesData}
                        setVatPurchasesData={setVatPurchasesData}
                        paramsAuxAccounts={paramsAuxAccounts}
                        setParamsAuxAccounts={setParamsAuxAccounts}
                        enableLoading={enableLoading}
                        disableLoading={disableLoading}
                        loadingSelect={loadingSelect}
                    />
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                {loading || loadingSelect ? 
                    <CircularProgress size={20} color="secondary"/> 
                :
                    <ListingTable 
                        dataTable={vatPurchasesData} 
                    />
                }
            </CardBody>
        </Card>
    );
}
