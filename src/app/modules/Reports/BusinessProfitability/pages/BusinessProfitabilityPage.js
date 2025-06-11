import React from "react";
import usePrint from "../../../hooks/usePrint";

const ReporteRentabilidadNegocio = () => {
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
              Reporte de Rentabilidad del negocio
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
          {/* Rentabilidad Bruta */}
          <h5 className="text-primary font-weight-bold mt-4 mb-3">
            Rentabilidad Bruta
          </h5>
          <table className="table table-bordered table-hover table-sm">
            <tbody>
              <tr>
                <td className="font-weight-bold">Ingresos por Intereses</td>
                <td>$35.200.000</td>
              </tr>
              <tr>
                <td className="font-weight-bold">Ingresos por Punitorios</td>
                <td>$4.800.000</td>
              </tr>
              <tr>
                <td className="font-weight-bold">Gastos Operativos del Área</td>
                <td>$7.500.000</td>
              </tr>
              <tr>
                <td className="font-weight-bold">Castigos por Incobrables</td>
                <td>$2.300.000</td>
              </tr>
              <tr>
                <td className="font-weight-bold">Rentabilidad Bruta</td>
                <td>22.8%</td>
              </tr>
            </tbody>
          </table>

          {/* ROA del Negocio */}
          <h5 className="text-primary font-weight-bold mt-5 mb-3">
            ROA del Negocio
          </h5>
          <table className="table table-bordered table-sm">
            <tbody>
              <tr>
                <td className="font-weight-bold">
                  ROA (Retorno sobre Activos)
                </td>
                <td>10.5%</td>
              </tr>
            </tbody>
          </table>

          {/* CAC Promedio */}
          <h5 className="text-primary font-weight-bold mt-5 mb-3">
            CAC Promedio (Costo de Adquisición de Cliente)
          </h5>
          <table className="table table-bordered table-sm">
            <tbody>
              <tr>
                <td className="font-weight-bold">CAC Promedio</td>
                <td>$450</td>
              </tr>
            </tbody>
          </table>

          {/* Rentabilidad por Producto */}
          <h5 className="text-primary font-weight-bold mt-5 mb-3">
            Rentabilidad por Producto
          </h5>
          <table className="table table-bordered table-hover table-sm">
            <thead className="thead-light">
              <tr>
                <th>Producto</th>
                <th>Rentabilidad (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Crédito Personal</td>
                <td>24.5%</td>
              </tr>
              <tr>
                <td>Crédito Prendario</td>
                <td>19.8%</td>
              </tr>
              <tr>
                <td>Crédito Productivo</td>
                <td>21.2%</td>
              </tr>
              <tr>
                <td>Microcrédito</td>
                <td>28.6%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReporteRentabilidadNegocio;
