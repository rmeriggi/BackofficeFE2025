/* eslint-disable eqeqeq */
import React from "react";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter"
import { DateColumnFormatter } from "../../../../../utils/column-formatter/DateColumnFormatter";
import { ActionColumnFormatter } from "./column-formatters/ActionColumnFormatter";

const filterData = (movementsData, filter) => {
    let filteredData = movementsData;
    if (filter.transferId !== "" ) {
        filteredData = movementsData.filter(movement => {
            if (
                movement.transferId?.trim().toLowerCase().includes(filter.transferId.toLowerCase())
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

const filterDataAll = (movementsData, filter) => {
    let filteredData = movementsData;
    if (filter.searchTextAll !== "") {
        filteredData = movementsData.filter(movement => {
            if (
                movement.ownerName?.trim().toLowerCase().includes(filter.searchTextAll.toLowerCase())
            ) {
                return true;
            }

            if (
                movement.cuit?.trim().toLowerCase().includes(filter.searchTextAll.toLowerCase())
            ) {
                return true;
            }

            if (
                movement.cbu?.trim().toLowerCase().includes(filter.searchTextAll.toLowerCase())
            ) {
                return true;
            }

            if (
                movement.amount?.trim().toLowerCase().includes(filter.searchTextAll.toLowerCase())
            ) {
                return true;
            }

            if (
                movement.currency?.trim().toLowerCase().includes(filter.searchTextAll.toLowerCase())
            ) {
                return true;
            }

            if (
                movement.date?.trim().toLowerCase().includes(filter.searchTextAll.toLowerCase())
            ) {
                return true;
            }

            return false;
        });
    }

    return filteredData;
}

export function ListingTable( { dataTable, openModal, openModal1} ) {
    
    const columns = [
        {
            dataField: "ownerName",
            text: "Nombre|Destino",
            sort: true,
            classes:"text-center",
            headerClasses: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "cuit",
            text: "Cuit",
            sort: true,
            headerClasses: "text-center",
            classes:"text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "cbu",
            text: "CBU",
            headerClasses: "text-center",
            headerSortingClasses,
        },
        {
            dataField: "currency",
            text: "Moneda",
            classes:"text-center",
            headerClasses: "text-center",
            headerSortingClasses,
        },
        {
            dataField: "amount",
            text: "Importe",
            classes:"text-center",
            headerClasses: "text-center",
            headerSortingClasses,
            formatter: AmountColumnFormatter,
        },
        {
            dataField: "date",
            text: "Fecha",
            classes:"text-center",
            headerClasses: "text-center",
            headerSortingClasses,
            formatter: DateColumnFormatter
        },
        {
            dataField: "transferId",
            text: "N° de transferencia",
            sort: false,
            classes:"text-center",
            headerClasses: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "",
            text: "Acción",
            formatter: ActionColumnFormatter,
            formatExtraData: {
                openModal,
                openModal1
            }
        },
    ]
   
    const {
        queryParams,
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = useListingTableContext();

    const filteredData = filterData(dataTable, queryParams.filter)

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };


    return (
        dataTable.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"Operaciones para autorizar"}/>
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
    )
}
