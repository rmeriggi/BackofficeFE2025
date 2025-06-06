import React from "react";
import {useListingTableContext} from "./ListingTableContext";
import {defaultSorted, sizePerPageList} from "./ListingTableHelpers";
import {PaginatedTable} from "../../../../../components/PaginatedTable";
import {sortCaret, headerSortingClasses} from "../../../../../../_metronic/_helpers";
import {TableNoRecordsFoundMessage} from "../../../../../components/TableNoRecordsFound";
import { AmountWithDecimalsColumnFormatter } from "./column-formatters/AmountWithDecimalsColumnFormatter";
import { PercentageColumnFormatter } from "./column-formatters/PercentageColumnFormatter";
import { AmountWithDecimalsAndIndicatorColumnFormatter } from "./column-formatters/AmountWithDecimalsAndIndicatorColumnFormatter";
import { ActionColumnFormatter } from "../../../../../utils/column-formatter/ActionColumnFormatter";

const filterData = (accountsData, filter) => {
    let filteredData = accountsData;
    if (filter.instrumento !== "") {
        filteredData = accountsData.filter(account => {

            if (
                account?.instrumento?.trim().toLowerCase().includes(filter.instrumento.toLowerCase())
            ) {
                return true;
            }
            return false;
        });
    }
    return filteredData;
}

export function ListingTable( { pnlData, setEditInitialData, setShowEditModal } ) { 
    

    const columns = [
       
        {
            dataField: "id",
            text: "Número de Orden del e-cheq",
            headerStyle: {
                textAlign: 'left',
              },           
            align: 'left',
            sort: true,
            sortValue: (cell) => parseInt(cell, 10),
            sortCaret: sortCaret,
            headerSortingClasses
        },
        {
            dataField: "Importe",
            text: "Monto del e-cheq.",
            headerStyle: {
                textAlign: 'right',
              },
            align: 'right',  
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
            formatter: AmountWithDecimalsColumnFormatter
        },
        {
            dataField:"FechaEmision",
            text: "Fecha en la que se emitió",
            headerStyle: {
                textAlign: 'right',
              },
            style: (cell, row, rowIndex, colIndex) => {
            return {
                backgroundColor:row.instrumento ==='Total' && '#F8F9F9',
                color: row.difpor < 0 ? 'red' : row.difpor > 0 && 'green'
            };
            },
            align: 'right',
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "FechaPago",
            text: "Fecha en la que se debe emitir",
            headerStyle: {
                textAlign: 'right',
              },
            style: (cell, row, rowIndex, colIndex) => {
            return {
                backgroundColor:row.instrumento ==='Total' && '#F8F9F9',
                color: row.difpor < 0 ? 'red' : row.difpor > 0 && 'green'
            };
            },
            align: 'right',
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "idCuenta",
            text: "Número de cuenta del cliente que lo solicitó",
            headerStyle: {
                textAlign: 'right',
              },
            style: (cell, row, rowIndex, colIndex) => {
            return {
                backgroundColor:row.instrumento ==='Total' && '#F8F9F9',
                color: row.difpor < 0 ? 'red' : row.difpor > 0 && 'green'
            };
            },
            align: 'right',
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,
        },
        {
            dataField: "CUITDestino",
            text: "Destino del e-cheq (cuit)",
            headerStyle: {
                textAlign: 'right',
              },
            style: (cell, row, rowIndex, colIndex) => {
            return {
                backgroundColor:row.instrumento ==='Total' && '#F8F9F9',
                color: row.difpor < 0 ? 'red' : row.difpor > 0 && 'green'
            };
            },
            align: 'right',
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,            
        },
        {
            dataField: "Status",
            text: "Estado",
            headerStyle: {
                textAlign: 'right',
              },
            style: (cell, row, rowIndex, colIndex) => {
            return {
                backgroundColor:row.instrumento ==='Total' && '#F8F9F9',
                color: row.difpor < 0 ? 'red' : row.difpor > 0 && 'green'
            };
            },
            align: 'right',
            sort: true,
            sortCaret: sortCaret,
            headerSortingClasses,           
        },
        {
            dataField: "",
            text: "Acción",
            formatter: ActionColumnFormatter,
            formatExtraData: {
                fnAction : (data) => {
                    const convertirFecha = fecha => {
                        const [mes, dia, año] = fecha.split('/').map((v, i) => i < 2 ? v.padStart(2, '0') : v);
                        return `${año}-${mes}-${dia}`;
                      };

                     const value = {
                        id: data.id,
                        idCuenta: data.idCuenta,
                        idMoneda: data.idMoneda,
                        TipoEmision: data.TipoEmision,
                        CUITDestino: data.CUITDestino,
                        Importe: data.Importe,
                        FechaPago: convertirFecha(data.FechaPago),
                        FechaEmision: convertirFecha(data.FechaEmision),
                        Concepto: data.Concepto,
                        Nature: data.Nature,
                        Modo: data.Modo,
                        Razon: data.Razon,
                        Referencia: data.Referencia,
                        Status: data.Status,
                        TRXID: data.TRXID,
                        TRXJSON: data.TRXJSON,
                        timeStamp:data.timeStamp
                    }                   
                    setEditInitialData(value)
                    setShowEditModal(true)                   
                },      
            }
        }
    ]

    
   
    const {
        queryParamsInstrument,
        size,
        pageNumber,
        setSize,
        setPageNumber,
    } = useListingTableContext();

    const filteredData = filterData(pnlData, queryParamsInstrument.filter);

    const paginationOptions = {
        custom: true,
        totalSize: filteredData.length,
        sizePerPageList: sizePerPageList,
        sizePerPage: size,
        page: pageNumber,
    };

    return (
        filteredData.length === 0 ? (
            <TableNoRecordsFoundMessage entities={"registros"}/>
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

 
