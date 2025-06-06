import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ListingTableHelpers";

const ListingTableContext = createContext();

export function useListingTableContext() {
    return useContext(ListingTableContext);
}

export function ListingTableContextProvider({ children }) {
    const [queryParams, setQueryParamsBase] = useState(initialFilter);
    const [size, setSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);

    const [ids, setIds] = useState([]);
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

    const initSaldos = {
        codigo: "",
        descripcion: "",
        alias: "",
        saldo: "",
        importeOrigen: "",
    };

    const value = {
        queryParams,
        setQueryParamsBase,
        ids,
        setIds,
        setQueryParams,
        initSaldos,
        size,
        setSize,
        pageNumber,
        setPageNumber,
    };

    return <ListingTableContext.Provider value={value}>{children}</ListingTableContext.Provider>;
}
