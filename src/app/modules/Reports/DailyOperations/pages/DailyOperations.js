import React from "react";
import usePrint from "../../../hooks/usePrint";

const DailyOperations = () => {
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
              Control operativo diario
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
        {/* Ingreso neto hoy */}
        <div className="col-md-4 mb-4 no-print">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Ingreso neto de Interchange (hoy)</h5>
              <p className="card-text display-4">$ 152.430,25</p>
              <small>Clearing recibido hoy</small>
            </div>
          </div>
        </div>

        {/* Total de transacciones */}
        <div className="col-md-4 mb-4 no-print">
          <div className="card text-white bg-info">
            <div className="card-body">
              <h5 className="card-title">Total de Transacciones (hoy)</h5>
              <p className="card-text display-4">5.320</p>
              <small>POS + E-commerce + Crossborder</small>
            </div>
          </div>
        </div>

        {/* Chargebacks / Reversos hoy */}
        <div className="col-md-4 mb-4 no-print">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <h5 className="card-title">Reversos / Contracargos (hoy)</h5>
              <p className="card-text display-4">15</p>
              <small>Objetivo: &lt; 1% sobre transacciones</small>
            </div>
          </div>
        </div>

        {/* % Fraude hoy */}
        <div className="col-md-4 mb-4 no-print">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <h5 className="card-title">% de Fraude (hoy)</h5>
              <p className="card-text display-4">0.25%</p>
              <small>Target: &lt; 0.3%</small>
            </div>
          </div>
        </div>

        {/* Breakdown por tipo de transacción */}
        <div className="col-md-12 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Detalle por Tipo de Transacción (hoy)</h5>
            </div>

            <div className="card-body table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th>Tipo de Transacción</th>
                    <th>Cantidad</th>
                    <th>Monto Bruto</th>
                    <th>Interchange Recibido</th>
                    <th>Reversos</th>
                    <th>% de Fraude</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Crédito 1 pago</td>
                    <td>2.100</td>
                    <td>$ 4.500.000,00</td>
                    <td>$ 90.000,00</td>
                    <td>5</td>
                    <td>0.15%</td>
                  </tr>
                  <tr>
                    <td>Crédito Cuotas</td>
                    <td>1.100</td>
                    <td>$ 3.200.000,00</td>
                    <td>$ 96.000,00</td>
                    <td>3</td>
                    <td>0.20%</td>
                  </tr>
                  <tr>
                    <td>Prepaga POS</td>
                    <td>1.500</td>
                    <td>$ 1.800.000,00</td>
                    <td>$ 18.000,00</td>
                    <td>2</td>
                    <td>0.10%</td>
                  </tr>
                  <tr>
                    <td>Crossborder / Internacional</td>
                    <td>620</td>
                    <td>$ 2.100.000,00</td>
                    <td>$ 105.000,00</td>
                    <td>5</td>
                    <td>0.35%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="col-md-12">
          <div className="card-footer text-muted text-center">
            Control Operativo Diario generado automáticamente a partir del
            clearing diario de Prisma.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyOperations;
