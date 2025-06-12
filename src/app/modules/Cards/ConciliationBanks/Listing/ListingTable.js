/* eslint-disable eqeqeq */
import React from "react";
import {
  sortCaret,
  headerSortingClasses,
} from "../../../../../_metronic/_helpers";
import { defaultSorted, sizePerPageList } from "./ListingTableHelpers";
import { useListingTableContext } from "./ListingTableContext";
import { PaginatedTable } from "../../../../components/PaginatedTable";
import { TableNoRecordsFoundMessage } from "../../../../components/TableNoRecordsFound";
import { ActionColumnFormatter } from "./column-formatters/ActionColumnFormatter";

const filterData = (data, filter) => {
  if (!filter || !filter.period || filter.period.trim() === "") {
    return data;
  }
  return data.filter((item) => {
    return item.period?.toLowerCase().includes(filter.period.toLowerCase());
  });
};

export function ListingTable({ dataTable }) {
  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
      classes: "text-center",
      headerClasses: "text-center",
      sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "period",
      text: "Período",
      sort: true,
      classes: "text-center",
      headerClasses: "text-center",
      sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "liquidation_date",
      text: "Fecha de Liquidación",
      sort: true,
      classes: "text-center",
      headerClasses: "text-center",
      sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "entity",
      text: "Entidad",
      sort: true,
      classes: "text-center",
      headerClasses: "text-center",
      sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: "",
      classes: "d-flex justify-content-end",
      formatter: (cellContent, row) => <ActionColumnFormatter row={row} />,
    },
  ];

  const {
    queryParams,
    size,
    pageNumber,
    setSize,
    setPageNumber,
  } = useListingTableContext();

  const paginationOptions = {
    custom: true,
    totalSize: dataTable.length,
    sizePerPageList,
    sizePerPage: size,
    page: pageNumber,
  };

  const filteredData = filterData(dataTable, queryParams.filter);

  return dataTable.length === 0 ? (
    <TableNoRecordsFoundMessage entities={"Liquidaciones"} />
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
