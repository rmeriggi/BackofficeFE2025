import React from "react";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { DateColumnFormatter } from "../../../../../utils/column-formatter/DateColumnFormatter";
import { DetailColumnFormatter } from "./column-formatters/DetailColumnFormatter";
import { useHistory } from "react-router-dom";
import { ClientColumnFormatter } from "./column-formatters/ClientColumnFormatter";

const filterData = (accounts, filter) => {
    let filteredData = accounts;
    if (filter.accountName !== "" ) {
        filteredData = accounts.filter(account => {
            if (
                account.accountName?.trim().toLowerCase().includes(filter.accountName.toLowerCase())
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { data} ) {

    const history = useHistory()

    const openEditAccounttPage = (accountNumber) => {
        history.push(`/investments/accounts/edit/${accountNumber}`)
    }

    const columns = [
        {
            dataField: "accountName",
            text: "Nombre de la cuenta",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center"
        },
        {
            dataField: "accountNumber",
            text: "N° de la cuenta",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "pl-12"
        },
        {
            dataField: "date",
            text: "Fecha de apertura",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: DateColumnFormatter,
            classes: "text-center"
        },
        {
            dataField: "currency",
            text: "Moneda",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "status",
            text: "Estado",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "client",
            text: "Cliente",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: ClientColumnFormatter
        },
        {
            dataField: "detail",
            text: "",
            formatter: DetailColumnFormatter,
            formatExtraData: {
                openEditAccounttPage
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

    const filteredData = filterData(data, queryParams.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        data.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"Cuentas"}/>
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