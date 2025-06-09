import React from "react";
import { useListingTableContext } from "./ListingTableContext";
import { defaultSorted, sizePerPageList } from "./ListingTableHelpers";
import { PaginatedTable } from "../../../../../components/PaginatedTable";
import {
  sortCaret,
  headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import { TableNoRecordsFoundMessage } from "../../../../../components/TableNoRecordsFound";
/* import { AmountWithDecimalsColumnFormatter } from "./column-formatters/AmountWithDecimalsColumnFormatter";
import { PercentageColumnFormatter } from "./column-formatters/PercentageColumnFormatter"; */
import { ActionColumnFormatter } from "./column-formatters/ActionColumnFormatter";
import { useHistory } from "react-router-dom";

const filterData = (accountsData, filter) => {
  let filteredData = accountsData;
  if (filter.name !== "" || filter.passport !== "") {
    filteredData = accountsData.filter((account) => {
      if (
        account.name
          .trim()
          .toLowerCase()
          .includes(filter.name.toLowerCase()) ||
        account.passport
          .trim()
          .toLowerCase()
          .includes(filter.name.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
  }
  return filteredData;
};

export function ListingTable({ signaturesClientsData }) {
  const history = useHistory();

  const columns = [
    {
      dataField: "name",
      text: "Razón Social",
      headerStyle: {
        // textAlign: 'center',
      },
      // align: 'center',
      style: {
        width: "400px",
      },
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "passport",
      text: "Cuit/Cuil",
      headerStyle: {
        // textAlign: 'center',
      },
      style: {
        width: "400px",
      },
      // align: 'center',
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "",
      text: "Acción",
      formatter: ActionColumnFormatter,
      headerStyle: {
        textAlign: "center",
      },
      align: "center",
      formatExtraData: {
        fnAction: (data) => {
          history.push(`/clients/signatures/${data.id}`);
        },
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

  const filteredData = filterData(signaturesClientsData, queryParams.filter);

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
