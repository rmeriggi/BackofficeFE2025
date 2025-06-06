/* eslint-disable eqeqeq */
import React from "react";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { ActionColumnFormatter } from "./column-formatters/ActionColumnFormatter";
import { useHistory } from "react-router-dom";
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter";

const filterData = (data, filter) => {
    let filteredData = data;
    if (filter.entity !== "" ) {
        filteredData = data.filter(client => {
            if (
                client.entity.toLowerCase().includes(filter.entity.toLowerCase())
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { dataTable, openModal } ) {
    
    const history = useHistory()

    const openEdit = (row) => {
        history.push(`/cash/balances-itau/edit/${row.id}`, {row})
    }

    const deleteBalanceItau = (id) => {
        openModal(id)
    }

    const columns = [
        {
            dataField: "id",
            text: "ID",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "entity",
            text: "Entidad",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "date",
            text: "Fecha",
            sort: true,
            headerClasses: "text-center",
            classes:"text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "amount",
            text: "Importe",
            sort: true,
            classes:"text-center",
            headerClasses: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter
        },
        {
            dataField: "",
            text: "Acción",
            headerClasses: "text-center",
            classes: "text-center",
            formatter: ActionColumnFormatter,
            formatExtraData: {
                openEdit,
                deleteBalanceItau
            }
        }
    ]
   
    const {
        queryParams,
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = useListingTableContext();

    const filteredData = filterData(dataTable, queryParams.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        filteredData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"saldos"}/>
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
