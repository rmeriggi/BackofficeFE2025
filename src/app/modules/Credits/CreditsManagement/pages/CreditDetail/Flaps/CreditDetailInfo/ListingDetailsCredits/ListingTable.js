import React from "react";
import propTypes from 'prop-types';
import {sortCaret, headerSortingClasses} from "../../../../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableDetailsCreditsHelpers";
import {useListingTableContext} from "./ListingTableDetailsCreditsContext";
import {PaginatedTable} from "../../../../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../../../../components/TableNoRecordsFound";
import { DateColumnFormatter } from "../../../../../../../../utils/column-formatter/DateColumnFormatter";
import { AmountColumnFormatter } from "../../../../../../../../utils/column-formatter/AmountColumnFormatter";
import { ActionColumnFormatter } from "./column-formatters/ActionColumnFormatter";
import { StatusColumnFormater } from "../../../../../../Collections/pages/CreditDetail/Flaps/CreditDetailInfo/ListingDetailsCredits/column-formatters/StatusColumnFormater";
import { DaysColumnFormater } from "../../../../../../Collections/pages/CreditDetail/Flaps/CreditDetailInfo/ListingDetailsCredits/column-formatters/DaysColumnFormatter";


export function ListingTable( { collectionsData, openModal,quotasStatus, openCollectionDetail, setIdCredit, setQuotaNumber} ) {

    const columns = [
        {
            dataField: "statusQuota",
            text: "Estado",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: 'text-center',
            headerClasses: 'text-center',
            formatter: StatusColumnFormater,
            formatExtraData: {
                quotasStatus
            }
        },
        {
            dataField: "quota",
            text: "Nro. de Cuota",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        {
            dataField: "",
            text: "Días de mora",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: 'text-center',
            headerClasses: 'text-center',
            formatter: DaysColumnFormater
        },
        {
            dataField: "capital",
            text: "Capital",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        {
            dataField: "interest",
            text: "Intereses",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        {
            dataField: "expenses",
            text: "Gastos",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        {
            dataField: " ",
            text: "Int. Comp",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        {
            dataField: "punitive",
            text: "Punitorios",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        {
            dataField: "amount",
            text: "Total",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        {
            dataField: "pending",
            text: "Pendiente",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter,
            classes: 'text-center',
            headerClasses: 'text-center',
        },
        {
            dataField: "expiration",
            text: "Fecha de vencimiento",
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
                openModal,
                openCollectionDetail,
                setIdCredit,
                setQuotaNumber
            },
            classes: 'text-center',
            headerClasses: 'text-center',
        },
    ]
   
    const {
        queryParams,
        setQueryParams,
    } = useListingTableContext();

    const paginationOptions = {
        custom: true,
        totalSize: collectionsData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: queryParams.pageSize,
        page: queryParams.pageNumber,
    };

    return (
        collectionsData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"Detalle de crédito"}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={collectionsData}
                defaultSorted={defaultSorted}
                setQueryParams={setQueryParams}
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
