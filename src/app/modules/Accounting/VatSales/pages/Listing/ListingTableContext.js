import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ListingTableHelpers";

const ListingTableContext = createContext();

export function useListingTableContext() {
    return useContext(ListingTableContext);
}

export const ListingTableContextConsumer = ListingTableContext.Consumer;

export function ListingTableContextProvider({ children }) {
    const [queryParams, setQueryParamsBase] = useState(initialFilter);
    const [size, setSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);

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
        id: undefined,
        entity: "",
        currency: "",
        idEntity: 0,
        idCurrency: 0,
        idGroup: 0,
        group: "",
        account: "",
    };

    const value = {
        queryParams,
        setQueryParamsBase,
        ids,
        setIds,
        setQueryParams,
        initCredits,
        size,
        setSize,
        pageNumber,
        setPageNumber
    };

    return <ListingTableContext.Provider value={value}>{children}</ListingTableContext.Provider>;
}
