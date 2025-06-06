import React from "react";
import {useListingTableContext} from "./ListingTableContext";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";

const filterData = (scoreParamsData, filter) => {
    let filteredData = scoreParamsData;
    if (filter.scoreParam !== "" ) {
        filteredData = scoreParamsData.filter(score => {
            if (
                score.scoreParam.toString().toLowerCase()
                .includes(filter.scoreParam.toString().toLowerCase())
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { scoreParamsData } ) {


    const columns = [
        {
            dataField: "scoreParam",
            text: "score param",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "frequency",
            text: "Frecuencia",
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

    const filteredData = filterData(scoreParamsData, queryParams.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        scoreParamsData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"parametros de score"}/>
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