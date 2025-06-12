import React from "react";
import usePrint from "../../../hooks/usePrint";

const Fraud = () => {
  const { handlePrint, printRef } = usePrint();
  return (
    <div className="container mt-5 " ref={printRef}>
      <div
        className="card-header border-0 py-5 d-flex justify-content-between align-items-center"
        style={{ marginBottom: "2rem" }}
      >
        <div>
          <h3 className="card-title align-items-start flex-column mb-1">
            <span className="card-label font-weight-bolder text-dark d-block">
              Control de fraude
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
        {/* % Fraude hoy */}
        <div className="col-md-4 mb-4 no-print">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <h5 className="card-title">% de Fraude (hoy)</h5>
              <p className="card-text display-4">0.18%</p>
              <small>Objetivo: &lt; 0.30%</small>
            </div>
          </div>
        </div>

        {/* % Fraude mensual */}
        <div className="col-md-4 mb-4 no-print">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <h5 className="card-title">% de Fraude (mes actual)</h5>
              <p className="card-text display-4">0.22%</p>
              <small>Objetivo: &lt; 0.25%</small>
            </div>
          </div>
        </div>

        {/* Alertas antifraude (día) */}
        <div className="col-md-4 mb-4 no-print">
          <div className="card text-white bg-info">
            <div className="card-body">
              <h5 className="card-title">Alertas de Antifraude (hoy)</h5>
              <p className="card-text display-4">87</p>
              <small>Transacciones en revisión</small>
            </div>
          </div>
        </div>

        {/* Rechazos por antifraude */}
        <div className="col-md-4 mb-4 no-print">
          <div className="card text-white bg-dark">
            <div className="card-body">
              <h5 className="card-title">Transacciones Rechazadas (hoy)</h5>
              <p className="card-text display-4">42</p>
              <small>Por reglas automáticas de antifraude</small>
            </div>
          </div>
        </div>

        {/* False positive */}
        <div className="col-md-4 mb-4 no-print">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">False Positive (hoy)</h5>
              <p className="card-text display-4">5</p>
              <small>Transacciones legítimas rechazadas</small>
            </div>
          </div>
        </div>

        {/* Breakdown por tipo de transacción */}
        <div className="col-md-12 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                Fraude por Tipo de Transacción (mes actual)
              </h5>
            </div>

            <div className="card-body table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th>Tipo de Transacción</th>
                    <th>% de Fraude</th>
                    <th>Transacciones Totales</th>
                    <th>Transacciones Fraudulentas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Crédito 1 pago</td>
                    <td>0.15%</td>
                    <td>85.000</td>
                    <td>127</td>
                  </tr>
                  <tr>
                    <td>Crédito Cuotas</td>
                    <td>0.22%</td>
                    <td>55.000</td>
                    <td>121</td>
                  </tr>
                  <tr>
                    <td>Prepaga POS</td>
                    <td>0.10%</td>
                    <td>32.000</td>
                    <td>32</td>
                  </tr>
                  <tr>
                    <td>Crossborder / Internacional</td>
                    <td>0.38%</td>
                    <td>12.500</td>
                    <td>48</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Ranking de comercios con fraude */}
        <div className="col-md-12 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-danger text-white">
              <h5 className="mb-0">Top Comercios con Fraude (mes actual)</h5>
            </div>

            <div className="card-body table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th>Comercio</th>
                    <th>Cantidad de transacciones fraudulentas</th>
                    <th>Fraude / Total comercio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>XYZ Market Online</td>
                    <td>37</td>
                    <td>3.2%</td>
                  </tr>
                  <tr>
                    <td>ABC Tech Store</td>
                    <td>25</td>
                    <td>2.8%</td>
                  </tr>
                  <tr>
                    <td>GamingStore123</td>
                    <td>19</td>
                    <td>2.5%</td>
                  </tr>
                  <tr>
                    <td>TravelTickets Intl</td>
                    <td>15</td>
                    <td>1.9%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="col-md-12">
          <div className="card-footer text-muted text-center">
            Control de Fraude - Indicadores actualizados cada 15 minutos con
            información de la plataforma antifraude.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fraud;
