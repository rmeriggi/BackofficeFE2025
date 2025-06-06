import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { getBalancesListData } from "../../utils/getSumasSaldosData";

export function ListingTable({ fromDate, toDate }) {
    const [balances, setBalances] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                console.log("Ejecutando fetchData en ListingTable con fromDate y toDate:", fromDate, toDate);

                const formattedFromDate = new Date(fromDate).toISOString().split('T')[0];
                const formattedToDate = new Date(toDate).toISOString().split('T')[0];

                console.log("Fechas formateadas:", { formattedFromDate, formattedToDate });

                const data = await getBalancesListData({ fromDate: formattedFromDate, toDate: formattedToDate });
                console.log("Datos recibidos:", data);

                if (data && Array.isArray(data.sumas_saldos)) {
                    setBalances(data.sumas_saldos);
                } else {
                    setBalances([]);
                }
            } catch (error) {
                console.error("Error al obtener los datos de balances en ListingTable:", error);
                setError("Error al obtener los datos de balances");
            }
        }

        if (fromDate && toDate) {
            fetchData();
        }
    }, [fromDate, toDate]);

    return (
        <div style={{ margin: "20px", padding: "10px", border: "1px solid black" }}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
                <thead style={{ backgroundColor: "#d9e1f2" }} >
                    <tr>
                        <th rowSpan="2" style={{ border: "1px solid black", padding: "8px" }}>Descripción</th>
                        <th rowSpan="2" style={{ border: "1px solid black", padding: "8px" }}>Código</th>
                        <th colSpan="3" style={{ border: "1px solid black", padding: "8px" }}>Mensual</th>
                        <th colSpan="4" style={{ border: "1px solid black", padding: "8px" }}>Saldo</th>
                        <th rowSpan="2" style={{ border: "1px solid black", padding: "8px" }}>Moneda/Descripción</th>
                    </tr>
                    <tr>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Saldo Inicial</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Débitos</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Créditos</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Saldo Inicial</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Débito</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Crédito</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Saldo Final</th>
                    </tr>
                </thead>
                <tbody>
                    {balances.length > 0 ? (
                        balances.map((item, index) => (
                            <tr key={index}>
                                <td style={{ border: "1px solid black", padding: "8px" }}>{item.cuenta_contable.descripcion}</td>
                                <td style={{ border: "1px solid black", padding: "8px" }}>{item.cuenta_contable.codigo}</td>
                                <td style={{ border: "1px solid black", padding: "8px" }}>{item.mensual.saldo_inicial}</td>
                                <td style={{ border: "1px solid black", padding: "8px" }}>{item.mensual.debitos}</td>
                                <td style={{ border: "1px solid black", padding: "8px" }}>{item.mensual.creditos}</td>
                                <td style={{ border: "1px solid black", padding: "8px" }}>{item.saldo_inicial}</td>
                                <td style={{ border: "1px solid black", padding: "8px" }}>{item.debitos}</td>
                                <td style={{ border: "1px solid black", padding: "8px" }}>{item.creditos}</td>
                                <td style={{ border: "1px solid black", padding: "8px" }}>{item.saldo}</td>
                                <td style={{ border: "1px solid black", padding: "8px" }}>{item.moneda_d.descripcion}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" style={{ padding: "8px" }}>No se encontraron registros</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

ListingTable.defaultProps = {
    fromDate: '',  
    toDate: '',
};

ListingTable.propTypes = {
    fromDate: PropTypes.string,
    toDate: PropTypes.string,
};
