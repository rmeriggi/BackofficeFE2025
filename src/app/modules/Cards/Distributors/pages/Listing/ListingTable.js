import React from "react";
import {useListingTableContext} from "./ListingTableContext";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import {DateColumnFormatter} from "../../../../../utils/column-formatter/DateColumnFormatter";
import { DetailColumnFormatter } from "./column-formatters/DetailColumnFormatter"

const filterData = (products, filter) => {
    let filteredData = products;
    if (filter.companyName !== "" || filter.provider !== "" || filter.email !== "" || filter.movil !== "" || filter.address !== "") {
        filteredData = products.filter(product => {
            if (
                product.companyName?.toString().toLowerCase().includes(filter.companyName.toString().toLowerCase()) ||
                product.movil?.toString().includes(filter.movil?.toString()) ||
                product.email?.toString().toLowerCase().includes(filter.email?.toString().toLowerCase()) ||
                product.distributor?.toString().toLowerCase().includes(filter.distributor.toString().toLowerCase()) ||
                product.address?.toString().toLowerCase().includes(filter.address.toString().toLowerCase())
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { products } ) {
    const columns = [
        {
            dataField: "companyName",
            text: "Compañia",
            sort: true,
            headerClasses: "align-top",
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "distributor",
            text: "Distribuidor",
            sort: true,
            headerClasses: "align-top",
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
            text: "E-mail",
            sort: true,
            headerClasses: "align-top",
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "address",
            text: "Dirección",
            sort: true,
            headerClasses: "align-top",
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "movil",
            text: "Teléfono",
            sort: true,
            headerClasses: "align-top",
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "country",
            text: "País",
            sort: true,
            headerClasses: "align-top",
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

    const filteredData = filterData(products, queryParams.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        products.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"distribuidores"}/>
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