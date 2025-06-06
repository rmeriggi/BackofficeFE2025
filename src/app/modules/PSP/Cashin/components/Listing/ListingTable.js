import React from "react";
import propTypes from 'prop-types';
import {useListingTableContext} from "./ListingTableContext";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {DetailColumnFormatter} from './column-formatters/DetailColumnFormatter'
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { ColorColumnFormatter} from "../../../../../utils/column-formatter/ColorColumnFormatter"
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter"

export function ListingTable( { cashinData, columnsData, openReceipt } ) {

    const columns = columnsData.header.map((header, i) => {
        if(header === "Tipo de transacción"){
            return {
                dataField: columnsData.properties[i],
                text: header,
                sort: true,
                sortCaret: sortCaret,
                headerSortingClasses,
                formatter: ColorColumnFormatter
            }
        }else if(header === "Importe"){
            return {
                dataField: columnsData.properties[i],
                text: header,
                sort: true,
                headerClasses: "text-center",
                formatter: AmountColumnFormatter,
                sortCaret: sortCaret,
                headerSortingClasses
            }
        }else{
            return {
                dataField: columnsData.properties[i],
                text: header,
                sort: true,
                sortCaret: sortCaret,
                headerSortingClasses
            }
        }
    })

    const extraDataForColumns = {
        dataField: "actions",
        text: "accion",
        classes: "text-center",
        headerClasses: "text-center",
        formatter: DetailColumnFormatter,
        formatExtraData: {
            openReceipt
        }
    }
    
    columns.push(extraDataForColumns)
   
    const {
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = useListingTableContext();

    const paginationOptions = {
        custom: true,
        totalSize: cashinData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        cashinData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"cashin"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={cashinData}
                defaultSorted={defaultSorted}
                setSize={setSize}
                setPageNumber={setPageNumber}
                paginationOptions={paginationOptions}
            />
        )
    )
}

 
ListingTable.defaultProps = {
    cashinData: []
};

ListingTable.propTypes = {
    cashinData: propTypes.arrayOf(propTypes.shape({
        id: propTypes.string,
        date: propTypes.string,
        amount: propTypes.string,
        detail: propTypes.string,
    }))
}
