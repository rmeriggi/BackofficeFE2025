import React from "react";
import propTypes from 'prop-types';
import {useListingTableContext} from "./ListingTableContext";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {PaginatedTable} from "../../../../../../components/PaginatedTable";
import {sortCaret, headerSortingClasses} from "../../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../../components/TableNoRecordsFound";
import {DateColumnFormatter} from "../../../../../../utils/column-formatter/DateColumnFormatter"
import {AmountColumnFormatter} from "../../../../../../utils/column-formatter/AmountColumnFormatter"
import {DebitColumnFormatter} from "./column-formatters/DebitColumnFormatter"
import {CreditColumnFormatter} from "./column-formatters/CreditColumnFormatter"

export function ListingTable( { extractsData, columnsData } ) {
    
    const columns = columnsData.header.map((header, i) => {
        if(header === "Fecha"){
            return {
                dataField: columnsData.properties[i],
                text: header,
                sort: true,
                sortCaret: sortCaret,
                headerSortingClasses,
                headerClasses: "text-center",
                classes: "text-center",
                formatter: DateColumnFormatter
            }
        }else if(header === "Débito"){
            return {
                dataField: columnsData.properties[i],
                text: header,
                sort: true,
                sortCaret: sortCaret,
                headerSortingClasses,
                headerClasses: "text-center",
                classes: "text-center",
                formatter: DebitColumnFormatter
            }
        }else if(header === "Crédito"){
            return {
                dataField: columnsData.properties[i],
                text: header,
                sort: true,
                sortCaret: sortCaret,
                headerSortingClasses,
                headerClasses: "text-center",
                classes: "text-center",
                formatter: CreditColumnFormatter
            }
        }else if(header === "Saldo"){
            return {
                dataField: columnsData.properties[i],
                text: header,
                sort: true,
                sortCaret: sortCaret,
                headerSortingClasses,
                headerClasses: "text-center",
                classes: "text-center",
                formatter: AmountColumnFormatter
            }
        }else{
            return {
                dataField: columnsData.properties[i],
                text: header,
                sort: true,
                sortCaret: sortCaret,
                headerSortingClasses,
                headerClasses: "text-center",
                classes: "text-center"
            }
        }
    })
   
    const {
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = useListingTableContext();

    const paginationOptions = {
        custom: true,
        totalSize: extractsData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        extractsData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"extractos"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={extractsData}
                defaultSorted={defaultSorted}
                setSize={setSize}
                setPageNumber={setPageNumber}
                paginationOptions={paginationOptions}
            />
        )
    )
}

 
ListingTable.defaultProps = {
    extractsData: []
};

ListingTable.propTypes = {
    extractsData: propTypes.arrayOf(propTypes.shape({
        id: propTypes.number,
        date: propTypes.string,
        origin: propTypes.string,
        concept: propTypes.string,
        debit: propTypes.number,
        credit: propTypes.number,
        amount: propTypes.number,
    }))
}
