import paginationFactory, { PaginationProvider } from "react-bootstrap-table2-paginator";
import { Pagination } from "../../_metronic/_partials/controls";
import BootstrapTable from "react-bootstrap-table-next";
import React from "react";
import { useHistory } from "react-router-dom";

export const PaginatedTable = ({
  paginationOptions,
    data,
    columns,
    defaultSorted,
    keyField = "id",
    editRoute,
    hover ,
  setPageNumber,
    setSize,
    rowStyle,
    openModal,
    text,
    expandRow
}) => {

  const history = useHistory();
 
    const rowEvents = {
        onClick: (e, row) => {
            if(editRoute){
                history.push(`${editRoute}/${row.id}`)
            }
            if(openModal){
                openModal(row.id)
            }
        }
    };

  return (
    <PaginationProvider pagination={paginationFactory(paginationOptions)}>
      {({ paginationProps, paginationTableProps }) => {
        return (
          <Pagination
            paginationProps={paginationProps}
            setSize={setSize}
            setPageNumber={setPageNumber}
            text={text}

          >
            <BootstrapTable
              wrapperClasses="table-responsive"
              bordered={false}
              classes="table table-head-custom table-vertical-center overflow-hidden"
              bootstrap4
              keyField={ keyField === "id" ? "id" : keyField}
              data={data}
              columns={columns}
              {...paginationTableProps}
              rowEvents={ (editRoute || openModal) && rowEvents}
              hover={hover}
              rowStyle={rowStyle && {cursor: "pointer"}}
              expandRow={expandRow}
          >
            </BootstrapTable>
           
          </Pagination>
                           )

      
      }}
    </PaginationProvider>
  );
};
