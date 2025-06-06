import React from "react";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../../../components/TableNoRecordsFound";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(()=>({
    columnWidth: {
        width: '20%'
    }
}))

export function ListingTable( {accountingEntriesData} ) {

    const classes = useStyles();

    const columns = [
        {
            dataField: "idAux",
            text: "N° de cuenta",
            classes: `${classes.columnWidth} text-center`,
            headerClasses: "text-center",
        },
        {
            dataField: "auxName",
            text: "Detalle",
            classes: `${classes.columnWidth}`,
        },
        {
            dataField: "debitAmount",
            text: "Debe",
            classes: `${classes.columnWidth}`,
        },
        {
            dataField: "creditAmount",
            text: "Haber",
            classes: `${classes.columnWidth}`,
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
        totalSize: accountingEntriesData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        accountingEntriesData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"Asientos Contables"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={accountingEntriesData}
                defaultSorted={defaultSorted}
                paginationOptions={paginationOptions}
                setSize={setSize}
                setPageNumber={setPageNumber}
                text='no'
            />
        )
    )
}