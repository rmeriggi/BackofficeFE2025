import React from "react";
import propTypes from 'prop-types';
import {sortCaret, headerSortingClasses} from "../../../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../../../components/TableNoRecordsFound";
import {ActionColumnFormatter} from './column-formatters/ActionColumnFormatter'
import {ActiveColumnFormatter} from './column-formatters/ActiveColumnFormatter'
import { DateColumnFormatter } from "../../../../../../../utils/column-formatter/DateColumnFormatter";
import { deleteException } from "../../../../utils/service";

const filterData = (exceptionData, filter) => {
    let filteredData = exceptionData;
    if (filter.idclient !== "" || filter.exception !== "") {
        filteredData = exceptionData.filter(exception => {
            if (
                exception.idclient.toLowerCase().includes(filter.idclient.toLowerCase()) ||
                exception.exception.toLowerCase().includes(filter.exception.toLowerCase())
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { exceptionsData } ) {

    const deleteExceptionData = async(id) => {
        try {
            await deleteException(id)
        } catch (error) {
            console.error(error)
        }

    }
    const columns = [
        {
            dataField: "idclient",
            text: "Cliente",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "exception",
            text: "Excepcion",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "active",
            text: "Status",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: ActiveColumnFormatter,
        },
        {
            dataField: "expiration",
            text: "Expiracion",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: DateColumnFormatter,
        },
        {
            dataField: "action",
            text: "accion",
            formatter: ActionColumnFormatter,
            formatExtraData: {
                deleteExceptionData
            }
        }
    ]

    const {
        queryParams,
        setQueryParams,
    } = useListingTableContext();

    const filteredData = filterData(exceptionsData, queryParams.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: queryParams.pageSize,
        page: queryParams.pageNumber,
    };

    return (
        exceptionsData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"excepciones"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={filteredData}
                defaultSorted={defaultSorted}
                setQueryParams={setQueryParams}
                paginationOptions={paginationOptions}
            />
        )
    )
}


ListingTable.defaultProps = {
    exceptionData: []
};

ListingTable.propTypes = {
    exceptionData: propTypes.arrayOf(propTypes.shape({
        id: propTypes.number,
        client: propTypes.string,
        exception: propTypes.string,
        status: propTypes.string,
        expiration: propTypes.string,
    }))
}
