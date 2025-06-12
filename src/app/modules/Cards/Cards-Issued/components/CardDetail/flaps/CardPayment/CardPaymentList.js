import React from "react";

const CardPaymentsList = ({ printRef }) => {
  return (
    <div className="container mt-5" ref={printRef}>
      <div className="card shadow-sm">
        <div
          style={{ backgroundColor: "#6fe2dd" }}
          className="card-header text-white d-flex justify-content-between align-items-center"
        >
          <h4 className="mb-0">Mis Pagos de Tarjeta de Crédito</h4>
          <span>Últimos 5 pagos registrados</span>
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="thead-light">
                <tr>
                  <th>Fecha del Pago</th>
                  <th>Canal</th>
                  <th>Tipo de Pago</th>
                  <th>Monto Pagado</th>
                  <th>Capital Cancelado</th>
                  <th>Intereses Pagados</th>
                  <th>IVA sobre Intereses</th>
                  <th>Comisiones Cobradas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>02/06/2025</td>
                  <td>Home Banking</td>
                  <td>Pago Total</td>
                  <td>$ 158.920,45</td>
                  <td>$ 158.920,45</td>
                  <td>$ 0,00</td>
                  <td>$ 0,00</td>
                  <td>$ 0,00</td>
                </tr>
                <tr>
                  <td>01/05/2025</td>
                  <td>App Móvil</td>
                  <td>Pago Mínimo</td>
                  <td>$ 25.000,00</td>
                  <td>$ 20.000,00</td>
                  <td>$ 4.500,00</td>
                  <td>$ 945,00</td>
                  <td>$ 0,00</td>
                </tr>
                <tr>
                  <td>05/04/2025</td>
                  <td>Rapipago</td>
                  <td>Pago Parcial</td>
                  <td>$ 50.000,00</td>
                  <td>$ 47.000,00</td>
                  <td>$ 2.500,00</td>
                  <td>$ 525,00</td>
                  <td>$ 100,00</td>
                </tr>
                <tr>
                  <td>03/03/2025</td>
                  <td>Home Banking</td>
                  <td>Pago Total</td>
                  <td>$ 125.000,00</td>
                  <td>$ 125.000,00</td>
                  <td>$ 0,00</td>
                  <td>$ 0,00</td>
                  <td>$ 0,00</td>
                </tr>
                <tr>
                  <td>05/02/2025</td>
                  <td>App Móvil</td>
                  <td>Pago Parcial</td>
                  <td>$ 35.000,00</td>
                  <td>$ 30.000,00</td>
                  <td>$ 4.000,00</td>
                  <td>$ 840,00</td>
                  <td>$ 0,00</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="text-muted text-center mt-4">
            Los montos de intereses y comisiones corresponden al período de
            facturación actual. Los pagos parciales o mínimos generan saldo
            financiado sobre el cual se aplican nuevos intereses.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPaymentsList;
