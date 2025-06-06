import React from "react";
import {sortCaret, headerSortingClasses} from "../../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../../components/TableNoRecordsFound";

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

    const columns = [
        {
            dataField: "accountName",
            text: "Nombre de la cuenta",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center",
            headerClasses: "text-center"
        },
        {
            dataField: "bank",
            text: "Banco",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "type",
            text: "Tipo",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "currency",
            text: "Moneda",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
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