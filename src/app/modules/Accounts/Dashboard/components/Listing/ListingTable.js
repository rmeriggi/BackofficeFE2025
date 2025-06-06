import React from "react";
import propTypes from 'prop-types';
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import { VariationColumnFormatter } from "./column-formatters/VariationColumnFormatter";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { DateColumnFormatter } from "../../../../../utils/column-formatter/DateColumnFormatter";
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter";

export function ListingTable( { balancesData } ) {

    const columns = [
        {
            dataField: "date",
            text: "fecha",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: DateColumnFormatter,
            headerClasses: "w-25 text-center",
            classes: "text-center"
        },
        {
            dataField: "day",
            text: "día",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            headerClasses: "w-25 text-center",
            classes: "text-center"
        },
        {
            dataField: "variation",
            text: "Variación vs dia anterior",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: VariationColumnFormatter,
            headerClasses: "w-25 text-center",
            classes: "text-center"
        },
        {
            dataField: "balances",
            text: "Saldos",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter,
            headerClasses: "w-25 text-center",
            classes: "text-center"
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
        totalSize: balancesData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        balancesData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"cuentas"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={balancesData}
                defaultSorted={defaultSorted}
                paginationOptions={paginationOptions}
                setSize={setSize}
                setPageNumber={setPageNumber}
            />
        )
    )
}

 
ListingTable.defaultProps = {
    balancesData: []
};

ListingTable.propTypes = {
    balanceData: propTypes.arrayOf(propTypes.shape({
        date: propTypes.string,
        day: propTypes.string,
        balances: propTypes.string,
        variation: propTypes.string,
    }))
}
