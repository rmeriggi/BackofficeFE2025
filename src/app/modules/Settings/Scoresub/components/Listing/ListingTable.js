import React from "react";
import {useListingTableContext} from "./ListingTableContext";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";

const filterData = (scoreSourceData, filter) => {
    let filteredData = scoreSourceData;
    if (filter.source !== "" || filter.client !== "") {
        filteredData = scoreSourceData.filter(score => {
            if (
                score.source.toString().toLowerCase()
                .includes(filter.source.toString().toLowerCase()) ||
                score.client.toString().toLowerCase()
                .includes(filter.client.toString().toLowerCase())
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { scoreSourceData } ) {


    const columns = [
        {
            dataField: "id",
            text: "id",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "source",
            text: "Fuente",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "client",
            text: "Cliente",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "method",
            text: "Método",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "contentType",
            text: "Tipo de contenido",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "headersParams",
            text: "Parámetros de encabezado",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "certificate",
            text: "Certificado",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
    ]
   
    const {
        queryParams,
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = useListingTableContext();

    const filteredData = filterData(scoreSourceData, queryParams.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        scoreSourceData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"fuentes de score"}/>
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
