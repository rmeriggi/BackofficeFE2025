import React from "react";
import propTypes from 'prop-types';
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { AmountColumnFormatterSpaceAround } from "../../../../../utils/column-formatter/AmountColumnFormatterSpaceAround";
import { TotalColumnFormatter } from "../../../../../utils/column-formatter/TotalColumnFormatter";
import { ActionColumnFormatter } from "./column-formater/ActionColumnFormatter";
import { getIvrData } from "../../utils/service";

const filterData = (collectionsData, filter) => {
    let filteredData = collectionsData;
    if (filter.manager !== "") {
        filteredData = collectionsData.filter(collection => {
            if (
                collection.manager.toLowerCase().includes(filter.manager.toLowerCase())
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { collectionsData } ) {

    const getIvr = async (id) => {        
        try {
            const response = await getIvrData(id)
            const link = response.url
            const a = document.createElement("a")
            a.href = `http://${link}`
            a.target = "_blank"
            a.rel="noopener noreferrer" 
            a.click()
        } catch (e) {
            console.error(e)
        }
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
            formatter: TotalColumnFormatter
        },
        {
            dataField: "efficiency",
            text: "Eficiencia",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        {
            dataField: "capital",
            text: "Monto Total Asignado",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatterSpaceAround,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        {
            dataField: "capitalRaised",
            text: "Monto Total Recaudado",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatterSpaceAround,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        {
            dataField: "credits",
            text: "Total de créditos asignados",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        {
            dataField: "creditsRaised",
            text: "Total de créditos recaudado",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        {
            dataField: "",
            text: "Accion",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: ActionColumnFormatter,
            formatExtraData: {
                getIvr,
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

    const filteredData = filterData(collectionsData, queryParams.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
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
    collectionsData: []
};

ListingTable.propTypes = {
    accountData: propTypes.arrayOf(propTypes.shape({
        manager: propTypes.string,       
        capital: propTypes.number,
        cuotes: propTypes.number,
    }))
}
