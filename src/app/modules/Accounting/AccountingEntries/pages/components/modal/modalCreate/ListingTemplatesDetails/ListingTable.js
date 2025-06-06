import React from "react";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../../../../components/TableNoRecordsFound";
import { MovementTypeColumnFormatter } from "../../../../../../TemplatesEntries/pages/Edit/ListingDetails/column-formatters/MovementTypeColumnFormatter";
import { AmountInputColumnFormatter } from "./columnFormatters/AmountInputColumnFormatter";

export function ListingTable( props ) {


    const columns = [
        {
            dataField: "idAuxiliary",
            text: "N° de cuenta",
            classes: `text-center`,
            headerClasses: "text-center",
        },
        {
            dataField: "auxName",
            text: "Detalle",
            classes: `text-center`,
            headerClasses: "text-center",
        },
        {
            dataField: "movementType",
            text: "",
            classes: `text-center`,
            headerClasses: "text-center",
            formatter: MovementTypeColumnFormatter
        },
        {
            dataField: "amount",
            text: "Importe",
            classes: `text-center`,
            headerClasses: "text-center",
            formatter: AmountInputColumnFormatter,
            formatExtraData: {
                amounts: props.amounts,
                setFieldValue: props.setFieldValue,
                setAmounts: props.setAmounts
            }
        }
    ]
   
    const {
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = useListingTableContext();

    const paginationOptions = {
        custom: true,
        totalSize: props.data.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        props.data.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"Detalles"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={props.data}
                defaultSorted={defaultSorted}
                paginationOptions={paginationOptions}
                setSize={setSize}
                setPageNumber={setPageNumber}
                text='no'
            />
        )
    )
}