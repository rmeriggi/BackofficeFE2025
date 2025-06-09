import React, { useEffect, useState } from "react";
import ListingTable from "./ListingTable";
import ListingFilter from "./ListingFilter";
import { LedgerBalanceAdapter } from "../../adapter/LedgerBalanceAdapter";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { useLoading } from "../../../../../hooks/useLoading";
import { CircularProgress, Button } from "@material-ui/core";
import { getMayorSaldosVista, getMayorSaldosPdf } from "../../utils/api";
import { useModal } from "../../../../../hooks/useModal";
import * as XLSX from "xlsx";

export default function Listing() {
  const { loading, enableLoading, disableLoading } = useLoading();
  const [mayorSaldosData, setMayorSaldosData] = useState([]);
  const [paramsDate, setParamsDate] = useState({ date: new Date() });
  const [loadingSelect, setLoadingSelect] = useState(false);
  const [show /* openModal */, , closeModal] = useModal();

  useEffect(() => {
    disableLoading();
  }, [disableLoading]);

  useEffect(() => {
    setLoadingSelect(true);
    const fetchData = async () => {
      try {
        const response = await getMayorSaldosVista(paramsDate);
        const adaptedData = LedgerBalanceAdapter(response.mayor_saldos || []);
        setMayorSaldosData(adaptedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMayorSaldosData([]);
      } finally {
        setLoadingSelect(false);
      }
    };
    fetchData();
  }, [paramsDate]);

  const handleDownloadReport = async () => {
    try {
      const response = await getMayorSaldosPdf(paramsDate);
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "mayor_saldos_report.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the report", error);
    }
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(mayorSaldosData);

    const headerRange = XLSX.utils.decode_range(worksheet["!ref"]);
    for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      if (worksheet[cellAddress]) {
        worksheet[cellAddress].s = { font: { bold: true } };
      }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Mayor de Saldos");
    XLSX.writeFile(workbook, "Mayor_de_Saldos.xlsx");
  };

  return (
    <Card>
      <CardHeader title="Mayor de Saldos">
        <CardHeaderToolbar>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownloadExcel}
            className="ml-3"
          >
            Descargar Excel
          </Button>
          <div
            className="symbol-label ml-3"
            onClick={handleDownloadReport}
            style={{ cursor: "pointer" }}
          >
            <i
              className="flaticon2-download icon-xl text-primary"
              role="button"
            ></i>
          </div>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {loading || loadingSelect ? (
          <CircularProgress size={20} color="secondary" />
        ) : (
          <ListingTable dataTable={mayorSaldosData} />
        )}
      </CardBody>
      <ListingFilter
        show={show}
        onHide={closeModal}
        setMayorSaldosData={setMayorSaldosData}
        enableLoading={enableLoading}
        disableLoading={disableLoading}
        paramsDate={paramsDate}
        setParamsDate={setParamsDate}
      />
    </Card>
  );
}
