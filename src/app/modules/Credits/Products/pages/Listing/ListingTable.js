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
import { ActionColumnFormatter } from "./column-formatters/ActionColumnFormatter";
import { RateColumnFormatter } from "../../../components/columnFormatters/RateColumnFormatter";
import { useHistory } from "react-router-dom";
import { StatusColumnFormatter } from "./column-formatters/StatusColumnFormatter";
import { DateColumnFormatter } from "../../../../../utils/column-formatter/DateColumnFormatter";
import { makeStyles } from "@material-ui/core";
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter";

const useStyles = makeStyles(() => ({
  date: {
    paddingLeft: "2rem!important",
  },
}));

const filterData = (productsData, filter) => {
  let filteredData = productsData;
  if (filter.product !== "") {
    filteredData = productsData.filter((product) => {
      if (
        product.product
          ?.trim()
          .toLowerCase()
          .includes(filter.product.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
  }
  return filteredData;
};

export function ListingTable({ productsData }) {
  const classes = useStyles();

  const history = useHistory();

  const openEditProduct = (id) => {
    history.push(`/credits/products/edit/${id}`);
  };

  const columns = [
    {
      dataField: "status",
      text: "Estado",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: StatusColumnFormatter,
    },
    {
      dataField: "product",
      text: "Producto",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "date",
      text: "Fecha Alta",
      sort: true,
      sortCaret: sortCaret,
      formatter: DateColumnFormatter,
      headerSortingClasses,
      classes: classes.date,
    },
    {
      dataField: "TNA",
      text: "TNA",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter: RateColumnFormatter,
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
      dataField: "action",
      text: "",
      formatter: ActionColumnFormatter,
      formatExtraData: {
        openEditProduct,
      },
    },
  ];

  const {
    queryParams,
    size,
    pageNumber,
    setSize,
    setPageNumber,
  } = useListingTableContext();

  const filteredData = filterData(productsData, queryParams.filter);

  const paginationOptions = {
    custom: true,
    totalSize: filteredData.length,
    sizePerPageList: sizePerPageList,
    sizePerPage: size,
    page: pageNumber,
  };

  return productsData.length === 0 ? (
    <TableNoRecordsFoundMessage entities={"créditos"} />
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
  productsData: [],
};

ListingTable.propTypes = {
  productsData: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string,
      status: propTypes.string,
      nameProduct: propTypes.string,
      date: propTypes.string,
      rate: propTypes.number,
      amount: propTypes.number,
    })
  ),
};
