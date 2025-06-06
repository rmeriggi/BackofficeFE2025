import React from "react";
import propTypes from 'prop-types';
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import {ActionColumnFormatter} from './column-formatters/ActionColumnFormatter'

const filterData = (archivesData, filter) => {
    let filteredData = archivesData;
    if (filter.report !== "" || filter.period !== "") {
        filteredData = archivesData.filter(account => {
            if (
                account.report.toLowerCase().includes(filter.report.toLowerCase()) ||
                account.period.toLowerCase().includes(filter.period.toLowerCase())
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { reportsData } ) {
    const openDetail = (id) =>{}
    const downloadDetail = (id) =>{}

    const columns = [
        {
            dataField: "date",
            text: "Fecha",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "report",
            text: "Informe",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "period",
            text: "Periodo",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "action",
            text: "Accion",
            formatter: ActionColumnFormatter,
            formatExtraData: {
                openDetail,
                downloadDetail
            }

        },
    ]
   
    const {
        queryParams,
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = useListingTableContext();

    const filteredData = filterData(reportsData, queryParams.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        reportsData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"Informes"}/>
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

 
ListingTable.defaultProps = {
    archivesData: []
};

ListingTable.propTypes = {
    archiveData: propTypes.arrayOf(propTypes.shape({
        date: propTypes.string,
        file: propTypes.string,
        period: propTypes.string,
    }))
}
