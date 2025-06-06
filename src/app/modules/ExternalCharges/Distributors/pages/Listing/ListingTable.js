/* eslint-disable eqeqeq */
import React from "react";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import { useHistory } from "react-router-dom";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter";
import { ActionColumnFormatter } from "./column-formatters/ActionColumnFormatter";

export function ListingTable( { dataTable, setActionModal, openActionModal } ) {

    
    const history = useHistory();

    const openDistributorsDetail = (id) => {
        history.push(`/externalcharges/distributorsDetail/${id}`)
    }
    
    const columns = [
        
        {
            dataField: "id",
            text: "ID",
            sort: true,
            classes:"text-center",            
            headerClasses: "text-center",
            sortCaret: sortCaret,            
            headerSortingClasses,
        },
        {
            dataField: "distributor",
            text: "Distribuidor",
            sort: true,
            classes:"text-center",            
            headerClasses: "text-center",
            sortCaret: sortCaret,            
            headerSortingClasses,
        },        
        {
            dataField: "beneficiary",
            text: "Beneficiario",
            sort: true,
            classes:"text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "name",
            text: "Descripción",
            sort: true,
            classes:"text-center",
            headerClasses: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "idCurrency",
            text: "Moneda",
            sort: true,
            classes:"text-center",
            headerClasses: "text-center",
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "amount",
            text: "Importe",
            headerClasses: "text-center",
            classes: "text-center",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter
        },
        {
            dataField: "action",
            text: "",            
            formatter: ActionColumnFormatter,
            formatExtraData: {
                openDistributorsDetail
            }
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
        totalSize: dataTable.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        dataTable.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"Distribuidores"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={dataTable}
                defaultSorted={defaultSorted}
                paginationOptions={paginationOptions}
                setSize={setSize}
                setPageNumber={setPageNumber}
            />
        )
    )
}
