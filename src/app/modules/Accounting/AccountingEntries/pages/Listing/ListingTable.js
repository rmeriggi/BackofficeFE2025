import React from "react";
import { DateColumnFormatter } from "../../../../../utils/column-formatter/DateColumnFormatter";

export function ListingTable({ accountingEntriesData, openDetailsModal }) {
  console.log("ListingTable received data:", accountingEntriesData);

  // Procesar los datos si vienen en el formato correcto
  const processedData =
    accountingEntriesData && accountingEntriesData.asientos
      ? accountingEntriesData.asientos.map((entry) => {
          let totalDebit = 0;
          let totalCredit = 0;
          entry.data.forEach((item) => {
            totalDebit += item.debit;
            totalCredit += item.credit;
          });
          return {
            ...entry,
            totalDebit,
            totalCredit,
            data: entry.data,
          };
        })
      : [];

  console.log("Processed data:", processedData);

  return (
    <div
      style={{
        margin: "0 auto",
        padding: "10px",
        border: "1px solid #d1d1d1",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "100%",
        backgroundColor: "#ffffff",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <thead style={{ backgroundColor: "#d9e1f2" }}>
          <tr>
            <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>
              Asiento
            </th>
            <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>
              Fecha
            </th>
            <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>
              Descripción - Cuenta
            </th>
            <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>
              Debe
            </th>
            <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>
              Haber
            </th>
            <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>
              Total Debe
            </th>
            <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>
              Total Haber
            </th>
            <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {processedData.length > 0 ? (
            processedData.map((entry, index) => (
              <React.Fragment key={index}>
                {entry.data.map((item, itemIndex) => (
                  <tr key={`${entry.id}-${itemIndex}`}>
                    {itemIndex === 0 && (
                      <>
                        <td
                          rowSpan={entry.data.length}
                          style={{
                            border: "1px solid #d1d1d1",
                            padding: "4px",
                          }}
                        >
                          {entry.id}
                        </td>
                        <td
                          rowSpan={entry.data.length}
                          style={{
                            border: "1px solid #d1d1d1",
                            padding: "4px",
                          }}
                        >
                          {DateColumnFormatter(entry.date)}
                        </td>
                      </>
                    )}
                    <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>
                      {item.description}
                    </td>
                    <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>
                      {item.debit}
                    </td>
                    <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>
                      {item.credit}
                    </td>
                    {itemIndex === 0 && (
                      <>
                        <td
                          rowSpan={entry.data.length}
                          style={{
                            border: "1px solid #d1d1d1",
                            padding: "4px",
                          }}
                        >
                          {entry.totalDebit}
                        </td>
                        <td
                          rowSpan={entry.data.length}
                          style={{
                            border: "1px solid #d1d1d1",
                            padding: "4px",
                          }}
                        >
                          {entry.totalCredit}
                        </td>
                        <td
                          rowSpan={entry.data.length}
                          style={{
                            border: "1px solid #d1d1d1",
                            padding: "4px",
                          }}
                        >
                          <button
                            onClick={() => openDetailsModal(entry.id)}
                            style={{
                              backgroundColor: "#007bff",
                              color: "white",
                              border: "none",
                              padding: "4px 8px",
                              borderRadius: "4px",
                              cursor: "pointer",
                            }}
                          >
                            Ver Detalles
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ padding: "4px" }}>
                No se encontraron registros
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
