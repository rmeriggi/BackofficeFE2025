import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import usePrint from "../../../../hooks/usePrint";
import "./sumasSaldos.scss";

const Listing = () => {
  const { handlePrint, printRef } = usePrint();
  const [balancesData, setBalancesData] = useState({ total: 0, balances: [] });
  const [fromDate, setFromDate] = useState("2023-01-01");
  const [toDate, setToDate] = useState("2023-12-31");

  useEffect(() => {
    // Simular carga de datos
    const mockBalances = [
      {
        cuenta_contable: { descripcion: "Caja", codigo: "1.1.1.01" },
        mensual: {
          saldo_inicial: "$ 50,000.00",
          debitos: "$ 125,400.00",
          creditos: "$ 85,200.00",
        },
        saldo_inicial: "$ 50,000.00",
        debitos: "$ 125,400.00",
        creditos: "$ 85,200.00",
        saldo: "$ 90,200.00",
        moneda_d: { descripcion: "Pesos Argentinos (ARS)" },
      },
      {
        cuenta_contable: { descripcion: "Banco", codigo: "1.1.1.02" },
        mensual: {
          saldo_inicial: "$ 250,000.00",
          debitos: "$ 450,000.00",
          creditos: "$ 320,000.00",
        },
        saldo_inicial: "$ 250,000.00",
        debitos: "$ 450,000.00",
        creditos: "$ 320,000.00",
        saldo: "$ 380,000.00",
        moneda_d: { descripcion: "Pesos Argentinos (ARS)" },
      },
      {
        cuenta_contable: { descripcion: "Clientes", codigo: "1.1.2.01" },
        mensual: {
          saldo_inicial: "$ 180,000.00",
          debitos: "$ 472,600.00",
          creditos: "$ 100,525.00",
        },
        saldo_inicial: "$ 180,000.00",
        debitos: "$ 472,600.00",
        creditos: "$ 100,525.00",
        saldo: "$ 552,075.00",
        moneda_d: { descripcion: "Pesos Argentinos (ARS)" },
      },
    ];
    setBalancesData({ total: mockBalances.length, balances: mockBalances });
  }, []);

  /*   const handleDownloadExcel = () => {
    const visibleData = balancesData.balances.map((item) => ({
      Descripción: item.cuenta_contable.descripcion,
      Código: item.cuenta_contable.codigo,
      "Saldo Inicial (Mensual)": item.mensual.saldo_inicial,
      "Débitos (Mensual)": item.mensual.debitos,
      "Créditos (Mensual)": item.mensual.creditos,
      "Saldo Inicial": item.saldo_inicial,
      Débito: item.debitos,
      Crédito: item.creditos,
      "Saldo Final": item.saldo,
      Moneda: item.moneda_d.descripcion,
    }));

    const worksheet = XLSX.utils.json_to_sheet(visibleData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sumas y Saldos");
    XLSX.writeFile(workbook, "Sumas_y_Saldos.xlsx");
  };
 */
  return (
    <div className="container-fluid" ref={printRef}>
      <div
        className="card-header border-0 py-5 d-flex justify-content-between align-items-center"
        style={{ marginBottom: "2rem" }}
      >
        <div>
          <h3 className="card-title align-items-start flex-column mb-1">
            <span className="card-label font-weight-bolder text-dark d-block">
              Sumas y Saldos
            </span>
          </h3>
          <small>
            Período: {fromDate} - {toDate}
          </small>
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
            <input
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Fecha Hasta</label>
            <input
              type="date"
              className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
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
          <div className="col-md-2">
            <label className="form-label">Moneda</label>
            <select className="form-select">
              <option>Todas las monedas</option>
              <option>Pesos Argentinos (ARS)</option>
              <option>Dólares (USD)</option>
              <option>Euros (EUR)</option>
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
                  <div className="value">$ 1,161,225.00</div>
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
                  <div className="value">$ 1,042,925.00</div>
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
                  <div className="card-title">Cuentas Contables</div>
                  <div className="value">6</div>
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
              <h2 className="card-title">Sumas y Saldos</h2>
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
                    <th>Descripción</th>
                    <th>Código</th>
                    <th>Saldo Inicial (Mensual)</th>
                    <th>Débitos (Mensual)</th>
                    <th>Créditos (Mensual)</th>
                    <th>Saldo Inicial</th>
                    <th>Débito</th>
                    <th>Crédito</th>
                    <th>Saldo Final</th>
                    <th>Moneda</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="account-name">Caja</span>
                    </td>
                    <td>
                      <span className="account-code">1.1.1.01</span>
                    </td>
                    <td className="debit-amount">$ 50,000.00</td>
                    <td className="debit-amount">$ 125,400.00</td>
                    <td className="credit-amount">$ 85,200.00</td>
                    <td className="debit-amount">$ 50,000.00</td>
                    <td className="debit-amount">$ 125,400.00</td>
                    <td className="credit-amount">$ 85,200.00</td>
                    <td className="debit-amount">$ 90,200.00</td>
                    <td>
                      <span className="comprobante-badge">
                        Pesos Argentinos (ARS)
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="account-name">Banco</span>
                    </td>
                    <td>
                      <span className="account-code">1.1.1.02</span>
                    </td>
                    <td className="debit-amount">$ 250,000.00</td>
                    <td className="debit-amount">$ 450,000.00</td>
                    <td className="credit-amount">$ 320,000.00</td>
                    <td className="debit-amount">$ 250,000.00</td>
                    <td className="debit-amount">$ 450,000.00</td>
                    <td className="credit-amount">$ 320,000.00</td>
                    <td className="debit-amount">$ 380,000.00</td>
                    <td>
                      <span className="comprobante-badge">
                        Pesos Argentinos (ARS)
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="account-name">Clientes</span>
                    </td>
                    <td>
                      <span className="account-code">1.1.2.01</span>
                    </td>
                    <td className="debit-amount">$ 180,000.00</td>
                    <td className="debit-amount">$ 472,600.00</td>
                    <td className="credit-amount">$ 100,525.00</td>
                    <td className="debit-amount">$ 180,000.00</td>
                    <td className="debit-amount">$ 472,600.00</td>
                    <td className="credit-amount">$ 100,525.00</td>
                    <td className="debit-amount">$ 552,075.00</td>
                    <td>
                      <span className="comprobante-badge">
                        Pesos Argentinos (ARS)
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="account-name">Proveedores</span>
                    </td>
                    <td>
                      <span className="account-code">2.1.1.01</span>
                    </td>
                    <td className="debit-amount">$ 95,000.00</td>
                    <td className="debit-amount">$ 98,500.00</td>
                    <td className="credit-amount">$ 150,000.00</td>
                    <td className="debit-amount">$ 95,000.00</td>
                    <td className="debit-amount">$ 98,500.00</td>
                    <td className="credit-amount">$ 150,000.00</td>
                    <td className="debit-amount">$ 146,500.00</td>
                    <td>
                      <span className="comprobante-badge">
                        Pesos Argentinos (ARS)
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="account-name">Ventas</span>
                    </td>
                    <td>
                      <span className="account-code">4.1.1.01</span>
                    </td>
                    <td className="debit-amount">$ 0.00</td>
                    <td className="debit-amount">$ 12,500.00</td>
                    <td className="credit-amount">$ 320,000.00</td>
                    <td className="debit-amount">$ 0.00</td>
                    <td className="debit-amount">$ 12,500.00</td>
                    <td className="credit-amount">$ 320,000.00</td>
                    <td className="debit-amount">$ 307,500.00</td>
                    <td>
                      <span className="comprobante-badge">
                        Pesos Argentinos (ARS)
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="account-name">IVA Débito Fiscal</span>
                    </td>
                    <td>
                      <span className="account-code">1.3.1.01</span>
                    </td>
                    <td className="debit-amount">$ 0.00</td>
                    <td className="debit-amount">$ 2,625.00</td>
                    <td className="credit-amount">$ 67,200.00</td>
                    <td className="debit-amount">$ 0.00</td>
                    <td className="debit-amount">$ 2,625.00</td>
                    <td className="credit-amount">$ 67,200.00</td>
                    <td className="debit-amount">$ 64,575.00</td>
                    <td>
                      <span className="comprobante-badge">
                        Pesos Argentinos (ARS)
                      </span>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="total-row">
                    <td colSpan="2" className="text-end">
                      <strong>TOTALES:</strong>
                    </td>
                    <td className="debit-amount">
                      <strong>$ 570,000.00</strong>
                    </td>
                    <td className="debit-amount">
                      <strong>$ 1,161,225.00</strong>
                    </td>
                    <td className="credit-amount">
                      <strong>$ 1,042,925.00</strong>
                    </td>
                    <td className="debit-amount">
                      <strong>$ 570,000.00</strong>
                    </td>
                    <td className="debit-amount">
                      <strong>$ 1,161,225.00</strong>
                    </td>
                    <td className="credit-amount">
                      <strong>$ 1,042,925.00</strong>
                    </td>
                    <td className="debit-amount">
                      <strong>$ 1,540,850.00</strong>
                    </td>
                    <td></td>
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
              <h3 className="card-title">Resumen por Cuenta</h3>
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
                  <span className="debit-amount">$ 125,400.00</span> |
                  <span className="credit-amount">$ 85,200.00</span>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <span className="account-code">1.1.1.02</span>
                  <span>Banco</span>
                </div>
                <div>
                  <span className="debit-amount">$ 450,000.00</span> |
                  <span className="credit-amount">$ 320,000.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Estadísticas del Período</h3>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="me-2">Total Débitos</span>
                  <span>Movimientos</span>
                </div>
                <div>1,161,225</div>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="me-2">Total Créditos</span>
                  <span>Movimientos</span>
                </div>
                <div>1,042,925</div>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="me-2">Saldo Final</span>
                  <span>Neto</span>
                </div>
                <div>118,300</div>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-2 border-bottom">
                <div>
                  <span className="me-2">Cuentas</span>
                  <span>Activas</span>
                </div>
                <div>6</div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <span className="me-2">Moneda</span>
                  <span>Principal</span>
                </div>
                <div>ARS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
