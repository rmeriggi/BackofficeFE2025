import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useLoading } from "../../../../../hooks/useLoading";
import { accountsAuxAdapter } from "../../../adapters/accountsAuxAdapter";
import { getAllAuxAccounts } from "../../../AuxiliaryAccounts/utils/service";
import { initialParamsAuxAccounts } from "../../../initialParams";
import ModernListingFilter from "./ModernListingFilter";
import ModernListingTable from "./ModernListingTable";

export default function Listing() {
  const { loading, enableLoading, disableLoading } = useLoading();
  const [accountsAux, setAccountsAux] = useState([]);
  const [balancesData, setBalancesData] = useState({ total: "", balances: [] });
  const [paramsAuxAccounts, setParamsAuxAccounts] = useState(
    initialParamsAuxAccounts
  );
  const [loadingSelect, setLoadingSelect] = useState(false);

  const [fromDate, setFromDate] = useState("2023-01-01");
  const [toDate, setToDate] = useState("2023-12-31");

  useEffect(() => {
    disableLoading();
  }, [disableLoading]);

  useEffect(() => {
    setLoadingSelect(true);
    const getData = async () => {
      try {
        const responseAccountAux = await getAllAuxAccounts(paramsAuxAccounts);
        const dataAccountAux = accountsAuxAdapter(
          responseAccountAux.auxiliariesAccounts
        );
        setAccountsAux(dataAccountAux);

        // Mock de datos de balances
        const mockBalances = [
          {
            cuenta_contable: { descripcion: "Caja", codigo: "1.1.1.01" },
            mensual: {
              saldo_inicial: "$ 50,000.00",
              debitos: "$ 125,400.00",
              creditos: "$ 85,200.00",
            },
            saldo_inicial: "$ 50,000.00",
            debitos: "$ 125,400.00",
            creditos: "$ 85,200.00",
            saldo: "$ 90,200.00",
            moneda_d: { descripcion: "Pesos Argentinos (ARS)" },
          },
          {
            cuenta_contable: { descripcion: "Banco", codigo: "1.1.1.02" },
            mensual: {
              saldo_inicial: "$ 250,000.00",
              debitos: "$ 450,000.00",
              creditos: "$ 320,000.00",
            },
            saldo_inicial: "$ 250,000.00",
            debitos: "$ 450,000.00",
            creditos: "$ 320,000.00",
            saldo: "$ 380,000.00",
            moneda_d: { descripcion: "Pesos Argentinos (ARS)" },
          },
          {
            cuenta_contable: { descripcion: "Clientes", codigo: "1.1.2.01" },
            mensual: {
              saldo_inicial: "$ 180,000.00",
              debitos: "$ 472,600.00",
              creditos: "$ 100,525.00",
            },
            saldo_inicial: "$ 180,000.00",
            debitos: "$ 472,600.00",
            creditos: "$ 100,525.00",
            saldo: "$ 552,075.00",
            moneda_d: { descripcion: "Pesos Argentinos (ARS)" },
          },
        ];

        setBalancesData({ total: mockBalances.length, balances: mockBalances });
        setLoadingSelect(false);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        setLoadingSelect(false);
      }
    };
    getData();
  }, [paramsAuxAccounts]);

  const handleDownloadExcel = () => {
    if (!Array.isArray(balancesData.balances)) {
      console.error("Error: balancesData.balances no es un arreglo");
      return;
    }

    const visibleData = balancesData.balances.map((item) => ({
      Descripción: item.cuenta_contable.descripcion,
      Código: item.cuenta_contable.codigo,
      "Saldo Inicial (Mensual)": item.mensual.saldo_inicial,
      "Débitos (Mensual)": item.mensual.debitos,
      "Créditos (Mensual)": item.mensual.creditos,
      "Saldo Inicial": item.saldo_inicial,
      Débito: item.debitos,
      Crédito: item.creditos,
      "Saldo Final": item.saldo,
      "Moneda/Descripción": item.moneda_d.descripcion,
    }));

    const worksheet = XLSX.utils.json_to_sheet(visibleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sumas y Saldos");

    XLSX.writeFile(workbook, "Sumas_y_Saldos.xlsx");
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-6">
        <h1 className="text-dark font-weight-bold my-1 fs-2hx">
          Sumas y Saldos
        </h1>
      </div>

      <ModernListingFilter
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
        handleDownloadExcel={handleDownloadExcel}
      />

      {loading ? (
        <div className="text-center py-8">
          <CircularProgress size={40} color="primary" />
          <p className="text-muted mt-3">Cargando datos de sumas y saldos...</p>
        </div>
      ) : (
        <ModernListingTable fromDate={fromDate} toDate={toDate} />
      )}
    </div>
  );
}
