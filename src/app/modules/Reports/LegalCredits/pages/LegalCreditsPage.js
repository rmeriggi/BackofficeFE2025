import React from "react";

const LegalCreditsPage = () => {
  return (
    <div className="container-fluid mt-5">
      <div className="card card-custom shadow-sm">
        <div className="card-header">
          <h3 className="card-title">Reporte Legal / Judicial</h3>
          <div className="card-toolbar text-muted font-size-sm">
            Actualizado al 09/06/2025
          </div>
        </div>

        <div className="card-body">
          {/* Créditos en gestión judicial */}
          <h5 className="text-primary font-weight-bold mb-4">
            Créditos en Gestión Judicial
          </h5>
          <table className="table table-bordered table-hover table-sm">
            <tbody>
              <tr>
                <td className="font-weight-bold">Cantidad de Créditos</td>
                <td>420</td>
              </tr>
              <tr>
                <td className="font-weight-bold">Monto Total en Juicio</td>
                <td>$12.500.000</td>
              </tr>
            </tbody>
          </table>

          {/* Estado del proceso */}
          <h5 className="text-primary font-weight-bold mt-5 mb-3">
            Estado del Proceso Judicial
          </h5>
          <table className="table table-bordered table-hover table-sm">
            <thead className="thead-light">
              <tr>
                <th>Estado</th>
                <th>Cantidad de Créditos</th>
                <th>% sobre total judicializado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mediación</td>
                <td>150</td>
                <td>35.7%</td>
              </tr>
              <tr>
                <td>Demanda Iniciada</td>
                <td>180</td>
                <td>42.9%</td>
              </tr>
              <tr>
                <td>Sentencia</td>
                <td>60</td>
                <td>14.3%</td>
              </tr>
              <tr>
                <td>Cobro en curso</td>
                <td>30</td>
                <td>7.1%</td>
              </tr>
            </tbody>
          </table>

          {/* Antigüedad promedio */}
          <h5 className="text-primary font-weight-bold mt-5 mb-3">
            Antigüedad Promedio en Juicio
          </h5>
          <table className="table table-bordered table-sm">
            <tbody>
              <tr>
                <td className="font-weight-bold">Antigüedad Promedio</td>
                <td>9.5 meses</td>
              </tr>
            </tbody>
          </table>

          {/* Honorarios estimados */}
          <h5 className="text-primary font-weight-bold mt-5 mb-3">
            Honorarios Estimados
          </h5>
          <table className="table table-bordered table-sm">
            <tbody>
              <tr>
                <td className="font-weight-bold">
                  Monto Estimado en Honorarios
                </td>
                <td>$1.250.000</td>
              </tr>
            </tbody>
          </table>

          {/* % de recupero judicial */}
          <h5 className="text-primary font-weight-bold mt-5 mb-3">
            % de Recupero Judicial
          </h5>
          <table className="table table-bordered table-sm">
            <tbody>
              <tr>
                <td className="font-weight-bold">
                  % Recupero sobre lo demandado
                </td>
                <td>18.6%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LegalCreditsPage;
