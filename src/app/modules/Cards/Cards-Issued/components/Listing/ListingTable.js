import React from "react";
import { useHistory } from "react-router-dom";
import { useListingTableContext } from "./ListingTableContext";
import { defaultSorted, sizePerPageList } from "./ListingTableHelpers";
import { PaginatedTable } from "../../../../../components/PaginatedTable";
import {
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import { TableNoRecordsFoundMessage } from "../../../../../components/TableNoRecordsFound";
import { CardColumnFormatter } from "./column-formatters/CardColumnFormatter";
import { DetailColumnFormatter } from "./column-formatters/DetailColumnFormatter";
import { DateColumnFormatter } from "../../../../../utils/column-formatter/DateColumnFormatter";
import { cardIssuedLinks } from "../../utils/cardIssuedLinks";

const filterData = (cards, filter) => {
  let filteredData = cards;
  if (filter.clientName !== "") {
    filteredData = cards.filter((card) => {
      if (
        card.clientName?.toLowerCase().includes(filter.clientName.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
  }
  return filteredData;
};

export function ListingTable({ cards }) {
  const history = useHistory();

  const openEditClientPage = (id) => {
    history.push(`${cardIssuedLinks.edit}/${id}`);
  };
  const openSummary = (id) => {
    history.push(`${cardIssuedLinks.summary}/${id}`);
  };

  const columns = [
    {
      dataField: "holder",
      text: "Cliente",
      sort: true,
      headerClasses: "align-top",
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "timeStamp",
      text: "Fecha alta",
      sort: true,
      headerClasses: "align-top",
      formatter: DateColumnFormatter,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "expirationDate",
      text: "Fecha de vencimiento",
      sort: true,
      headerClasses: "align-top",
      classes: "text-center",
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "cardNumber",
      text: "Número de tarjeta",
      sort: true,
      headerClasses: "align-top",
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "brandId",
      text: "Tarjeta",
      sort: true,
      headerClasses: "align-top text-center",
      classes: "text-center",
      formatter: CardColumnFormatter,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "detail",
      text: "",
      formatter: DetailColumnFormatter,
      formatExtraData: {
        openEditClientPage,
        openSummary,
      },
    },
  ];

  const {
    queryParams,
    pageNumber,
    size,
    setSize,
    setPageNumber,
  } = useListingTableContext();

  const filteredData = filterData(cards, queryParams.filter);

  const paginationOptions = {
    custom: true,
    totalSize: filteredData.length,
    sizePerPageList: sizePerPageList,
    sizePerPage: size,
    page: pageNumber,
  };

  return cards.length === 0 ? (
    <TableNoRecordsFoundMessage entities={"Tarjetas"} />
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
