/* eslint-disable eqeqeq */
import React from "react";
import {TableNoRecordsFoundMessage} from "../../../../components/TableNoRecordsFound";
import { ReportTable } from "./ReportTable";

export function ListingTableOne( { dataTable } ) {

    return (
        dataTable.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"Reportes"}/>
        ) : (
            <>
                <ReportTable data={dataTable} />
            </>
        )
    )
}
