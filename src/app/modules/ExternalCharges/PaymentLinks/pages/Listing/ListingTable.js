/* eslint-disable eqeqeq */
import React from "react";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { DateColumnFormatter } from "../../../../../utils/column-formatter/DateColumnFormatter";
import { ActionColumnFormatter } from "./column-formatters/ActionColumnFormatter";
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter";

export function ListingTable( { dataTable, openModal } ) {
    
    const columns = [
        {
            dataField: "id",
            text: "ID",
            headerClasses: "text-center",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "dni",
            text: "Cliente",
            headerClasses: "text-center",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "name",
            text: "Descripción",
            sort: true,
            classes:"text-center",
            headerClasses: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "idCurrency",
            text: "Moneda",
            sort: true,
            classes:"text-center",
            headerClasses: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "amount",
            text: "Importe",
            headerClasses: "text-center",
            classes: "text-center",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter
        },
        
        {
            dataField: "cards",
            text: "Tarjeta",
            sort: true,
            classes:"text-center",
            headerClasses: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },     
        
        {
            dataField: "expirationDate",
            text: "Vencimiento",
            sort: true,
            classes:"text-center",
            headerClasses: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: DateColumnFormatter
        },
        {
            dataField: "",
            text: "Acción",
            formatter: ActionColumnFormatter,
            formatExtraData: {
                openModal
            }
        }
    ]
   
    const {
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = useListingTableContext();

    const paginationOptions = {
        custom: true,
        totalSize: dataTable.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        dataTable.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"Links de Pago"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={dataTable}
                defaultSorted={defaultSorted}
                paginationOptions={paginationOptions}
                setSize={setSize}
                setPageNumber={setPageNumber}
            />
        )
    )
}
