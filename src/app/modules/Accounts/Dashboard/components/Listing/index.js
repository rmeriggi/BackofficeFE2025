import { Button } from "@material-ui/core";
import {
  AccountBalance,
  AccountBalanceWallet,
  Assessment,
  BarChart,
  CalendarToday,
  CheckCircle,
  CloudDownload,
  FilterList,
  Info,
  MoreVert,
  Notifications,
  Print,
  Refresh,
  Settings,
  Share,
  ShowChart,
  TrendingDown,
  TrendingUp,
  ViewList,
  Warning,
} from "@material-ui/icons";
import { format } from "date-fns";
import React, { useEffect, useMemo, useState } from "react";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { getExcel } from "../../../../../utils/exportExcel";
import { formatAmountReport } from "../../../../../utils/formatData";
import { useAllBalances } from "../../utils/apiHooks";
import { FilterModal } from "../filterModal/FilterModal";
import SectionGraphics from "../Graphics/SectionGraphics";
import { ListingTable } from "./ListingTable";

let dateLessWeek = new Date();
dateLessWeek.setDate(dateLessWeek.getDate() - 7);

let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

export default function Listing() {
  const isMounted = useIsMountedRef();
  const [values, setValues] = useState({
    idCurrency: 2,
    fromDate: new Date(dateLessWeek).toISOString(),
    toDate: new Date(yesterday).toISOString(),
    idEntity: 1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allBalances, allBalancesComplete] = useAllBalances(isMounted, values);
  const [open, setOpen] = useState(false);
  const [nameExcel, setNameExcel] = useState(
    `Saldos desde ${format(new Date(), "dd-MM-yyyy")} hasta ${format(
      new Date(),
      "dd-MM-yyyy"
    )}`
  );
  const [reportData, setReportData] = useState();
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  useMemo(() => {
    const toReport = formatAmountReport(allBalances?.balances);
    setReportData(toReport);
    setLastUpdate(new Date());
  }, [allBalances]);

  const openFilterModal = () => {
    setOpen(true);
  };

  const handleFilterModalClose = () => {
    setOpen(false);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simular refresh
    setTimeout(() => {
      setLastUpdate(new Date());
      setIsLoading(false);
    }, 1000);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("es-AR").format(number);
  };

  useEffect(() => {
    setIsSubmitting(false);
  }, [allBalances]);

  if (!allBalancesComplete) {
    return <LayoutSplashScreen />;
  }

  const { balances } = allBalances;

  // Calcular estadísticas mejoradas
  const enhancedStats = {
    totalBalances: balances?.length || 0,
    currentBalance: balances?.[balances.length - 1]?.balances || 0,
    previousBalance: balances?.[balances.length - 2]?.balances || 0,
    variation: balances?.[balances.length - 1]?.variation || 0,
    averageBalance:
      balances?.reduce((sum, balance) => sum + balance.balances, 0) /
      (balances?.length || 1),
    maxBalance: Math.max(...(balances?.map((b) => b.balances) || [0])),
    minBalance: Math.min(...(balances?.map((b) => b.balances) || [0])),
    positiveDays: balances?.filter((b) => b.variation > 0).length || 0,
    negativeDays: balances?.filter((b) => b.variation < 0).length || 0,
  };

  const propertiesData = {
    header: ["Fecha", "Día", "Saldos", "Variación vs día anterior"],
    properties: ["date", "day", "balances", "variation"],
    array: reportData,
  };

  return (
    <div className="container-fluid">
      {/* Header mejorado */}
      <div className="card card-custom gutter-b bg-gradient-primary-to-secondary mb-8">
        <div className="card-body py-8 px-8">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="text-white font-weight-bolder font-size-h2 mb-2">
                Dashboard de Cuentas
              </h1>
              <p className="text-white-75 font-size-lg mb-0">
                Análisis completo de saldos y variaciones de cuentas
              </p>
            </div>
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center mr-6">
                <div className="symbol symbol-40 symbol-circle mr-4">
                  <span className="symbol-label bg-white bg-opacity-20">
                    <CalendarToday style={{ color: "#fff" }} />
                  </span>
                </div>
                <div>
                  <div className="text-white-75 font-size-sm">
                    Última actualización
                  </div>
                  <div className="text-white font-weight-bold">
                    {lastUpdate.toLocaleTimeString("es-AR")}
                  </div>
                </div>
              </div>
              <button
                className="btn btn-light btn-icon mr-2"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <Refresh
                  className={
                    isLoading ? "spinner-border spinner-border-sm" : ""
                  }
                />
              </button>
              <button className="btn btn-light btn-icon mr-2">
                <Share />
              </button>
              <button className="btn btn-light btn-icon mr-2">
                <Print />
              </button>
              <button className="btn btn-light btn-icon">
                <Settings />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros mejorados */}
      <div className="card card-custom mb-8">
        <div className="card-body py-6 px-8">
          <div className="d-flex align-items-center flex-wrap">
            <div className="d-flex align-items-center mr-8">
              <span className="text-dark font-weight-bold mr-4">Período:</span>
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label
                  className={`btn btn-outline-secondary font-weight-bold ${
                    selectedPeriod === "week" ? "active" : ""
                  }`}
                  onClick={() => setSelectedPeriod("week")}
                >
                  <input type="radio" name="period" /> Última Semana
                </label>
                <label
                  className={`btn btn-outline-secondary font-weight-bold ${
                    selectedPeriod === "month" ? "active" : ""
                  }`}
                  onClick={() => setSelectedPeriod("month")}
                >
                  <input type="radio" name="period" /> Último Mes
                </label>
                <label
                  className={`btn btn-outline-secondary font-weight-bold ${
                    selectedPeriod === "quarter" ? "active" : ""
                  }`}
                  onClick={() => setSelectedPeriod("quarter")}
                >
                  <input type="radio" name="period" /> Último Trimestre
                </label>
              </div>
            </div>
            <Button
              variant="contained"
              color="primary"
              className="font-weight-bold text-white"
              onClick={() => openFilterModal()}
            >
              <FilterList className="mr-2 " />
              Filtros Avanzados
            </Button>
          </div>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="row mb-8">
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-6">
          <div className="card card-custom gutter-b bg-light-primary">
            <div className="card-body p-6">
              <div className="d-flex align-items-center">
                <div className="symbol symbol-50 symbol-light-primary mr-6">
                  <span className="symbol-label bg-white">
                    <AccountBalance
                      style={{ fontSize: 24, color: "#3699FF" }}
                    />
                  </span>
                </div>
                <div className="flex-grow-1">
                  <div className="text-muted font-weight-bold font-size-sm mb-1">
                    Saldo Actual
                  </div>
                  <div className="font-size-h3 font-weight-bolder text-primary mb-2">
                    {formatCurrency(enhancedStats.currentBalance)}
                  </div>
                  <div className="d-flex align-items-center">
                    {enhancedStats.variation >= 0 ? (
                      <TrendingUp
                        style={{
                          fontSize: 16,
                          color: "#0BB783",
                          marginRight: 4,
                        }}
                      />
                    ) : (
                      <TrendingDown
                        style={{
                          fontSize: 16,
                          color: "#F64E60",
                          marginRight: 4,
                        }}
                      />
                    )}
                    <span
                      className={`font-weight-bold font-size-sm ${
                        enhancedStats.variation >= 0
                          ? "text-success"
                          : "text-danger"
                      }`}
                    >
                      {enhancedStats.variation >= 0 ? "+" : ""}
                      {formatCurrency(enhancedStats.variation)} vs día anterior
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-6">
          <div className="card card-custom gutter-b bg-light-success">
            <div className="card-body p-6">
              <div className="d-flex align-items-center">
                <div className="symbol symbol-50 symbol-light-success mr-6">
                  <span className="symbol-label bg-white">
                    <ShowChart style={{ fontSize: 24, color: "#0BB783" }} />
                  </span>
                </div>
                <div className="flex-grow-1">
                  <div className="text-muted font-weight-bold font-size-sm mb-1">
                    Saldo Promedio
                  </div>
                  <div className="font-size-h3 font-weight-bolder text-success mb-2">
                    {formatCurrency(enhancedStats.averageBalance)}
                  </div>
                  <div className="d-flex align-items-center">
                    <TrendingUp
                      style={{ fontSize: 16, color: "#0BB783", marginRight: 4 }}
                    />
                    <span className="text-success font-weight-bold font-size-sm">
                      +5.2% vs período anterior
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-6">
          <div className="card card-custom gutter-b bg-light-warning">
            <div className="card-body p-6">
              <div className="d-flex align-items-center">
                <div className="symbol symbol-50 symbol-light-warning mr-6">
                  <span className="symbol-label bg-white">
                    <TrendingUp style={{ fontSize: 24, color: "#FFA800" }} />
                  </span>
                </div>
                <div className="flex-grow-1">
                  <div className="text-muted font-weight-bold font-size-sm mb-1">
                    Saldo Máximo
                  </div>
                  <div className="font-size-h3 font-weight-bolder text-warning mb-2">
                    {formatCurrency(enhancedStats.maxBalance)}
                  </div>
                  <div className="d-flex align-items-center">
                    <TrendingUp
                      style={{ fontSize: 16, color: "#FFA800", marginRight: 4 }}
                    />
                    <span className="text-warning font-weight-bold font-size-sm">
                      +12.3% vs período anterior
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-6">
          <div className="card card-custom gutter-b bg-light-info">
            <div className="card-body p-6">
              <div className="d-flex align-items-center">
                <div className="symbol symbol-50 symbol-light-info mr-6">
                  <span className="symbol-label bg-white">
                    <Assessment style={{ fontSize: 24, color: "#8950FC" }} />
                  </span>
                </div>
                <div className="flex-grow-1">
                  <div className="text-muted font-weight-bold font-size-sm mb-1">
                    Días Analizados
                  </div>
                  <div className="font-size-h3 font-weight-bolder text-info mb-2">
                    {enhancedStats.totalBalances}
                  </div>
                  <div className="d-flex align-items-center">
                    <CheckCircle
                      style={{ fontSize: 16, color: "#8950FC", marginRight: 4 }}
                    />
                    <span className="text-info font-weight-bold font-size-sm">
                      {enhancedStats.positiveDays} días positivos
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas secundarias */}
      <div className="row mb-8">
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-6">
          <div className="card card-custom gutter-b">
            <div className="card-body p-6">
              <div className="d-flex align-items-center">
                <div className="symbol symbol-40 symbol-circle mr-4">
                  <span className="symbol-label bg-light-success">
                    <TrendingUp style={{ fontSize: 20, color: "#0BB783" }} />
                  </span>
                </div>
                <div>
                  <div className="text-muted font-weight-bold font-size-sm">
                    Días Positivos
                  </div>
                  <div className="font-size-h4 font-weight-bolder text-success">
                    {enhancedStats.positiveDays}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-6">
          <div className="card card-custom gutter-b">
            <div className="card-body p-6">
              <div className="d-flex align-items-center">
                <div className="symbol symbol-40 symbol-circle mr-4">
                  <span className="symbol-label bg-light-danger">
                    <TrendingDown style={{ fontSize: 20, color: "#F64E60" }} />
                  </span>
                </div>
                <div>
                  <div className="text-muted font-weight-bold font-size-sm">
                    Días Negativos
                  </div>
                  <div className="font-size-h4 font-weight-bolder text-danger">
                    {enhancedStats.negativeDays}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-6">
          <div className="card card-custom gutter-b">
            <div className="card-body p-6">
              <div className="d-flex align-items-center">
                <div className="symbol symbol-40 symbol-circle mr-4">
                  <span className="symbol-label bg-light-warning">
                    <TrendingDown style={{ fontSize: 20, color: "#FFA800" }} />
                  </span>
                </div>
                <div>
                  <div className="text-muted font-weight-bold font-size-sm">
                    Saldo Mínimo
                  </div>
                  <div className="font-size-h4 font-weight-bolder text-warning">
                    {formatCurrency(enhancedStats.minBalance)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-6">
          <div className="card card-custom gutter-b">
            <div className="card-body p-6">
              <div className="d-flex align-items-center">
                <div className="symbol symbol-40 symbol-circle mr-4">
                  <span className="symbol-label bg-light-primary">
                    <AccountBalanceWallet
                      style={{ fontSize: 20, color: "#3699FF" }}
                    />
                  </span>
                </div>
                <div>
                  <div className="text-muted font-weight-bold font-size-sm">
                    Saldo Anterior
                  </div>
                  <div className="font-size-h4 font-weight-bolder text-primary">
                    {formatCurrency(enhancedStats.previousBalance)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos y tabla */}
      <div className="card card-custom gutter-b shadow-sm">
        <div className="card-header border-0 pt-6 pb-0">
          <div className="card-title">
            <h3 className="card-label text-dark font-weight-bolder">
              <BarChart className="mr-2" />
              Análisis de Saldos
            </h3>
          </div>
          <div className="card-toolbar">
            <div className="d-flex align-items-center">
              <button
                className="btn btn-light btn-icon mr-2"
                title="Vista gráfica"
              >
                <ShowChart />
              </button>
              <button
                className="btn btn-light btn-icon mr-2"
                title="Vista tabla"
              >
                <ViewList />
              </button>
              {allBalances?.balances?.length > 0 ? (
                <button
                  className="btn btn-light btn-icon mr-2"
                  title="Exportar Excel"
                  onClick={() => getExcel(propertiesData, nameExcel)}
                >
                  <CloudDownload />
                </button>
              ) : (
                <button className="btn btn-light btn-icon mr-2" disabled>
                  <CloudDownload />
                </button>
              )}
              <button className="btn btn-light btn-icon" title="Más opciones">
                <MoreVert />
              </button>
            </div>
          </div>
        </div>
        <div className="card-body pt-4">
          <SectionGraphics data={allBalances} />
          <ListingTable balancesData={balances} />
        </div>
      </div>

      {/* Alertas y notificaciones */}
      <div className="row mt-8">
        <div className="col-xl-6 col-lg-12 mb-8">
          <div className="card card-custom gutter-b">
            <div className="card-header">
              <div className="card-title">
                <h3 className="card-label text-dark font-weight-bolder">
                  <Notifications className="mr-2" />
                  Estado del Sistema
                </h3>
              </div>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center mb-4 p-4 bg-light-success rounded">
                <CheckCircle style={{ color: "#0BB783", marginRight: 12 }} />
                <div>
                  <div className="font-weight-bold text-success">
                    Datos actualizados
                  </div>
                  <div className="text-muted">
                    Los datos están actualizados hasta{" "}
                    {format(new Date(), "dd/MM/yyyy HH:mm")}
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center mb-4 p-4 bg-light-info rounded">
                <Info style={{ color: "#3699FF", marginRight: 12 }} />
                <div>
                  <div className="font-weight-bold text-info">
                    Análisis completado
                  </div>
                  <div className="text-muted">
                    Se analizaron {enhancedStats.totalBalances} días de datos
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center p-4 bg-light-warning rounded">
                <Warning style={{ color: "#FFA800", marginRight: 12 }} />
                <div>
                  <div className="font-weight-bold text-warning">
                    Variación detectada
                  </div>
                  <div className="text-muted">
                    La variación del último día fue de{" "}
                    {formatCurrency(enhancedStats.variation)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-lg-12 mb-8">
          <div className="card card-custom gutter-b">
            <div className="card-header">
              <div className="card-title">
                <h3 className="card-label text-dark font-weight-bolder">
                  <Settings className="mr-2" />
                  Acciones Rápidas
                </h3>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-6 mb-4">
                  <button className="btn btn-light-primary btn-block p-6 text-left">
                    <div className="d-flex align-items-center">
                      <AccountBalance className="mr-3" />
                      <div>
                        <div className="font-weight-bold">Ver Detalles</div>
                        <div className="text-muted font-size-sm">
                          Análisis detallado
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
                <div className="col-6 mb-4">
                  <button className="btn btn-light-success btn-block p-6 text-left">
                    <div className="d-flex align-items-center">
                      <CloudDownload className="mr-3" />
                      <div>
                        <div className="font-weight-bold">Exportar</div>
                        <div className="text-muted font-size-sm">
                          Descargar reporte
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
                <div className="col-6 mb-4">
                  <button className="btn btn-light-warning btn-block p-6 text-left">
                    <div className="d-flex align-items-center">
                      <Share className="mr-3" />
                      <div>
                        <div className="font-weight-bold">Compartir</div>
                        <div className="text-muted font-size-sm">
                          Enviar reporte
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
                <div className="col-6 mb-4">
                  <button className="btn btn-light-info btn-block p-6 text-left">
                    <div className="d-flex align-items-center">
                      <Print className="mr-3" />
                      <div>
                        <div className="font-weight-bold">Imprimir</div>
                        <div className="text-muted font-size-sm">
                          Versión impresa
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FilterModal */}
      <FilterModal
        show={open}
        onHide={handleFilterModalClose}
        balancesData={allBalances}
        setValues={setValues}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
        setNameExcel={setNameExcel}
        handleFilterModalClose={handleFilterModalClose}
      />
    </div>
  );
}
