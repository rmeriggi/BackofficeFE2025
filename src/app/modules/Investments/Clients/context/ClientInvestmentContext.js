import { isEqual, isFunction } from 'lodash';
import React, { createContext, useContext } from 'react'
import { useCallback } from 'react';
import { useState } from 'react';
import { initialFilter } from './ContextHelper';

const ClientInvestmentContext = createContext()

export function useClientInvestmentContext() {
  return useContext(ClientInvestmentContext);
}

const ClientInvestmentContextProvider = ({children}) => {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [size, setSize] = useState(10)
  const [pageNumber, setPageNumber] = useState(1)
  const [listing, setListing] = useState()
  const [client, setClient] = useState()

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

  const values = {
    listing,
    setListing,
    client,
    setClient,
    queryParams,
    setQueryParams,
    size,
    setSize,
    pageNumber,
    setPageNumber,
  }
  
  return (
    <ClientInvestmentContext.Provider value={values}>
      {children}
    </ClientInvestmentContext.Provider>
  )
}

export default ClientInvestmentContextProvider