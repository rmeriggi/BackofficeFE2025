/* eslint-disable eqeqeq */
import React from "react";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { ActionColumnFormatter } from "./column-formatters/ActionColumnFormatter";

const filterData = (brandsData, filter) => {
    let filteredData = brandsData;
    if (filter.brandName !== "" ) {
        filteredData = brandsData.filter(brand => {
            if (
                brand.brandName.trim().toLowerCase().includes(filter.brandName.toLowerCase())
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { dataTable } ) {
    
    const columns = [
        {
            dataField: "id",
            text: "ID",
            sort: true,
            classes: 'text-center',
            headerClasses: 'text-center',
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "brandName",
            text: "Marca",
            sort: true,
            classes: 'text-center',
            headerClasses: 'text-center',
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "sponsorName",
            text: "Sponsor",
            sort: true,
            classes: 'text-center',
            headerClasses: 'text-center',
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "entity",
            text: "Entidad",
            sort: true,
            classes: 'text-center',
            headerClasses: 'text-center',
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "country",
            text: "País",
            sort: true,
            classes: 'text-center',
            headerClasses: 'text-center',
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "action",
            text: "",
            classes: 'd-flex justify-content-end',
            formatter: ActionColumnFormatter,
        }
    ]
   
    const {
        queryParams,
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

    const filteredData = filterData(dataTable, queryParams.filter)

    return (
        dataTable.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"Tipos"}/>
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
