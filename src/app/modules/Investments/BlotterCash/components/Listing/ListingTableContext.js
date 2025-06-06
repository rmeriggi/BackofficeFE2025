import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter , initialFilterTable} from "./ListingTableHelpers";

const ListingTableContext = createContext();

export function useListingTableContext() {
    return useContext(ListingTableContext);
}

export const ListingTableContextConsumer = ListingTableContext.Consumer;

export function ListingTableContextProvider({customersUIEvents, children}) {
    const [queryParams, setQueryParamsBase] = useState(initialFilterTable);
    const [queryParamsTable, setQueryParamsTableBase] = useState(initialFilter);
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

    const setQueryParamsTable = useCallback(nextQueryParams => {
        setQueryParamsTableBase(prevQueryParams => {
            if (isFunction(nextQueryParams)) {
                nextQueryParams = nextQueryParams(prevQueryParams);
            }

            if (isEqual(prevQueryParams, nextQueryParams)) {
                return prevQueryParams;
            }

            return nextQueryParams;
        });
    }, []);

    const initAccount = {        
        mercado:'',
    };

    const initAccountTable = {        
        especie:'',
        instrumento:'',
    };
    

    const value = {
        queryParams,
        setQueryParamsBase,
        queryParamsTable,
        setQueryParamsTableBase,
        ids,
        setIds,
        setQueryParams,
        setQueryParamsTable,
        initAccount,
        initAccountTable,
        size,
        setSize,
        pageNumber,
        setPageNumber
    };
    return <ListingTableContext.Provider value={value}>{children}</ListingTableContext.Provider>;
}