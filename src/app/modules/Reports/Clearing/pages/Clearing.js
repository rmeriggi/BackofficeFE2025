import React from "react";
import usePrint from "../../../hooks/usePrint";

const Clearing = () => {
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
              Clearing
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
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Reporte Diario de Clearing</h4>
          <small>Período: 01/06/2025 - 07/06/2025</small>
        </div>

        <div className="card-body table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-light">
              <tr>
                <th>Fecha</th>
                <th>Tipo de Transacción</th>
                <th>Cantidad</th>
                <th>Monto Bruto</th>
                <th>Interchange recibido</th>
                <th>Reversos</th>
                <th>Neto a Liquidar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>01/06/2025</td>
                <td>Crédito 1 pago</td>
                <td>3.200</td>
                <td>$ 5.600.000,00</td>
                <td>$ 112.000,00</td>
                <td>$ -8.000,00</td>
                <td>$ 104.000,00</td>
              </tr>
              <tr>
                <td>02/06/2025</td>
                <td>Crédito Cuotas</td>
                <td>1.100</td>
                <td>$ 4.200.000,00</td>
                <td>$ 126.000,00</td>
                <td>$ -4.500,00</td>
                <td>$ 121.500,00</td>
              </tr>
              <tr>
                <td>03/06/2025</td>
                <td>Prepaga POS</td>
                <td>1.800</td>
                <td>$ 1.500.000,00</td>
                <td>$ 15.000,00</td>
                <td>$ -2.000,00</td>
                <td>$ 13.000,00</td>
              </tr>
              <tr>
                <td>04/06/2025</td>
                <td>Internacional</td>
                <td>520</td>
                <td>$ 3.800.000,00</td>
                <td>$ 190.000,00</td>
                <td>$ -6.000,00</td>
                <td>$ 184.000,00</td>
              </tr>
              <tr>
                <td>05/06/2025</td>
                <td>Crédito 1 pago</td>
                <td>2.900</td>
                <td>$ 5.100.000,00</td>
                <td>$ 102.000,00</td>
                <td>$ -5.000,00</td>
                <td>$ 97.000,00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card-footer text-muted text-center">
          Datos generados automáticamente por conciliación del clearing diario
          de Prisma.
        </div>
      </div>
    </div>
  );
};

export default Clearing;
