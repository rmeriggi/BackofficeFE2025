import React from 'react';

export function ListingTable({ dataTable }) {

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
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
                <thead style={{ backgroundColor: "#d9e1f2" }}>
                    <tr>
                        <th colSpan="3" style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Asiento</th>
                        <th colSpan="2" style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Movimientos</th>
                        <th colSpan="2" style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Saldo</th>
                    </tr>
                    <tr>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Fecha</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Número</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Leyenda</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Débito</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Crédito</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Periodo</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Ejercicio</th>
                    </tr>
                </thead>
                <tbody>
                    {dataTable && dataTable.length > 0 ? (
                        dataTable.map((item, index) => (
                            <tr key={index}>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{item.date}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{item.num_asiento}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{item.txt_asiento}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>${item.monto_debe?.toFixed(2) || "0.00"}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>${item.monto_haber?.toFixed(2) || "0.00"}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>${item.saldo_per?.toFixed(2) || "0.00"}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>${item.saldo_eje?.toFixed(2) || "0.00"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ padding: "8px" }}>No se encontraron registros</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
