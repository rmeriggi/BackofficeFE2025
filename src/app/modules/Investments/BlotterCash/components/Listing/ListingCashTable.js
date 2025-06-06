import React from "react";
import { useListingTableContext } from "./ListingTableContext";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { AmountWithDecimalsColumnFormatter } from "./column-formatters/AmountWithDecimalsColumnFormatter";
import { AmountWithIndicatorColumnFormatter } from "./column-formatters/AmountWithIndicatorColumnFormatter"; 

const filterData = (accountsData, filter) => {
    let filteredData = accountsData;
    if (filter.mercado !== "") {
        filteredData = accountsData.filter(account => {

            if (
                account.mercado.trim().toLowerCase() === filter.mercado.toLowerCase()
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingCashTable( { cashData } ) { 
    

    const columns = [
       
        {
            dataField: "mercado",
            text: "Mercado",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "Volumen",
            text: "Volumen",
            headerStyle: {
                textAlign: 'center', 
              },
            align: 'right',
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountWithDecimalsColumnFormatter
        },
        {
            dataField: "PESOS",
            text: "pesos",
            headerStyle: {
                textAlign: 'center', 
              },
            style: (cell, row, rowIndex, colIndex) => {
            return {
                color: cell < 0 && 'red'
            };
            },  
            align: 'right',
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountWithIndicatorColumnFormatter
        },
        {
            dataField: "MEP",
            text: "mep",
            headerStyle: {
                textAlign: 'center', 
              },
            style: (cell, row, rowIndex, colIndex) => {
            return {
                color: cell < 0 && 'red'
            };
            },  
            align: 'right',
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountWithIndicatorColumnFormatter
        },
        {
            dataField: "CABLE",
            text: "cable",
            headerStyle: {
                textAlign: 'center', 
              },
            style: (cell, row, rowIndex, colIndex) => {
            return {
                color: cell < 0 && 'red'
            };
            },    
            align: 'right',
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountWithIndicatorColumnFormatter
        },
    ]

   
    const {
        queryParamsTable,
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = useListingTableContext ();

    const filteredData = filterData(cashData, queryParamsTable.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        filteredData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"registros"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={filteredData}
                defaultSorted={defaultSorted}
                paginationOptions={paginationOptions}
                setSize={setSize}
                setPageNumber={setPageNumber}
            />
        )
    )
}

 
