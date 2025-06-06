import React from "react";

export function ListingTable({ accountingGroupsData, currency, entities }) {
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
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ backgroundColor: "#d9e1f2", textAlign: "center" }}>
                    <tr>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>ID</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Entidad</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Moneda</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Grupo</th>
                    </tr>
                </thead>
                <tbody>
                    {accountingGroupsData.length > 0 ? (
                        accountingGroupsData.map((item, index) => (
                            <tr key={index} style={{ textAlign: "center" }}>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{item.id}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{item.entity}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{item.currency}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px", textAlign: "left", paddingLeft: "10px" }}>{item.group}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ padding: "4px", textAlign: "center" }}>No se encontraron registros</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
