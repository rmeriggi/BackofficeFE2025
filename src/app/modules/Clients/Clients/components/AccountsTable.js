import React from 'react'
import {sortCaret, headerSortingClasses} from "../../../../../_metronic/_helpers"
import { PaginatedTable } from '../../../../components/PaginatedTable'
import { TableNoRecordsFoundMessage } from '../../../../components/TableNoRecordsFound'
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {StatusAccountColumnFormatter} from './column-formatters/StatusAccountsColumnFormatter'
import { useListingTableContext } from './ListingTableContext';

export default function AccountsTable({movements, creditsStatus}) {

    const columns = [
        {
            dataField: "status",
            text: "Estado",
            sort: true,
            formatter: StatusAccountColumnFormatter,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatExtraData: {
                creditsStatus
            }
        },
        {
            dataField: "TipoDescripcion",
            text: "Concepto",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "Importe",
            text: "Importe",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
      ]

    const {
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = useListingTableContext();

    const paginationOptions = {
        custom: true,
        totalSize: movements.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
    movements.length === 0 ? (
        <TableNoRecordsFoundMessage entities={"Movimientos"}/>
    ) : (
        <PaginatedTable
            columns={columns}
            data={movements}
            setSize={setSize}
            setPageNumber={setPageNumber}
            defaultSorted={defaultSorted}
            paginationOptions={paginationOptions}
        />
    )
)
}
