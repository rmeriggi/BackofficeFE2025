import React from "react";

const CreditsCrossPage = () => {
  return (
    <div className="container-fluid mt-5">
      <div className="card card-custom shadow-sm">
        <div className="card-header">
          <h3 className="card-title">Reporte de Recurrentes / Cross-Selling</h3>
          <div className="card-toolbar text-muted font-size-sm">
            Actualizado al 09/06/2025
          </div>
        </div>

        <div className="card-body">
          {/* Recurrentes */}
          <h5 className="text-primary font-weight-bold mb-4">
            Clientes Recurrentes
          </h5>
          <table className="table table-bordered table-hover table-sm">
            <tbody>
              <tr>
                <td className="font-weight-bold">
                  Clientes con más de 1 crédito
                </td>
                <td>1.200</td>
              </tr>
              <tr>
                <td className="font-weight-bold">% sobre total de clientes</td>
                <td>38%</td>
              </tr>
              <tr>
                <td className="font-weight-bold">
                  Tiempo promedio entre créditos
                </td>
                <td>8.5 meses</td>
              </tr>
              <tr>
                <td className="font-weight-bold">
                  Ticket promedio de recurrentes
                </td>
                <td>$95.000</td>
              </tr>
            </tbody>
          </table>

          {/* Cross-selling */}
          <h5 className="text-primary font-weight-bold mt-5 mb-3">
            Cross-Selling: Uso combinado de productos
          </h5>
          <table className="table table-bordered table-hover table-sm">
            <thead className="thead-light">
              <tr>
                <th>Producto combinado</th>
                <th>% de recurrentes que lo usan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Billetera Digital</td>
                <td>72%</td>
              </tr>
              <tr>
                <td>Tarjeta Prepaga</td>
                <td>41%</td>
              </tr>
              <tr>
                <td>Pago de servicios</td>
                <td>66%</td>
              </tr>
              <tr>
                <td>Inversiones / fondos</td>
                <td>18%</td>
              </tr>
            </tbody>
          </table>

          {/* Comportamiento */}
          <h5 className="text-primary font-weight-bold mt-5 mb-3">
            Comportamiento de Recurrentes
          </h5>
          <table className="table table-bordered table-hover table-sm">
            <thead className="thead-light">
              <tr>
                <th>Tramo de Score</th>
                <th>% de recurrentes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>80 - 100</td>
                <td>55%</td>
              </tr>
              <tr>
                <td>60 - 80</td>
                <td>30%</td>
              </tr>
              <tr>
                <td>40 - 60</td>
                <td>12%</td>
              </tr>
              <tr>
                <td>&lt; 40</td>
                <td>3%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreditsCrossPage;
