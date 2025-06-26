import { Assessment } from "@material-ui/icons";
import React from "react";
import { Card, CardBody } from "../../../../../../_metronic/_partials/controls";

export default function ModernListingTable({ subaccountsData }) {
  return (
    <Card
      style={{
        border: "none",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        marginBottom: 32,
      }}
    >
      <CardBody style={{ padding: 0 }}>
        <div className="table-responsive">
          <table className="table table-head-custom table-vertical-center overflow-hidden">
            <thead
              style={{
                background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              <tr>
                <th style={{ color: "white", fontWeight: 700 }}>ID</th>
                <th style={{ color: "white", fontWeight: 700 }}>Entidad</th>
                <th style={{ color: "white", fontWeight: 700 }}>Moneda</th>
                <th style={{ color: "white", fontWeight: 700 }}>Cuenta</th>
                <th style={{ color: "white", fontWeight: 700 }}>Subcuenta</th>
              </tr>
            </thead>
            <tbody>
              {subaccountsData.length > 0 ? (
                subaccountsData.map((item) => (
                  <tr key={item.id} className="border-bottom">
                    <td>
                      <span className="text-dark font-weight-bolder">
                        {item.id}
                      </span>
                    </td>
                    <td>
                      <span className="text-dark font-weight-bolder">
                        {item.entity || "N/A"}
                      </span>
                    </td>
                    <td>
                      <span className="text-dark font-weight-bolder">
                        {item.currencyName || "N/A"}
                      </span>
                    </td>
                    <td>
                      <span className="text-dark font-weight-bolder">
                        {item.account || "N/A"}
                      </span>
                    </td>
                    <td>
                      <span className="text-dark font-weight-bolder">
                        {item.subAccount}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-8">
                    <Assessment
                      style={{
                        fontSize: 48,
                        color: "#6c757d",
                        marginBottom: 16,
                      }}
                    />
                    <h5 className="text-muted">
                      No se encontraron subcuentas contables
                    </h5>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
