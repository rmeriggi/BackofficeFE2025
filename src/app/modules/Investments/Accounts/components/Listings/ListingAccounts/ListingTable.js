import React from "react";
import {sortCaret, headerSortingClasses} from "../../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../../components/TableNoRecordsFound";
import { AmountColumnFormatter } from "../../../../../../utils/column-formatter/AmountColumnFormatter";

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
            dataField: "cuit",
            text: "cuit",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "bussinesName",
            text: "Razón social",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            style: {width: "20%"},
        },
        {
            dataField: "alias",
            text: "Alias",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "cvu",
            text: "CVU",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "amount",
            text: "Saldo",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter,
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