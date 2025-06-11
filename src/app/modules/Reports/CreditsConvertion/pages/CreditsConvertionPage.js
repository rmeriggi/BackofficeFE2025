import React from "react";
import usePrint from "../../../hooks/usePrint";

const CreditsConvertionPage = () => {
  const { handlePrint, printRef } = usePrint();

  const etapas = [
    { etapa: "Solicitudes recibidas", cantidad: 5000, conversion: "100%" },
    { etapa: "Onboarding completado", cantidad: 4200, conversion: "84%" },
    { etapa: "Evaluación iniciada", cantidad: 3500, conversion: "70%" },
    { etapa: "Evaluación aprobada", cantidad: 2800, conversion: "56%" },
    { etapa: "Oferta aceptada", cantidad: 2100, conversion: "42%" },
    { etapa: "Crédito desembolsado", cantidad: 1850, conversion: "37%" },
  ];

  const totalConversion = etapas[etapas.length - 1].conversion;

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
          <section>
            <h5 className="text-primary font-weight-bold mb-4">
              Embudo de Conversión
            </h5>
            <table className="table table-bordered table-hover table-sm mb-5">
              <thead className="thead-light">
                <tr>
                  <th>Etapa</th>
                  <th>Cantidad</th>
                  <th>Conversión Acumulada</th>
                </tr>
              </thead>
              <tbody>
                {etapas.map(({ etapa, cantidad, conversion }) => (
                  <tr key={etapa}>
                    <td>{etapa}</td>
                    <td>{cantidad.toLocaleString()}</td>
                    <td>{conversion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h6 className="font-weight-bold">
              Total conversión final:{" "}
              <span className="text-success">{totalConversion}</span>
            </h6>
            <p className="text-muted small">
              Corresponde a créditos efectivamente desembolsados sobre
              solicitudes iniciales.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreditsConvertionPage;
