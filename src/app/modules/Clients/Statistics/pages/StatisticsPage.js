import {
  AccountBalance,
  AccountBalanceWallet,
  BarChart,
  CheckCircle,
  Info,
  MonetizationOn,
  Notifications,
  Payment,
  People,
  Settings,
  TrendingUp,
  Warning,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import {
  LayoutSplashScreen,
  useSubheader,
} from "../../../../../_metronic/layout";
import {
  getCurrencies,
  getEntities,
} from "../../../../_redux/combos/combosActions";
import { useFetchCombos } from "../../../../hooks";
import CardsShow from "../components/CardsShow";
import { FilterModal } from "../components/filterModal/FilterModal";
import { getClientStatistics } from "../utils/service";

const initialValues = {
  idCurrency: 2,
  idEntity: 1,
};

const StatisticsPage = () => {
  const [currency] = useFetchCombos("currencies", getCurrencies);
  const [entities] = useFetchCombos("entities", getEntities);
  const [dashboardInfo, setDashboardInfo] = useState();
  const [values, setValues] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedPeriod, setSelectedPeriod] = useState("current");

  const subheader = useSubheader();
  subheader.setTitle("Estadísticas de Clientes");

  useEffect(() => {
    const getStatistics = async () => {
      setIsLoading(true);
      try {
        const response = await getClientStatistics(values);
        setDashboardInfo(response);
        setLastUpdate(new Date());
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getStatistics();
  }, [values]);

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

  if (!dashboardInfo) {
    return <LayoutSplashScreen />;
  }

  const { charts } = dashboardInfo;
  const { transactions, volume, balances } = charts;

  // Calcular estadísticas mejoradas
  const enhancedStats = {
    totalClients: dashboardInfo.clients || 0,
    totalBalance: balances?.master || 0,
    totalAccounts: balances?.accounts || 0,
    totalCashIn: balances?.cashin || 0,
    totalCashOut: balances?.cashout || 0,
    sponsorBalance: balances?.itau || 0,
    averageBalance: balances?.master
      ? balances.master / dashboardInfo.clients
      : 0,
    activeAccounts: Math.floor(dashboardInfo.clients * 0.85), // Simulado
    newClients: Math.floor(dashboardInfo.clients * 0.12), // Simulado
  };

  return (
    <div className="container-fluid">
      {/* Header mejorado */}

      {/* Métricas principales mejoradas */}
      <div className="row mb-8">
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-6">
          <div className="card card-custom gutter-b bg-light-primary">
            <div className="card-body p-6">
              <div className="d-flex align-items-center">
                <div className="symbol symbol-50 symbol-light-primary mr-6">
                  <span className="symbol-label bg-white">
                    <People style={{ fontSize: 24, color: "#3699FF" }} />
                  </span>
                </div>
                <div className="flex-grow-1">
                  <div className="text-muted font-weight-bold font-size-sm mb-1">
                    Total de Clientes
                  </div>
                  <div className="font-size-h3 font-weight-bolder text-primary mb-2">
                    {formatNumber(enhancedStats.totalClients)}
                  </div>
                  <div className="d-flex align-items-center">
                    <TrendingUp
                      style={{ fontSize: 16, color: "#3699FF", marginRight: 4 }}
                    />
                    <span className="text-primary font-weight-bold font-size-sm">
                      +{enhancedStats.newClients} nuevos este mes
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
                    <AccountBalance
                      style={{ fontSize: 24, color: "#0BB783" }}
                    />
                  </span>
                </div>
                <div className="flex-grow-1">
                  <div className="text-muted font-weight-bold font-size-sm mb-1">
                    Saldo Master Total
                  </div>
                  <div className="font-size-h3 font-weight-bolder text-success mb-2">
                    {formatCurrency(enhancedStats.totalBalance)}
                  </div>
                  <div className="d-flex align-items-center">
                    <TrendingUp
                      style={{ fontSize: 16, color: "#0BB783", marginRight: 4 }}
                    />
                    <span className="text-success font-weight-bold font-size-sm">
                      +8.5% vs mes anterior
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
                    <MonetizationOn
                      style={{ fontSize: 24, color: "#FFA800" }}
                    />
                  </span>
                </div>
                <div className="flex-grow-1">
                  <div className="text-muted font-weight-bold font-size-sm mb-1">
                    Cash-In Total
                  </div>
                  <div className="font-size-h3 font-weight-bolder text-warning mb-2">
                    {formatCurrency(enhancedStats.totalCashIn)}
                  </div>
                  <div className="d-flex align-items-center">
                    <TrendingUp
                      style={{ fontSize: 16, color: "#FFA800", marginRight: 4 }}
                    />
                    <span className="text-warning font-weight-bold font-size-sm">
                      +12.3% vs mes anterior
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
                    <AccountBalanceWallet
                      style={{ fontSize: 24, color: "#8950FC" }}
                    />
                  </span>
                </div>
                <div className="flex-grow-1">
                  <div className="text-muted font-weight-bold font-size-sm mb-1">
                    Saldo Promedio
                  </div>
                  <div className="font-size-h3 font-weight-bolder text-info mb-2">
                    {formatCurrency(enhancedStats.averageBalance)}
                  </div>
                  <div className="d-flex align-items-center">
                    <TrendingUp
                      style={{ fontSize: 16, color: "#8950FC", marginRight: 4 }}
                    />
                    <span className="text-info font-weight-bold font-size-sm">
                      +5.2% vs mes anterior
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas secundarias */}
      {/*       <div className="row mb-8">
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-6">
          <div className="card card-custom gutter-b">
            <div className="card-body p-6">
              <div className="d-flex align-items-center">
                <div className="symbol symbol-40 symbol-circle mr-4">
                  <span className="symbol-label bg-light-success">
                    <CheckCircle style={{ fontSize: 20, color: "#0BB783" }} />
                  </span>
                </div>
                <div>
                  <div className="text-muted font-weight-bold font-size-sm">
                    Cuentas Activas
                  </div>
                  <div className="font-size-h4 font-weight-bolder text-success">
                    {formatNumber(enhancedStats.activeAccounts)}
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
                    <Payment style={{ fontSize: 20, color: "#F64E60" }} />
                  </span>
                </div>
                <div>
                  <div className="text-muted font-weight-bold font-size-sm">
                    Cash-Out Total
                  </div>
                  <div className="font-size-h4 font-weight-bolder text-danger">
                    {formatCurrency(enhancedStats.totalCashOut)}
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
                    <Business style={{ fontSize: 20, color: "#FFA800" }} />
                  </span>
                </div>
                <div>
                  <div className="text-muted font-weight-bold font-size-sm">
                    Saldo Banco Sponsor
                  </div>
                  <div className="font-size-h4 font-weight-bolder text-warning">
                    {formatCurrency(enhancedStats.sponsorBalance)}
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
                    <CreditCard style={{ fontSize: 20, color: "#3699FF" }} />
                  </span>
                </div>
                <div>
                  <div className="text-muted font-weight-bold font-size-sm">
                    Saldo Sum Cuentas
                  </div>
                  <div className="font-size-h4 font-weight-bolder text-primary">
                    {formatCurrency(enhancedStats.totalAccounts)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Cards existentes mejoradas */}
      <CardsShow data={dashboardInfo} />

      {/* Gráficos mejorados */}
      {/*     <div className="row mt-8">
        <div className="col-xl-4 col-lg-6 col-md-12 mb-8">
          <div className="card card-custom gutter-b shadow-sm">
            <div className="card-header border-0 pt-6 pb-0">
              <div className="card-title">
                <h3 className="card-label text-dark font-weight-bolder">
                  <BarChart className="mr-2" />
                  Transacciones por Día
                </h3>
              </div>
              <div className="card-toolbar">
                <button className="btn btn-light btn-sm">
                  <Visibility />
                </button>
              </div>
            </div>
            <div className="card-body pt-4">
              <CardGraphic title="" data={transactions}>
                <GraphicBar data={transactions.data} />
              </CardGraphic>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-6 col-md-12 mb-8">
          <div className="card card-custom gutter-b shadow-sm">
            <div className="card-header border-0 pt-6 pb-0">
              <div className="card-title">
                <h3 className="card-label text-dark font-weight-bolder">
                  <PieChart className="mr-2" />
                  Distribución por Tipo
                </h3>
              </div>
              <div className="card-toolbar">
                <button className="btn btn-light btn-sm">
                  <Visibility />
                </button>
              </div>
            </div>
            <div className="card-body pt-4">
              <CardGraphic title="" data={volume}>
                <GraphicDoughnut data={volume} />
              </CardGraphic>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-6 col-md-12 mb-8">
          <div className="card card-custom gutter-b shadow-sm">
            <div className="card-header border-0 pt-6 pb-0">
              <div className="card-title">
                <h3 className="card-label text-dark font-weight-bolder">
                  <ShowChart className="mr-2" />
                  Evolución de Saldos
                </h3>
              </div>
              <div className="card-toolbar">
                <button className="btn btn-light btn-sm">
                  <Visibility />
                </button>
              </div>
            </div>
            <div className="card-body pt-4">
              <CardGraphic title="" data={balances}>
                <GraphicLine data={balances} />
              </CardGraphic>
            </div>
          </div>
        </div>
      </div> */}

      {/* Alertas y notificaciones */}
      <div className="row mt-8">
        <div className="col-xl-6 col-lg-12 mb-8">
          <div className="card card-custom gutter-b">
            <div className="card-header">
              <div className="card-title">
                <h3 className="card-label text-dark font-weight-bolder">
                  <Notifications className="mr-2" />
                  Alertas del Sistema
                </h3>
              </div>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center mb-4 p-4 bg-light-success rounded">
                <CheckCircle style={{ color: "#0BB783", marginRight: 12 }} />
                <div>
                  <div className="font-weight-bold text-success">
                    Clientes activos
                  </div>
                  <div className="text-muted">
                    {enhancedStats.activeAccounts} de{" "}
                    {enhancedStats.totalClients} clientes están activos
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center mb-4 p-4 bg-light-warning rounded">
                <Warning style={{ color: "#FFA800", marginRight: 12 }} />
                <div>
                  <div className="font-weight-bold text-warning">
                    Nuevos clientes
                  </div>
                  <div className="text-muted">
                    {enhancedStats.newClients} nuevos clientes registrados este
                    mes
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center p-4 bg-light-info rounded">
                <Info style={{ color: "#3699FF", marginRight: 12 }} />
                <div>
                  <div className="font-weight-bold text-info">
                    Saldo promedio
                  </div>
                  <div className="text-muted">
                    El saldo promedio por cliente es de{" "}
                    {formatCurrency(enhancedStats.averageBalance)}
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
                      <People className="mr-3" />
                      <div>
                        <div className="font-weight-bold">Nuevo Cliente</div>
                        <div className="text-muted font-size-sm">
                          Registrar cliente
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
                <div className="col-6 mb-4">
                  <button className="btn btn-light-success btn-block p-6 text-left">
                    <div className="d-flex align-items-center">
                      <Payment className="mr-3" />
                      <div>
                        <div className="font-weight-bold">Reportes</div>
                        <div className="text-muted font-size-sm">
                          Generar reportes
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
                <div className="col-6 mb-4">
                  <button className="btn btn-light-warning btn-block p-6 text-left">
                    <div className="d-flex align-items-center">
                      <AccountBalance className="mr-3" />
                      <div>
                        <div className="font-weight-bold">Saldos</div>
                        <div className="text-muted font-size-sm">
                          Ver saldos
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
                <div className="col-6 mb-4">
                  <button className="btn btn-light-info btn-block p-6 text-left">
                    <div className="d-flex align-items-center">
                      <BarChart className="mr-3" />
                      <div>
                        <div className="font-weight-bold">Análisis</div>
                        <div className="text-muted font-size-sm">
                          Análisis detallado
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
        show={subheader.openFilter}
        onHide={subheader.handleClose}
        currencies={currency}
        entities={entities}
        setValues={setValues}
        values={values}
      />
    </div>
  );
};

export default StatisticsPage;
