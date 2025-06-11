import React from "react";
import propTypes from "prop-types";
import { useListingTableContext } from "./ListingTableContext";
import { defaultSorted, sizePerPageList } from "./ListingTableHelpers";
import { PaginatedTable } from "../../../../../components/PaginatedTable";
import {
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import { TableNoRecordsFoundMessage } from "../../../../../components/TableNoRecordsFound";
/* import { ProviderColumnFormatter } from "./column-formatters/ProviderColumnFormatter";
import { IssuerColumnFormatter } from "./column-formatters/IssuerColumnFormatter"; */
import { DetailColumnFormatter } from "./column-formatters/DetailColumnFormatter";
/* import { CardColumnFormatter } from "../../../Products/pages/Listing/column-formatters/CardsColumnFormatter";
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter";
 */
const filterData = (limits, filter) => {
  let filteredData = limits;
  if (
    filter.providerName !== "" ||
    filter.providerLastname !== "" ||
    filter.issuerName !== "" ||
    filter.issuerLastname !== "" ||
    filter.brand !== ""
  ) {
    filteredData = limits.filter((limit) => {
      if (
        limit.providerName
          ?.toLowerCase()
          .includes(filter.providerName.toLowerCase()) ||
        limit.providerLastname
          ?.toLowerCase()
          .includes(filter.providerLastname.toLowerCase()) ||
        limit.issuerName
          ?.toLowerCase()
          .includes(filter.issuerName.toLowerCase()) ||
        limit.issuerLastname
          ?.toLowerCase()
          .includes(filter.issuerLastname.toLowerCase()) ||
        limit.brand
          ?.toString()
          .toLowerCase()
          .includes(filter.brand?.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
  }
  return filteredData;
};

export function ListingTable({ limits }) {
  const columns = [
    {
      dataField: "card_type",
      text: "Tipo Tarjeta",
      sort: true,
      headerClasses: "align-top",
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "brand",
      text: "Marca",
      sort: true,
      headerClasses: "align-top",
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "buy_limit",
      text: "Límite de compra",
      sort: true,
      headerClasses: "align-top",
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "quotes_limit",
      text: "Límite en cuotas",
      sort: true,
      headerClasses: "align-top",
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "cash_limit",
      text: "Límite efectivo",
      sort: true,
      headerClasses: "align-top",
      sortCaret: sortCaret,
      headerSortingClasses,
    },

    {
      dataField: "actions",
      text: "",
      formatter: (cellContent, row) => <DetailColumnFormatter row={row} />,
    },
  ];

  const {
    queryParams,
    size,
    pageNumber,
    setSize,
    setPageNumber,
  } = useListingTableContext();

  const filteredData = filterData(limits, queryParams.filter);

  const paginationOptions = {
    custom: true,
    totalSize: filteredData.length,
    sizePerPageList: sizePerPageList,
    sizePerPage: size,
    page: pageNumber,
  };

  return limits.length === 0 ? (
    <TableNoRecordsFoundMessage entities={"Límites"} />
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

ListingTable.defaultProps = {
  limits: [],
};

ListingTable.propTypes = {
  limits: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number,
      providerName: propTypes.string,
      issuerName: propTypes.string,
      brand: propTypes.string,
    })
  ),
};
