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
import { useHistory } from "react-router-dom";

const filterData = (rosData, filter) => {
  let filteredData = rosData;
  if (filter.client !== "" || filter.transaction_id !== "") {
    filteredData = rosData.filter((account) => {
      if (
        account.client.toLowerCase().includes(filter.client.toLowerCase()) ||
        account.transaction_id
          .toLowerCase()
          .includes(filter.transaction_id.toLowerCase())
      ) {
        return true;
      }
      return false;
    });
  }
  return filteredData;
};

export function ListingTable({ rosData }) {
  const history = useHistory();

  const openDetail = (id) => {
    history.push("/compliance/ros/view/" + id);
  };
  const editRos = (id) => {
    history.push("/compliance/ros/edit/" + id);
  };

  const columns = [
    {
      dataField: "date",
      text: "Fecha",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "client",
      text: "Cliente",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "transaction",
      text: "Transaccion-Id",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: "Accion",
      formatter: ActionColumnFormatter,
      formatExtraData: {
        openDetail,
        editRos,
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

  const filteredData = filterData(rosData, queryParams.filter);

  const paginationOptions = {
    custom: true,
    totalSize: filteredData.length,
    sizePerPageList: sizePerPageList,
    sizePerPage: size,
    page: pageNumber,
  };

  return rosData.length === 0 ? (
    <TableNoRecordsFoundMessage entities={"ROS"} />
  ) : (
    <PaginatedTable
      columns={columns}
      data={filteredData}
      defaultSorted={defaultSorted}
      setSize={setSize}
      setPageNumber={setPageNumber}
      paginationOptions={paginationOptions}
    />
  );
}

ListingTable.defaultProps = {
  rosData: [],
};

ListingTable.propTypes = {
  rosData: propTypes.arrayOf(
    propTypes.shape({
      date: propTypes.string,
      client: propTypes.string,
      transaction_id: propTypes.string,
    })
  ),
};
