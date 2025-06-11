import React from "react";
import usePrint from "../../../hooks/usePrint";

const CreditsCrossPage = () => {
  const { handlePrint, printRef } = usePrint();

  // Datos de clientes recurrentes
  const recurrentClientsData = [
    { label: "Clientes con más de 1 crédito", value: "1.200" },
    { label: "% sobre total de clientes", value: "38%" },
    { label: "Tiempo promedio entre créditos", value: "8.5 meses" },
    { label: "Ticket promedio de recurrentes", value: "$95.000" },
  ];

  // Datos de cross-selling
  const crossSellingData = [
    { product: "Billetera Digital", percentage: "72%" },
    { product: "Tarjeta Prepaga", percentage: "41%" },
    { product: "Pago de servicios", percentage: "66%" },
    { product: "Inversiones / fondos", percentage: "18%" },
  ];

  // Datos de comportamiento
  const behaviorData = [
    { scoreRange: "80 - 100", percentage: "55%" },
    { scoreRange: "60 - 80", percentage: "30%" },
    { scoreRange: "40 - 60", percentage: "12%" },
    { scoreRange: "< 40", percentage: "3%" },
  ];

  return (
    <div className="container-fluid mt-5" ref={printRef}>
      <div
        className="card-header border-0 py-5 d-flex justify-content-between align-items-center"
        style={{ marginBottom: "2rem" }}
      >
        <div>
          <h3 className="card-title align-items-start flex-column mb-1">
            <span className="card-label font-weight-bolder text-dark d-block">
              Reporte de Conversión de Créditos (Embudo)
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

      <div className="card card-custom shadow-sm">
        <div className="card-body">
          {/* Recurrentes */}
          <section>
            <h5 className="text-primary font-weight-bold mb-4">
              Clientes Recurrentes
            </h5>
            <table className="table table-bordered table-hover table-sm mb-0">
              <tbody>
                {recurrentClientsData.map(({ label, value }) => (
                  <tr key={label}>
                    <td className="font-weight-bold">{label}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Cross-selling */}
          <section className="mt-5">
            <h5 className="text-primary font-weight-bold mb-3">
              Cross-Selling: Uso combinado de productos
            </h5>
            <table className="table table-bordered table-hover table-sm mb-0">
              <thead className="thead-light">
                <tr>
                  <th>Producto combinado</th>
                  <th>% de recurrentes que lo usan</th>
                </tr>
              </thead>
              <tbody>
                {crossSellingData.map(({ product, percentage }) => (
                  <tr key={product}>
                    <td>{product}</td>
                    <td>{percentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Comportamiento */}
          <section className="mt-5">
            <h5 className="text-primary font-weight-bold mb-3">
              Comportamiento de Recurrentes
            </h5>
            <table className="table table-bordered table-hover table-sm mb-0">
              <thead className="thead-light">
                <tr>
                  <th>Tramo de Score</th>
                  <th>% de recurrentes</th>
                </tr>
              </thead>
              <tbody>
                {behaviorData.map(({ scoreRange, percentage }) => (
                  <tr key={scoreRange}>
                    <td>{scoreRange}</td>
                    <td>{percentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreditsCrossPage;
