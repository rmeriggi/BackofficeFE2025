import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./ListingTableDetailsCreditsHelpers";

const ListingTableDetailsCreditsContext = createContext();

export function useListingTableContext() {
    return useContext(ListingTableDetailsCreditsContext);
}

export const ListingTableContextConsumer = ListingTableDetailsCreditsContext.Consumer;

export function ListingTableDetailsCreditsContextProvider({customersUIEvents, children}) {
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

    const initDetailsCredits = {
        id: "",
        creditDetail: "",
        capital: "",
        interest: "",
        expenses: "",
        taxes: "",
        total: "",
        lastPayment:"",
    };

    const value = {
        queryParams,
        setQueryParamsBase,
        ids,
        setIds,
        setQueryParams,
        initDetailsCredits,
    };

    return <ListingTableDetailsCreditsContext.Provider value={value}>{children}</ListingTableDetailsCreditsContext.Provider>;
}