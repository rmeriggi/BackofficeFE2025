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
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Fecha</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Tipo</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Número</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Razón Social</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>CUIT</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Tp de Contrib.</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Importe Gravado</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Importe No Gravado</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>IVA 10.5%</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>IVA 21%</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>IVA 27%</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Percepción IVA</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Percepción IIBB</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Importe Exento</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Importe Otros</th>
                        <th style={{ border: "1px solid #d1d1d1", padding: "4px" }}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {dataTable.length > 0 ? (
                        dataTable.map((item, index) => (
                            <tr key={index}>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{item.date}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{item.comprobante}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{item.numero}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{item.provider}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{item.cuit}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>{item.cond_IVA}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>${item.importeGravado.toFixed(2)}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>${item.importeNoGravado.toFixed(2)}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>${item.iva105.toFixed(2)}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>${item.iva21.toFixed(2)}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>${item.iva27.toFixed(2)}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>${item.percepcionIVA.toFixed(2)}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>${item.percepcionIIBB.toFixed(2)}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>${item.importeExento.toFixed(2)}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>${item.importeOtros.toFixed(2)}</td>
                                <td style={{ border: "1px solid #d1d1d1", padding: "4px" }}>${item.total.toFixed(2)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="16" style={{ padding: "4px" }}>No se encontraron registros</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
