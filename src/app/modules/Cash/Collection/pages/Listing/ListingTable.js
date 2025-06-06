/* eslint-disable eqeqeq */
import React from "react";
import propTypes from 'prop-types';
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter"

export function ListingTable( { dataTable } ) {
    
    const columns = [
        {
            dataField: "entity",
            text: "Entidad",
            sort: false,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "currency",
            text: "Moneda",
            sort: false,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "movementDate",
            text: "Fecha Proceso",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },        
        {
            dataField: "valueDate",
            text: "Fecha TRX",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "paymentChanel",
            text: "Canal de cobro",
            sort: true,
            classes:"text-center",
            headerClasses: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "movementType",
            text: "Tipo de movimiento",
            sort: false,
            classes:"text-center",
            headerClasses: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "idProduct",
            text: "Crédito",
            sort: false,
            classes:"text-center",
            headerClasses: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "quota",
            text: "N° de cuota",
            sort: false,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center"
        },
        {
            dataField: "amount",
            text: "Importe",
            sort: true,
            classes:"text-center",
            headerClasses: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter,
        },
        {
            dataField: "user",
            text: "Gestor",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
    ]
   
    const {
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = useListingTableContext();

    const paginationOptions = {
        custom: true,
        totalSize: dataTable.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        dataTable.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"Cobranzas"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={dataTable}
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
    accountsData: propTypes.arrayOf(propTypes.shape({
        id: propTypes.number,
        entity: propTypes.string,
        currency: propTypes.string,
        group: propTypes.number,
        account: propTypes.string,
    }))
}
