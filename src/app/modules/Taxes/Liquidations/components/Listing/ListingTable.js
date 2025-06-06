import React from "react";
import propTypes from 'prop-types';
import {useListingTableContext} from "./ListingTableContext";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {DetailColumnFormatter} from './column-formatters/DetailColumnFormatter'
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter";
import { DateColumnFormatter } from "../../../../../utils/column-formatter/DateColumnFormatter";

export function ListingTable( { liquidationsData, openReceipt, columnsData } ) {

    const columns = columnsData.header.map((header, i) => {
        if(header === "Importe"){
            return {
                dataField: columnsData.properties[i],
                text: header,
                sort: true,
                formatter: AmountColumnFormatter,
                sortCaret: sortCaret,
                headerSortingClasses,
            }
        }else if(header === "Fecha"){
            return {
                dataField: columnsData.properties[i],
                text: header,
                sort: true,
                formatter: DateColumnFormatter,
                sortCaret: sortCaret,
                headerSortingClasses,
            }
        }else if(header === "Origen Operación"){
            return {
                dataField: columnsData.properties[i],
                text: header,
                sort: true,
                classes:"text-center",
                headerClasses:"text-center",
                sortCaret: sortCaret,
                headerSortingClasses,
            }
        }
        else {
            return {
                dataField: columnsData.properties[i],
                text: header,
                sort: true,
                sortCaret: sortCaret,
                headerSortingClasses,
            }
        }     
    })

    const columnAction = {
            dataField: "actions",
            text: "accion",
            formatter: DetailColumnFormatter,
            formatExtraData: {
            openReceipt
            }
        }

    columns.push(columnAction)
   
    const {
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = useListingTableContext();

    const paginationOptions = {
        custom: true,
        totalSize: liquidationsData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        liquidationsData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"Liquidaciones"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={liquidationsData}
                defaultSorted={defaultSorted}
                setSize={setSize}
                setPageNumber={setPageNumber}
                paginationOptions={paginationOptions}
            />
        )
    )
}

 
ListingTable.defaultProps = {
    liquidationsData: []
};

ListingTable.propTypes = {
    liquidationsData: propTypes.arrayOf(propTypes.shape({
        id: propTypes.string,
        date: propTypes.string,
        amount: propTypes.string,
        detail: propTypes.string,
    }))
}
