import { isEqual, isFunction } from "lodash";
import React, { createContext, useCallback, useContext, useState } from "react";
import { useCallAPI } from "../../../../hooks";
import { getStatus } from "../utils/service";
import { initialFilter } from "./ContextHelper";

const PatronosContext = createContext();

export function usePatronosContext() {
  return useContext(PatronosContext);
}

export const PatronosContextConsumer = PatronosContext.Consumer;

export function PatronosContextProvider({ children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [size, setSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [status, setStatus] = useState();
  useCallAPI(getStatus, setStatus);

  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const value = {
    queryParams,
    setQueryParamsBase,
    setQueryParams,
    size,
    setSize,
    pageNumber,
    setPageNumber,
    status,
  };

  return (
    <PatronosContext.Provider value={value}>
      {children}
    </PatronosContext.Provider>
  );
}
