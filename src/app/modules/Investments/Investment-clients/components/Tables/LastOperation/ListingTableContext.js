import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./ListingTableHelpers";

const OperationsTableContext = createContext();

export function useListingTableContext() {
    return useContext(OperationsTableContext);
}

export const ListingTableContextConsumer = OperationsTableContext.Consumer;

export function OperationsContextProvider({customersUIEvents, children}) {
    const [queryParams, setQueryParamsBase] = useState(initialFilter);
    const [ids, setIds] = useState([]);
    const [size, setSize] = useState(10)
    const [pageNumber, setPageNumber] = useState(1)

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
        ids,
        setIds,
        setQueryParams,
        size,
        setSize,
        pageNumber,
        setPageNumber
    };

    return <OperationsTableContext.Provider value={value}>{children}</OperationsTableContext.Provider>;
}