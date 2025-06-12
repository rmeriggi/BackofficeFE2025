import React from "react";

import "./ivaCompras.scss";
import usePrint from "../../../hooks/usePrint";
import { Button } from "react-bootstrap";

const IvaCompras = () => {
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
              Listado de IVA Compras
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
            <label className="form-label">Proveedor</label>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar proveedor..."
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
            <label className="form-label d-block">Estado</label>
            <select className="form-select">
              <option>Todos</option>
              <option>Pagada</option>
              <option>Pendiente</option>
              <option>Cancelada</option>
            </select>
          </div>
          <div className="col-md-1 d-flex justify-items-center align-items-end pe-2 p-1">
            <button style={{ padding: "6px" }} className="btn btn-primary">
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
                  <div className="card-title">Base Imponible</div>
                  <div className="value">$ 18,750.00</div>
                </div>
                <div className="bg-light p-3 rounded">
                  <i className="fas fa-receipt text-primary fs-2"></i>
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
                  <div className="value">$ 3,125.00</div>
                </div>
                <div className="bg-light p-3 rounded">
                  <i className="fas fa-percentage text-success fs-2"></i>
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
                  <div className="card-title">Total Facturas</div>
                  <div className="value">$ 21,875.00</div>
                </div>
                <div className="bg-light p-3 rounded">
                  <i className="fas fa-file-invoice text-info fs-2"></i>
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
              <h2 className="card-title">Detalle de Compras</h2>
              <div className="export-buttons no-print">
                <button className="btn btn-outline-primary">
                  <i className="fas fa-file-export me-2"></i>Exportar
                </button>
                <button className="btn btn-primary">
                  <i className="fas fa-plus me-2"></i>Nueva Factura
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Proveedor</th>
                    <th>Nº Factura</th>
                    <th>Base Imponible</th>
                    <th>% IVA</th>
                    <th>Cuota IVA</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th className="no-print">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>15/06/2023</td>
                    <td>Suministros Tecnológicos S.L.</td>
                    <td>FAC-2023-00125</td>
                    <td>$ 1,200.00</td>
                    <td>
                      <span className="badge iva-badge-21">21%</span>
                    </td>
                    <td>$ 252.00</td>
                    <td>$ 1,452.00</td>
                    <td>
                      <span className="status-badge status-paid">Pagada</span>
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
                    <td>12/06/2023</td>
                    <td>Mobiliario Office S.A.</td>
                    <td>FAC-2023-00478</td>
                    <td>$ 3,500.00</td>
                    <td>
                      <span className="badge iva-badge-21">21%</span>
                    </td>
                    <td>$ 735.00</td>
                    <td>$ 4,235.00</td>
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
                    <td>10/06/2023</td>
                    <td>Distribuciones Alimentarias</td>
                    <td>FAC-2023-00342</td>
                    <td>$ 850.00</td>
                    <td>
                      <span className="badge iva-badge-10">10%</span>
                    </td>
                    <td>$ 85.00</td>
                    <td>$ 935.00</td>
                    <td>
                      <span className="status-badge status-paid">Pagada</span>
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
                    <td>08/06/2023</td>
                    <td>Servicios Informáticos Globales</td>
                    <td>FAC-2023-00567</td>
                    <td>$ 2,300.00</td>
                    <td>
                      <span className="badge iva-badge-21">21%</span>
                    </td>
                    <td>$ 483.00</td>
                    <td>$ 2,783.00</td>
                    <td>
                      <span className="status-badge status-paid">Pagada</span>
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
                    <td>05/06/2023</td>
                    <td>Editorial Libros Educativos</td>
                    <td>FAC-2023-00231</td>
                    <td>$ 1,800.00</td>
                    <td>
                      <span className="badge iva-badge-4">4%</span>
                    </td>
                    <td>$ 72.00</td>
                    <td>$ 1,872.00</td>
                    <td>
                      <span className="status-badge status-canceled">
                        Cancelada
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
                    <td>02/06/2023</td>
                    <td>Materiales Construcción S.L.</td>
                    <td>FAC-2023-00654</td>
                    <td>$ 4,200.00</td>
                    <td>
                      <span className="badge iva-badge-10">10%</span>
                    </td>
                    <td>$ 420.00</td>
                    <td>$ 4,620.00</td>
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
                    <td>30/05/2023</td>
                    <td>Logística Express</td>
                    <td>FAC-2023-00198</td>
                    <td>$ 1,500.00</td>
                    <td>
                      <span className="badge iva-badge-21">21%</span>
                    </td>
                    <td>$ 315.00</td>
                    <td>$ 1,815.00</td>
                    <td>
                      <span className="status-badge status-paid">Pagada</span>
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
                    <td>28/05/2023</td>
                    <td>Suministros Industriales</td>
                    <td>FAC-2023-00376</td>
                    <td>$ 3,400.00</td>
                    <td>
                      <span className="badge iva-badge-21">21%</span>
                    </td>
                    <td>$ 714.00</td>
                    <td>$ 4,114.00</td>
                    <td>
                      <span className="status-badge status-paid">Pagada</span>
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
                      <strong>$ 18,750.00</strong>
                    </td>
                    <td></td>
                    <td>
                      <strong>$ 3,125.00</strong>
                    </td>
                    <td>
                      <strong>$ 21,875.00</strong>
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
                <div>$ 11,700.00</div>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="badge iva-badge-10 me-2">10%</span>
                  <span>Base Imponible</span>
                </div>
                <div>$ 5,050.00</div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <span className="badge iva-badge-4 me-2">4%</span>
                  <span>Base Imponible</span>
                </div>
                <div>$ 2,000.00</div>
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
                <div>$ 2,457.00</div>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="badge iva-badge-10 me-2">10%</span>
                  <span>Cuota IVA</span>
                </div>
                <div>$ 505.00</div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <span className="badge iva-badge-4 me-2">4%</span>
                  <span>Cuota IVA</span>
                </div>
                <div>$ 80.00</div>
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
                  <span className="status-badge status-paid me-2">Pagadas</span>
                  <span>Total</span>
                </div>
                <div>$ 16,271.00</div>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="status-badge status-pending me-2">
                    Pendientes
                  </span>
                  <span>Total</span>
                </div>
                <div>$ 8,855.00</div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <span className="status-badge status-canceled me-2">
                    Canceladas
                  </span>
                  <span>Total</span>
                </div>
                <div>$ 1,872.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IvaCompras;
