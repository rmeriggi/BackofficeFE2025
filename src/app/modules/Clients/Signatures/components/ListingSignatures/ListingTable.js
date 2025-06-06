import React, { useState } from "react";
import { defaultSorted } from "./ListingTableHelpers";
import { sortCaret, headerSortingClasses } from "../../../../../../_metronic/_helpers";
import { TableNoRecordsFoundMessage } from "../../../../../components/TableNoRecordsFound";
import { ActionColumnFormatter } from "./column-formatters/ActionColumnFormatter";
import { StatusColumnFormater } from "./column-formatters/StatusColumnFormatter";
import { CancelScheduleSendTwoTone, FormatColorText } from "@material-ui/icons";
import { TextField, colors } from "@material-ui/core";
import { colorBrewer } from "react-syntax-highlighter/dist/esm/styles/hljs";

const groupDataByScheme = (data) => {
    const groupedData = {};
    data.forEach(item => {
        if (!groupedData[item.esquema.trim()]) {
            groupedData[item.esquema.trim()] = [];
        }
        groupedData[item.esquema.trim()].push(item);
    });
    return groupedData;
};

export function ListingTable({ signaturesByClienData, setShowEditModal, setEditInitialData }) {
    const [expandedRows, setExpandedRows] = useState({});
    const groupedData = groupDataByScheme(signaturesByClienData);

    const toggleRow = (esquema) => {
        setExpandedRows(prevState => ({
            ...prevState,
            [esquema]: !prevState[esquema]
        }));
    };

    const columns = [
        {
            dataField: "nameRelation",
            text: "NOMBRE Y APELLIDO",
            headerStyle: {
                textAlign: 'center',
             
            },
            align: 'center',
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            
        },
        {
            dataField: "Status",
            text: "STATUS",
            headerStyle: {
                textAlign: 'center',
            },
            align: 'center',
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: StatusColumnFormater
        },
        {
            dataField: "",
            text: "ACCIÓN",
            formatter: ActionColumnFormatter,
            headerStyle: {
                textAlign: 'center',
                
            },
            align: 'center',
            sort: false,
            formatExtraData: {
                fnAction: (data) => {
                    setEditInitialData(data);
                    setShowEditModal(true);
                },
                fnActionDelete: (data) => {
                    console.log(data);
                },
            }
        }
    ];

    return (
        Object.keys(groupedData).length === 0 ? (
            <TableNoRecordsFoundMessage entities={"registros"} />
        ) : (
            Object.keys(groupedData).map((esquema, index) => (
                <div key={index}>
                    <div
                        onClick={() => toggleRow(esquema)}
                        style={{
                            cursor: "pointer",
                            backgroundColor: expandedRows[esquema] ? "#f0f0f0" : "white",
                            padding: "10px",
                            borderBottom: "1px solid #ddd",
                        }}
                    >
                        <strong>{esquema}</strong>
                        <span style={{ float: "right" }}>
                            {expandedRows[esquema] ? "(-)" : "(+)"}
                        </span>
                    </div>
                    {expandedRows[esquema] && (
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    {columns.map((column, index) => (
                                        <th key={index} style={{ textAlign: column.align || 'left' }}>
                                            {column.text}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {groupedData[esquema].map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {columns.map((column, colIndex) => (
                                            <td key={colIndex} style={{ textAlign: column.align || 'left' }}>
                                                {column.formatter ? column.formatter(row[column.dataField], row, rowIndex, column.formatExtraData) : row[column.dataField]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            ))
        )
    );
}
