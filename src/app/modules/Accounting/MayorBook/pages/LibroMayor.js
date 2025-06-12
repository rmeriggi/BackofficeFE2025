import React from "react";
import "./libroMayor.scss";
import usePrint from "../../../hooks/usePrint";
import { Button } from "react-bootstrap";

const LibroMayor = () => {
  const { handlePrint, printRef } = usePrint();
  return (
    <div className="container-fluid" ref={printRef}>
      <div
        className="card-header border-0 py-5 d-flex justify-content-between align-items-center"
        style={{ marginBottom: "2rem" }}
      >
        <div>
          <h3 className="card-title align-items-start flex-column mb-1">
            <span className="card-label font-weight-bolder text-dark d-block">
              Libro Mayor
            </span>
          </h3>
          <small>Fecha: 12/06/2025 - N° Interno: ROS-2025-0198</small>
        </div>

        <div>
          <Button className="btn btn-primary no-print" onClick={handlePrint}>
            Imprimir
          </Button>
        </div>
      </div>

      <div className="filters-section no-print">
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label">Cuenta</label>
            <select className="form-select">
              <option>Todas las cuentas</option>
              <option>1.1.1.01 - Caja</option>
              <option>1.1.1.02 - Bancos</option>
              <option>1.1.2.01 - Clientes</option>
              <option>1.2.1.01 - Mobiliario</option>
              <option>2.1.1.01 - Proveedores</option>
              <option>3.1.1.01 - Capital Social</option>
              <option>4.1.1.01 - Ventas</option>
              <option>5.1.1.01 - Costo de Ventas</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">Fecha Desde</label>
            <input type="date" className="form-control" value="2023-07-01" />
          </div>
          <div className="col-md-2">
            <label className="form-label">Fecha Hasta</label>
            <input type="date" className="form-control" value="2023-07-31" />
          </div>
          <div className="col-md-2">
            <label className="form-label">Tipo Movimiento</label>
            <select className="form-select">
              <option>Todos</option>
              <option>Débito</option>
              <option>Crédito</option>
            </select>
          </div>
          <div className="col-md-1 d-flex align-items-end">
            <button
              style={{ padding: "6px" }}
              className="btn btn-primary w-100"
            >
              <i className="fas fa-filter me-2"></i>Filtrar
            </button>
          </div>
        </div>
      </div>

      <div className="row ">
        <div className="col-12">
          <div className="account-summary">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h3>1.1.1.01 - Caja</h3>
                <p className="mb-0">Cuenta de efectivo en caja</p>
              </div>
              <div className="text-end">
                <div>
                  Saldo al 01/07/2023:{" "}
                  <span className="balance-positive">$ 85,000.00</span>
                </div>
                <div>
                  Saldo al 31/07/2023:{" "}
                  <span className="balance-positive">$ 102,450.00</span>
                </div>
                <div>
                  Variación:{" "}
                  <span className="balance-positive">+ $ 17,450.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row no-print">
        <div className="col-md-3">
          <div className="card summary-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="card-title">Total Débitos</div>
                  <div className="value">$ 245,800.00</div>
                </div>
                <div className="ledger-icon">
                  <i className="fas fa-arrow-down"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card summary-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="card-title">Total Créditos</div>
                  <div className="value">$ 228,350.00</div>
                </div>
                <div className="ledger-icon">
                  <i className="fas fa-arrow-up"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card summary-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="card-title">Saldo Inicial</div>
                  <div className="value">$ 85,000.00</div>
                </div>
                <div className="ledger-icon">
                  <i className="fas fa-calculator"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card summary-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="card-title">Saldo Final</div>
                  <div className="value">$ 102,450.00</div>
                </div>
                <div className="ledger-icon">
                  <i className="fas fa-calculator"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row ">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center no-print">
              <h2 className="card-title">Movimientos de la Cuenta</h2>
              <div className="export-buttons">
                <button className="btn btn-outline-primary">
                  <i className="fas fa-file-export me-2"></i>Exportar
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Comprobante</th>
                    <th>Descripción</th>
                    <th>Referencia</th>
                    <th>Débito</th>
                    <th>Crédito</th>
                    <th>Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>01/07/2023</td>
                    <td>Saldo Inicial</td>
                    <td>Saldo inicial del periodo</td>
                    <td>-</td>
                    <td></td>
                    <td></td>
                    <td className="balance-positive">$ 85,000.00</td>
                  </tr>
                  <tr>
                    <td>05/07/2023</td>
                    <td>REC-00125</td>
                    <td>Recibo de cobro a Cliente A</td>
                    <td>FAC-2023-00125</td>
                    <td className="debit-amount">$ 43,400.00</td>
                    <td></td>
                    <td className="balance-positive">$ 128,400.00</td>
                  </tr>
                  <tr>
                    <td>07/07/2023</td>
                    <td>PAG-00478</td>
                    <td>Pago a Proveedor XYZ</td>
                    <td>ORD-2023-00478</td>
                    <td></td>
                    <td className="credit-amount">$ 28,500.00</td>
                    <td className="balance-positive">$ 99,900.00</td>
                  </tr>
                  <tr>
                    <td>12/07/2023</td>
                    <td>REC-00342</td>
                    <td>Recibo de cobro a Cliente B</td>
                    <td>FAC-2023-00342</td>
                    <td className="debit-amount">$ 31,360.00</td>
                    <td></td>
                    <td className="balance-positive">$ 131,260.00</td>
                  </tr>
                  <tr>
                    <td>15/07/2023</td>
                    <td>PAG-00567</td>
                    <td>Pago de alquiler</td>
                    <td>CON-2023-00567</td>
                    <td></td>
                    <td className="credit-amount">$ 75,000.00</td>
                    <td className="balance-positive">$ 56,260.00</td>
                  </tr>
                  <tr>
                    <td>18/07/2023</td>
                    <td>REC-00231</td>
                    <td>Recibo de cobro a Cliente C</td>
                    <td>FAC-2023-00231</td>
                    <td className="debit-amount">$ 64,852.00</td>
                    <td></td>
                    <td className="balance-positive">$ 121,112.00</td>
                  </tr>
                  <tr>
                    <td>22/07/2023</td>
                    <td>PAG-00654</td>
                    <td>Pago de servicios</td>
                    <td>SERV-2023-00654</td>
                    <td></td>
                    <td className="credit-amount">$ 18,662.00</td>
                    <td className="balance-positive">$ 102,450.00</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="total-row">
                    <td colSpan="4" className="text-end">
                      <strong>TOTALES:</strong>
                    </td>
                    <td className="debit-amount">
                      <strong>$ 139,612.00</strong>
                    </td>
                    <td className="credit-amount">
                      <strong>$ 122,162.00</strong>
                    </td>
                    <td className="balance-positive">
                      <strong>$ 102,450.00</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Movimientos por Comprobante</h3>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="badge bg-primary me-2">Recibos</span>
                  <span>Total Débitos</span>
                </div>
                <div className="debit-amount">$ 139,612.00</div>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="badge bg-danger me-2">Pagos</span>
                  <span>Total Créditos</span>
                </div>
                <div className="credit-amount">$ 122,162.00</div>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="badge bg-info me-2">Facturas</span>
                  <span>Total Débitos</span>
                </div>
                <div className="debit-amount">$ 0.00</div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <span className="badge bg-warning me-2">Notas</span>
                  <span>Total Créditos</span>
                </div>
                <div className="credit-amount">$ 0.00</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Saldos por Día</h3>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="me-2">01/07/2023</span>
                  <span>Saldo</span>
                </div>
                <div className="balance-positive">$ 85,000.00</div>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="me-2">10/07/2023</span>
                  <span>Saldo</span>
                </div>
                <div className="balance-positive">$ 99,900.00</div>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="me-2">20/07/2023</span>
                  <span>Saldo</span>
                </div>
                <div className="balance-positive">$ 121,112.00</div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <span className="me-2">31/07/2023</span>
                  <span>Saldo</span>
                </div>
                <div className="balance-positive">$ 102,450.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibroMayor;
