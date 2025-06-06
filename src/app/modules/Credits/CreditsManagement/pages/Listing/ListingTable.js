import React from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {useListingTableContext} from "./ListingTableContext";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { RateColumnFormatter } from "../../../components/columnFormatters/RateColumnFormatter";
import { DateColumnFormatter } from "../../../../../utils/column-formatter/DateColumnFormatter";
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter";
import { OldAndNewIdColumnFormatter, ActionColumnFormatter, StatusColumnFormatter } from "./column-formatters";

const filterData = (creditsData, filter) => {
    let filteredData = creditsData;
    if (filter.productName !== "" || filter.id !== "") {
        filteredData = creditsData.filter(credit => {
            if (
                credit.productName.toLowerCase().includes(filter.productName.toLowerCase()) ||
                credit.id.toString().toLowerCase() === (filter.id.toString().toLowerCase()) ||
                credit.originalId.toString().toLowerCase() === (filter.originalId.toString().toLowerCase())
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { creditsData, creditsStatus } ) {

    const history = useHistory()
    const location = useLocation()
    const {id} = useParams()
    
    const openCredit = (idCredit, originalId) => {
        history.push(`/credits/credits/view/${idCredit}`, {from: location.pathname, id, originalId})
    }

    const columns = [
        {
            dataField: "status",
            text: "Estado",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: StatusColumnFormatter,
            formatExtraData: {
                creditsStatus
            }
        },
        {
            dataField: "id",
            text: "ID",
            sort: true,
            headerClasses: "text-center",
            classes: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: OldAndNewIdColumnFormatter,
        },
        {
            dataField: "productName",
            text: "Producto",
            sort: true,
            headerClasses: "text-center",
            classes: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "date",
            text: "Fecha Alta",
            sort: true,
            formatter: DateColumnFormatter,
            headerClasses: "text-center",
            classes: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "rate",
            text: "Tasa",
            sort: true,
            headerClasses: "text-center",
            classes: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: RateColumnFormatter
        },
        {
            dataField: "amount",
            text: "Capital",
            sort: true,
            formatter: AmountColumnFormatter,
            headerClasses: "text-center",
            classes: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "detail",
            text: "acción",
            formatter: ActionColumnFormatter,
            headerClasses: "text-center",
            classes: "text-center",
            formatExtraData: {
                openCredit,
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

    const filteredDataBySearch = filterData(creditsData, queryParams.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredDataBySearch.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        creditsData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"créditos"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={filteredDataBySearch}
                defaultSorted={defaultSorted}
                setSize={setSize}
                setPageNumber={setPageNumber}
                paginationOptions={paginationOptions}
            />
        )
    )
}