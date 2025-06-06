/* eslint-disable eqeqeq */
import React from "react";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { ActionColumnFormatter } from "./column-formatters/ActionColumnFormatter";
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter";
import { useHistory } from "react-router-dom";
import { DateColumnFormatter } from "../../../../../utils/column-formatter/DateColumnFormatter";

const filterData = (movementsData, filter) => {
    let filteredData = movementsData;
    if (filter.operationNumber !== "" ) {
        filteredData = movementsData.filter(movement => {
            if (
                movement.operationNumber?.trim().toLowerCase().includes(filter.operationNumber.toLowerCase())
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

const filterDataAll = (movementsData, filter) => {
    let filteredData = movementsData;
    if (filter.searchTextAll !== "") {
        filteredData = movementsData.filter(movement => {
            if (
                movement.description?.trim().toLowerCase().includes(filter.searchTextAll.toLowerCase())
            ) {
                return true;
            }

            if (
                movement.paymentMethod?.trim().toLowerCase().includes(filter.searchTextAll.toLowerCase())
            ) {
                return true;
            }

            if (
                movement.paymentLinkId?.trim().toLowerCase().includes(filter.searchTextAll.toLowerCase())
            ) {
                return true;
            }

            if (
                movement.amount?.trim().toLowerCase().includes(filter.searchTextAll.toLowerCase())
            ) {
                return true;
            }

            if (
                movement.status?.trim().toLowerCase().includes(filter.searchTextAll.toLowerCase())
            ) {
                return true;
            }

            if (
                movement.operationNumber?.trim().toLowerCase().includes(filter.searchTextAll.toLowerCase())
            ) {
                return true;
            }

            if (
                movement.date?.trim().toLowerCase().includes(filter.searchTextAll.toLowerCase())
            ) {
                return true;
            }

            return false;
        });
    }

    return filteredData;
}

const filterByStatus = (movementsData, filter) => {
    let filteredData = movementsData
    if(filter.idStatus !== 0){
        filteredData = movementsData.filter(movement => {
            if(movement.statusId?.includes(filter.idStatus.toString())){
                return true
            }
            return false
        })
    }

    return filteredData
}

export function ListingTable( { dataTable } ) {
    
    const history = useHistory()

    const openEditMovement = (id) => {
        history.push(`/externalcharges/movement/edit/${id}`)
    }
    
    const columns = [
        {
            dataField: "id",
            text: "ID",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            headerClasses: "text-center",
            classes: "text-center",
        },
        {
            dataField: "status",
            text: "Estado",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            headerClasses: "text-center",
            classes: "text-center",
        },
        {
            dataField: "date",
            text: "Fecha",
            sort: true,
            classes: 'text-center',
            headerClasses: 'text-center',
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: DateColumnFormatter
        },
        {
            dataField: "paymentMethod",
            text: "Medio de pago",
            sort: true,
            classes: 'text-center',
            headerClasses: 'text-center',
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "paymentLinkId",
            text: "ID link de pago",
            sort: true,
            classes: 'text-center',
            headerClasses: 'text-center',
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "description",
            text: "Descripción",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "amount",
            text: "Importe",
            sort: true,
            classes:"text-center",
            headerClasses: 'text-center',
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter
        },
        {
            dataField: "action",
            text: "",
            formatter: ActionColumnFormatter,
            formatExtraData: {
                openEditMovement
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

    const filteredDataAll = filterDataAll(dataTable, queryParams.filter);
    const filteredData = filterData(filteredDataAll, queryParams.filter);
    const filteredByStatus = filterByStatus(filteredData, queryParams.filter)

    const paginationOptions = {
        custom: true,
        totalSize: filteredByStatus.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        filteredByStatus.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"Movimientos con ese estado"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={filteredByStatus}
                defaultSorted={defaultSorted}
                paginationOptions={paginationOptions}
                setSize={setSize}
                setPageNumber={setPageNumber}
            />
        )
    )
}
