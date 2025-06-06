/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { getPagesCount } from "../../../_helpers";

export function PaginationToolbar(props) {

  const { paginationProps, setSize, setPageNumber } = props;
  const {
    sizePerPageList,
    sizePerPage,
    totalSize,
    page,
    onSizePerPageChange = [
      { text: "3", value: 3 },
      { text: "5", value: 5 },
      { text: "10", value: 10 }
    ]
  } = paginationProps;
  const style = {
    width: "75px"
  };

  const onSizeChange = event => {
    const newSize = +event.target.value;
    const pagesCount = getPagesCount(totalSize, newSize)
    setSize(newSize)
    if(page > pagesCount){
      setPageNumber(pagesCount)
      onSizePerPageChange(newSize, pagesCount);
    }else{
      onSizePerPageChange(newSize, page);
    }
  };

  if(props.text) return <></>

  return (
    <div className="d-flex align-items-center py-3">
      <select
        disabled={totalSize === 0}
        className={`form-control form-control-sm font-weight-bold mr-4 border-0 bg-light ${totalSize ===
          0 && "disabled"}`}
        onChange={onSizeChange}
        value={sizePerPage}
        style={style}
      >
        {sizePerPageList.map(option => {
          const isSelect = sizePerPage === `${option.page}`;
          return (
            <option
              key={option.text}
              value={option.page}
              className={`btn ${isSelect ? "active" : ""}`}
            >
              {option.text}
            </option>
          );
        })}
      </select>
     { sizePerPage < totalSize?
        <span className="text-muted"> Mostrando {sizePerPage} de {totalSize}</span>
        :
        <span className="text-muted"> Mostrando {totalSize} de {totalSize}</span>
      }
    </div>
  );
}
