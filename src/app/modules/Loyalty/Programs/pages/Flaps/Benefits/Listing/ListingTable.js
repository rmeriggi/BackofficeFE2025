import React from "react";
import propTypes from 'prop-types';
import {sortCaret, headerSortingClasses} from "../../../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../../../components/TableNoRecordsFound";

const filterData = (benefitsData, filter) => {
    let filteredData = benefitsData;
    if (filter.programId !== "" || filter.benefit !== "" || filter.description !== "") {
        filteredData = benefitsData.filter(benefit => {
            if (
                benefit.programId.toString().toLowerCase().includes(filter.programId.toString().toLowerCase()) ||
                benefit.benefit.toString().toLowerCase().includes(filter.benefit.toString().toLowerCase()) ||
                benefit.description.toString().toLowerCase().includes(filter.description.toString().toLowerCase()) 
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { benefitsData } ) {

    const columns = [
        {
            dataField: "programId",
            text: "ID del Programa",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center w-5",
            headerClasses: "pl-8 text-center w-5"
        },
        {
            dataField: "benefit",
            text: "Beneficio",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center",
            headerClasses: "pl-5 text-center"
        },
        {
            dataField: "description",
            text: "Descripcion",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center",
            headerClasses: "pl-5 text-center"
        },
        {
            dataField: "fromDate",
            text: "Fecha desde",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center",
            headerClasses: "pl-5 text-center"
        },
        {
            dataField: "toDate",
            text: "Fecha Hasta",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center",
            headerClasses: "pl-5 text-center"
        },
        {
            dataField: "status",
            text: "Status",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center",
            headerClasses: "pl-5 text-center"
        },
    ]
   
    const {
        queryParams,
        setQueryParams,
    } = useListingTableContext();

    const filteredData = filterData(benefitsData, queryParams.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: queryParams.pageSize,
        page: queryParams.pageNumber,
    };

    return (
        benefitsData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"beneficios"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={filteredData}
                defaultSorted={defaultSorted}
                setQueryParams={setQueryParams}
                paginationOptions={paginationOptions}
                editRoute='no'
            />
        )
    )
}

 
ListingTable.defaultProps = {
    benefitsData: []
};

ListingTable.propTypes = {
    accountData: propTypes.arrayOf(propTypes.shape({
        id: propTypes.number,
        clientId: propTypes.number,
        programId: propTypes.number,
        status: propTypes.string,
        fromDate: propTypes.string,
        toDate: propTypes.string,
        frequency: propTypes.string,
        price: propTypes.number,
    }))
}
