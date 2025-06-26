import { Assessment } from "@material-ui/icons";
import React from "react";
import { Card, CardBody } from "../../../../../../_metronic/_partials/controls";

// Datos mockeados para sumas y saldos
const mockBalancesData = [
  {
    cuenta_contable: {
      descripcion: "Caja",
      codigo: "1.1.1.01",
    },
    mensual: {
      saldo_inicial: "$ 50,000.00",
      debitos: "$ 125,400.00",
      creditos: "$ 85,200.00",
    },
    saldo_inicial: "$ 50,000.00",
    debitos: "$ 125,400.00",
    creditos: "$ 85,200.00",
    saldo: "$ 90,200.00",
    moneda_d: {
      descripcion: "Pesos Argentinos (ARS)",
    },
  },
  {
    cuenta_contable: {
      descripcion: "Banco",
      codigo: "1.1.1.02",
    },
    mensual: {
      saldo_inicial: "$ 250,000.00",
      debitos: "$ 450,000.00",
      creditos: "$ 320,000.00",
    },
    saldo_inicial: "$ 250,000.00",
    debitos: "$ 450,000.00",
    creditos: "$ 320,000.00",
    saldo: "$ 380,000.00",
    moneda_d: {
      descripcion: "Pesos Argentinos (ARS)",
    },
  },
  {
    cuenta_contable: {
      descripcion: "Clientes",
      codigo: "1.1.2.01",
    },
    mensual: {
      saldo_inicial: "$ 180,000.00",
      debitos: "$ 472,600.00",
      creditos: "$ 100,525.00",
    },
    saldo_inicial: "$ 180,000.00",
    debitos: "$ 472,600.00",
    creditos: "$ 100,525.00",
    saldo: "$ 552,075.00",
    moneda_d: {
      descripcion: "Pesos Argentinos (ARS)",
    },
  },
  {
    cuenta_contable: {
      descripcion: "Proveedores",
      codigo: "2.1.1.01",
    },
    mensual: {
      saldo_inicial: "$ 95,000.00",
      debitos: "$ 98,500.00",
      creditos: "$ 150,000.00",
    },
    saldo_inicial: "$ 95,000.00",
    debitos: "$ 98,500.00",
    creditos: "$ 150,000.00",
    saldo: "$ 146,500.00",
    moneda_d: {
      descripcion: "Pesos Argentinos (ARS)",
    },
  },
  {
    cuenta_contable: {
      descripcion: "Ventas",
      codigo: "4.1.1.01",
    },
    mensual: {
      saldo_inicial: "$ 0.00",
      debitos: "$ 12,500.00",
      creditos: "$ 320,000.00",
    },
    saldo_inicial: "$ 0.00",
    debitos: "$ 12,500.00",
    creditos: "$ 320,000.00",
    saldo: "$ 307,500.00",
    moneda_d: {
      descripcion: "Pesos Argentinos (ARS)",
    },
  },
  {
    cuenta_contable: {
      descripcion: "IVA Débito Fiscal",
      codigo: "1.3.1.01",
    },
    mensual: {
      saldo_inicial: "$ 0.00",
      debitos: "$ 2,625.00",
      creditos: "$ 67,200.00",
    },
    saldo_inicial: "$ 0.00",
    debitos: "$ 2,625.00",
    creditos: "$ 67,200.00",
    saldo: "$ 64,575.00",
    moneda_d: {
      descripcion: "Pesos Argentinos (ARS)",
    },
  },
];

