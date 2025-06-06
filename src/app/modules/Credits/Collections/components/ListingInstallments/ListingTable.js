import React from "react";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { DateColumnFormatter } from "../../../../../utils/column-formatter/DateColumnFormatter";
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter";

export function ListingTable( { data } ) {

    const columns = [
        {
            dataField: "id",
            text: "Número de cuota",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        {
            dataField: "expirationDate",
            text: "Vencimiento",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: DateColumnFormatter,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        {
            dataField: "capital",
            text: "Capital",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter,
            classes: 'text-center',
            headerClasses: 'text-right',
        },
        {
            dataField: "interest",
            text: "Interés",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter,
            classes: 'text-center',
            headerClasses: 'text-right',
        },
        {
            dataField: "amount",
            text: "Importe",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter,
            classes: 'text-center',
            headerClasses: 'text-right',
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
        totalSize: data.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        data.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"detalle"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={data}
                defaultSorted={defaultSorted}
                setSize={setSize}
                setPageNumber={setPageNumber}
                paginationOptions={paginationOptions}
                text='no'
            />
        )
    )
}
