import React from "react";
import {useListingTableContext} from "./ListingTableContext";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { ActionColumnFormatter } from "./column-formatters/ActionColumnFormatter";
import { DateColumnFormatter } from "./column-formatters/DateColumnFormatter";
import StatusColumnFormatter from "./column-formatters/StatusColumnFormatter";
import { useHistory } from "react-router-dom"



const filterData = (accountsData, filter) => {     
    let filteredData = accountsData;
    if (filter.id !== "" && filter.id !== 0) {        
        filteredData = accountsData.filter(account => {
            if (account.status === filter.id)
             {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { counterparties, setShowEditModal, setEditInitialData } ) { 
    const history = useHistory()
    
    const columns = [       
        {
            dataField: "id",
            text: "ID",
            sort: true,
            sortValue: (cell) => parseInt(cell, 10),
            sortCaret: sortCaret,
            headerSortingClasses
        },       
        {
            dataField: "fecha",
            text: "Fecha",
            headerStyle: {
                textAlign: 'center',
              },
            align: 'center',
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: DateColumnFormatter
        
        },
        {
            dataField: "cliente",
            text: "Cliente",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "asunto",
            text: "Asunto",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "alerta",
            text: "Alertas",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        // {
        //     dataField: "descripcion",
        //     text: "Notificacion",
        //     headerStyle: {
        //         textAlign: 'center',
        //       },
        //     align: 'center',  
        //     sort: true,
        //     sortCaret: sortCaret,
        //     headerSortingClasses,
            
        // },
        {
            dataField: "status",
            text: "Estado",
            headerStyle: {
                textAlign: 'center',
              },
            align: 'center',  
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: StatusColumnFormatter
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
                    history.push(`/compliance/inbox/notification/${data.id}`)                  
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

    const filteredData = filterData(counterparties, queryParams.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        filteredData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"notificaciones"}/>
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

 
