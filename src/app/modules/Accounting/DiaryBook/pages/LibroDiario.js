import React from "react";
import "./libroDiario.scss";
import usePrint from "../../../hooks/usePrint";
import { Button } from "react-bootstrap";

const LibroDiario = () => {
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
              Libro Diario
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
          <div className="col-md-2">
            <label className="form-label">Fecha Desde</label>
            <input type="date" className="form-control" value="2023-07-01" />
          </div>
          <div className="col-md-2">
            <label className="form-label">Fecha Hasta</label>
            <input type="date" className="form-control" value="2023-07-31" />
          </div>
          <div className="col-md-2">
            <label className="form-label">Tipo Comprobante</label>
            <select className="form-select">
              <option>Todos</option>
              <option>Factura</option>
              <option>Recibo</option>
              <option>Nota de Crédito</option>
              <option>Nota de Débito</option>
              <option>Orden de Pago</option>
            </select>
          </div>
          <div className="col-md-2">
            <label className="form-label">Cuenta Contable</label>
            <select className="form-select">
              <option>Todas las cuentas</option>
              <option>1.1.1.01 - Caja</option>
              <option>1.1.1.02 - Bancos</option>
              <option>1.1.2.01 - Clientes</option>
              <option>2.1.1.01 - Proveedores</option>
              <option>4.1.1.01 - Ventas</option>
              <option>5.1.1.01 - Costo de Ventas</option>
            </select>
          </div>
          <div className="col-md-2 d-flex align-items-end ml-10">
            <button className="btn btn-primary w-100 me-2">
              <i className="fas fa-filter me-2"></i>Filtrar
            </button>
          </div>
        </div>
      </div>

      <div className="row no-print">
        <div className="col-md-4">
          <div className="card summary-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="card-title">Total Débitos</div>
                  <div className="value">$ 1,245,800.00</div>
                </div>
                <div className="journal-icon">
                  <i className="fas fa-arrow-down"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card summary-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="card-title">Total Créditos</div>
                  <div className="value">$ 1,245,800.00</div>
                </div>
                <div className="journal-icon">
                  <i className="fas fa-arrow-up"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card summary-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="card-title">Asientos Contables</div>
                  <div className="value">42</div>
                </div>
                <div className="journal-icon">
                  <i className="fas fa-file-invoice"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h2 className="card-title">Asientos Contables</h2>
              <div className="export-buttons no-print">
                <button className="btn btn-outline-primary">
                  <i className="fas fa-file-export me-2"></i>Exportar
                </button>
                <button className="btn btn-primary">
                  <i className="fas fa-plus me-2"></i>Nuevo Asiento
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Comprobante</th>
                    <th>Cuenta</th>
                    <th>Descripción</th>
                    <th>Referencia</th>
                    <th>Débito</th>
                    <th>Crédito</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="journal-entry-header">
                    <td>05/07/2023</td>
                    <td>
                      <span className="comprobante-badge">FAC-2023-00125</span>
                    </td>
                    <td colspan="3">Venta a Cliente A - Productos varios</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <span className="account-code">1.1.2.01</span> Clientes
                    </td>
                    <td>Venta de mercadería</td>
                    <td>FAC-00125</td>
                    <td className="debit-amount">$ 145,200.00</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <span className="account-code">4.1.1.01</span> Ventas
                    </td>
                    <td>Venta de mercadería</td>
                    <td>FAC-00125</td>
                    <td></td>
                    <td className="credit-amount">$ 120,000.00</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <span className="account-code">1.3.1.01</span> IVA Débito
                      Fiscal
                    </td>
                    <td>IVA 21%</td>
                    <td>FAC-00125</td>
                    <td></td>
                    <td className="credit-amount">$ 25,200.00</td>
                  </tr>

                  <tr className="journal-entry-header">
                    <td>07/07/2023</td>
                    <td>
                      <span className="comprobante-badge">PAG-2023-00478</span>
                    </td>
                    <td colspan="3">Pago a Proveedor XYZ - Materias primas</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <span className="account-code">2.1.1.01</span> Proveedores
                    </td>
                    <td>Pago deuda proveedor</td>
                    <td>PAG-00478</td>
                    <td className="debit-amount">$ 98,500.00</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <span className="account-code">1.1.1.02</span> Banco
                    </td>
                    <td>Transferencia bancaria</td>
                    <td>PAG-00478</td>
                    <td></td>
                    <td className="credit-amount">$ 98,500.00</td>
                  </tr>

                  <tr className="journal-entry-header">
                    <td>10/07/2023</td>
                    <td>
                      <span className="comprobante-badge">REC-2023-00342</span>
                    </td>
                    <td colspan="3">Recibo de cobro Cliente B</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <span className="account-code">1.1.1.01</span> Caja
                    </td>
                    <td>Cobro factura</td>
                    <td>REC-00342</td>
                    <td className="debit-amount">$ 85,400.00</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <span className="account-code">1.1.2.01</span> Clientes
                    </td>
                    <td>Cobro factura</td>
                    <td>REC-00342</td>
                    <td></td>
                    <td className="credit-amount">$ 85,400.00</td>
                  </tr>

                  <tr className="journal-entry-header">
                    <td>15/07/2023</td>
                    <td>
                      <span className="comprobante-badge">NC-2023-00567</span>
                    </td>
                    <td colspan="3">Nota de crédito por devolución</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <span className="account-code">4.1.1.01</span> Ventas
                    </td>
                    <td>Devolución mercadería</td>
                    <td>NC-00567</td>
                    <td className="debit-amount">$ 12,500.00</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <span className="account-code">1.3.1.01</span> IVA Débito
                      Fiscal
                    </td>
                    <td>IVA 21%</td>
                    <td>NC-00567</td>
                    <td className="debit-amount">$ 2,625.00</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <span className="account-code">1.1.2.01</span> Clientes
                    </td>
                    <td>Devolución mercadería</td>
                    <td>NC-00567</td>
                    <td></td>
                    <td className="credit-amount">$ 15,125.00</td>
                  </tr>

                  <tr className="journal-entry-header">
                    <td>20/07/2023</td>
                    <td>
                      <span className="comprobante-badge">FAC-2023-00654</span>
                    </td>
                    <td colspan="3">Venta a Cliente C - Productos varios</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <span className="account-code">1.1.2.01</span> Clientes
                    </td>
                    <td>Venta de mercadería</td>
                    <td>FAC-00654</td>
                    <td className="debit-amount">$ 242,000.00</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <span className="account-code">4.1.1.01</span> Ventas
                    </td>
                    <td>Venta de mercadería</td>
                    <td>FAC-00654</td>
                    <td></td>
                    <td className="credit-amount">$ 200,000.00</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <span className="account-code">1.3.1.01</span> IVA Débito
                      Fiscal
                    </td>
                    <td>IVA 21%</td>
                    <td>FAC-00654</td>
                    <td></td>
                    <td className="credit-amount">$ 42,000.00</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="total-row">
                    <td colspan="5" className="text-end">
                      <strong>TOTALES:</strong>
                    </td>
                    <td className="debit-amount">
                      <strong>$ 1,245,800.00</strong>
                    </td>
                    <td className="credit-amount">
                      <strong>$ 1,245,800.00</strong>
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
              <h3 className="card-title">Movimientos por Cuenta</h3>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="account-code">1.1.2.01</span>
                  <span>Clientes</span>
                </div>
                <div>
                  <span className="debit-amount">$ 472,600.00</span> |
                  <span className="credit-amount">$ 100,525.00</span>
                </div>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="account-code">4.1.1.01</span>
                  <span>Ventas</span>
                </div>
                <div>
                  <span className="debit-amount">$ 12,500.00</span> |
                  <span className="credit-amount">$ 320,000.00</span>
                </div>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="account-code">1.3.1.01</span>
                  <span>IVA Débito Fiscal</span>
                </div>
                <div>
                  <span className="debit-amount">$ 2,625.00</span> |
                  <span className="credit-amount">$ 67,200.00</span>
                </div>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="account-code">1.1.1.01</span>
                  <span>Caja</span>
                </div>
                <div>
                  <span className="debit-amount">$ 85,400.00</span> |
                  <span className="credit-amount">$ 0.00</span>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <span className="account-code">1.1.1.02</span>
                  <span>Banco</span>
                </div>
                <div>
                  <span className="debit-amount">$ 0.00</span> |
                  <span className="credit-amount">$ 98,500.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Resumen por Día</h3>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="me-2">05/07/2023</span>
                  <span>Total movimientos</span>
                </div>
                <div>3</div>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="me-2">07/07/2023</span>
                  <span>Total movimientos</span>
                </div>
                <div>2</div>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="me-2">10/07/2023</span>
                  <span>Total movimientos</span>
                </div>
                <div>2</div>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="me-2">15/07/2023</span>
                  <span>Total movimientos</span>
                </div>
                <div>3</div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <span className="me-2">20/07/2023</span>
                  <span>Total movimientos</span>
                </div>
                <div>3</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibroDiario;
