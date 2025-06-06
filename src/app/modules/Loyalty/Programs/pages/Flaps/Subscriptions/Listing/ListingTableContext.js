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

    const initSuscriptions = {
        id: undefined,
        clientId: "",
        programId: "",
        status: "",
        fromDate: "",
        toDate: "",
        frequency: "",
        price: "",
    };

    const value = {
        queryParams,
        setQueryParamsBase,
        ids,
        setIds,
        setQueryParams,
        initSuscriptions,
    };

    return <ListingTableContext.Provider value={value}>{children}</ListingTableContext.Provider>;
}