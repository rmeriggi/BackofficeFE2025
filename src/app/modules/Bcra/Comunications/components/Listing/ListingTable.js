import React from "react";
import propTypes from 'prop-types';
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import { ActionColumnFormatter } from "./column-formater/ActionColumnFormatter";
import { ClientColumnFormatter } from "./column-formater/ClientColumnFormater";

const filterData = (accountsData, filter) => {
    let filteredData = accountsData;
    if (filter.client !== "" || filter.comunication !== "") {
        filteredData = accountsData.filter(account => {
            if (
                account.client.toLowerCase().includes(filter.client.toLowerCase()) ||
                account.comunication.toLowerCase().includes(filter.comunication.toLowerCase())
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}



export function ListingTable( { comunicationsData } ) {
    
    const openDetail = (id) =>{}
    const columns = [
        {
            dataField: "date",
            text: "Fecha",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "client",
            text: "Cliente",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: ClientColumnFormatter,
        },
        {
            dataField: "comunication",
            text: "Tipo de Comunicacion",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "action",
            text: "Accion",
            formatter: ActionColumnFormatter,
            formatExtraData: {
                openDetail
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

    const filteredData = filterData(comunicationsData, queryParams.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
            <PaginatedTable
                columns={columns}
                data={filteredData}
                defaultSorted={defaultSorted}
                setSize={setSize}
                setPageNumber={setPageNumber}
                paginationOptions={paginationOptions}
            />
        )
}

 
ListingTable.defaultProps = {
    comucationsData: []
};

ListingTable.propTypes = {
    comucationsData: propTypes.arrayOf(propTypes.shape({
        date: propTypes.number,
        client: propTypes.string,
        comunicataion: propTypes.string,
    }))
}
