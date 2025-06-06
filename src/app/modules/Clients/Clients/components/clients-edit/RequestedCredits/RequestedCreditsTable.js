import React from 'react'
import {sortCaret, headerSortingClasses} from "../../../../../../../_metronic/_helpers"
import { useHistory, useLocation, useParams } from "react-router";
import { PaginatedTable } from '../../../../../../components/PaginatedTable'
import { TableNoRecordsFoundMessage } from '../../../../../../components/TableNoRecordsFound'
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {StatusAccountColumnFormatter} from '../../column-formatters/StatusAccountsColumnFormatter'
import {ActionColumnFormatter} from '../../column-formatters/ActionColumnFormatter'
import { useListingTableContext } from './ListingTableContext';
import { AmountColumnFormatter } from "../../column-formatters/AmountColumnFormatter"
import { RateColumnFormatter } from '../../column-formatters/RateColumnFormatter';
import { OldAndNewIdColumnFormatter } from '../../../../../Credits/Credits/pages/Listing/column-formatters/OldAndNewIdColumnFormatter';

export default function RequestedCreditsTable({movements, creditsStatus}) {

    const history = useHistory()
    const location = useLocation()
    const {id} = useParams()

    const openCreditDetail = (idCredit, originalId) => {
        history.push(`/credits/credits/view/${idCredit}`, {from: location.pathname, id, originalId})
    }

    const columns = [
        {
            dataField: "status",
            text: "Estado",
            sort: true,
            formatter: StatusAccountColumnFormatter,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatExtraData: {
                creditsStatus,
            }
        },
        {
            dataField: "id",
            text: "id",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: OldAndNewIdColumnFormatter
        },
        {
            dataField: "productName",
            text: "Nombre Producto",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "date",
            text: "Fecha Alta",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "rate",
            text: "Tasa",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: RateColumnFormatter,
            classes: "pl-7"
        },
        {
            dataField: "amount",
            text: "Importe",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter
        },
        {
            dataField: "action",
            text: "Acción",
            formatter: ActionColumnFormatter,
            formatExtraData: {
                openCreditDetail
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
        totalSize: movements.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
    movements.length === 0 ? (
        <TableNoRecordsFoundMessage entities={"Movimientos"}/>
    ) : (
        <PaginatedTable
            columns={columns}
            data={movements}
            setSize={setSize}
            setPageNumber={setPageNumber}
            defaultSorted={defaultSorted}
            paginationOptions={paginationOptions}
        />
    )
)
}
