import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./ContextHelper";
import { useCallAPI } from "../../../../hooks";
import { getCategories, getLevels, getStatus, getVerified } from "../utils/service";

const ClientsContext = createContext();

export function useClientsContext() {
    return useContext(ClientsContext);
}

export const ClientsContextConsumer = ClientsContext.Consumer;

export function ClientsContextProvider({children}) {

  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [size, setSize] = useState(10)
  const [pageNumber, setPageNumber] = useState(1)
  const [verified, setVerified] = useState()
  const [status, setStatus] = useState()
  const [levels, setLevels] = useState()
  const [categories, setCategories] = useState()
  useCallAPI( getVerified, setVerified)
  useCallAPI( getStatus, setStatus)
  useCallAPI( getLevels, setLevels)
  useCallAPI( getCategories, setCategories)

  const setQueryParams = useCallback(nextQueryParams => {
    setQueryParamsBase(prevQueryParams => {
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
    verified,
    status,
    levels,
    categories
  };

  return <ClientsContext.Provider value={value}>{children}</ClientsContext.Provider>;
}