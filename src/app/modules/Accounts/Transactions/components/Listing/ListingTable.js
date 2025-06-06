import React from "react";
import propTypes from "prop-types";
import {
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import { defaultSorted, sizePerPageList } from "./ListingTableHelpers";
import { useListingTableContext } from "./ListingTableContext";
import { PaginatedTable } from "../../../../../components/PaginatedTable";
import { TableNoRecordsFoundMessage } from "../../../../../components/TableNoRecordsFound";
import { DetailColumnFormatter } from "./column-formatters/DetailColumnFormatter";
import { DateColumnFormatter } from "../../../../../utils/column-formatter/DateColumnFormatter";
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter";
import { ColorColumnFormatter } from "../../../../../utils/column-formatter/ColorColumnFormatter";

export function ListingTable({
  transactionsData,
  openReceipt,
  openAccusation,
}) {
  const columns = [
    {
      dataField: "id",
      text: "id",
      sort: true,
      headerClasses: "text-center",
      classes: "text-center",
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "date",
      text: "Fecha",
      sort: true,
      headerClasses: "text-center",
      classes: "text-center",
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: DateColumnFormatter,
    },
    {
      dataField: "type",
      text: "Tipo de transacción",
      sort: true,
      headerClasses: "text-center",
      classes: "text-center",
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: ColorColumnFormatter,
    },
    {
      dataField: "amount",
      text: "Importe",
      sort: true,
      headerClasses: "text-center",
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: AmountColumnFormatter,
    },
    {
      dataField: "actions",
      text: "accion",
      headerClasses: "text-center",
      classes: "text-center",
      formatter: DetailColumnFormatter,
      formatExtraData: {
        openReceipt,
        openAccusation,
      },
    },
  ];

  const { size, pageNumber, setSize, setPageNumber } = useListingTableContext();

  const paginationOptions = {
    custom: true,
    totalSize: transactionsData.length,
    sizePerPageList: sizePerPageList,
    sizePerPage: size,
    page: pageNumber,
  };

  return transactionsData.length === 0 ? (
    <TableNoRecordsFoundMessage entities={"transacciones"} />
  ) : (
    <PaginatedTable
      columns={columns}
      data={transactionsData}
      defaultSorted={defaultSorted}
      setSize={setSize}
      setPageNumber={setPageNumber}
      paginationOptions={paginationOptions}
    />
  );
}

ListingTable.defaultProps = {
  alltransactionsData: [],
};

ListingTable.propTypes = {
  alltransactionsData: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number,
      date: propTypes.string,
      amount: propTypes.string,
      detail: propTypes.string,
    })
  ),
};
