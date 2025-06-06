import React from "react";
import propTypes from 'prop-types';
import {useListingTableContext} from "./ListingTableContext";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter"


export function ListingTable( { sectionAData, columnsData } ) {
    
    const columns = columnsData.header.map((header, i) => {
        if(header === "Saldo"){
            return {
                dataField: columnsData.properties[i],
                text: header,
                sort: true,
                sortCaret: sortCaret,
                headerSortingClasses,
                headerClasses: "align-text-top text-center",
                formatter: AmountColumnFormatter
            }
        } else{
            return {
                dataField: columnsData.properties[i],
                text: header,
                sort: true,
                sortCaret: sortCaret,
                headerSortingClasses,
                classes: header === "Cantidad" ? "text-center" : "",
                headerClasses: "align-text-top text-center",
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
        totalSize: sectionAData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        sectionAData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"apartados A"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={sectionAData}
                defaultSorted={defaultSorted}
                setSize={setSize}
                setPageNumber={setPageNumber}
                paginationOptions={paginationOptions}
            />
        )
    )
}

 
ListingTable.defaultProps = {
    sectionAData: []
};

ListingTable.propTypes = {
    sectionAData: propTypes.arrayOf(propTypes.shape({
        id: propTypes.string,
        year: propTypes.string,
        month: propTypes.string,
        day: propTypes.string,
        code: propTypes.string,
        conecpt: propTypes.string,
        amount: propTypes.string,
        quantity: propTypes.string,
        cbu: propTypes.string,
    }))
}
