import React from "react";

const CreditsConvertionPage = () => {
  const etapas = [
    { etapa: "Solicitudes recibidas", cantidad: 5000, conversion: "100%" },
    { etapa: "Onboarding completado", cantidad: 4200, conversion: "84%" },
    { etapa: "Evaluación iniciada", cantidad: 3500, conversion: "70%" },
    { etapa: "Evaluación aprobada", cantidad: 2800, conversion: "56%" },
    { etapa: "Oferta aceptada", cantidad: 2100, conversion: "42%" },
    { etapa: "Crédito desembolsado", cantidad: 1850, conversion: "37%" },
  ];

  return (
    <div className="container-fluid mt-5">
      <div className="card card-custom shadow-sm">
        <div className="card-header">
          <h3 className="card-title">
            Reporte de Conversión de Créditos (Embudo)
          </h3>
          <div className="card-toolbar text-muted font-size-sm">
            Actualizado al 09/06/2025
          </div>
        </div>

        <div className="card-body">
          <h5 className="text-primary font-weight-bold mb-4">
            Embudo de Conversión
          </h5>
          <table className="table table-bordered table-hover table-sm">
            <thead className="thead-light">
              <tr>
                <th>Etapa</th>
                <th>Cantidad</th>
                <th>Conversión Acumulada</th>
              </tr>
            </thead>
            <tbody>
              {etapas.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.etapa}</td>
                  <td>{item.cantidad}</td>
                  <td>{item.conversion}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-5">
            <h6 className="font-weight-bold">
              Total conversión final: <span className="text-success">37%</span>
            </h6>
            <p className="text-muted small">
              Corresponde a créditos efectivamente desembolsados sobre
              solicitudes iniciales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditsConvertionPage;
