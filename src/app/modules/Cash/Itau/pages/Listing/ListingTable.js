/* eslint-disable eqeqeq */
import React from "react";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { DateColumnFormatter } from "../../../../../utils/column-formatter/DateColumnFormatter";
import { CreditColumnFormatter } from "./column-formatters/CreditColumnFormatter";
import { DebitColumnFormatter } from "./column-formatters/DebitColumnFormatter";
import { ActionColumnFormatter } from "../../../BankValues/pages/Listing/column-formatters/ActionColumnFormatter";

export function ListingTable( { dataTable, openModal, setDataModal } ) {
    
    const columns = [
        {
            dataField: "id",
            text: "ID",
            sort: true,
            classes:"text-center",
            headerClasses: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "movementDate",
            text: "Fecha movimiento",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: DateColumnFormatter
        },
        {
            dataField: "longEventDescription",
            text: "Movimiento",
            sort: true,
            classes:"text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "ticketNumber",
            text: "Comprobante N°",
            sort: true,
            classes:"text-center",
            headerClasses: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "",
            text: "Crédito",
            formatter: CreditColumnFormatter,
            headerClasses: "text-center",
            classes: "text-center",
        },
        {
            dataField: "value",
            text: "Débito",
            formatter: DebitColumnFormatter,
            headerClasses: "text-center",
            classes: "text-center",
        },
        {
            dataField: "",
            text: "Acción",
            headerClasses: "text-center",
            classes: "text-center",
            formatter: ActionColumnFormatter,
            formatExtraData: {
                openModal,
                setDataModal
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
            <TableNoRecordsFoundMessage entities={"Movimientos"}/>
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
