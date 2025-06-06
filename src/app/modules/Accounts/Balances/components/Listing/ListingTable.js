import React from "react";
import propTypes from 'prop-types';
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter";

const filterData = (balances, filter) => {
    let filteredData = balances;
    if (filter.businessName !== "" || filter.account !== "" ||
        filter.cvu !== "" || filter.cuit !== ""
    ) {
        filteredData = balances.filter(client => {
            if (
                client.cuit?.toString().includes(filter.cuit.toString()) ||
                client.cvu?.toString().includes(filter.cvu?.toString()) ||
                client.account?.toString().includes(filter.account?.toString()) ||
                client.businessName?.toString().toLowerCase().includes(filter.businessName?.toString().toLowerCase())
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { accountsBalancesData, columnsData } ) {
 
    const columns = columnsData.header.map((header, i) => {
        if(header === "Saldo"){
            return{
                dataField: columnsData.properties[i],
                text: header,
                sort: true,
                headerClasses: "text-center",
                sortCaret: sortCaret,
                headerSortingClasses,
                formatter: AmountColumnFormatter, 
            }
        }else{
            return {
                dataField: columnsData.properties[i],
                text: header,
                sort: true,
                sortCaret: sortCaret,
                headerSortingClasses
            }
        }
        
    })
   
    const {
        queryParams,
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = useListingTableContext();

    const filteredData = filterData(accountsBalancesData, queryParams.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        filteredData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"saldos"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={filteredData}
                defaultSorted={defaultSorted}
                setSize={setSize}
                setPageNumber={setPageNumber}
                paginationOptions={paginationOptions}
                keyField="cuit"
            />
        )
    )
}

 
ListingTable.defaultProps = {
    accountsBalancesData: []
};

ListingTable.propTypes = {
    accountsBalancesData: propTypes.arrayOf(propTypes.shape({
        id: propTypes.string,
        businessName: propTypes.string,
        cuit: propTypes.number,
        cvu: propTypes.number,
        amount: propTypes.number
    }))
}
