import React from "react";
import usePrint from "../../../hooks/usePrint";
import "../css/kpi.modules.scss";
const KPIReports = () => {
  const { printRef, handlePrint } = usePrint();

  return (
    <div className="container-fluid py-4" ref={printRef}>
      <div
        className="card-header border-0 py-5 d-flex justify-content-between align-items-center"
        style={{ marginBottom: "2rem" }}
      >
        <div>
          <h3 className="card-title align-items-start flex-column mb-1">
            <span className="card-label font-weight-bolder text-dark d-block">
              Reporte de Créditos
            </span>
          </h3>
          <span className="text-muted font-weight-bold font-size-sm">
            Actualizado al 09/06/2025
          </span>
        </div>

        <div>
          <button className="btn btn-primary no-print" onClick={handlePrint}>
            Imprimir
          </button>
        </div>
      </div>

      {/* Contenido imprimible */}
      <div>
        <div className="row">
          {/* Cartera Total Activa */}
          <div className="col-md-4 col-sm-6 mb-4">
            <div className="card h-100 shadow-md card-animated">
              <div className="card-body text-center">
                <h6 className="text-muted mb-3">Cartera Total Activa</h6>
                <h2 style={{ color: "#003366" }}>$120.500.000</h2>
                <small className="text-muted">Monto vigente</small>
              </div>
            </div>
          </div>

          {/* Mora Total (NPL) */}
          <div className="col-md-4 col-sm-6 mb-4">
            <div className="card h-100 shadow-md card-animated">
              <div className="card-body text-center">
                <h6 className="text-muted mb-3">Mora Total (NPL)</h6>
                <h2 style={{ color: "#003366" }}>4.2%</h2>
                <small className="text-muted">% sobre cartera</small>
              </div>
            </div>
          </div>

          {/* Recupero Último Mes */}
          <div className="col-md-4 col-sm-6 mb-4">
            <div className="card h-100 shadow-md card-animated">
              <div className="card-body text-center">
                <h6 className="text-muted mb-3">Recupero Último Mes</h6>
                <h2 style={{ color: "#003366" }}>78%</h2>
                <small className="text-muted">Deudas recuperadas</small>
              </div>
            </div>
          </div>

          {/* Rentabilidad Bruta */}
          <div className="col-md-4 col-sm-6 mb-4">
            <div className="card h-100 shadow-md card-animated">
              <div className="card-body text-center">
                <h6 className="text-muted mb-3">Rentabilidad Bruta</h6>
                <h2 style={{ color: "#003366" }}>22.8%</h2>
                <small className="text-muted">Últimos 12 meses</small>
              </div>
            </div>
          </div>

          {/* Flujo de Cobros Próx. Semana */}
          <div className="col-md-4 col-sm-6 mb-4">
            <div className="card h-100 shadow-md card-animated">
              <div className="card-body text-center">
                <h6 className="text-muted mb-3">
                  Flujo de Cobros Próx. Semana
                </h6>
                <h2 style={{ color: "#003366" }}>$8.750.000</h2>
                <small className="text-muted">Proyección próxima semana</small>
              </div>
            </div>
          </div>

          {/* Clientes Activos */}
          <div className="col-md-4 col-sm-6 mb-4">
            <div className="card h-100 shadow-md card-animated">
              <div className="card-body text-center">
                <h6 className="text-muted mb-3">Clientes Activos</h6>
                <h2 style={{ color: "#003366" }}>3.250</h2>
                <small className="text-muted">Con crédito vigente</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPIReports;
