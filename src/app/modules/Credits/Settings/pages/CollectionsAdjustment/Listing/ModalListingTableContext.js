import React, {createContext, useContext, useState} from "react";
import {initialFilter} from "./ListingTableHelpers";

const ListingTableContext = createContext();

export function useListingTableContext() {
    return useContext(ListingTableContext);
}

export const ListingTableContextConsumer = ListingTableContext.Consumer;

export function ListingTableContextProvider({customersUIEvents, children}) {
    const [queryParams, setQueryParamsBase] = useState(initialFilter);
    const [ids] = useState([]);
  

    const value = {
        queryParams,
        setQueryParamsBase,
        ids,
    };

    return <ListingTableContext.Provider value={value}>{children}</ListingTableContext.Provider>;
}