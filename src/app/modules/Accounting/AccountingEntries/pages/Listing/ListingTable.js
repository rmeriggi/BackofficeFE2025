import React from "react";
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter";
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
            balance: totalDebit - totalCredit,
          };
        })
      : [];

  console.log("Processed data:", processedData);

  return (
    <div className="card card-custom gutter-b">
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-head-custom table-vertical-center overflow-hidden">
            <thead>
              <tr>
                <th className="pl-7">
                  <span className="text-dark-75">Asiento</span>
                </th>
                <th>
                  <span className="text-dark-75">Fecha</span>
                </th>
                <th>
                  <span className="text-dark-75">Descripción - Cuenta</span>
                </th>
                <th>
                  <span className="text-dark-75">Debe</span>
                </th>
                <th>
                  <span className="text-dark-75">Haber</span>
                </th>
                <th>
                  <span className="text-dark-75">Total Debe</span>
                </th>
                <th>
                  <span className="text-dark-75">Total Haber</span>
                </th>
                <th>
                  <span className="text-dark-75">Balance</span>
                </th>
                <th>
                  <span className="text-dark-75">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {processedData.length > 0 ? (
                processedData.map((entry, index) => (
                  <React.Fragment key={index}>
                    {entry.data.map((item, itemIndex) => (
                      <tr
                        key={`${entry.id}-${itemIndex}`}
                        className="border-bottom"
                      >
                        {itemIndex === 0 && (
                          <>
                            <td rowSpan={entry.data.length} className="pl-7">
                              <span className="text-dark font-weight-bolder">
                                #{entry.id}
                              </span>
                            </td>
                            <td rowSpan={entry.data.length}>
                              <span className="text-dark font-weight-bolder">
                                {DateColumnFormatter(entry.date)}
                              </span>
                            </td>
                          </>
                        )}
                        <td>
                          <span className="text-dark font-weight-bolder">
                            {item.description}
                          </span>
                        </td>
                        <td>
                          <span className="text-success font-weight-bolder">
                            {AmountColumnFormatter(item.debit)}
                          </span>
                        </td>
                        <td>
                          <span className="text-danger font-weight-bolder">
                            {AmountColumnFormatter(item.credit)}
                          </span>
                        </td>
                        {itemIndex === 0 && (
                          <>
                            <td rowSpan={entry.data.length}>
                              <span className="text-success font-weight-bolder">
                                {AmountColumnFormatter(entry.totalDebit)}
                              </span>
                            </td>
                            <td rowSpan={entry.data.length}>
                              <span className="text-danger font-weight-bolder">
                                {AmountColumnFormatter(entry.totalCredit)}
                              </span>
                            </td>
                            <td rowSpan={entry.data.length}>
                              <span
                                className={`font-weight-bolder ${
                                  entry.balance === 0
                                    ? "text-success"
                                    : "text-warning"
                                }`}
                              >
                                {AmountColumnFormatter(entry.balance)}
                              </span>
                            </td>
                            <td rowSpan={entry.data.length}>
                              <button
                                onClick={() => openDetailsModal(entry.id)}
                                className="btn btn-sm btn-light-primary"
                                title="Ver detalles"
                              >
                                <i className="fas fa-eye"></i>
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
                  <td colSpan="9" className="text-center py-10">
                    <div className="d-flex flex-column align-items-center">
                      <i
                        className="fas fa-search text-muted mb-3"
                        style={{ fontSize: "2rem" }}
                      ></i>
                      <span className="text-muted font-weight-bold">
                        No se encontraron registros
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
