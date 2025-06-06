import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter , initialFilterInstrument} from "./ListingTableHelpers";

const ListingTableContext = createContext();

export function useListingTableContext() {
    return useContext(ListingTableContext);
}

export const ListingTableContextConsumer = ListingTableContext.Consumer;

export function ListingTableContextProvider({customersUIEvents, children}) {
    const [queryParams, setQueryParamsBase] = useState(initialFilter);
    const [queryParamsInstrument, setQueryParamsInstrumentBase] = useState(initialFilterInstrument);
    const [ids, setIds] = useState([]);
    const [size, setSize] = useState(15)
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

    const setQueryParamsInstrument= useCallback(nextQueryParams => {
        setQueryParamsInstrumentBase(prevQueryParams => {
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
        business_name:''  
    };

    const initAccountInstrument = { 
        business_name:''  
    };
    

    const value = {
        queryParams,
        queryParamsInstrument,
        setQueryParamsBase,
        setQueryParamsInstrumentBase,        
        ids,
        setIds,
        setQueryParams,
        setQueryParamsInstrument,
        initAccount,
        initAccountInstrument,
        size,
        setSize,
        pageNumber,
        setPageNumber
    };
    return <ListingTableContext.Provider value={value}>{children}</ListingTableContext.Provider>;
}