import {
  AccountBalance,
  AccountBalanceWallet,
  MonetizationOn,
  Receipt,
} from "@material-ui/icons";
import React from "react";
import modernAccountingMocks from "../__mocks__/modernAccountingMocks";
import ModernAlerts from "../components/ModernAlerts";
import ModernCardGraphic from "../components/ModernCardGraphic";
import ModernQuickActions from "../components/ModernQuickActions";
import ModernStatsCard from "../components/ModernStatsCard";
import ModernBarChart from "../Graphics/ModernBarChart";
import ModernDoughnutChart from "../Graphics/ModernDoughnutChart";
import ModernLineChart from "../Graphics/ModernLineChart";

const DashboardPage = () => {
  // Datos mock modernos
  const {
    mainStats,
    charts,
    secondaryStats,
    alerts,
    recentActivity,
  } = modernAccountingMocks;

  // Acciones rápidas (puedes conectar handlers reales si lo deseas)
  const handleRefresh = () => window.location.reload();
  const handleFilter = () => alert("Abrir filtros (demo)");
  const handleNewEntry = () => alert("Crear nuevo asiento (demo)");
  const handleReport = () => alert("Generar reporte (demo)");

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-8">
        <div>
          <h1 className="text-dark font-weight-bold my-1 fs-2hx">
            Dashboard Contable
          </h1>
          <div className="text-muted fs-6">
            Última actualización: {new Date().toLocaleString("es-AR")}
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <ModernQuickActions
        onRefresh={handleRefresh}
        onFilter={handleFilter}
        onNewEntry={handleNewEntry}
        onReport={handleReport}
      />

      {/* Métricas principales */}
      <ModernStatsCard stats={mainStats} />

      {/* Gráficos principales */}
      <div className="row mb-8">
        <div className="col-xl-4 col-lg-6 col-md-12 mb-8">
          <ModernCardGraphic
            title="Créditos por Día"
            data={charts.credits}
            icon={MonetizationOn}
            color="success"
          >
            <ModernBarChart
              data={charts.credits.data}
              color="#0BB783"
              height={250}
            />
          </ModernCardGraphic>
        </div>
        <div className="col-xl-4 col-lg-6 col-md-12 mb-8">
          <ModernCardGraphic
            title="Débitos por Día"
            data={charts.collections}
            icon={AccountBalanceWallet}
            color="danger"
          >
            <ModernBarChart
              data={charts.collections.data}
              color="#F64E60"
              height={250}
            />
          </ModernCardGraphic>
        </div>
        <div className="col-xl-4 col-lg-12 col-md-12 mb-8">
          <ModernCardGraphic
            title="Distribución Volumen"
            data={charts.volume}
            icon={AccountBalance}
            color="info"
          >
            <ModernDoughnutChart data={charts.volume} height={250} />
          </ModernCardGraphic>
        </div>
      </div>

      {/* Gráfico de evolución */}
      <div className="row mb-8">
        <div className="col-xl-12 col-lg-12 col-md-12 mb-8">
          <ModernCardGraphic
            title="Evolución de Créditos y Débitos"
            data={{ total: "", variation: 0 }}
            icon={Receipt}
            color="primary"
          >
            <ModernLineChart data={charts.evolution.data} height={300} />
          </ModernCardGraphic>
        </div>
      </div>

      {/* Alertas y actividad reciente */}
      <ModernAlerts alerts={alerts} recentActivity={recentActivity} />
    </div>
  );
};

export default DashboardPage;
