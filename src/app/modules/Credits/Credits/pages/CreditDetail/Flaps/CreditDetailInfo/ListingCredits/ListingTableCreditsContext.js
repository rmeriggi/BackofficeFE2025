import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./ListingTableCreditsHelpers";

const ListingTableCreditsContext = createContext();

export function useListingTableContext() {
    return useContext(ListingTableCreditsContext);
}

export const ListingTableContextConsumer = ListingTableCreditsContext.Consumer;

export function ListingTableCreditsContextProvider({customersUIEvents, children}) {
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

    const initCredits = {
        id: "",
        status: "",
        creditId: "",
        creditType: "",
        quota: "",
        amount: "",
        expiration: "",
    };

    const value = {
        queryParams,
        setQueryParamsBase,
        ids,
        setIds,
        setQueryParams,
        initCredits,
    };

    return <ListingTableCreditsContext.Provider value={value}>{children}</ListingTableCreditsContext.Provider>;
}