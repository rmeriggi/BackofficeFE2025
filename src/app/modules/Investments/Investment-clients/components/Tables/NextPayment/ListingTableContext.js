import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./ListingTableHelpers";

const NextPaymentTableContext = createContext();

export function useListingTableContext() {
    return useContext(NextPaymentTableContext);
}

export const ListingTableContextConsumer = NextPaymentTableContext.Consumer;

export function NextPaymentContextProvider({customersUIEvents, children}) {
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

    return <NextPaymentTableContext.Provider value={value}>{children}</NextPaymentTableContext.Provider>;
}