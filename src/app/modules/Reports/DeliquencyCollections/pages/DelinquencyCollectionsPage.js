import React from "react";
import usePrint from "../../hooks/usePrint";

const DeliquencyCollectionsPage = () => {
  const { printRef, handlePrint } = usePrint();

  return (
    <div className="container-fluid mt-5" ref={printRef}>
      {/* Header */}
      <div
        className="card-header border-0 py-5 d-flex justify-content-between align-items-center"
        style={{ marginBottom: "2rem" }}
      >
        <div>
          <h3 className="card-title align-items-start flex-column mb-1">
            <span className="card-label font-weight-bolder text-dark d-block">
              Reporte de Morosidad y Cobranza
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

      {/* Card Principal */}
      <div className="card card-custom gutter-b">
        <div className="card-body pt-0">
          {/* Mora por Tramo */}
          <h5 className="font-weight-bold text-primary mb-4 mt-2">
            Mora por Tramo
          </h5>
          <table className="table table-bordered table-hover">
            <thead className="thead-light">
              <tr>
                <th>Tramo de Mora</th>
                <th>Monto en Mora</th>
                <th>% sobre Cartera</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1 - 30 días</td>
                <td>$2.500.000</td>
                <td>2.1%</td>
              </tr>
              <tr>
                <td>31 - 60 días</td>
                <td>$1.800.000</td>
                <td>1.5%</td>
              </tr>
              <tr>
                <td>Más de 60 días</td>
                <td>$3.200.000</td>
                <td>2.6%</td>
              </tr>
            </tbody>
          </table>

          {/* Tasa de Morosidad Total */}
          <h5 className="font-weight-bold text-primary mb-4 mt-4">
            Tasa de Morosidad Total (NPL)
          </h5>
          <table className="table table-bordered table-hover">
            <tbody>
              <tr>
                <td className="font-weight-bold">
                  Tasa de Morosidad Total (NPL)
                </td>
                <td>6.2%</td>
              </tr>
            </tbody>
          </table>

          {/* Top 10 Clientes Morosos */}
          <h5 className="font-weight-bold text-primary mb-4 mt-4">
            Top 10 Clientes Morosos
          </h5>
          <table className="table table-bordered table-hover">
            <thead className="thead-light">
              <tr>
                <th>Cliente</th>
                <th>Monto en Mora</th>
                <th>Días de Mora</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Juan Pérez</td>
                <td>$500.000</td>
                <td>75</td>
              </tr>
              <tr>
                <td>María Gómez</td>
                <td>$450.000</td>
                <td>62</td>
              </tr>
              <tr>
                <td>Carlos López</td>
                <td>$400.000</td>
                <td>90</td>
              </tr>
              <tr>
                <td>Ana Rodríguez</td>
                <td>$380.000</td>
                <td>35</td>
              </tr>
              <tr>
                <td>Pedro Martínez</td>
                <td>$350.000</td>
                <td>40</td>
              </tr>
              <tr>
                <td>Laura Díaz</td>
                <td>$320.000</td>
                <td>25</td>
              </tr>
              <tr>
                <td>Ricardo Fernández</td>
                <td>$300.000</td>
                <td>50</td>
              </tr>
              <tr>
                <td>Soledad Torres</td>
                <td>$280.000</td>
                <td>65</td>
              </tr>
              <tr>
                <td>Martín Sosa</td>
                <td>$250.000</td>
                <td>70</td>
              </tr>
              <tr>
                <td>Daniela Vera</td>
                <td>$240.000</td>
                <td>80</td>
              </tr>
            </tbody>
          </table>

          {/* Créditos con Reintentos Fallidos */}
          <h5 className="font-weight-bold text-primary mb-4 mt-4">
            Créditos con Reintentos Fallidos
          </h5>
          <table className="table table-bordered table-hover">
            <thead className="thead-light">
              <tr>
                <th>Reintentos Fallidos</th>
                <th>Cantidad de Créditos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1 reintento</td>
                <td>320</td>
              </tr>
              <tr>
                <td>2 reintentos</td>
                <td>210</td>
              </tr>
              <tr>
                <td>3 o más reintentos</td>
                <td>150</td>
              </tr>
            </tbody>
          </table>

          {/* Indicadores de Recupero */}
          <h5 className="font-weight-bold text-primary mb-4 mt-4">
            Indicadores de Recupero
          </h5>
          <table className="table table-bordered table-hover">
            <tbody>
              <tr>
                <td className="font-weight-bold">
                  Recupero de Mora - Último Mes
                </td>
                <td>78%</td>
              </tr>
              {/* Aquí puedes continuar con los demás indicadores si tienes más */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeliquencyCollectionsPage;
