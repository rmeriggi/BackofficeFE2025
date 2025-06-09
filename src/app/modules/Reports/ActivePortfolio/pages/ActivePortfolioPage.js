import React from "react";

const ActivePortfolioPage = () => {
  return (
    <div className="container-fluid mt-5">
      <div className="card card-custom gutter-b shadow-sm">
        <div className="card-header">
          <h3 className="card-title">Reporte de Cartera Activa</h3>
          <div className="card-toolbar text-muted font-size-sm">
            Actualizado al 09/06/2025
          </div>
        </div>

        <div className="card-body">
          {/* Resumen General */}
          <h5 className="text-primary font-weight-bold mt-4 mb-3">
            Resumen General
          </h5>
          <table className="table table-bordered table-hover table-sm">
            <tbody>
              <tr>
                <td className="font-weight-bold">Total de Créditos Activos</td>
                <td>$120.500.000</td>
              </tr>
              <tr>
                <td className="font-weight-bold">Cantidad de Créditos</td>
                <td>3.250</td>
              </tr>
              <tr>
                <td className="font-weight-bold">Monto Promedio por Crédito</td>
                <td>$37.077</td>
              </tr>
              <tr>
                <td className="font-weight-bold">Total de Cuotas Pendientes</td>
                <td>$65.800.000</td>
              </tr>
              <tr>
                <td className="font-weight-bold">
                  Ingreso Proyectado por Intereses
                </td>
                <td>$18.400.000</td>
              </tr>
            </tbody>
          </table>

          {/* Distribución por Producto */}
          <h5 className="text-primary font-weight-bold mt-5 mb-3">
            Distribución por Producto
          </h5>
          <table className="table table-bordered table-hover table-sm">
            <thead className="thead-light">
              <tr>
                <th>Producto</th>
                <th>Monto Total</th>
                <th>% de la Cartera</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Crédito Personal</td>
                <td>$75.000.000</td>
                <td>62%</td>
              </tr>
              <tr>
                <td>Crédito Prendario</td>
                <td>$25.000.000</td>
                <td>21%</td>
              </tr>
              <tr>
                <td>Crédito Productivo</td>
                <td>$15.000.000</td>
                <td>12%</td>
              </tr>
              <tr>
                <td>Microcrédito</td>
                <td>$5.500.000</td>
                <td>5%</td>
              </tr>
            </tbody>
          </table>

          {/* Distribución por Score */}
          <h5 className="text-primary font-weight-bold mt-5 mb-3">
            Distribución por Score (Riesgo)
          </h5>
          <table className="table table-bordered table-hover table-sm">
            <thead className="thead-light">
              <tr>
                <th>Tramo de Score</th>
                <th>Cantidad de Créditos</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>80 - 100 (Bajo Riesgo)</td>
                <td>1.500</td>
                <td>46%</td>
              </tr>
              <tr>
                <td>60 - 80 (Riesgo Medio)</td>
                <td>1.200</td>
                <td>37%</td>
              </tr>
              <tr>
                <td>40 - 60 (Riesgo Alto)</td>
                <td>400</td>
                <td>12%</td>
              </tr>
              <tr>
                <td>&lt; 40 (Muy Alto Riesgo)</td>
                <td>150</td>
                <td>5%</td>
              </tr>
            </tbody>
          </table>

          {/* Distribución por Plazo */}
          <h5 className="text-primary font-weight-bold mt-5 mb-3">
            Distribución por Plazo
          </h5>
          <table className="table table-bordered table-hover table-sm">
            <thead className="thead-light">
              <tr>
                <th>Plazo</th>
                <th>Cantidad de Créditos</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>3 - 6 meses</td>
                <td>500</td>
                <td>15%</td>
              </tr>
              <tr>
                <td>7 - 12 meses</td>
                <td>1.200</td>
                <td>37%</td>
              </tr>
              <tr>
                <td>13 - 24 meses</td>
                <td>1.000</td>
                <td>31%</td>
              </tr>
              <tr>
                <td>Más de 24 meses</td>
                <td>550</td>
                <td>17%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActivePortfolioPage;
