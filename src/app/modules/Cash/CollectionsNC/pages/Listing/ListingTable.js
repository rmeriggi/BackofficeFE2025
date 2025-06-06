/* eslint-disable eqeqeq */
import React from "react";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { DateColumnFormatter } from "../../../../../utils/column-formatter/DateColumnFormatter";
import { ActionColumnFormatter } from "./column-formatters/ActionColumnFormatter";

export function ListingTable( { dataTable, openActionModal, setId } ) {
    
    const columns = [
        {
            dataField: "amountDate",
            text: "Fecha",
            sort: true,
            classes:"text-center",
            headerClasses: "text-center",
            formatter: DateColumnFormatter,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "reference",
            text: "Referencia",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "amount",
            text: "Importe",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "paymentMethodId",
            text: "Forma de Pago",
            sort: true,
            classes:"text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "collectionChannelId",
            text: "Canal de Cobro",
            sort: true,
            classes:"text-center",
            headerClasses: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
            
        },
        {
            dataField: "description",
            text: "Descripcion",
            headerClasses: "text-center",
            classes: "text-center",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "action",
            text: "",
            formatter: ActionColumnFormatter,
            formatExtraData: {
                openActionModal, setId
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
            <TableNoRecordsFoundMessage entities={"Cobranzas"}/>
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
