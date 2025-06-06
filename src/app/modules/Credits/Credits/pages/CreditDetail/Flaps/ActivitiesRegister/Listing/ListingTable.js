import React from "react";
import propTypes from 'prop-types';
import {sortCaret, headerSortingClasses} from "../../../../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../../../../components/TableNoRecordsFound";
import { DateWithHoursColumnFormatter } from "../../../../../../../../utils/column-formatter/DateWithHoursColumnFormatter";

export function ListingTable( { activitiesRegisters } ) {

    const columns = [
        {
            dataField: "contactType",
            text: "Tipo de contacto",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "date",
            text: "Fecha y hora",
            formatter: DateWithHoursColumnFormatter,
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "manager",
            text: "Gestor",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
    ]
   
    const {
        queryParams,
        setQueryParams,
    } = useListingTableContext();

    const paginationOptions = {
        custom: true,
        totalSize: activitiesRegisters.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: queryParams.pageSize,
        page: queryParams.pageNumber,
    };

    return (
        activitiesRegisters.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"Registros de actividad"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={activitiesRegisters}
                defaultSorted={defaultSorted}
                setQueryParams={setQueryParams}
                paginationOptions={paginationOptions}
            />
        )
    )
}

 
ListingTable.defaultProps = {
    usersData: []
};

ListingTable.propTypes = {
    usersData: propTypes.arrayOf(propTypes.shape({
        id: propTypes.string,
        user: propTypes.string,
        password: propTypes.string,
        email: propTypes.string,
        status: propTypes.number,
    }))
}
