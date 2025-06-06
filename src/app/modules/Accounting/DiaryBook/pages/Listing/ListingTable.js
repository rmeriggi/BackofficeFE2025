import React from "react";
import PropTypes from 'prop-types';

export function ListingTable({ dataTable }) {
    return (
        <div style={{ margin: "20px", padding: "10px", border: "1px solid black" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center"}}>
                <thead style={{ backgroundColor: "#d9e1f2" }}>
                    <tr >
                        <th colSpan="2" style={{ border: "1px solid black", padding: "8px" }}>Cuenta Contable</th>
                    </tr>
                    <tr>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Número de Asiento</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Descripción</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Debe</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Haber</th>
                    </tr>
                </thead>
                <tbody>
                    {dataTable.length > 0 ? (
                        dataTable.map((asiento) => (
                            asiento.data.map((entry, index) => (
                                <tr key={`${asiento.id}-${index}`}>
                                    <td style={{ border: "1px solid black", padding: "8px" }}>{asiento.id}</td>
                                    <td style={{ border: "1px solid black", padding: "8px" }}>{entry.description}</td>
                                    <td style={{ border: "1px solid black", padding: "8px" }}>{entry.debit}</td>
                                    <td style={{ border: "1px solid black", padding: "8px" }}>{entry.credit}</td>
                                </tr>
                            ))
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ padding: "8px" }}>No se encontraron registros</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

// Definición de tipos de las props
ListingTable.propTypes = {
    dataTable: PropTypes.array.isRequired, // Esperamos un array de datos
};
