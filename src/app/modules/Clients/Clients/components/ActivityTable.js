import React from 'react'
import {sortCaret, headerSortingClasses} from "../../../../../_metronic/_helpers"
import { PaginatedTable } from '../../../../components/PaginatedTable'
import { TableNoRecordsFoundMessage } from '../../../../components/TableNoRecordsFound'
import { orderSorted, sizePerPageList} from "./ListingTableHelpers";
import { useListingTableContext } from './ListingTableContext';

export default function ActivityTable({activities}) {

    const columns = [
        {
            dataField: "order",
            text: "Orden",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "period",
            text: "Periodo",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "activity",
            text: "Actividad",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "idActivity",
            text: "Id",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "nomenclator",
            text: "Nomenclador",
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
        totalSize: activities.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
    activities.length === 0 ? (
        <TableNoRecordsFoundMessage entities={"Actividades"}/>
    ) : (
        <PaginatedTable
            columns={columns}
            data={activities}
            setSize={setSize}
            setPageNumber={setPageNumber}
            defaultSorted={orderSorted}
            paginationOptions={paginationOptions}
        />
    )
)
}
