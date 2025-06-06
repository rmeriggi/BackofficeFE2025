import React from "react";
import {useListingTableContext} from "./ListingTableContext";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { AmountWithDecimalsColumnFormatter } from "./column-formatters/AmountWithDecimalsColumnFormatter";
import { TotalAmountWithDecimalsColumnFormatter } from "./column-formatters/TotalAmountWithDecimalsColumnFormatter";
import { AmountWithDecimalsAndIndicatorColumnFormatter } from "./column-formatters/AmountWithDecimalsAndIndicatorColumnFormatter";

const filterData = (accountsData, filter) => {
    let filteredData = accountsData;
    if (filter.especie !== "" || filter.instrumento !== "" ) {
        filteredData = accountsData.filter(account => {

            if (
                account.especie.trim().toLowerCase() === filter.especie.toLowerCase() || 
                account.instrumento.trim().toLowerCase().includes(filter.instrumento.toLowerCase())
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { speciesData } ) { 
    

    const columns = [
        {
            dataField: "instrumento",
            text: "Instrumento",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },       
        {
            dataField: "especie",
            text: "Especie",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "CI",
            text: "CI",
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
            formatter: AmountWithDecimalsAndIndicatorColumnFormatter
        },
        {
            dataField: "24Hs",
            text: "24Hs",
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
            formatter: AmountWithDecimalsAndIndicatorColumnFormatter
        },
        {
            dataField: "48hs",
            text: "48hs",
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
            formatter: AmountWithDecimalsAndIndicatorColumnFormatter
        },
        {
            dataField: "",
            text: "Total",
            headerStyle: {
                textAlign: 'center', 
              },
            sort: false,
            align: 'right',
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: TotalAmountWithDecimalsColumnFormatter,
            style: (cell, row, rowIndex, colIndex) => {
                return {
                  backgroundColor: '#F8F9F9',
                  color: (row["24Hs"] + row["48hs"]+row.CI+row.Volumen) < 0 && 'red'
                };
              },
        },
    ]

    
   
    const {
        queryParams,
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = useListingTableContext();

    const filteredData = filterData(speciesData, queryParams.filter);

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

 
