import React from 'react';

export default function ListingTable({ dataTable }) {
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
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Código</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Descripción</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Alias</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Saldo</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Importe Origen</th>
                    </tr>
                </thead>
                <tbody>
                    {dataTable.length > 0 ? (
                        dataTable.map((item, index) => (
                            <tr key={index}>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{item.codigo}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{item.descripcion}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{item.alias}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{item.saldo}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{item.importeOrigen}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ padding: "4px" }}>No se encontraron registros</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
