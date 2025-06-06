import React from "react";
import {PaginationLinks} from "./PaginationLinks";
import {PaginationToolbar} from "./PaginationToolbar";

export function Pagination(props) {
  
  const { children, paginationProps, setSize, setPageNumber, text } = props;

  return (
    <>
      {children}
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        {!text &&(<PaginationLinks 
          paginationProps={paginationProps} 
          setPageNumber={setPageNumber}
        />)}
        <PaginationToolbar
          paginationProps={paginationProps}
          setSize={setSize}
          setPageNumber={setPageNumber}
          text={text}
        />
      </div>
    </>
  );
}
