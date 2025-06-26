import DateFnsUtils from "@date-io/date-fns";
import { Button, Collapse, IconButton } from "@material-ui/core";
import {
  Clear,
  CloudDownload,
  ExpandLess,
  ExpandMore,
  FilterList,
  PictureAsPdf,
} from "@material-ui/icons";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { es } from "date-fns/locale";
import React, { useState } from "react";
import { Card, CardBody } from "../../../../../../_metronic/_partials/controls";

const ModernListingFilter = ({
  dataTable,
  enableLoading,
  disableLoading,
  setBalancesData,
  accountsAux,
  paramsAuxAccounts,
  setParamsAuxAccounts,
  loadingSelect,
  fromDate,
  toDate,
  handleDownloadExcel,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleDownloadReport = async () => {
    if (!paramsAuxAccounts.fromDate || !paramsAuxAccounts.toDate) {
      console.error("Las fechas 'fromDate' y 'toDate' son requeridas.");
      return;
    }
    // Mock de descarga de reporte
    console.log("Descargando reporte PDF...");
    alert("Reporte PDF descargado (mock)");
  };

  const clearFilters = () => {
    setParamsAuxAccounts((prev) => ({
      ...prev,
      fromDate: "2023-01-01",
      toDate: "2023-12-31",
    }));
  };

  return (
    <Card
      className="mb-6"
      style={{
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <CardBody className="p-6">
        {/* Header del filtro */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <FilterList style={{ color: "#495057", marginRight: 8 }} />
            <h5 className="mb-0 font-weight-bold text-dark">
              Filtros de Sumas y Saldos
            </h5>
          </div>
          <div className="d-flex align-items-center">
            <IconButton
              size="small"
              onClick={() => setShowAdvanced(!showAdvanced)}
              style={{ marginRight: 8, color: "#6c757d" }}
            >
              {showAdvanced ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            <IconButton
              size="small"
              onClick={clearFilters}
              style={{ color: "#6c757d", marginRight: 16 }}
            >
              <Clear />
            </IconButton>
            <Button
              variant="outlined"
              size="large"
              onClick={handleDownloadExcel}
              style={{
                borderRadius: "6px",
                padding: "10px 20px",
                fontSize: "14px",
                fontWeight: 500,
                border: "1px solid #28a745",
                color: "#28a745",
                marginRight: 8,
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#28a745";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#28a745";
              }}
            >
              <CloudDownload className="mr-2" />
              Excel
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={handleDownloadReport}
              style={{
                borderRadius: "6px",
                padding: "10px 20px",
                fontSize: "14px",
                fontWeight: 500,
                border: "1px solid #dc3545",
                color: "#dc3545",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#dc3545";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#dc3545";
              }}
            >
              <PictureAsPdf className="mr-2" />
              PDF
            </Button>
          </div>
        </div>

        {/* Filtro principal */}
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
          <div className="row mb-4">
            <div className="col-lg-4 col-md-6 mb-3">
              <label className="form-label font-weight-bold text-dark">
                Fecha Desde
              </label>
              <KeyboardDatePicker
                value={fromDate ? new Date(fromDate) : null}
                onChange={(date) => {
                  const formattedDate = date
                    ? date.toISOString().split("T")[0]
                    : "";
                  setParamsAuxAccounts((prev) => ({
                    ...prev,
                    fromDate: formattedDate,
                  }));
                }}
                format="dd/MM/yyyy"
                variant="inline"
                inputVariant="outlined"
                fullWidth
                autoOk
                cancelLabel="Cancelar"
                style={{
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
                InputProps={{
                  style: {
                    borderRadius: "6px",
                    fontSize: "14px",
                  },
                }}
              />
            </div>
            <div className="col-lg-4 col-md-6 mb-3">
              <label className="form-label font-weight-bold text-dark">
                Fecha Hasta
              </label>
              <KeyboardDatePicker
                value={toDate ? new Date(toDate) : null}
                onChange={(date) => {
                  const formattedDate = date
                    ? date.toISOString().split("T")[0]
                    : "";
                  setParamsAuxAccounts((prev) => ({
                    ...prev,
                    toDate: formattedDate,
                  }));
                }}
                format="dd/MM/yyyy"
                variant="inline"
                inputVariant="outlined"
                fullWidth
                autoOk
                cancelLabel="Cancelar"
                style={{
                  borderRadius: "6px",
                  fontSize: "14px",
                }}
                InputProps={{
                  style: {
                    borderRadius: "6px",
                    fontSize: "14px",
                  },
                }}
              />
            </div>
            <div className="col-lg-4 col-md-12 mb-3 d-flex align-items-end">
              <button
                className="btn btn-primary w-100"
                onClick={() => {
                  enableLoading();
                  setTimeout(() => {
                    disableLoading();
                  }, 1000);
                }}
                style={{
                  borderRadius: "6px",
                  padding: "10px 12px",
                  fontSize: "14px",
                  fontWeight: 500,
                  background: "#007bff",
                  border: "1px solid #007bff",
                }}
              >
                <FilterList className="mr-2" />
                Aplicar Filtros
              </button>
            </div>
          </div>
        </MuiPickersUtilsProvider>

        {/* Filtros avanzados */}
        <Collapse in={showAdvanced}>
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-3">
              <label className="form-label font-weight-bold text-dark">
                Cuenta Contable
              </label>
              <select
                className="form-control"
                style={{
                  borderRadius: "6px",
                  border: "1px solid #ced4da",
                  padding: "10px 12px",
                  fontSize: "14px",
                }}
              >
                <option value="">Todas las cuentas</option>
                {accountsAux &&
                  accountsAux.map((account, index) => (
                    <option key={index} value={account.id}>
                      {account.auxiliary}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-lg-6 col-md-12 mb-3">
              <label className="form-label font-weight-bold text-dark">
                Moneda
              </label>
              <select
                className="form-control"
                style={{
                  borderRadius: "6px",
                  border: "1px solid #ced4da",
                  padding: "10px 12px",
                  fontSize: "14px",
                }}
              >
                <option value="">Todas las monedas</option>
                <option value="ARS">Pesos Argentinos (ARS)</option>
                <option value="USD">Dólares (USD)</option>
                <option value="EUR">Euros (EUR)</option>
              </select>
            </div>
          </div>
        </Collapse>

        {/* Información de resultados */}
        <div className="d-flex justify-content-between align-items-center mt-4 pt-4 border-top">
          <div className="text-muted font-size-sm">
            {dataTable &&
            dataTable.balances &&
            dataTable.balances.length > 0 ? (
              <span>
                Mostrando <strong>{dataTable.balances.length}</strong> cuentas
                contables
              </span>
            ) : (
              <span>No se encontraron datos de sumas y saldos</span>
            )}
          </div>
          <div className="text-muted font-size-sm">
            Período: {fromDate} - {toDate}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ModernListingFilter;
