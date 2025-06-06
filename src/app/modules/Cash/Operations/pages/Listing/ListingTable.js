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

export function ListingTable( { dataTable, setActionModal, openActionModal } ) {
    
    const columns = [
        {
            dataField: "account",
            text: "N° de Cuenta",
            sort: true,
            classes:"text-center",
            headerClasses: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "type",
            text: "Tipo",
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
            headerClasses: "text-right",
            formatter: AmountColumnFormatter,
        },
        {
            dataField: "date",
            text: "Fecha",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            headerClasses: "text-right",
            formatter: DateColumnFormatter
        },
        {
            dataField: "description",
            text: "Descripción",
            sort: true,
            classes:"text-center",
            headerClasses: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "origin",
            text: "Origen",
            sort: true,
            classes:"text-center",
            headerClasses: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "destiny",
            text: "Destino",
            sort: true,
            classes:"text-center",
            headerClasses: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "detail",
            text: "acción",
            formatter: ActionColumnFormatter,
            headerClasses: "text-center",
            classes: "text-center",
            formatExtraData: {
                setActionModal,
                openActionModal,
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
            <TableNoRecordsFoundMessage entities={"Operaciones para autorizar"}/>
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
