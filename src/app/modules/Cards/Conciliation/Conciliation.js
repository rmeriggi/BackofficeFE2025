import React from "react";
import usePrint from "../../hooks/usePrint";
import { Button } from "react-bootstrap";

const Conciliation = () => {
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
              Liquidación Semanal
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
          <div className="mb-4">
            <h6 className="text-dark mb-3">Datos de la Entidad</h6>
            <div className="row">
              <div className="col-md-4">
                <strong>Entidad:</strong> Banco Ejemplo S.A.
              </div>
              <div className="col-md-4">
                <strong>CUIT:</strong> 30-12345678-9
              </div>
              <div className="col-md-4">
                <strong>Fecha de Liquidación:</strong> 11/06/2025
              </div>
            </div>
          </div>

          {/* Tabla de Operaciones */}
          <div className="mb-4">
            <h6 className="text-dark mb-3">Detalle de Operaciones</h6>
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th>Fecha</th>
                    <th>Tarjeta</th>
                    <th>Comercio</th>
                    <th>Importe Bruto</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>02/06/2025</td>
                    <td>VISA Crédito</td>
                    <td>Supermercado Coto</td>
                    <td>$ 35.000,00</td>
                  </tr>
                  <tr>
                    <td>03/06/2025</td>
                    <td>Mastercard Débito</td>
                    <td>YPF</td>
                    <td>$ 14.500,00</td>
                  </tr>
                  <tr>
                    <td>05/06/2025</td>
                    <td>VISA Crédito</td>
                    <td>Zara</td>
                    <td>$ 22.000,00</td>
                  </tr>
                  <tr>
                    <td>07/06/2025</td>
                    <td>Mastercard Crédito</td>
                    <td>Frávega</td>
                    <td>$ 58.300,00</td>
                  </tr>
                  <tr>
                    <td>09/06/2025</td>
                    <td>VISA Débito</td>
                    <td>Restaurante La Bourgogne</td>
                    <td>$ 9.800,00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tabla de Liquidación */}
          <div className="mb-4">
            <h6 className="text-dark mb-3">Resumen de Liquidación</h6>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th>Concepto</th>
                    <th>Importe</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Total Operaciones Brutas</td>
                    <td>$ 139.600,00</td>
                  </tr>
                  <tr>
                    <td>Interchange Fee (1,2%)</td>
                    <td>$ 1.675,20</td>
                  </tr>
                  <tr>
                    <td>Comisión de Procesamiento (1,8%)</td>
                    <td>$ 2.512,80</td>
                  </tr>
                  <tr>
                    <td>IVA sobre Comisión (21%)</td>
                    <td>$ 527,69</td>
                  </tr>
                  <tr>
                    <td>Percepción IVA RG 3337 (3%)</td>
                    <td>$ 75,38</td>
                  </tr>
                  <tr>
                    <td>Retención Ganancias (2%)</td>
                    <td>$ 50,26</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Neto a Liquidar */}
          <div className="alert alert-success text-center" role="alert">
            <h5 className="mb-0">
              Neto a Liquidar: <strong>$ 134.758,67</strong>
            </h5>
            <small>Fecha estimada de acreditación: 12/06/2025</small>
          </div>

          {/* Footer */}
          <div className="text-muted text-center mt-4">
            Este resumen es informativo. Los valores de Interchange son
            establecidos por las marcas de tarjetas.
            <br />
            Los impuestos aplicados se ajustan a la legislación fiscal vigente.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conciliation;
