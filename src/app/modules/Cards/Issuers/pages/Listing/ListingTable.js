import React from "react";
import propTypes from 'prop-types';
import {useListingTableContext} from "../../../Providers/pages/Listing/ListingTableContext";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import {DateColumnFormatter} from "../../../../../utils/column-formatter/DateColumnFormatter";
import { ClientColumnFormatter } from "./column-formatters/ClientColumnFormatter";
import { PerfilColumnFormatter } from "./column-formatters/PerfilColumnFormatter";
import {StatusColumnFormatter} from './column-formatters/StatusColumnFormatter';
import { DetailColumnFormatter } from "./column-formatters/DetailColumnFormatter"

const filterData = (issuers, filter) => {
    let filteredData = issuers;
    if (filter.name !== "" || filter.lastname !== "" || filter.email !== "" || filter.passport !== "" || filter.accountNumber !== "") {
        filteredData = issuers.filter(issuer => {
            if (
                issuer.name?.toLowerCase().includes(filter.name?.toLowerCase()) ||
                issuer.passport?.toString().toLowerCase().includes(filter.passport?.toLowerCase()) ||
                issuer.email?.toLowerCase().includes(filter.email?.toLowerCase()) ||
                issuer.lastName?.toLowerCase().includes(filter.lastName?.toLowerCase()) ||
                issuer.accountNumber?.toLowerCase().includes(filter.accountNumber?.toLowerCase())
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { issuers } ) {

    const columns = [
        {
            dataField: "name",
            text: "Emisor",
            sort: true,
            headerClasses: "align-top",
            formatter: ClientColumnFormatter,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "date",
            text: "Fecha alta",
            sort: true,
            headerClasses: "align-top",
            formatter: DateColumnFormatter,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "email",
            text: "Perfil",
            sort: true,
            headerClasses: "align-top",
            formatter: PerfilColumnFormatter,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "accountNumber",
            text: "Número de cuenta",
            sort: true,
            headerClasses: "align-top",
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "state",
            text: "Estado",
            sort: true,
            headerClasses: "align-top",
            formatter: StatusColumnFormatter,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "",
            text: "",
            formatter: DetailColumnFormatter,
        }
    ]
   
    const {
        queryParams,
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = useListingTableContext();

    const filteredData = filterData(issuers, queryParams.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        issuers.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"Emisores"}/>
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

 
ListingTable.defaultProps = {
    issuers: []
};

ListingTable.propTypes = {
    issuers: propTypes.arrayOf(propTypes.shape({
        id: propTypes.number,
        transmitter: propTypes.string,
        processor: propTypes.string,
        date: propTypes.string,
        brand: propTypes.string,
        cardId: propTypes.number,
    }))
}
