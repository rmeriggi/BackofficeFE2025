import React, { useEffect, useState } from "react";
import { DateColumnFormatter } from "../../../../../utils/column-formatter/DateColumnFormatter";
import { fetchGeneralBookData } from "./service";

export function ListingTable() {
    const [accountingEntriesData, setAccountingEntriesData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const params = {
                idEntity: 456,
                idCurrency: 1,
                fromDate: "2023-01-01T00:00:00Z",
                toDate: "2023-12-31T23:59:59Z",
                idAuxiliary: 789,
                country: 1
            };

            try {
                const data = await fetchGeneralBookData(params);

                const processedData = data.asientos.map(entry => {
                    let totalDebit = 0;
                    let totalCredit = 0;
                    entry.data.forEach(item => {
                        totalDebit += item.debit;
                        totalCredit += item.credit;
                    });
                    return {
                        ...entry,
                        totalDebit,
                        totalCredit,
                        data: entry.data  
                    };
                });

                setAccountingEntriesData(processedData);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setError("Error al obtener los datos del servidor.");
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ 
            margin: "0 auto", 
            padding: "10px", 
            border: "1px solid #d1d1d1", 
            borderRadius: "8px", 
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", 
            maxWidth: "100%",       
            backgroundColor: "#ffffff"
        }}>
            {error ? (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
                    <thead style={{ backgroundColor: "#d9e1f2" }}>
                        <tr>
                            <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Asiento</th>
                            <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Fecha</th>
                            <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Descripción - Cuenta</th>
                            <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Debe</th>
                            <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Haber</th>
                            <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Total Debe</th>
                            <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Total Haber</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accountingEntriesData.length > 0 ? (
                            accountingEntriesData.map((entry, index) => (
                                <React.Fragment key={index}>
                                    {entry.data.map((item, itemIndex) => (
                                        <tr key={`${entry.id}-${itemIndex}`}>
                                            {itemIndex === 0 && (
                                                <>
                                                    <td rowSpan={entry.data.length} style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{entry.id}</td>
                                                    <td rowSpan={entry.data.length} style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{DateColumnFormatter(entry.date)}</td>
                                                </>
                                            )}
                                            <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{item.description}</td>
                                            <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{item.debit}</td>
                                            <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{item.credit}</td>
                                            {itemIndex === 0 && (
                                                <>
                                                    <td rowSpan={entry.data.length} style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{entry.totalDebit}</td>
                                                    <td rowSpan={entry.data.length} style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{entry.totalCredit}</td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ padding: "4px" }}>No se encontraron registros</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}
