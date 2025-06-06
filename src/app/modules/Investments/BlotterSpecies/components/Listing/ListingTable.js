import React from "react";
import {useListingTableContext} from "./ListingTableContext";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { ActionColumnFormatter } from "./column-formatters/ActionColumnFormatter";
const filterData = (accountsData, filter) => {
    let filteredData = accountsData;
    if (filter.description !== "" || filter.abbreviation !== "" ) {
        filteredData = accountsData.filter(account => {

            if (
                account.description.trim().toLowerCase().includes(filter.description.toLowerCase()) ||
                account.abbreviation.trim().toLowerCase().includes(filter.abbreviation.toLowerCase())
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { species, setShowEditModal, setEditInitialData } ) { 
    
    const columns = [
       
        {
            dataField: "abbreviation",
            text: "Abreviatura",
            sort: true,
            headerStyle: {
                textAlign: 'center',
              },
            align: 'center',
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "description",
            text: "Descripción",
            headerStyle: {
                textAlign: 'center',
              },
            align: 'center',
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        
        },
        {
            dataField: "",
            text: "Acción",
            formatter: ActionColumnFormatter,
            headerStyle: {
                textAlign: 'center',
              },
            align: 'center',
            formatExtraData: {
                fnAction : (data) => {
                    setEditInitialData(data)    
                    setShowEditModal(true)                   
                },      
            }
        }       
    ]

    
   
    const {
        queryParams,
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = useListingTableContext();

    const filteredData = filterData(species, queryParams.filter);

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

 
