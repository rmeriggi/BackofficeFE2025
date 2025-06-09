import React from "react";

const ComplianceMonitoringPage = () => {
  return (
    <div className="container-fluid mt-5">
      <div className="card card-custom shadow-sm">
        <div className="card-header">
          <h3 className="card-title">Reporte Regulatorio / de Compliance</h3>
          <div className="card-toolbar text-muted font-size-sm">
            Actualizado al 09/06/2025
          </div>
        </div>

        <div className="card-body">
          {/* Créditos por tipo de cliente */}
          <h5 className="text-primary font-weight-bold mb-4">
            Créditos por Tipo de Cliente
          </h5>
          <table className="table table-bordered table-hover table-sm">
            <thead className="thead-light">
              <tr>
                <th>Tipo de Cliente</th>
                <th>Cantidad de Créditos</th>
                <th>Monto Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Personas Físicas</td>
                <td>3.500</td>
                <td>$95.000.000</td>
              </tr>
              <tr>
                <td>Personas Jurídicas (Pymes)</td>
                <td>600</td>
                <td>$45.000.000</td>
              </tr>
              <tr>
                <td>Personas Jurídicas (Grandes Empresas)</td>
                <td>50</td>
                <td>$18.000.000</td>
              </tr>
            </tbody>
          </table>

          {/* Créditos por región */}
          <h5 className="text-primary font-weight-bold mt-5 mb-3">
            Créditos por Región
          </h5>
          <table className="table table-bordered table-hover table-sm">
            <thead className="thead-light">
              <tr>
                <th>Región</th>
                <th>Cantidad de Créditos</th>
                <th>Monto Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CABA</td>
                <td>1.800</td>
                <td>$58.000.000</td>
              </tr>
              <tr>
                <td>GBA</td>
                <td>1.200</td>
                <td>$42.000.000</td>
              </tr>
              <tr>
                <td>Interior - Provincia de Buenos Aires</td>
                <td>650</td>
                <td>$25.000.000</td>
              </tr>
              <tr>
                <td>Interior - Otras Provincias</td>
                <td>500</td>
                <td>$33.000.000</td>
              </tr>
            </tbody>
          </table>

          {/* % KYC completa */}
          <h5 className="text-primary font-weight-bold mt-5 mb-3">
            % de Clientes con Verificación KYC Completa
          </h5>
          <table className="table table-bordered table-sm">
            <tbody>
              <tr>
                <td className="font-weight-bold">
                  % Clientes con KYC Completa
                </td>
                <td>98.5%</td>
              </tr>
            </tbody>
          </table>

          {/* Alertas de lavado / inusual */}
          <h5 className="text-primary font-weight-bold mt-5 mb-3">
            Alertas de Lavado / Transacciones Inusuales
          </h5>
          <table className="table table-bordered table-hover table-sm">
            <thead className="thead-light">
              <tr>
                <th>Mes</th>
                <th>Alertas Detectadas</th>
                <th>Alertas Elevadas a UIF</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Junio 2025</td>
                <td>15</td>
                <td>3</td>
              </tr>
              <tr>
                <td>Mayo 2025</td>
                <td>12</td>
                <td>2</td>
              </tr>
              <tr>
                <td>Abril 2025</td>
                <td>9</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>

          {/* Reportes presentados */}
          <h5 className="text-primary font-weight-bold mt-5 mb-3">
            Reportes Presentados
          </h5>
          <table className="table table-bordered table-hover table-sm">
            <thead className="thead-light">
              <tr>
                <th>Reporte</th>
                <th>Período</th>
                <th>Fecha de Presentación</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>UIF - ROS (Reporte de Operación Sospechosa)</td>
                <td>Q2 2025</td>
                <td>01/07/2025</td>
              </tr>
              <tr>
                <td>BCRA - Régimen Informativo 81.26.776</td>
                <td>Junio 2025</td>
                <td>02/07/2025</td>
              </tr>
              <tr>
                <td>AFIP - Padrón mensual de cuentas</td>
                <td>Junio 2025</td>
                <td>03/07/2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComplianceMonitoringPage;
