import React from "react";
import propTypes from 'prop-types';
import {useListingTableContext} from "./ListingTableContext";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import {DateColumnFormatter } from "../../../../../utils/column-formatter/DateColumnFormatter";

export function ListingTable( { cvuListData, columnsData } ) {

    const columns = columnsData.header.map((header, i) => {
        if(header === "Fecha"){
            return {
                dataField: columnsData.properties[i],
                text: header,
                sort: true,
                sortCaret: sortCaret,
                headerSortingClasses,
                formatter: DateColumnFormatter,
                headerClasses: "text-center",
                classes: "text-center"
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
        totalSize: cvuListData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        cvuListData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"altas cvu"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={cvuListData}
                defaultSorted={defaultSorted}
                setSize={setSize}
                setPageNumber={setPageNumber}
                paginationOptions={paginationOptions}
            />
        )
    )
}

 
ListingTable.defaultProps = {
    cvuListData: []
};

ListingTable.propTypes = {
    cvuListData: propTypes.arrayOf(propTypes.shape({
        id: propTypes.string,
        date: propTypes.string,
        quantity: propTypes.string,
    }))
}
