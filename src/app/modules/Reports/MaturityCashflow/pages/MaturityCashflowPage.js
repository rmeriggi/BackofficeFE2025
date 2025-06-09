import React from "react";
import usePrint from "../../hooks/usePrint";

const MaturityCashflow = () => {
  const { printRef, handlePrint } = usePrint();

  return (
    <div className="container-fluid mt-5" ref={printRef}>
      <div
        className="card-header border-0 py-5 d-flex justify-content-between align-items-center"
        style={{ marginBottom: "2rem" }}
      >
        <div>
          <h3 className="card-title align-items-start flex-column mb-1">
            <span className="card-label font-weight-bolder text-dark d-block">
              Reporte de Flujo de Vencimientos y Cobros
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

      {/* Tarjeta con los datos */}
      <div className="card card-custom gutter-b shadow-sm">
        <div className="card-body">
          {/* Flujo de la Semana */}
          <h5 className="text-primary font-weight-bold mt-4 mb-3">
            Flujo de Cobros - Semana Actual
          </h5>
          <table className="table table-bordered table-hover table-sm">
            <tbody>
              <tr>
                <td className="font-weight-bold">Total a Cobrar Esta Semana</td>
                <td>$8.750.000</td>
              </tr>
              <tr>
                <td className="font-weight-bold">
                  Total Efectivamente Cobrado
                </td>
                <td>$7.600.000</td>
              </tr>
              <tr>
                <td className="font-weight-bold">% de Efectividad de Cobro</td>
                <td>86.8%</td>
              </tr>
            </tbody>
          </table>

          {/* Clientes con pago parcial */}
          <h5 className="text-primary font-weight-bold mt-5 mb-3">
            Clientes con Pago Parcial
          </h5>
          <table className="table table-bordered table-hover table-sm">
            <thead className="thead-light">
              <tr>
                <th>Cliente</th>
                <th>Monto Pendiente</th>
                <th>% Pagado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Juan Pérez</td>
                <td>$25.000</td>
                <td>60%</td>
              </tr>
              <tr>
                <td>María Gómez</td>
                <td>$18.000</td>
                <td>75%</td>
              </tr>
              <tr>
                <td>Carlos López</td>
                <td>$30.000</td>
                <td>50%</td>
              </tr>
            </tbody>
          </table>

          {/* Reintentos Programados */}
          <h5 className="text-primary font-weight-bold mt-5 mb-3">
            Reintentos Programados
          </h5>
          <table className="table table-bordered table-hover table-sm">
            <thead className="thead-light">
              <tr>
                <th>Día</th>
                <th>Cantidad de Reintentos</th>
                <th>Monto Estimado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lunes</td>
                <td>120</td>
                <td>$320.000</td>
              </tr>
              <tr>
                <td>Miércoles</td>
                <td>95</td>
                <td>$250.000</td>
              </tr>
              <tr>
                <td>Viernes</td>
                <td>80</td>
                <td>$210.000</td>
              </tr>
            </tbody>
          </table>

          {/* Proyección Mensual */}
          <h5 className="text-primary font-weight-bold mt-5 mb-3">
            Proyección de Cobro - Mes Actual
          </h5>
          <table className="table table-bordered table-hover table-sm">
            <tbody>
              <tr>
                <td className="font-weight-bold">Proyección de Cobro Mes</td>
                <td>$34.200.000</td>
              </tr>
              <tr>
                <td className="font-weight-bold">% Avance Actual</td>
                <td>72%</td>
              </tr>
            </tbody>
          </table>

          {/* Saldo en Mora Proyectada */}
          <h5 className="text-primary font-weight-bold mt-5 mb-3">
            Saldo en Mora Proyectada
          </h5>
          <table className="table table-bordered table-sm">
            <tbody>
              <tr>
                <td className="font-weight-bold">Saldo en Mora Proyectada</td>
                <td>$3.200.000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MaturityCashflow;
