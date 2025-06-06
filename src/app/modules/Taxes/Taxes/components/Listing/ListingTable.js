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

const filterData = (taxesData, filter) => {
    let filteredData = taxesData;
    if (filter.tax !== "" || filter.currency !== "") {
        filteredData = taxesData.filter(taxes => {
            if (
                taxes.tax.toLowerCase()
                .includes(filter.tax.toLowerCase()) ||
                taxes.currency.toLowerCase()
                .includes(filter.currency.toLowerCase())
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { taxesData, openDetailTax } ) {

    const history = useHistory()

    const openEditTaxPage = (id) => {
        history.push(`/taxes/taxes/edit/${id}`)
    }

    const columns = [
        {
            dataField: "currency",
            text: "moneda",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "country",
            text: "pais",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "tax",
            text: "Impuesto",
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
            headerClasses: "text-center",
            classes: "text-center",
            formatter: ActionColumnFormatter,
            formatExtraData: {
                openEditTaxPage,
                openDetailTax
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

    const filteredData = filterData(taxesData, queryParams.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        taxesData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"impuestos"}/>
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
    taxesData: []
};

ListingTable.propTypes = {
    taxesData: propTypes.arrayOf(propTypes.shape({
        id: propTypes.string,
        currency: propTypes.string,
        country: propTypes.string,
        tax: propTypes.string,
        description: propTypes.string,
        status: propTypes.string,
    }))
}
