import React from "react";
import {useListingTableContext} from "./ListingTableContext";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { CardColumnFormatter } from "./column-formatters/CardsColumnFormatter";
import { DetailColumnFormatter } from "./column-formatters/DetailColumnFormatter"
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter";
import { useHistory } from "react-router-dom";

const filterData = (products, filter) => {
    let filteredData = products;
    if (filter.product !== "" || filter.brand !== "" || filter.cardType !== "" || filter.limit !== "" || filter.quotaLimit !== "") {
        filteredData = products.filter(product => {
            if (
                product.product?.toLowerCase().includes(filter.product?.toLowerCase()) ||
                product.brand?.toString().toLowerCase().includes(filter.brand?.toLowerCase()) ||
                product.cardType?.toLowerCase().includes(filter.cardType?.toLowerCase()) ||
                product.limit?.toLowerCase().includes(filter.limit?.toLowerCase()) ||
                product.quotaLimit?.toLowerCase().includes(filter.quotaLimit?.toLowerCase()) 
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}
export function ListingTable( { products } ) {

    const history = useHistory()

    const openEditProductPage = (id) => {
        history.push(`/cards/products/edit/${id}`)
    }

    const columns = [
        {
            dataField: "product",
            text: "Producto",
            sort: true,
            headerClasses: "align-top",
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "brand",
            text: "Marca",
            sort: true,
            headerClasses: "align-top",
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "cardType",
            text: "Tipo",
            sort: true,
            headerClasses: "align-top",
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "limit",
            text: "Limite",
            sort: true,
            headerClasses: "align-top",
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter
        },
        {
            dataField: "quotaLimit",
            text: "Limite de cuota",
            sort: true,
            headerClasses: "align-top",
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter
        },
        {
            dataField: "cardId",
            text: "Tarjeta",
            sort: true,
            headerClasses: "align-top",
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: CardColumnFormatter
        },
        {
            dataField: "",
            text: "",
            formatter: DetailColumnFormatter,
            formatExtraData: {
                openEditProductPage
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
            <TableNoRecordsFoundMessage entities={"Productos"}/>
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