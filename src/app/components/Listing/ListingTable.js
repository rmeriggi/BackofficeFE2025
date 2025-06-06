import React from "react";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {PaginatedTable} from "../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../components/TableNoRecordsFound";
import { useTableColumns } from "../../hooks/useTableColumns";

export function ListingTable( { listingData, contextValues, ...props } ) {

    const {
        columns,
        fnFilter,
        name,
        formatsColumns
    } = props

    const {
        queryParams,
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = contextValues

    const columnsData = useTableColumns(columns, formatsColumns)

    const filteredData = fnFilter ?  fnFilter(listingData, queryParams.filter) : listingData

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        filteredData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={name}/>
        ) : (
            <PaginatedTable
                columns={columnsData}
                data={filteredData}
                defaultSorted={defaultSorted}
                paginationOptions={paginationOptions}
                setSize={setSize}
                setPageNumber={setPageNumber}
            />
        )
    )
}