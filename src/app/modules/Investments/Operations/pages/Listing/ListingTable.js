import React from "react";
import propTypes from 'prop-types';
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {defaultSorted} from "./ListingTableHelpers";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
// import {ActionColumnFormatter} from './column-formatters/ActionColumnFormatter'
import { DateColumnFormatter } from "../../../../../utils/column-formatter/DateColumnFormatter";
import { makeStyles } from "@material-ui/core";
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter";
 
const useStyles = makeStyles(()=> ({
    date: {
        paddingLeft: '2rem!important'
    }
}))

export function ListingTable( { productsData } ) {

    const classes = useStyles()

    const columns = [
        {
            dataField: "id",
            text: "ID",
            sort: true,
            headerClasses: "text-center",
            classes:"text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "status",
            text: "Estado",
            sort: true,
            headerClasses: "text-center",
            classes:"text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "product",
            text: "Producto",
            sort: true,
            sortCaret: sortCaret,
            headerClasses: "text-center",
            classes:"text-center",
            headerSortingClasses
        },
        {
            dataField: "type",
            text: "Tipo",
            sort: true,
            sortCaret: sortCaret,
            headerClasses: "text-center",
            classes:"text-center",
            headerSortingClasses,
            
        },
        {
            dataField: "orderDate",
            text: "Fecha Orden",
            sort: true,
            sortCaret: sortCaret,
            headerClasses: "text-center",
            classes:"text-center",
            formatter: DateColumnFormatter,
            headerSortingClasses    
        },
        {
            dataField: "amount",
            text: "Monto",
            sort: true,
            headerClasses: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
            classes:"text-center",
            formatter: AmountColumnFormatter
        },
        {
            dataField: "order",
            text: "Orden",
            sort: true,
            headerClasses: "text-center",
            classes:"text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "price",
            text: "Precio",
            sort: true,
            classes:"text-center",
            headerClasses: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter
        },
        {
            dataField: "operationDate",
            text: "Fecha Op.",
            sort: true,
            headerClasses: "text-center",
            classes:"text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: DateColumnFormatter
        },
        {
            dataField: "quantity",
            text: "Cantidad",
            sort: true,
            sortCaret: sortCaret,
            classes: "text-center",
            headerSortingClasses,
        },
        {
            dataField: "operationPrice",
            text: "Precio Op.",
            sort: true,
            headerClasses: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter
        },
        {
            dataField: "operationAmount",
            text: "Monto Op.",
            sort: true,
            headerClasses: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter
        },
        {
            dataField: "operator",
            text: "Operador",
            sort: true,
            headerClasses: "text-center",
            classes:"text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "action",
            text: "",
            // formatter: ActionColumnFormatter,
            classes: `${classes.columnWidth} text-right`
        }
    ]

    return (
        productsData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"créditos"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={productsData}
                defaultSorted={defaultSorted}
            />
        )
    )
}

 
ListingTable.defaultProps = {
    productsData: []
};

ListingTable.propTypes = {
    productsData: propTypes.arrayOf(propTypes.shape({
        id: propTypes.string,
        status: propTypes.string,
        nameProduct: propTypes.string,
        date: propTypes.string,
        rate: propTypes.number,
        amount: propTypes.number,
    }))
}
