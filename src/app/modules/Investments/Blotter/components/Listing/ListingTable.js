import React from "react";
import {useListingTableContext} from "./ListingTableContext";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { AmountColumnFormatter } from "../Listing/column-formatters/AmountColumnFormatter"
import { PercentageColumnFormatter } from "../../../../../utils/column-formatter/PercentageColumnFormatter";
import { DeadLineColumnFormatter } from "../../../../../utils/column-formatter/deadLineColumnFormatter";
import   ChargeColumnFormatter  from "../../../../../utils/column-formatter/chargeColumnFormatter"; 
import AuthColumnFormatter from "../../../../../utils/column-formatter/authColumnFormatter";
import FxColumnFormatter from "../../../../../utils/column-formatter/fxColumnFormatter";
import { ActionColumnFormatter } from "./column-formatters/ActionColumnFormatter";
import { DateColumnFormatter } from "../../../../../utils/column-formatter/DateColumnFormatter";
import {QuantityColumnFormatter} from "../../../../../utils/column-formatter/QuantityColumnFormatter";
import {AmountWithDecimalsColumnFormatter} from "../../../../../utils/column-formatter/AmountWithDecimalsColumnFormatter"
const filterData = (accountsData, filter) => {
    let filteredData = accountsData;
    if (filter.wallet !== "" ||filter.money !== "" || filter.operations !== "" || filter.description !== "" || filter.deadline !== "" || filter.counterparty !== "" || filter.market !== "" || filter.idOperator !== "" || filter.charge !== "" || filter.authorized !== "" || filter.FX !== "") {
        filteredData = accountsData.filter(account => {
            
    const AuthorizedChargeTitles = [
        '',
        'SI',
        'NO',
        'QUANTEX'
        ];   

            if (
                account.wallet.trim().toLowerCase() === filter.wallet.toLowerCase() ||
                account.money.trim().toLowerCase().includes(filter.money.toLowerCase()) ||
                account.operations.trim().toLowerCase().includes(filter.operations.toLowerCase()) ||
                account.description.trim().toLowerCase().includes(filter.description.toLowerCase()) ||
                account.deadline.trim().toLowerCase().includes(filter.deadline.toLowerCase()) ||
                account.counterparty.trim().toLowerCase().includes(filter.counterparty.toLowerCase()) ||
                account.market.trim().toLowerCase().includes(filter.market.toLowerCase()) ||
                account.idOperator.trim().toLowerCase().includes(filter.idOperator.toLowerCase()) ||
                AuthorizedChargeTitles[Number(account.charge)] == filter.charge.toUpperCase() ||
                account.authorized.trim().toLowerCase() === filter.authorized.toLowerCase() ||
                account.FX.trim() === filter.FX
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { blotterData, setShowCreateModal, setEdit, setEditInitialData } ) { 
    

    const columns = [
        {
            dataField: "date",
            text: "Fecha",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: DateColumnFormatter,
        },
        {
            dataField: "wallet",
            text: "Cartera",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "operations",
            text: "Operación",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            // style: {width: "20%"},
        },
        {
            dataField: "money",
            text: "Moneda",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "description",
            text: "Especie",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "deadline",
            text: "Plazo",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: DeadLineColumnFormatter,
        },
        {
            dataField: "quantity",
            text: "Cantidad",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: QuantityColumnFormatter
        },
        {
            dataField: "price",
            text: "Precio c/100",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountWithDecimalsColumnFormatter
        },
        {
            dataField: "amount",
            text: "Monto %100",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter,
        },
        {
            dataField: "counterparty",
            text: "contraparte",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "market",
            text: "Mercado",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "idOperator",
            text: "Oper.",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "charge",
            text: "Car.",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: ChargeColumnFormatter,
            formatExtraData: {
                changeStatusCharge : (id) => {
                    console.log('ejecuta la funcion,', id)
                },      
            }
        },
        {
            dataField: "authorized",
            text: "2c",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AuthColumnFormatter,
            formatExtraData: {
                changeStatusCharge : (id) => {
                    console.log('ejecuta la funcion,', id)
                },      
            }
        },
        {
            dataField: "TransferPrice",
            text: "transfer price",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountWithDecimalsColumnFormatter,
        },
        {
            dataField: "performance",
            text: "rdo",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountColumnFormatter,
        },        
        {
            dataField: "FX",
            text: "obs",
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: FxColumnFormatter,
            formatExtraData: {
                changeStatusCharge : (id) => {
                    console.log('ejecuta la funcion,', id)
                },      
            }
        },
        {
            dataField: "",
            text: "Acción",
            sort: true,
            formatter: ActionColumnFormatter,
            formatExtraData: {
                fnAction : (data) => {
                    setEditInitialData(data)
                    setEdit(true)
                    setShowCreateModal(true)                   
                },      
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

    const filteredData = filterData(blotterData, queryParams.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        filteredData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"blotter"}/>
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

 
