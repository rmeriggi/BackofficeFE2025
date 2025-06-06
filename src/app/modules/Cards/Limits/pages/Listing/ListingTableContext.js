import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./ListingTableHelpers";

const ListingTableContext = createContext();

export function useListingTableContext() {
    return useContext(ListingTableContext);
}

export const ListingTableContextConsumer = ListingTableContext.Consumer;

export function ListingTableContextProvider({customersUIEvents, children}) {
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

    const initClient = {
        id: undefined,
        name: "",
        lastname: "",
        email: "",
        dni: "",
        date: "",
        country: "",
        status: "",
    };
   
    const value = {
        queryParams,
        setQueryParamsBase,
        ids,
        setIds,
        setQueryParams,
        initClient,
        size,
        setSize,
        pageNumber,
        setPageNumber
    };

    return <ListingTableContext.Provider value={value}>{children}</ListingTableContext.Provider>;
}