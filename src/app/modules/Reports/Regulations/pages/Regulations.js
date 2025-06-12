import React from "react";
import usePrint from "../../../hooks/usePrint";

const Regulations = () => {
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
              Control regulatorio
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
        {/* Presentaciones BCRA */}
        <div className="col-md-4 mb-4">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">Presentaciones BCRA (último mes)</h5>
              <p className="card-text display-4">100%</p>
              <small>Estado: Presentadas en tiempo y forma</small>
            </div>
          </div>
        </div>

        {/* Presentaciones UIF */}
        <div className="col-md-4 mb-4">
          <div className="card text-white bg-info">
            <div className="card-body">
              <h5 className="card-title">Reportes UIF</h5>
              <p style={{ fontSize: "20px" }} className="card-text">
                ROS: 2 / Sistémicos: OK
              </p>
              <small>Estado actual: Sin pendientes críticos</small>
            </div>
          </div>
        </div>

        {/* % Reversos sobre transacciones */}
        <div className="col-md-4 mb-4">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <h5 className="card-title">% Reversos sobre Transacciones</h5>
              <p className="card-text display-4">0.85%</p>
              <small>Objetivo marca: &lt; 1%</small>
            </div>
          </div>
        </div>

        {/* % Clientes con KYC completo */}
        <div className="col-md-4 mb-4">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">% Clientes con KYC Completo</h5>
              <p className="card-text display-4">98.7%</p>
              <small>Meta interna: &gt; 98%</small>
            </div>
          </div>
        </div>

        {/* Cumplimiento límites cash-in / cash-out */}
        <div className="col-md-4 mb-4">
          <div className="card text-white bg-dark">
            <div className="card-body">
              <h5 className="card-title">Cumplimiento límites cash in/out</h5>
              <p className="card-text display-4">OK</p>
              <small>Sin excesos en clientes individuales</small>
            </div>
          </div>
        </div>

        {/* Estado de auditorías */}
        <div className="col-md-4 mb-4">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <h5 className="card-title">Estado Auditorías</h5>
              <p className="card-text display-4">1 en proceso</p>
              <small>Auditoría externa anual en curso</small>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="col-md-12">
          <div className="card-footer text-muted text-center">
            Control Regulatorio - Indicadores actualizados semanalmente para
            reporte a Dirección / Auditoría / Cumplimiento.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Regulations;
