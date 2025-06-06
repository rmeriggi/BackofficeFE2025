import React from "react";
import propTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import {useListingTableContext} from "./ListingTableContext";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {DetailColumnFormatter} from './column-formatters/DetailColumnFormatter'
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter"

const filterData = (accountsData, filter) => {
    let filteredData = accountsData;
    if (filter.alias !== "" || filter.bussinesName !== "" || filter.cvu !== "" || filter.cuit !== "") {
        filteredData = accountsData.filter(account => {
            if (
                account.alias?.toString().toLowerCase().includes(filter.alias.toLowerCase()) ||
                account.bussinesName?.toString().toLowerCase().includes(filter.bussinesName.toLowerCase())||
                account.cvu?.toString().includes(filter.cvu.toString()) ||
                account.cuit?.toString().includes(filter.cuit.toString())
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { accountsData } ) {

    const history = useHistory()
    
    const openAccountTableView = (id) => {
        history.push(`/accounts/accounts/view/${id}`)
    }

    const openExtract = (id) => {
        history.push(`/accounts/accounts/extract/${id}`)
    }

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
        },
        {
            dataField: "detail",
            text: "acción",
            formatter: DetailColumnFormatter,
            headerClasses: "text-center",
            classes: "text-center",
            formatExtraData: {
                openAccountTableView,
                openExtract
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

    const filteredData = filterData(accountsData, queryParams.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        accountsData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"cuentas"}/>
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
    accountsData: []
};

ListingTable.propTypes = {
    accountData: propTypes.arrayOf(propTypes.shape({
        id: propTypes.number,
        number: propTypes.string,
        alias: propTypes.string,
        cvu: propTypes.string,
        amount: propTypes.string,
    }))
}
