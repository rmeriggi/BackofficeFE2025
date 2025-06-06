import React from "react";
import {sortCaret, headerSortingClasses} from "../../../../../../../_metronic/_helpers";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {useListingTableContext} from "./ListingTableContext";
import {PaginatedTable} from "../../../../../../components/PaginatedTable";
import {TableNoRecordsFoundMessage} from "../../../../../../components/TableNoRecordsFound";
import { AmountColumnFormatter } from "../../../../../../utils/column-formatter/AmountColumnFormatter";
import { StatusColumnFormatter } from "./column-formatters/StatusColumnFormatter";
import { ClientColumnFormatter } from "./column-formatters/ClientColumnFormatter";
import { ActionColumnFormatter } from "./column-formatters/ActionColumnFormatter";
import { assignLostQuota, forgiveDebtQuota } from "../../../utils/service";


export function ListingTable( { cuotesData, setModalInfo, openModal } ) {

    const condonate = async (id) => {
        const excecute = {
            excecute: 0
        }
        const response = await forgiveDebtQuota(excecute, id)
        setModalInfo(response)
        openModal(3, id)
    }

    const asingLost = async(id) => {
        const excecute = {
            excecute: 0
        }
        const response = await assignLostQuota(excecute, id)
        setModalInfo(response)
        openModal(4, id)
    }

    const columns = [
        {
            dataField: "creditId",
            text: "ID Crédito",
            sort: true,
            sortCaret: sortCaret,
            classes: "text-center",
            headerSortingClasses,
            headerClasses: "text-center"
        },
        {
            dataField: "productId",
            text: "Producto",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center",
            headerClasses: "text-center"
        },
        {
            dataField: "name",
            text: "Nombre Y Apellido",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center",
            formatter: ClientColumnFormatter,
            headerClasses: "text-center"
        },
        {
            dataField: "statusDescription",
            text: "Estado",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: StatusColumnFormatter,
            formatExtraData:{
                dataField: "status",
            },
            classes: "text-center",
            headerClasses: "text-center align-top"
        },
        {
            dataField: "feeNumber",
            text: "Nro. de Cuota",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center",
            headerClasses: "text-center"
        },
        {
            dataField: "amount",
            text: "Importe",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter,
            classes: "text-center",
            headerClasses: "text-center"
        },
        {
            dataField: "delayDays",
            text: "Días de Atraso",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center",
            headerClasses: 'text-center'
        },
        {
            dataField: "",
            text: "Acción",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            classes: "text-center",
            headerClasses: 'text-center',
            formatter: ActionColumnFormatter,
            formatExtraData: {
                condonate,
                asingLost
            },
            style: { width: '165px' }
        },
    ]
    const {
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = useListingTableContext();

    const paginationOptions = {
        custom: true,
        totalSize: cuotesData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        cuotesData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"cuotas"} message={'Completa los campos y presiona BUSCAR para obtener los créditos filtrados'}/>
        ) : (
            <PaginatedTable
                columns={columns}
                data={cuotesData}
                defaultSorted={defaultSorted}
                setSize={setSize}
                setPageNumber={setPageNumber}
                paginationOptions={paginationOptions}
            />
        )
    )
}