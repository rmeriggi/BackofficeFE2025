import React from "react";
import propTypes from 'prop-types';
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { DateColumnFormatter } from "../../../../../utils/column-formatter/DateColumnFormatter";
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter";
import { ActionColumnFormatter } from "./column-formatters/ActionColumnFormatter";

const filterData = (collectionsData, filter) => {
    let filteredData = collectionsData;
    if (filter.dni !== "" || filter.name !== "" || filter.days !== "") {
        filteredData = collectionsData.filter(collection => {
            if (
                collection.dni.toString().toLowerCase().includes(filter.dni.toString().toLowerCase()) ||
                collection.name.toLowerCase().includes(filter.name.toLowerCase()) ||
                collection.days.toString().toLowerCase().includes(filter.days.toString().toLowerCase()) 
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}


const filterStatus = (collectionsData, filter) => {
    if(filter.status === "Todas") return collectionsData
    let filteredData = collectionsData;
    if (filter.status !== "") {
        filteredData = filteredData.filter(collection => {
            if (
                collection.status.toString().trim().includes(filter.status.toString().trim()) 
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}


const filterCuotes = (collectionsData, filter) => {
    let filteredData = collectionsData;
    if (filter.cuotes !== "") {
        filteredData = filteredData.filter(collection => {
            if (
                collection.quotas.toString().toLowerCase().includes(filter.cuotes.toString().toLowerCase()) 
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { collectionsData, openReasignCredit } ) {

    const openCreditDetail = (id) => {
        const a = document.createElement("a")
        a.href = `${process.env.REACT_APP_PATH}credits/management/view/${id}`
        a.target = "_blank"
        a.rel="noopener noreferrer" 
        a.click()
    }

    const columns = [
        {
            dataField: "manager",
            text: "Gestor",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        {
            dataField: "idCredit",
            text: "ID crédito",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        {
            dataField: "name",
            text: "Nombre y Apellido",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: 'text-center',
            headerClasses: 'text-center',
            style: { width: '16%' }
        },
        {
            dataField: "amountOwed",
            text: "Importe exigible",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        {
            dataField: "days",
            text: "Días de mora",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        {
            dataField: "quotas",
            text: "Cantidad de cuotas adeudadas",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        
        {
            dataField: "status",
            text: "Estado",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        {
            dataField: "dateLastContact",
            text: "Fecha últ. contacto",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: DateColumnFormatter,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        {
            dataField: "accion",
            text: "Acción",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: ActionColumnFormatter,
            formatExtraData: {
                openCreditDetail,
                openReasignCredit
            },
            classes: 'text-center',
            headerClasses: 'text-center',
            style: { width: '16%' }
        },
    ]
   
    const {
        queryParams,
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = useListingTableContext();

    const filteredData = filterData(collectionsData, queryParams.filter);
    const filterByStatus = filterStatus(filteredData, queryParams.filter);
    const filterByCuotes = filterCuotes(filterByStatus, queryParams.filter)

    const paginationOptions = {
        custom: true,
        totalSize: filterByCuotes.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        collectionsData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"Cobranzas"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={filterByCuotes}
                defaultSorted={defaultSorted}
                setSize={setSize}
                setPageNumber={setPageNumber}
                paginationOptions={paginationOptions}
            />
        )
    )
}

 
ListingTable.defaultProps = {
    collectionsData: []
};

ListingTable.propTypes = {
    accountData: propTypes.arrayOf(propTypes.shape({
        manager: propTypes.string,
        productId: propTypes.number,
        productType: propTypes.string,
        name: propTypes.string,
        days: propTypes.number,
        capital: propTypes.number,
        cuotes: propTypes.number,
        managmentStatus: propTypes.string,
        autodebit: propTypes.string,
        status: propTypes.string,
    }))
}
