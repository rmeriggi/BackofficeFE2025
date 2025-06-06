import React from "react";
import propTypes from 'prop-types';
import {sortCaret, headerSortingClasses} from "../../../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../../../components/TableNoRecordsFound";
import { AmountColumnFormatter } from "../../../../../../../utils/column-formatter/AmountColumnFormatter";

const filterData = (suscriptionsData, filter) => {
    let filteredData = suscriptionsData;
    if (filter.programId !== "" || filter.clientId !== "") {
        filteredData = suscriptionsData.filter(suscription => {
            if (
                suscription.programId.toString().toLowerCase().includes(filter.programId.toString().toLowerCase()) ||
                suscription.clientId.toString().toLowerCase().includes(filter.clientId.toString().toLowerCase()) 
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { suscriptionsData, status } ) {

    const columns = [
        {
            dataField: "clientId",
            text: "ID Cliente",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center w-5",
            headerClasses: "pl-8 text-center w-5"
        },
        {
            dataField: "programId",
            text: "ID Programa",
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
        {
            dataField: "fromDate",
            text: "Fecha Alta",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center",
            headerClasses: "pl-5 text-center"
        },
        {
            dataField: "toDate",
            text: "Fecha Baja",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center",
            headerClasses: "pl-5 text-center"
        },
        {
            dataField: "frequency",
            text: "Frecuencia",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center",
            headerClasses: "pl-5 text-center"
        },
        {
            dataField: "price",
            text: "Precio",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center",
            headerClasses: "pl-5 text-center",
            formatter: AmountColumnFormatter
        },
    ]
   
    const {
        queryParams,
        setQueryParams,
    } = useListingTableContext();

    const filteredData = filterData(suscriptionsData, queryParams.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: queryParams.pageSize,
        page: queryParams.pageNumber,
    };

    return (
        suscriptionsData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"suscripciones"}/>
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
    suscriptionsData: []
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
