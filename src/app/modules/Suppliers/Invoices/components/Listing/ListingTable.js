import React from "react";
import { useListingTableContext } from "./ListingTableContext";
import { defaultSorted, sizePerPageList } from "./ListingTableHelpers";
import { PaginatedTable } from "../../../../../components";
import { sortCaret, headerSortingClasses } from "../../../../../../_metronic/_helpers";
import { TableNoRecordsFoundMessage } from "../../../../../components/TableNoRecordsFound";
import { AmountWithDecimalsColumnFormatter } from "./column-formatters/AmountWithDecimalsColumnFormatter";
import { useHistory } from "react-router";

const filterData = (accountsData, filter) => {
    let filteredData = accountsData;
    if (filter.instrumento !== "") {
        filteredData = accountsData.filter(account => {
            if (account?.instrumento?.trim().toLowerCase().includes(filter.instrumento.toLowerCase())) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
};

export function ListingTable({ pnlData, setEditInitialData, setShowEditModal, openDeleteModal }) {
    const history = useHistory();

    const columns = [
        {
            dataField: "businnes_name",
            text: "SUBCLIENTE",
            headerStyle: { textAlign: 'left' },
            align: 'left',
            sort: true,
            sortValue: (cell) => parseInt(cell, 10),
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "cuit",
            text: "CUIT/CUIL",
            headerStyle: { textAlign: 'left' },
            align: 'left',
            sort: true,
            sortValue: (cell) => parseInt(cell, 10),
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "amount",
            text: "MONTO",
            headerStyle: { textAlign: 'right' },
            align: 'right',
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountWithDecimalsColumnFormatter
        },
        {
            dataField: "date",
            text: "FECHA DE VENCIMIENTO",
            headerStyle: { textAlign: 'right' },
            style: (cell, row) => ({
                backgroundColor: row.instrumento === 'Total' && '#F8F9F9',
                color: row.difpor < 0 ? 'red' : row.difpor > 0 && 'green'
            }),
            align: 'right',
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "executed",
            text: "ESTADO",
            headerStyle: { textAlign: 'right' },
            style: (cell, row) => ({
                backgroundColor: row.instrumento === 'Total' && '#F8F9F9',
                color: row.difpor < 0 ? 'red' : row.difpor > 0 && 'green'
            }),
            align: 'right',
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "",
            text: "Acción",
            formatter: (cell, row) => (
                <>
                    <button
                        onClick={() => history.push(`/suppliers/invoices/edit/${row.id}`)}
                        style={{
                            backgroundColor: "#3A7EFF",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            padding: "8px 16px",
                            cursor: "pointer",
                            fontSize: "14px"
                        }}
                        title="Editar"
                    >
                        Editar
                    </button>
                    <button
                        onClick={() => openDeleteModal(row.id)} 
                        style={{ color: "red", background: "none", border: "none", cursor: "pointer" }}
                        title="Eliminar"
                    >
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </>
            )
        }
    ];

    const {
        queryParamsInstrument,
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = useListingTableContext();

    const filteredData = filterData(pnlData, queryParamsInstrument.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        filteredData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"registros"} />
        ) : (
            <PaginatedTable
                columns={columns}
                data={filteredData}
                defaultSorted={defaultSorted}
                paginationOptions={paginationOptions}
                setSize={setSize}
                setPageNumber={setPageNumber}
            />
        )
    );
}