export default function ModernListingTable({ fromDate, toDate }) {
  return (
    <Card
      style={{
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        marginBottom: 32,
      }}
    >
      <CardBody style={{ padding: 0 }}>
        <div className="table-responsive">
          <table className="table table-head-custom table-vertical-center overflow-hidden">
            <thead
              style={{
                background: "#f8f9fa",
                borderBottom: "2px solid #dee2e6",
              }}
            >
              <tr>
                <th
                  rowSpan="2"
                  style={{
                    color: "#495057",
                    fontWeight: 600,
                    verticalAlign: "middle",
                    borderBottom: "1px solid #dee2e6",
                  }}
                >
                  Descripción
                </th>
                <th
                  rowSpan="2"
                  style={{
                    color: "#495057",
                    fontWeight: 600,
                    verticalAlign: "middle",
                    borderBottom: "1px solid #dee2e6",
                  }}
                >
                  Código
                </th>
                <th
                  colSpan="3"
                  style={{
                    color: "#495057",
                    fontWeight: 600,
                    textAlign: "center",
                    borderBottom: "1px solid #dee2e6",
                  }}
                >
                  Mensual
                </th>
                <th
                  colSpan="4"
                  style={{
                    color: "#495057",
                    fontWeight: 600,
                    textAlign: "center",
                    borderBottom: "1px solid #dee2e6",
                  }}
                >
                  Saldo
                </th>
                <th
                  rowSpan="2"
                  style={{
                    color: "#495057",
                    fontWeight: 600,
                    verticalAlign: "middle",
                    borderBottom: "1px solid #dee2e6",
                  }}
                >
                  Moneda/Descripción
                </th>
              </tr>
              <tr>
                <th
                  style={{
                    color: "#6c757d",
                    fontWeight: 500,
                    fontSize: "12px",
                    borderBottom: "1px solid #dee2e6",
                  }}
                >
                  Saldo Inicial
                </th>
                <th
                  style={{
                    color: "#6c757d",
                    fontWeight: 500,
                    fontSize: "12px",
                    borderBottom: "1px solid #dee2e6",
                  }}
                >
                  Débitos
                </th>
                <th
                  style={{
                    color: "#6c757d",
                    fontWeight: 500,
                    fontSize: "12px",
                    borderBottom: "1px solid #dee2e6",
                  }}
                >
                  Créditos
                </th>
                <th
                  style={{
                    color: "#6c757d",
                    fontWeight: 500,
                    fontSize: "12px",
                    borderBottom: "1px solid #dee2e6",
                  }}
                >
                  Saldo Inicial
                </th>
                <th
                  style={{
                    color: "#6c757d",
                    fontWeight: 500,
                    fontSize: "12px",
                    borderBottom: "1px solid #dee2e6",
                  }}
                >
                  Débito
                </th>
                <th
                  style={{
                    color: "#6c757d",
                    fontWeight: 500,
                    fontSize: "12px",
                    borderBottom: "1px solid #dee2e6",
                  }}
                >
                  Crédito
                </th>
                <th
                  style={{
                    color: "#6c757d",
                    fontWeight: 500,
                    fontSize: "12px",
                    borderBottom: "1px solid #dee2e6",
                  }}
                >
                  Saldo Final
                </th>
              </tr>
            </thead>
            <tbody>
              {mockBalancesData.length > 0 ? (
                mockBalancesData.map((item, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #f1f3f4" }}>
                    <td style={{ padding: "12px 8px" }}>
                      <span className="text-dark font-weight-bold">
                        {item.cuenta_contable.descripcion}
                      </span>
                    </td>
                    <td style={{ padding: "12px 8px" }}>
                      <span className="text-dark font-weight-bold">
                        {item.cuenta_contable.codigo}
                      </span>
                    </td>
                    <td style={{ padding: "12px 8px" }}>
                      <span className="text-dark font-weight-bold">
                        {item.mensual.saldo_inicial}
                      </span>
                    </td>
                    <td style={{ padding: "12px 8px" }}>
                      <span className="text-dark font-weight-bold">
                        {item.mensual.debitos}
                      </span>
                    </td>
                    <td style={{ padding: "12px 8px" }}>
                      <span className="text-dark font-weight-bold">
                        {item.mensual.creditos}
                      </span>
                    </td>
                    <td style={{ padding: "12px 8px" }}>
                      <span className="text-dark font-weight-bold">
                        {item.saldo_inicial}
                      </span>
                    </td>
                    <td style={{ padding: "12px 8px" }}>
                      <span className="text-dark font-weight-bold">
                        {item.debitos}
                      </span>
                    </td>
                    <td style={{ padding: "12px 8px" }}>
                      <span className="text-dark font-weight-bold">
                        {item.creditos}
                      </span>
                    </td>
                    <td style={{ padding: "12px 8px" }}>
                      <span className="text-dark font-weight-bold">
                        {item.saldo}
                      </span>
                    </td>
                    <td style={{ padding: "12px 8px" }}>
                      <span className="text-muted font-size-sm">
                        {item.moneda_d.descripcion}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="text-center py-8">
                    <Assessment
                      style={{
                        fontSize: 48,
                        color: "#6c757d",
                        marginBottom: 16,
                      }}
                    />
                    <h5 className="text-muted">
                      No se encontraron datos de sumas y saldos
                    </h5>
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot
              style={{ background: "#f8f9fa", borderTop: "2px solid #dee2e6" }}
            >
              <tr>
                <td
                  colSpan="2"
                  className="text-end font-weight-bold"
                  style={{ padding: "12px 8px" }}
                >
                  <strong>TOTALES:</strong>
                </td>
                <td
                  className="font-weight-bold"
                  style={{ padding: "12px 8px" }}
                >
                  $ 570,000.00
                </td>
                <td
                  className="font-weight-bold"
                  style={{ padding: "12px 8px" }}
                >
                  $ 1,161,225.00
                </td>
                <td
                  className="font-weight-bold"
                  style={{ padding: "12px 8px" }}
                >
                  $ 1,042,925.00
                </td>
                <td
                  className="font-weight-bold"
                  style={{ padding: "12px 8px" }}
                >
                  $ 570,000.00
                </td>
                <td
                  className="font-weight-bold"
                  style={{ padding: "12px 8px" }}
                >
                  $ 1,161,225.00
                </td>
                <td
                  className="font-weight-bold"
                  style={{ padding: "12px 8px" }}
                >
                  $ 1,042,925.00
                </td>
                <td
                  className="font-weight-bold"
                  style={{ padding: "12px 8px" }}
                >
                  $ 1,540,850.00
                </td>
                <td style={{ padding: "12px 8px" }}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
