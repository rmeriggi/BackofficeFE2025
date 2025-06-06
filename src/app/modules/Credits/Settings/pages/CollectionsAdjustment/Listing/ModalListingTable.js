import React from "react";
import {sortCaret, headerSortingClasses} from "../../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../../components/TableNoRecordsFound";
import { AmountColumnFormatter } from "../../../../../../utils/column-formatter/AmountColumnFormatter";


export function ListingTable( { cuotesData, openModal, openModalMoreInfo } ) {

    const columns = [
        {
            dataField: "cantidadDeCuotas",
            text: "Cant. de Cuotas",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "pl-5"
        },
        {
            dataField: "montoTotal",
            text: "Monto Total",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center",
            formatter: AmountColumnFormatter,
            headerClasses: "text-left"
        },
            {
            dataField: "totalCreditos",
            text: "Total de Créditos",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center",
            headerClasses: "text-left"
        },
    ]
    const {
        queryParams,
        setQueryParams,
    } = useListingTableContext();

    const paginationOptions = {
        custom: true,
        totalSize: cuotesData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: queryParams.pageSize,
        page: queryParams.pageNumber,
    };

    return (
        cuotesData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"cuotas"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={cuotesData}
                defaultSorted={defaultSorted}
                setQueryParams={setQueryParams}
                paginationOptions={paginationOptions}
                

            />
        )
    )
}