import React from "react";
import propTypes from 'prop-types';
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { ActionColumnFormatter } from "./column-formatters/ActionColumnFormatter";
import { useHistory } from "react-router";

const filterData = (programsData, filter) => {
    let filteredData = programsData;
    if (filter.description !== "" || filter.id !== "") {
        filteredData = programsData.filter(program => {
            if (
                program.description.toLowerCase().includes(filter.description.toLowerCase()) ||
                program.id.toString().toLowerCase().includes(filter.id.toString().toLowerCase()) 
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { programsData, country } ) {

    const history = useHistory();

    
    const openEditProgramPage = (id) => {
        history.push(`/loyalty/programs/edit/${id}`)
    }

    const columns = [
        {
            dataField: "id",
            text: "ID",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center w-5",
            headerClasses: "pl-8 text-center w-5"
        },
        {
            dataField: "description",
            text: "Descripción",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center",
            headerClasses: "pl-5 text-center"
        },
        {
            dataField: "status",
            text: "Status",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center",
            headerClasses: "pl-5 text-center"
        },
        {
            dataField: "fromDate",
            text: "Fecha Desde",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center",
            headerClasses: "pl-5 text-center"
        },
        {
            dataField: "toDate",
            text: "Fecha Hasta",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center",
            headerClasses: "pl-5 text-center"
        },
        {
            dataField: "frequency",
            text: "Frecuencia",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center",
            headerClasses: "pl-5 text-center"
        },
        {
            dataField: "",
            text: "Acción",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center",
            headerClasses: "pl-5 text-center",
            formatter: ActionColumnFormatter,
            formatExtraData: {
                openEditProgramPage
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

    const filteredData = filterData(programsData, queryParams.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        programsData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"créditos"}/>
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
    programsData: []
};

ListingTable.propTypes = {
    accountData: propTypes.arrayOf(propTypes.shape({
        id: propTypes.number,
        description: propTypes.string,
        status: propTypes.string,
        fromDate: propTypes.string,
        toDate: propTypes.string,
        frequency: propTypes.string,
    }))
}
