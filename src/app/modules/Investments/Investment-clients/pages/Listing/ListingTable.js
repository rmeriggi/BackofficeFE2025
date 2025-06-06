import React from "react";
import { useHistory } from "react-router-dom";
import {useListingTableContext} from "./ListingTableContext";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import {StatusColumnFormatter} from './column-formatters/StatusColumnFormatter'
import { PerfilColumnFormatter } from "./column-formatters/PerfilColumnFormatter";
import { ClientColumnFormatter } from "./column-formatters/ClientColumnFormatter";
import {DetailColumnFormatter} from './column-formatters/DetailColumnFormatter'
import {DateColumnFormatter} from "../../../../../utils/column-formatter/DateColumnFormatter"

const filterData = (clients, filter) => {
    let filteredData = clients;
    if (filter.name !== "" || filter.lastname !== "") {
        filteredData = clients.filter(client => {
            if (
                client.name?.toLowerCase().includes(filter.name.toLowerCase()) ||
                client.passport?.toString().toLowerCase().includes(filter.passport?.toLowerCase()) ||
                client.email?.toLowerCase().includes(filter.email?.toLowerCase()) ||
                client.lastName?.toLowerCase().includes(filter.lastName.toLowerCase()) ||
                client.account?.toLowerCase().includes(filter.account?.toLowerCase()) 
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { clients } ) {

    const history = useHistory()

    const openEditClientPage = (id) => {
        history.push(`/investments/investment-clients/edit/${id}`)
    }

    const openInvestment = (id) => {
        history.push(`/investments/investment-clients/investments/${id}`)
    }

    const columns = [
        {
            dataField: "name",
            text: "Cliente",
            sort: true,
            headerClasses: "align-top",
            formatter: ClientColumnFormatter,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "date",
            text: "Fecha alta",
            sort: true,
            headerClasses: "align-top",
            formatter: DateColumnFormatter,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "email",
            text: "Perfil",
            sort: true,
            headerClasses: "align-top",
            formatter: PerfilColumnFormatter,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "account",
            text: "Número de cuenta",
            sort: true,
            headerClasses: "align-top",
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "state",
            text: "Estado",
            sort: true,
            headerClasses: "align-top",
            formatter: StatusColumnFormatter,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "",
            text: "Acción",
            formatter: DetailColumnFormatter,
            headerClasses: "text-center",
            style: { width: "161px" },
            formatExtraData: {
                openEditClientPage,
                openInvestment
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

    const filteredData = filterData(clients, queryParams.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        clients.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"clientes"}/>
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