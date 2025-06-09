import React from "react";
import { useListingTableContext } from "./ListingTableContext";
import { defaultSorted, sizePerPageList } from "./ListingTableHelpers";
import { PaginatedTable } from "../../../../../components/PaginatedTable";
import {
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import { TableNoRecordsFoundMessage } from "../../../../../components/TableNoRecordsFound";
/* import { AmountWithDecimalsColumnFormatter } from "./column-formatters/AmountWithDecimalsColumnFormatter"; */
import { PercentageColumnFormatter } from "./column-formatters/PercentageColumnFormatter";
import { AmountWithDecimalsAndIndicatorColumnFormatter } from "./column-formatters/AmountWithDecimalsAndIndicatorColumnFormatter";

const filterData = (accountsData, filter) => {
  let filteredData = accountsData;
  if (filter.instrumento !== "") {
    filteredData = accountsData.filter((account) => {
      if (
        account?.instrumento
          ?.trim()
          .toLowerCase()
          .includes(filter.instrumento.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
  }
  return filteredData;
};

export function ListingTable({ pnlData }) {
  const columns = [
    {
      dataField: "instrumento",
      text: "Tipo de Instrumento",
      headerStyle: {
        textAlign: "left",
      },
      style: (cell, row, rowIndex, colIndex) => {
        return {
          backgroundColor: row.instrumento === "Total" && "#F8F9F9",
          width: "300px",
        };
      },
      align: "left",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    // {
    //     dataField: "cantidad",
    //     text: "cantidad",
    //     headerStyle: {
    //         textAlign: 'center',
    //       },
    //     style: (cell, row, rowIndex, colIndex) => {
    //     return {
    //         backgroundColor:row.instrumento ==='Total' && '#F8F9F9'
    //     };
    //     },
    //     align: 'right',
    //     sort: true,
    //     sortCaret: sortCaret,
    //     headerSortingClasses,

    // },
    // {
    //     dataField: "PPP",
    //     text: "PPP",
    //     headerStyle: {
    //         textAlign: 'center',
    //       },
    //     align: 'right',
    //     style: (cell, row, rowIndex, colIndex) => {
    //         return {
    //           backgroundColor:row.instrumento ==='Total' && '#F8F9F9'
    //         };
    //       },
    //     sort: true,
    //     sortCaret: sortCaret,
    //     headerSortingClasses,
    //     formatter: AmountWithDecimalsColumnFormatter
    // },
    {
      dataField: "difpor",
      text: "d%",
      headerStyle: {
        textAlign: "right",
      },
      align: "right",
      sort: true,
      style: (cell, row, rowIndex, colIndex) => {
        return {
          backgroundColor: row.instrumento === "Total" && "#F8F9F9",
          color: cell < 0 ? "red" : cell > 0 && "green",
        };
      },
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: PercentageColumnFormatter,
    },
    {
      dataField: "difimp",
      text: "d$",
      headerStyle: {
        textAlign: "right",
      },
      style: (cell, row, rowIndex, colIndex) => {
        return {
          backgroundColor: row.instrumento === "Total" && "#F8F9F9",
          color: row.difpor < 0 ? "red" : row.difpor > 0 && "green",
        };
      },
      align: "right",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: AmountWithDecimalsAndIndicatorColumnFormatter,
    },
  ];

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

  return filteredData.length === 0 ? (
    <TableNoRecordsFoundMessage entities={"registros"} />
  ) : (
    <PaginatedTable
      columns={columns}
      data={filteredData}
      defaultSorted={defaultSorted}
      paginationOptions={paginationOptions}
      setSize={setSize}
      setPageNumber={setPageNumber}
    />
  );
}
