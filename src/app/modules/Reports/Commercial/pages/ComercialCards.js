import React from "react";
import usePrint from "../../../hooks/usePrint";

const CommercialCards = () => {
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
              Control comercial
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
        {/* Nuevas tarjetas emitidas (mes) */}
        <div className="col-md-4 mb-4 no-print">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Nuevas Tarjetas Emitidas (Mes)</h5>
              <p className="card-text display-4">3.250</p>
              <small>Objetivo mes: 4.000</small>
            </div>
          </div>
        </div>

        {/* % Tarjetas activas */}
        <div className="col-md-4 mb-4 no-print">
          <div className="card text-white bg-info">
            <div className="card-body">
              <h5 className="card-title">% Tarjetas Activas</h5>
              <p className="card-text display-4">68%</p>
              <small>Sobre 125.000 emitidas totales</small>
            </div>
          </div>
        </div>

        {/* % Tarjetas sin uso (muertas) */}
        <div className="col-md-4 mb-4 no-print">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <h5 className="card-title">% Tarjetas sin uso (Muertas)</h5>
              <p className="card-text display-4">14%</p>
              <small>Tarjetas emitidas sin ninguna transacción</small>
            </div>
          </div>
        </div>

        {/* % Uso recurrente */}
        <div className="col-md-4 mb-4 no-print">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">% Uso Recurrente</h5>
              <p className="card-text display-4">52%</p>
              <small>Tarjetas con más de 3 transacciones / mes</small>
            </div>
          </div>
        </div>

        {/* Revenue per card */}
        <div className="col-md-4 mb-4 no-print">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <h5 className="card-title">Revenue per Card (Mes)</h5>
              <p className="card-text display-4">$ 18,25</p>
              <small>Promedio mensual por tarjeta activa</small>
            </div>
          </div>
        </div>

        {/* % Mix de tarjetas */}
        <div className="col-md-4 mb-4 no-print">
          <div className="card text-white bg-dark">
            <div className="card-body">
              <h5 className="card-title">% Mix Tipo de Tarjeta</h5>
              <p className="card-text">Crédito: 60% / Prepaga: 40%</p>
              <small>Distribución actual de portfolio</small>
            </div>
          </div>
        </div>

        {/* Canal de adquisición */}
        <div className="col-md-12 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                Distribución por Canal de Adquisición (Mes)
              </h5>
            </div>

            <div className="card-body table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th>Canal</th>
                    <th>Cantidad</th>
                    <th>% sobre total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>App Móvil</td>
                    <td>1.800</td>
                    <td>55%</td>
                  </tr>
                  <tr>
                    <td>Web / Portal</td>
                    <td>750</td>
                    <td>23%</td>
                  </tr>
                  <tr>
                    <td>Convenios / Partners</td>
                    <td>400</td>
                    <td>12%</td>
                  </tr>
                  <tr>
                    <td>Presencial (sucursal / evento)</td>
                    <td>300</td>
                    <td>10%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="col-md-12">
          <div className="card-footer text-muted text-center">
            Control Comercial - Datos actualizados diariamente con las métricas
            de performance comercial.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommercialCards;
