import React from "react";
import {
  sortCaret,
  headerSortingClasses,
} from "../../../../../../../_metronic/_helpers";
import { PaginatedTable } from "../../../../../../components/PaginatedTable";
import { TableNoRecordsFoundMessage } from "../../../../../../components/TableNoRecordsFound";
import { orderSorted, sizePerPageList } from "../../ListingTableHelpers";
import { useListingTableContext } from "./ListingTableContext";
import { ActionColumnFormatter }from "./utils/ActionColumnFormatter";
import { StatusColumnFormater } from "./utils/StatusColumnFormater";
import { useHistory } from "react-router-dom";

export default function RelationsTable({ relations,setIsEdit, setSelectedRelation }) {
  const { size, pageNumber, setSize, setPageNumber } = useListingTableContext();
  const history = useHistory();

  if (!relations || !Array.isArray(relations) || relations.length === 0) {
    return <TableNoRecordsFoundMessage entities={"relaciones"} />;
  }
  const columns = [
    {
      dataField: "name",
      text: "Nombre",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "lastName",
      text: "Apellido",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "status",
      text: "Estado",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
      formatter:StatusColumnFormater
    },
    {
      dataField: "relation",
      text: "Relacion",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "participation",
      text: "Porcentaje",
      sort: true,
      sortCaret: sortCaret,
      headerSortingClasses,
    },
    {
      dataField: "action",
      text: "Accion",
      formatter: ActionColumnFormatter,
      formatExtraData: {
        tooltip: 'Editar', 
        fnAction : (row) => {
          setSelectedRelation(row)
          setIsEdit(true)
        }
      }
    },
  ];

  const paginationOptions = {
    custom: true,
    totalSize: relations.length,
    sizePerPageList: sizePerPageList,
    sizePerPage: size,
    page: pageNumber,
  };


  return relations.length === 0 ? (
    <TableNoRecordsFoundMessage entities={"Relaciones"} />
  ) : (
    <PaginatedTable
      columns={columns}
      data={relations}
      setSize={setSize}
      setPageNumber={setPageNumber}
      defaultSorted={orderSorted}
      paginationOptions={paginationOptions}
    />
  );
}
