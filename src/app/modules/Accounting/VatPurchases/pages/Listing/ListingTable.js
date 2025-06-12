import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { useLoading } from "../../../../../hooks/useLoading";
import { CircularProgress, Button } from "@material-ui/core";
import {
  getVatSales,
  getVatSalesPdf,
} from "../../../../../_redux/accounting/accountingCrud";
import { useModal } from "../../../../../hooks/useModal";
import { FiltersModal } from "../../components/modals/FiltersModal";
import * as XLSX from "xlsx";

// Nuevo componente ListingTable con estilo Metronic
const ListingTable = ({ dataTable }) => {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover table-striped">
        <thead className="thead-light">
          <tr>
            <th className="text-center">Fecha</th>
            <th className="text-center">Tipo de comprobante</th>
            <th className="text-center">Número</th>
            <th className="text-center">Razón Social</th>
            <th className="text-center">CUIT</th>
            <th className="text-center">Tp de Contrib.</th>
            <th className="text-center">Importe Neto Gravado</th>
            <th className="text-center">IVA 21%</th>
            <th className="text-center">Importe Exento</th>
            <th className="text-center">Percepción IIBB</th>
            <th className="text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {dataTable.length > 0 ? (
            dataTable.map((item, index) => (
              <tr key={index}>
                <td className="text-center">{item.date}</td>
                <td className="text-center">{item.comprobante}</td>
                <td className="text-center">{item.numero}</td>
                <td className="text-center">{item.provider}</td>
                <td className="text-center">{item.cuit}</td>
                <td className="text-center">{item.cond_IVA}</td>
                <td className="text-right">${item.grav_21.toFixed(2)}</td>
                <td className="text-right">${item.iva_21.toFixed(2)}</td>
                <td className="text-right">${item.exento.toFixed(2)}</td>
                <td className="text-right">${item.perc_llbb.toFixed(2)}</td>
                <td className="text-right">${item.total.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="text-center">
                No se encontraron registros
              </td>
            </tr>
          )}
        </tbody>
        {dataTable.length > 0 && (
          <tfoot>
            <tr className="font-weight-boldest">
              <td colSpan="6" className="text-right">
                TOTALES:
              </td>
              <td className="text-right">
                $
                {dataTable
                  .reduce((sum, item) => sum + item.grav_21, 0)
                  .toFixed(2)}
              </td>
              <td className="text-right">
                $
                {dataTable
                  .reduce((sum, item) => sum + item.iva_21, 0)
                  .toFixed(2)}
              </td>
              <td className="text-right">
                $
                {dataTable
                  .reduce((sum, item) => sum + item.exento, 0)
                  .toFixed(2)}
              </td>
              <td className="text-right">
                $
                {dataTable
                  .reduce((sum, item) => sum + item.perc_llbb, 0)
                  .toFixed(2)}
              </td>
              <td className="text-right">
                $
                {dataTable
                  .reduce((sum, item) => sum + item.total, 0)
                  .toFixed(2)}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default function Listing() {
  const initialValues = {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
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
        setVatSalesData(
          Array.isArray(responseVatSales.ventas) ? responseVatSales.ventas : []
        );
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
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "vat_sales_report.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading the report", error);
    }
  };

  const handleDownloadExcel = () => {
    if (vatSalesData.length === 0) {
      alert("No hay datos para exportar");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      vatSalesData.map((item) => ({
        Fecha: item.date,
        "Tipo de comprobante": item.comprobante,
        Número: item.numero,
        "Razón Social": item.provider,
        CUIT: item.cuit,
        "Tipo de Contribuyente": item.cond_IVA,
        "Importe Neto Gravado": item.grav_21,
        "IVA 21%": item.iva_21,
        "Importe Exento": item.exento,
        "Percepción IIBB": item.perc_llbb,
        Total: item.total,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "IVA Ventas");
    XLSX.writeFile(
      workbook,
      `IVA_Ventas_${paramsVatSales.month}_${paramsVatSales.year}.xlsx`
    );
  };

  return (
    <Card>
      <CardHeader title="Listado de IVA Compras">
        <CardHeaderToolbar>
          <Button
            variant="contained"
            color="secondary"
            onClick={openModal}
            className="btn btn-light-primary font-weight-bold"
          >
            <i className="flaticon2-filter-1"></i> Filtros
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownloadExcel}
            className="ml-2 btn btn-light-success font-weight-bold"
            disabled={vatSalesData.length === 0}
          >
            <i className="flaticon2-download"></i> Excel
          </Button>
          <Button
            variant="contained"
            onClick={handleDownloadReport}
            className="ml-2 btn btn-light-danger font-weight-bold"
            disabled={vatSalesData.length === 0}
          >
            <i className="flaticon2-download"></i> PDF
          </Button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        {loading || loadingSelect ? (
          <div className="d-flex justify-content-center">
            <CircularProgress size={40} color="secondary" />
          </div>
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
