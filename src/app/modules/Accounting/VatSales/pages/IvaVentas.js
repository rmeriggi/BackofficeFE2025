import React from "react";

import "./ivaVentas.scss";
import usePrint from "../../../hooks/usePrint";
import { Button } from "react-bootstrap";

const IvaVentas = () => {
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
              Listado de IVA Ventas
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

      <div className="filters-section">
        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label">Cliente</label>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar cliente..."
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Nº Factura</label>
            <input
              type="text"
              className="form-control"
              placeholder="Número..."
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Fecha Desde</label>
            <input type="date" className="form-control" />
          </div>
          <div className="col-md-2">
            <label className="form-label">Fecha Hasta</label>
            <input type="date" className="form-control" />
          </div>
          <div className="col-md-2">
            <label className="form-label">Estado</label>
            <select className="form-select">
              <option>Todos</option>
              <option>Cobrada</option>
              <option>Pendiente</option>
              <option>Anulada</option>
            </select>
          </div>
          <div className="col-md-1 d-flex justify-items-center align-items-end pe-2 p-1">
            <button style={{ padding: "6px" }} className="btn btn-primary">
              <i className="fas fa-filter me-2"></i>Filtrar
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card summary-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="card-title">Base Imponible</div>
                  <div className="value">$ 245,800.00</div>
                </div>
                <div className="sale-icon p-3 rounded">
                  <i className="fas fa-chart-line fs-2"></i>
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
                  <div className="card-title">Total IVA</div>
                  <div className="value">$ 51,618.00</div>
                </div>
                <div className="sale-icon p-3 rounded">
                  <i className="fas fa-percentage fs-2"></i>
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
                  <div className="card-title">Total Ventas</div>
                  <div className="value">$ 297,418.00</div>
                </div>
                <div className="sale-icon p-3 rounded">
                  <i className="fas fa-file-invoice-dollar fs-2"></i>
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
              <h2 className="card-title">Detalle de Ventas</h2>
              <div className="export-buttons">
                <button className="btn btn-outline-primary">
                  <i className="fas fa-file-export me-2"></i>Exportar
                </button>
                <button className="btn btn-primary">
                  <i className="fas fa-plus me-2"></i>Nueva Venta
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Nº Factura</th>
                    <th>Base Imponible</th>
                    <th>% IVA</th>
                    <th>Cuota IVA</th>
                    <th>Percep. IIBB</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>15/07/2023</td>
                    <td>Distribuidora Mayorista S.A.</td>
                    <td>FAC-V-2023-00125</td>
                    <td>$ 35,000.00</td>
                    <td>
                      <span className="badge iva-badge-21">21%</span>
                    </td>
                    <td>$ 7,350.00</td>
                    <td>$ 1,050.00</td>
                    <td>$ 43,400.00</td>
                    <td>
                      <span className="status-badge status-paid">Cobrada</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-light action-btn">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="btn btn-sm btn-light action-btn">
                        <i className="fas fa-download"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>12/07/2023</td>
                    <td>Comercial del Plata S.R.L.</td>
                    <td>FAC-V-2023-00478</td>
                    <td>$ 42,500.00</td>
                    <td>
                      <span className="badge iva-badge-21">21%</span>
                    </td>
                    <td>$ 8,925.00</td>
                    <td>$ 1,275.00</td>
                    <td>$ 52,700.00</td>
                    <td>
                      <span className="status-badge status-pending">
                        Pendiente
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-light action-btn">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="btn btn-sm btn-light action-btn">
                        <i className="fas fa-download"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>10/07/2023</td>
                    <td>Supermercados Unidos</td>
                    <td>FAC-V-2023-00342</td>
                    <td>$ 28,000.00</td>
                    <td>
                      <span className="badge iva-badge-10">10.5%</span>
                    </td>
                    <td>$ 2,940.00</td>
                    <td>$ 420.00</td>
                    <td>$ 31,360.00</td>
                    <td>
                      <span className="status-badge status-paid">Cobrada</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-light action-btn">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="btn btn-sm btn-light action-btn">
                        <i className="fas fa-download"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>08/07/2023</td>
                    <td>Tiendas del Oeste</td>
                    <td>FAC-V-2023-00567</td>
                    <td>$ 52,300.00</td>
                    <td>
                      <span className="badge iva-badge-21">21%</span>
                    </td>
                    <td>$ 10,983.00</td>
                    <td>$ 1,569.00</td>
                    <td>$ 64,852.00</td>
                    <td>
                      <span className="status-badge status-paid">Cobrada</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-light action-btn">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="btn btn-sm btn-light action-btn">
                        <i className="fas fa-download"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>05/07/2023</td>
                    <td>Farmacias Salud S.A.</td>
                    <td>FAC-V-2023-00231</td>
                    <td>$ 18,750.00</td>
                    <td>
                      <span className="badge iva-badge-5">5%</span>
                    </td>
                    <td>$ 937.50</td>
                    <td>$ 133.93</td>
                    <td>$ 19,821.43</td>
                    <td>
                      <span className="status-badge status-paid">Cobrada</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-light action-btn">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="btn btn-sm btn-light action-btn">
                        <i className="fas fa-download"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>02/07/2023</td>
                    <td>Distribuidora Cuyana</td>
                    <td>FAC-V-2023-00654</td>
                    <td>$ 37,200.00</td>
                    <td>
                      <span className="badge iva-badge-10">10.5%</span>
                    </td>
                    <td>$ 3,906.00</td>
                    <td>$ 558.00</td>
                    <td>$ 41,664.00</td>
                    <td>
                      <span className="status-badge status-pending">
                        Pendiente
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-light action-btn">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="btn btn-sm btn-light action-btn">
                        <i className="fas fa-download"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>30/06/2023</td>
                    <td>Comercial del Norte</td>
                    <td>FAC-V-2023-00198</td>
                    <td>$ 22,050.00</td>
                    <td>
                      <span className="badge iva-badge-27">27%</span>
                    </td>
                    <td>$ 5,953.50</td>
                    <td>$ 850.50</td>
                    <td>$ 28,854.00</td>
                    <td>
                      <span className="status-badge status-paid">Cobrada</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-light action-btn">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="btn btn-sm btn-light action-btn">
                        <i className="fas fa-download"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="total-row">
                    <td colspan="3" className="text-end">
                      <strong>TOTALES:</strong>
                    </td>
                    <td>
                      <strong>$ 245,800.00</strong>
                    </td>
                    <td></td>
                    <td>
                      <strong>$ 51,618.00</strong>
                    </td>
                    <td>
                      <strong>$ 7,380.43</strong>
                    </td>
                    <td>
                      <strong>$ 297,418.00</strong>
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Resumen por Tipo de IVA</h3>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="badge iva-badge-21 me-2">21%</span>
                  <span>Base Imponible</span>
                </div>
                <div>$ 129,800.00</div>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="badge iva-badge-10 me-2">10.5%</span>
                  <span>Base Imponible</span>
                </div>
                <div>$ 65,200.00</div>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="badge iva-badge-5 me-2">5%</span>
                  <span>Base Imponible</span>
                </div>
                <div>$ 18,750.00</div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <span className="badge iva-badge-27 me-2">27%</span>
                  <span>Base Imponible</span>
                </div>
                <div>$ 32,050.00</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Cuotas IVA</h3>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="badge iva-badge-21 me-2">21%</span>
                  <span>Cuota IVA</span>
                </div>
                <div>$ 27,258.00</div>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="badge iva-badge-10 me-2">10.5%</span>
                  <span>Cuota IVA</span>
                </div>
                <div>$ 6,846.00</div>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="badge iva-badge-5 me-2">5%</span>
                  <span>Cuota IVA</span>
                </div>
                <div>$ 937.50</div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <span className="badge iva-badge-27 me-2">27%</span>
                  <span>Cuota IVA</span>
                </div>
                <div>$ 8,653.50</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Totales por Estado</h3>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="status-badge status-paid me-2">
                    Cobradas
                  </span>
                  <span>Total</span>
                </div>
                <div>$ 188,087.43</div>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="status-badge status-pending me-2">
                    Pendientes
                  </span>
                  <span>Total</span>
                </div>
                <div>$ 94,364.00</div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <span className="status-badge status-canceled me-2">
                    Anuladas
                  </span>
                  <span>Total</span>
                </div>
                <div>$ 0.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IvaVentas;
