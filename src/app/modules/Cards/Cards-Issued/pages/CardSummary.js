import React from "react";
import usePrint from "../../../hooks/usePrint";
import { Button } from "react-bootstrap";

const CardSummary = () => {
  const { handlePrint, printRef } = usePrint();

  return (
    <div ref={printRef} className="container mt-5">
      <div
        className="card-header border-0 py-5 d-flex justify-content-between align-items-center"
        style={{ marginBottom: "2rem" }}
      >
        <div>
          <h3 className="card-title align-items-start flex-column mb-1">
            <span className="card-label font-weight-bolder text-dark d-block">
              Resumen de Cuenta - Tarjeta de Crédito
            </span>
          </h3>
          <span className="text-muted font-weight-bold font-size-sm">
            Período: 01/06/2025 - 30/06/2025
          </span>
        </div>

        <div>
          <Button className="btn btn-primary no-print" onClick={handlePrint}>
            Imprimir
          </Button>
        </div>
      </div>
      <div className="card shadow-sm">
        <div className="card-body">
          {/* Datos del Cliente */}
          <div className="mb-4">
            <h6 className="text-dark mb-3">Datos del Cliente</h6>
            <div className="row">
              <div className="col-md-4">
                <strong>Nombre:</strong> Juan Pérez
              </div>
              <div className="col-md-4">
                <strong>DNI:</strong> 30.123.456
              </div>
              <div className="col-md-4">
                <strong>Email:</strong> juan.perez@example.com
              </div>
            </div>
          </div>

          {/* Datos de la Tarjeta */}
          <div className="mb-4">
            <h6 className="text-dark mb-3">Datos de la Tarjeta</h6>
            <div className="row">
              <div className="col-md-4">
                <strong>N° Tarjeta:</strong> **** **** **** 1234
              </div>
              <div className="col-md-4">
                <strong>Vencimiento:</strong> 08/27
              </div>
              <div className="col-md-4">
                <strong>Fecha de Liquidación:</strong> 10/07/2025
              </div>
            </div>
          </div>

          {/* Resumen de Saldo */}
          <div
            /*   style={{ backgroundColor: "rgb(0,25,255)", color: "#fff" }} */
            className="alert alert-success text-center mb-4"
            role="alert"
          >
            <h5 className="mb-0">
              Saldo Total a Pagar: <strong>$ 158.920,45</strong>
            </h5>
            <small>Vencimiento: 15/07/2025</small>
          </div>

          {/* Tabla de Compras */}
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="thead-light">
                <tr>
                  <th>Fecha</th>
                  <th>Descripción</th>
                  <th>Comercio</th>
                  <th>Importe</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>02/06/2025</td>
                  <td>Compra Online</td>
                  <td>Amazon</td>
                  <td>$ 32.500,00</td>
                </tr>
                <tr>
                  <td>05/06/2025</td>
                  <td>Supermercado</td>
                  <td>Carrefour</td>
                  <td>$ 15.230,75</td>
                </tr>
                <tr>
                  <td>10/06/2025</td>
                  <td>Combustible</td>
                  <td>YPF</td>
                  <td>$ 12.460,00</td>
                </tr>
                <tr>
                  <td>15/06/2025</td>
                  <td>Suscripción</td>
                  <td>Netflix</td>
                  <td>$ 1.599,00</td>
                </tr>
                <tr>
                  <td>20/06/2025</td>
                  <td>Indumentaria</td>
                  <td>Zara</td>
                  <td>$ 27.840,00</td>
                </tr>
                <tr>
                  <td>25/06/2025</td>
                  <td>Electrónica</td>
                  <td>Frávega</td>
                  <td>$ 69.290,70</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="text-muted text-center mt-4">
            Este resumen es informativo. Consulte su homebanking para ver el
            detalle actualizado y los posibles cargos adicionales.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSummary;
