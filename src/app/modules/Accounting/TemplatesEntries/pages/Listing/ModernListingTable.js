import { Assessment } from "@material-ui/icons";
import React from "react";
import { Card, CardBody } from "../../../../../../_metronic/_partials/controls";

export default function ModernListingTable({ seatingTemplates }) {
  console.log(seatingTemplates);
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
                <th style={{ color: "white", fontWeight: 700 }}>Módulo</th>
                <th style={{ color: "white", fontWeight: 700 }}>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {seatingTemplates.length > 0 ? (
                seatingTemplates.map((item) => (
                  <tr key={item.id} className="border-bottom">
                    <td>
                      <span className="text-dark font-weight-bolder">
                        {item.id}
                      </span>
                    </td>
                    <td>
                      <span className="text-dark font-weight-bolder">
                        {item.module || "N/A"}
                      </span>
                    </td>
                    <td>
                      <span className="text-dark font-weight-bolder">
                        {item.description}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-8">
                    <Assessment
                      style={{
                        fontSize: 48,
                        color: "#6c757d",
                        marginBottom: 16,
                      }}
                    />
                    <h5 className="text-muted">
                      No se encontraron plantillas de asientos
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
