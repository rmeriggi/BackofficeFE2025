import React from "react";
import propTypes from 'prop-types';
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import { useListingTableContext } from "./ListingAccountTableContext"
import {DetailColumnFormatter} from './column-formatters/DetailColumnFormatter'
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { DateColumnFormatter } from "../../../../../utils/column-formatter/DateColumnFormatter"
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter"

export function ListingTable( { accountsTransactionsData, openReceipt } ) {

    const columns = [
        {
            dataField: "id",
            text: "id",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "date",
            text: "Fecha",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: DateColumnFormatter
        },
        {
            dataField: "type",
            text: "Detalle",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "amount",
            text: "Importe",
            sort: true,
            headerClasses: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter
        },
        {
            dataField: "actions",
            text: "acción",
            headerClasses: "text-center",
            classes: "text-center",
            formatter: DetailColumnFormatter,
            formatExtraData: {
                openReceipt
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
        totalSize: accountsTransactionsData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        accountsTransactionsData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"transacciones"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={accountsTransactionsData}
                defaultSorted={defaultSorted}
                paginationOptions={paginationOptions}
                setSize={setSize}
                setPageNumber={setPageNumber}
            />
        )
    )
}

 
ListingTable.defaultProps = {
    transactionsData: []
};

ListingTable.propTypes = {
    transactionsData: propTypes.arrayOf(propTypes.shape({
        id: propTypes.number,
        date: propTypes.string,
        amount: propTypes.string,
        detail: propTypes.string,
    }))
}
