import React from "react";
import propTypes from 'prop-types';
import {useListingTableContext} from "./ListingTableContext";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter"


export function ListingTable( { sectionBData, columnsData } ) {
    
    const columns = columnsData.header.map((header, i) => {
        if(header === "Monto"){
            return {
                dataField: columnsData.properties[i],
                text: header,
                sort: true,
                headerClasses: "text-center",
                sortCaret: sortCaret,
                headerSortingClasses,
                formatter: AmountColumnFormatter
            }
        } else {
            return {
                dataField: columnsData.properties[i],
                text: header,
                sort: true,
                sortCaret: sortCaret,
                headerSortingClasses
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
        totalSize: sectionBData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        sectionBData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"apartados B"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={sectionBData}
                defaultSorted={defaultSorted}
                setSize={setSize}
                setPageNumber={setPageNumber}
                paginationOptions={paginationOptions}
            />
        )
    )
}

 
ListingTable.defaultProps = {
    sectionBData: []
};

ListingTable.propTypes = {
    sectionAData: propTypes.arrayOf(propTypes.shape({
        id: propTypes.string,
        year: propTypes.string,
        month: propTypes.string,
        day: propTypes.string,
        code: propTypes.string,
        conecpt: propTypes.string,
        paymentMethod: propTypes.string,
        paymentScheme: propTypes.string,
        quantity: propTypes.string,
        amount: propTypes.string,
    }))
}
