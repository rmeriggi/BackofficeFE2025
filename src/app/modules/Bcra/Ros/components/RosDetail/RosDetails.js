import React from "react";
import usePrint from "../../../../hooks/usePrint";
import { useHistory } from "react-router-dom";

const RosDetails = () => {
  const history = useHistory();
  // Function to handle the "Volver" button click
  const handleBack = () => {
    history.push("/compliance/ros");
  };
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
              Reporte de Operación Sospechosa (ROS)
            </span>
          </h3>
          <small>Fecha: 12/06/2025 - N° Interno: ROS-2025-0198</small>
        </div>

        <div>
          <button
            onClick={handleBack}
            className="btn btn-secondary no-print mr-2"
          >
            Volver
          </button>
          <button className="btn btn-primary no-print" onClick={handlePrint}>
            Imprimir
          </button>
        </div>
      </div>
      <div className="card card-custom shadow-sm">
        <div className="card-body">
          <section>
            <h2 className="h6 text-secondary border-bottom border-secondary pb-1 mb-3">
              Datos del Cliente
            </h2>
            <table className="table table-bordered mb-4">
              <tbody>
                <tr>
                  <td>
                    <strong>Nombre:</strong> Juan Pablo Gómez
                  </td>
                  <td>
                    <strong>DNI:</strong> 20-12345678-9
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Tipo de Cliente:</strong> Persona Física
                  </td>
                  <td>
                    <strong>Fecha de Alta:</strong> 03/04/2023
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <strong>Canales utilizados:</strong> Banca Online, POS
                    Físico
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="h6 text-secondary border-bottom border-secondary pb-1 mb-3">
              Detalle de las Operaciones Sospechosas
            </h2>
            <table className="table table-striped table-bordered mb-4">
              <thead className="table-light">
                <tr>
                  <th>Fecha</th>
                  <th>Canal</th>
                  <th>Tipo de operación</th>
                  <th>Monto</th>
                  <th>Cuenta Origen</th>
                  <th>Cuenta Destino</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>05/06/2025</td>
                  <td>POS Físico</td>
                  <td>Compra con tarjeta</td>
                  <td>$ 850.000,00</td>
                  <td>Tarjeta de Crédito Visa</td>
                  <td>Comercio XYZ (Electrónica)</td>
                </tr>
                <tr>
                  <td>06/06/2025</td>
                  <td>Transferencia Online</td>
                  <td>Transferencia inmediata</td>
                  <td>$ 1.200.000,00</td>
                  <td>Caja de Ahorro $</td>
                  <td>Cuenta externa (Banco ABC)</td>
                </tr>
                <tr>
                  <td>07/06/2025</td>
                  <td>Depósito en Efectivo</td>
                  <td>Depósito ATM</td>
                  <td>$ 900.000,00</td>
                  <td>Caja de Ahorro $</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="h6 text-secondary border-bottom border-secondary pb-1 mb-3">
              Análisis de la Sospecha
            </h2>
            <p>
              El cliente presenta operaciones que resultan inusuales en función
              de su perfil transaccional. Los montos operados superan
              ampliamente los ingresos declarados y la actividad declarada. Se
              observó uso intensivo de múltiples canales en un corto período,
              con transferencia a cuentas externas no relacionadas. Además, se
              detectaron patrones coincidentes con tipologías de layering en
              procesos de lavado de activos.
            </p>
          </section>

          <section>
            <h2 className="h6 text-secondary border-bottom border-secondary pb-1 mb-3">
              Indicadores de Alerta Aplicados
            </h2>
            <ul>
              <li>Operaciones no acordes al perfil del cliente</li>
              <li>Uso de efectivo por montos significativos</li>
              <li>Transacciones con terceros sin justificación aparente</li>
              <li>Cambio abrupto en el patrón transaccional</li>
              <li>Fragmentación de operaciones</li>
            </ul>
          </section>

          <section>
            <h2 className="h6 text-secondary border-bottom border-secondary pb-1 mb-3">
              Conclusión
            </h2>
            <p>
              Tras el análisis realizado, se considera que las operaciones
              presentan un riesgo elevado de estar relacionadas con maniobras de
              lavado de activos. Se recomienda proceder con la presentación
              inmediata de un Reporte de Operación Sospechosa (ROS) ante la
              Unidad de Información Financiera (UIF).
            </p>
          </section>

          <section className="mt-5">
            <p>Oficial de Cumplimiento</p>
            <div
              style={{
                borderTop: "1px solid #000",
                width: "300px",
                marginTop: "30px",
              }}
            ></div>
            <p className="mt-2">
              Lic. Laura Gómez
              <br />
              Entidad Financiera XYZ
            </p>
          </section>

          <footer
            className="text-center text-muted mt-4"
            style={{ fontSize: "12px" }}
          >
            Este informe es de uso interno y confidencial. Su contenido está
            destinado al análisis del comité de prevención de lavado y no
            constituye prueba de delito.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default RosDetails;
