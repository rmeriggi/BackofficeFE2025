import React from "react";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { DateColumnFormatter } from "../../../../../utils/column-formatter/DateColumnFormatter";
import { LinkColumnFormatter } from "./column-formatters/LinkColumnFormatter";
import { StatusColumnFormatter } from "./column-formatters/StatusColumnFormatter";

const filterData = (documentsData, filter) => {
    let filteredData = documentsData;
    if (filter.description !== "" || filter.clientName !== "") {
        filteredData = documentsData.filter(document => {
            if (
                document.description?.trim().toLowerCase().includes(filter.description.toLowerCase()) ||
                document.clientName?.trim().toLowerCase().includes(filter.clientName.toLowerCase())
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { documentsData, openModal, setIdStatus, setId } ) {

    const columns = [
        {
            dataField: "id",
            text: "ID",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "clientName",
            text: "Cliente",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: 'text-center'
        },
        {
            dataField: "description",
            text: "Descripción",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: 'text-center'
        },
        {
            dataField: "document",
            text: "Documento",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: 'text-center',
            headerClasses: 'd-flex border-bottom-0 mt-5'
        },
        {
            dataField: "statusDescription",
            text: "Estado",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: 'text-center'
        },
        {
            dataField: "lastUpdate",
            text: "Última Actualización",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: DateColumnFormatter,
            classes: 'text-center'
        },
        {
            dataField: "",
            text: "",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: LinkColumnFormatter
        },
        {
            dataField: "-",
            text: "",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: StatusColumnFormatter,
            formatExtraData: {
                openModal,
                setIdStatus,
                setId
            }
        }
    ]
   
    const {
        queryParams,
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = useListingTableContext();

    const filteredData = filterData(documentsData, queryParams.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        documentsData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"Documentos"}/>
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