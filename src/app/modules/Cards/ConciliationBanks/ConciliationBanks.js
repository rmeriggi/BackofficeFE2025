import React from "react";
import { Button } from "react-bootstrap";
import usePrint from "../../hooks/usePrint";
import { useHistory } from "react-router-dom";

const ClearingStatement = () => {
  const { handlePrint, printRef } = usePrint();
  const history = useHistory();

  return (
    <main ref={printRef} className="container mt-5">
      <header
        className="card-header border-0 py-5 d-flex justify-content-between align-items-center"
        style={{ marginBottom: "2rem" }}
      >
        <section>
          <h1 className="card-title align-items-start flex-column mb-1">
            <span className="card-label font-weight-bolder text-dark d-block">
              Liquidación Semanal
            </span>
          </h1>
          <p className="text-muted font-weight-bold font-size-sm mb-0">
            Período: 01/06/2025 - 30/06/2025
          </p>
        </section>

        <nav aria-label="Acciones">
          <Button variant="outline-primary" onClick={() => history.goBack()}>
            volver
          </Button>
          <Button
            className="ml-4 btn btn-primary no-print"
            onClick={handlePrint}
          >
            Imprimir
          </Button>
        </nav>
      </header>

      <article className="card shadow-sm">
        <section className="card-body">
          <header className="mb-4">
            <h2 className="section-title text-dark font-weight-bold mb-3">
              Transacciones Compensadas
            </h2>
          </header>

          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="thead-light">
                <tr>
                  <th>Fecha</th>
                  <th>Tipo Transacción</th>
                  <th>Banco Emisor</th>
                  <th>Banco Adquirente</th>
                  <th>Importe Bruto</th>
                  <th>Interchange</th>
                  <th>Fee de Marca</th>
                  <th>Neto al Adquirente</th>
                  <th>Neto al Emisor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>02/06/2025</td>
                  <td>Crédito 1 pago</td>
                  <td>Banco Nación</td>
                  <td>Banco Galicia</td>
                  <td>$ 20.000,00</td>
                  <td>$ 400,00 (2%)</td>
                  <td>$ 100,00 (0.5%)</td>
                  <td>$ 19.500,00</td>
                  <td>$ 400,00</td>
                </tr>
                <tr>
                  <td>03/06/2025</td>
                  <td>Cuotas Ahora 12</td>
                  <td>Banco Santander</td>
                  <td>Banco Macro</td>
                  <td>$ 50.000,00</td>
                  <td>$ 1.000,00 (2%)</td>
                  <td>$ 250,00 (0.5%)</td>
                  <td>$ 48.750,00</td>
                  <td>$ 1.000,00</td>
                </tr>
                <tr>
                  <td>04/06/2025</td>
                  <td>Chargeback (reverso)</td>
                  <td>Banco BBVA</td>
                  <td>Banco Ciudad</td>
                  <td>$ -10.000,00</td>
                  <td>$ 0,00</td>
                  <td>$ 0,00</td>
                  <td>$ -10.000,00</td>
                  <td>$ 0,00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <aside className="summary bg-primary text-white text-center rounded p-3 mt-4">
            <h5 className="mb-0">
              Neto Total al Adquirente: <strong>$ 58.250,00</strong>
            </h5>
            <small>Incluye ajustes por chargebacks</small>
          </aside>

          <footer className="footer text-muted text-center mt-4">
            <p className="mb-0">
              Este resumen refleja operaciones compensadas entre emisores y
              adquirentes.
              <br />
              Las tasas aplicadas son referenciales y pueden variar según
              acuerdos contractuales.
            </p>
          </footer>
        </section>
      </article>
    </main>
  );
};

export default ClearingStatement;
