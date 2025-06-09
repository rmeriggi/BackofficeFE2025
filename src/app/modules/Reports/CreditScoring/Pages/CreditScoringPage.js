import React from "react";

const ReporteScoringCalificacion = () => {
  return (
    <div className="container-fluid mt-5">
      <div className="card card-custom gutter-b shadow-sm">
        <div className="card-header">
          <h3 className="card-title">
            Reporte de Scoring y Calificación Crediticia
          </h3>
          <div className="card-toolbar text-muted font-size-sm">
            Actualizado al 09/06/2025
          </div>
        </div>

        <div className="card-body">
          {/* Distribución por Score */}
          <h5 className="text-primary font-weight-bold mt-4 mb-3">
            Distribución por Score
          </h5>
          <table className="table table-bordered table-hover table-sm">
            <thead className="thead-light">
              <tr>
                <th>Tramo de Score</th>
                <th>Cantidad de Clientes</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>80 - 100 (Bajo Riesgo)</td>
                <td>1.800</td>
                <td>48%</td>
              </tr>
              <tr>
                <td>60 - 80 (Riesgo Medio)</td>
                <td>1.200</td>
                <td>32%</td>
              </tr>
              <tr>
                <td>40 - 60 (Riesgo Alto)</td>
                <td>500</td>
                <td>13%</td>
              </tr>
              <tr>
                <td>&lt; 40 (Muy Alto Riesgo)</td>
                <td>200</td>
                <td>7%</td>
              </tr>
            </tbody>
          </table>

          {/* Monto otorgado por Score */}
          <h5 className="text-primary font-weight-bold mt-5 mb-3">
            Monto Otorgado por Score
          </h5>
          <table className="table table-bordered table-hover table-sm">
            <thead className="thead-light">
              <tr>
                <th>Tramo de Score</th>
                <th>Monto Total Otorgado</th>
                <th>% sobre total cartera</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>80 - 100</td>
                <td>$85.000.000</td>
                <td>61%</td>
              </tr>
              <tr>
                <td>60 - 80</td>
                <td>$35.000.000</td>
                <td>25%</td>
              </tr>
              <tr>
                <td>40 - 60</td>
                <td>$12.000.000</td>
                <td>9%</td>
              </tr>
              <tr>
                <td>&lt; 40</td>
                <td>$7.000.000</td>
                <td>5%</td>
              </tr>
            </tbody>
          </table>

          {/* Morosidad por Score */}
          <h5 className="text-primary font-weight-bold mt-5 mb-3">
            Morosidad por Score
          </h5>
          <table className="table table-bordered table-hover table-sm">
            <thead className="thead-light">
              <tr>
                <th>Tramo de Score</th>
                <th>NPL (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>80 - 100</td>
                <td>2.1%</td>
              </tr>
              <tr>
                <td>60 - 80</td>
                <td>5.3%</td>
              </tr>
              <tr>
                <td>40 - 60</td>
                <td>9.8%</td>
              </tr>
              <tr>
                <td>&lt; 40</td>
                <td>15.6%</td>
              </tr>
            </tbody>
          </table>

          {/* Score promedio mensual */}
          <h5 className="text-primary font-weight-bold mt-5 mb-3">
            Score Promedio - Últimos 6 Meses
          </h5>
          <table className="table table-bordered table-hover table-sm">
            <thead className="thead-light">
              <tr>
                <th>Mes</th>
                <th>Score Promedio</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Junio 2025</td>
                <td>75</td>
              </tr>
              <tr>
                <td>Mayo 2025</td>
                <td>74</td>
              </tr>
              <tr>
                <td>Abril 2025</td>
                <td>76</td>
              </tr>
              <tr>
                <td>Marzo 2025</td>
                <td>73</td>
              </tr>
              <tr>
                <td>Febrero 2025</td>
                <td>72</td>
              </tr>
              <tr>
                <td>Enero 2025</td>
                <td>70</td>
              </tr>
            </tbody>
          </table>

          {/* % Rechazados por Score */}
          <h5 className="text-primary font-weight-bold mt-5 mb-3">
            % de Rechazos por Score
          </h5>
          <table className="table table-bordered table-hover table-sm">
            <thead className="thead-light">
              <tr>
                <th>Tramo de Score</th>
                <th>% de Rechazos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>80 - 100</td>
                <td>1%</td>
              </tr>
              <tr>
                <td>60 - 80</td>
                <td>3%</td>
              </tr>
              <tr>
                <td>40 - 60</td>
                <td>15%</td>
              </tr>
              <tr>
                <td>&lt; 40</td>
                <td>60%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReporteScoringCalificacion;
