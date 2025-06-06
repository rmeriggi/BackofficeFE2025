import React from "react";
import propTypes from 'prop-types';
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import {ActionColumnFormatter} from './column-formatters/ActionColumnFormatter'
import {StatusColumnFormatter} from "../column-formaters/StatusColumnFormatter"
import { useHistory } from "react-router";

const filterData = (usersData, filter) => {
    let filteredData = usersData;
    if (filter.user !== "" || filter.email !== "") {
        filteredData = usersData.filter(user => {
            if (
                user.user.toLowerCase()
                .includes(filter.user.toLowerCase()) ||
                user.email.toLowerCase()
                .includes(filter.email.toLowerCase())
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { usersData } ) {
    
    const history = useHistory()

    const openEditUserPage = (id) => {
        history.push(`/settings/user-management/edit/${id}`)
    }

    const columns = [
        {
            dataField: "id",
            text: "id",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "user",
            text: "Usuario",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "email",
            text: "Email",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "status",
            text: "status",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: StatusColumnFormatter,
        },
        {
            dataField: "action",
            text: "accion",
            formatter: ActionColumnFormatter,
            headerClasses: "text-center",
            classes: "text-center",
            formatExtraData: {
                openEditUserPage
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

    const filteredData = filterData(usersData, queryParams.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        usersData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"usuarios"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={filteredData}
                defaultSorted={defaultSorted}
                setSize={setSize}
                setPageNumber={setPageNumber}
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
        id: propTypes.number,
        user: propTypes.string,
        password: propTypes.string,
        email: propTypes.string,
        status: propTypes.number,
    }))
}
