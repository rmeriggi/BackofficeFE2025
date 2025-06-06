import React from "react";
import {useListingTableContext} from "./ListingTableCreditsContext";
import {defaultSorted, sizePerPageList} from "./ListingTableCreditsHelpers";
import {PaginatedTable} from "../../../../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../../../../components/TableNoRecordsFound";
import { DateColumnFormatter } from "../../../../../../../../utils/column-formatter/DateColumnFormatter";
import { AmountColumnFormatter } from "../../../../../../../../utils/column-formatter/AmountColumnFormatter";
import {sortCaret, headerSortingClasses} from "../../../../../../../../../_metronic/_helpers";
import { OldAndNewIdColumnFormatter } from "../../../../../../Credits/pages/Listing/column-formatters";

export function ListingTable( { collectionsData } ) {

    const columns = [
        {
            dataField: "status",
            text: "",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        {
            dataField: "id",
            text: "ID crédito",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: 'text-center',
            headerClasses: 'text-center',
            formatter: OldAndNewIdColumnFormatter
        },
        {
            dataField: "productName",
            text: "Producto",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        {
            dataField: "quota",
            text: "Cuotas",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        {
            dataField: "amount",
            text: "Importe",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        {
            dataField: "expiration",
            text: "Fecha otorgamiento",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: DateColumnFormatter,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
    ]
   
    const {
        queryParams,
        setQueryParams,
    } = useListingTableContext();

    const paginationOptions = {
        custom: true,
        totalSize: collectionsData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: queryParams.pageSize,
        page: queryParams.pageNumber,
    };

    return (
        collectionsData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"Detalle de crédito"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={collectionsData}
                defaultSorted={defaultSorted}
                setQueryParams={setQueryParams}
                paginationOptions={paginationOptions}
                editRoute={"/credits/management/view"}
                hover
            />
        )
    )
}