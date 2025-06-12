import React from "react";
import usePrint from "../../../hooks/usePrint";

const Interchange = () => {
  const { handlePrint, printRef } = usePrint();
  return (
    <div className="container mt-5" ref={printRef}>
      <div
        className="card-header border-0 py-5 d-flex justify-content-between align-items-center"
        style={{ marginBottom: "2rem" }}
      >
        <div>
          <h3 className="card-title align-items-start flex-column mb-1">
            <span className="card-label font-weight-bolder text-dark d-block">
              Dashboard de interchange para emisor
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
      <div className="row">
        {/* Ingreso neto */}
        <div className="col-md-4 mb-4">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Ingreso neto de Interchange</h5>
              <p className="card-text display-4">$ 1.254.320,50</p>
              <small>Últimos 30 días</small>
            </div>
          </div>
        </div>

        {/* Tarjetas activas */}
        <div className="col-md-4 mb-4">
          <div className="card text-white bg-info">
            <div className="card-body">
              <h5 className="card-title">% Tarjetas Activas</h5>
              <p className="card-text display-4">72%</p>
              <small>Sobre 12.000 emitidas</small>
            </div>
          </div>
        </div>

        {/* Uso recurrente */}
        <div className="col-md-4 mb-4">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">% Uso Recurrente</h5>
              <p className="card-text display-4">58%</p>
              <small>Tarjetas con {">"} 3 transacciones/mes</small>
            </div>
          </div>
        </div>

        {/* % Cuotas */}
        <div className="col-md-4 mb-4">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <h5 className="card-title">% Transacciones en Cuotas</h5>
              <p className="card-text display-4">38%</p>
              <small>Más cuotas → más interchange</small>
            </div>
          </div>
        </div>

        {/* % Reversos */}
        <div className="col-md-4 mb-4">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <h5 className="card-title">% Reversos / Contracargos</h5>
              <p className="card-text display-4">1.2%</p>
              <small>Objetivo: {"<"} 1.5%</small>
            </div>
          </div>
        </div>

        {/* Revenue per Active Card */}
        <div className="col-md-4 mb-4">
          <div className="card text-white bg-dark">
            <div className="card-body">
              <h5 className="card-title">Revenue per Active Card (RAC)</h5>
              <p className="card-text display-4">$ 28,50</p>
              <small>Últimos 30 días</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interchange;
