import React from "react";

export function ListingTable({ subaccountsData }) {
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
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>ID</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Cuenta</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Subcuenta</th>
                    </tr>
                </thead>
                <tbody>
                    {subaccountsData.length > 0 ? (
                        subaccountsData.map((item, index) => (
                            <tr key={index}>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{item.id}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{item.account}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{item.subAccount}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{ padding: "4px" }}>No se encontraron registros</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
