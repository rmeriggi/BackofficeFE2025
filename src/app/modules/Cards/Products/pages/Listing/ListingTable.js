import React from "react";
import { useListingTableContext } from "./ListingTableContext";
import { defaultSorted, sizePerPageList } from "./ListingTableHelpers";
import { PaginatedTable } from "../../../../../components/PaginatedTable";
import {
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import { TableNoRecordsFoundMessage } from "../../../../../components/TableNoRecordsFound";
import { CardColumnFormatter } from "./column-formatters/CardsColumnFormatter";
import { DetailColumnFormatter } from "./column-formatters/DetailColumnFormatter";
import { AmountColumnFormatter } from "../../../../../utils/column-formatter/AmountColumnFormatter";
import { useHistory } from "react-router-dom";

// Función para filtrar productos según los valores del filtro
const filterData = (products = [], filter = {}) => {
  if (
    !filter.product &&
    !filter.brand &&
    !filter.cardType &&
    !filter.limit &&
    !filter.quotaLimit
  ) {
    return products;
  }

  return products.filter((product) => {
    return (
      product.product?.toLowerCase().includes(filter.product?.toLowerCase()) ||
      product.brand?.toLowerCase().includes(filter.brand?.toLowerCase()) ||
      product.cardType
        ?.toLowerCase()
        .includes(filter.cardType?.toLowerCase()) ||
      product.limit?.toLowerCase().includes(filter.limit?.toLowerCase()) ||
      product.quotaLimit
        ?.toLowerCase()
        .includes(filter.quotaLimit?.toLowerCase())
    );
  });
};

// Formateador para la columna "Marca" con ícono Visa si aplica
const BrandColumnFormatter = (cell) => {
  return <span>{cell}</span>;
};

export function ListingTable({ products = [] }) {
  const history = useHistory();

  const openEditProductPage = (id) => {
    history.push(`/cards/products/edit/${id}`);
  };

  const {
    queryParams,
    size,
    pageNumber,
    setSize,
    setPageNumber,
  } = useListingTableContext();

  const filteredData = filterData(products, queryParams.filter);

  const paginationOptions = {
    custom: true,
    totalSize: filteredData.length,
    sizePerPageList: sizePerPageList,
    sizePerPage: size,
    page: pageNumber,
  };

  const columns = [
    {
      dataField: "product",
      text: "Producto",
      sort: true,
      headerClasses: "align-top",
      sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "brand",
      text: "Marca",
      sort: true,
      headerClasses: "align-top",
      sortCaret,
      headerSortingClasses,
      formatter: BrandColumnFormatter,
    },
    {
      dataField: "cardType",
      text: "Tipo",
      sort: true,
      headerClasses: "align-top",
      sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "limit",
      text: "Límite de compra",
      sort: true,
      headerClasses: "align-top",
      sortCaret,
      headerSortingClasses,
      formatter: AmountColumnFormatter,
    },
    {
      dataField: "quotaLimit",
      text: "Límite en cuotas",
      sort: true,
      headerClasses: "align-top",
      sortCaret,
      headerSortingClasses,
      formatter: AmountColumnFormatter,
    },
    {
      dataField: "cardId",
      text: "Tarjeta",
      sort: true,
      headerClasses: "align-top",
      sortCaret,
      headerSortingClasses,
      formatter: CardColumnFormatter,
    },
    {
      dataField: "",
      text: "",
      formatter: DetailColumnFormatter,
      formatExtraData: {
        openEditProductPage,
      },
    },
  ];

  return products.length === 0 ? (
    <TableNoRecordsFoundMessage entities={"Productos"} />
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
