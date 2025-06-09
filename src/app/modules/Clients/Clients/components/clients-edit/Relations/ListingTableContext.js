import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "../../ListingTableHelpers";

const ListingTableContext = createContext();

export function useListingTableContext() {
  return useContext(ListingTableContext);
}

export const ListingTableContextConsumer = ListingTableContext.Consumer;

export function ListingTableContextProvider({ relations, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const [size, setSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [relationData /* setRelationData */] = useState([]);

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

  const loadRelationData = useCallback(async () => {
    // try {
    //   const response = await fetch(
    //     "https://devbe.myhntbank.com/relations/get-all-persons"
    //   );
    //   if (!response.ok) {
    //     throw new Error("Error al cargar los datos de relaciones");
    //   }
    //   const data = await response.json();
    //   setRelationData(data);
    // } catch (error) {
    //   console.error("Error al cargar los datos de relaciones:", error);
    // }
  }, []);

  useEffect(() => {
    loadRelationData();
  }, [loadRelationData]);

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    size,
    setSize,
    pageNumber,
    setPageNumber,
    relationData,
  };

  return (
    <ListingTableContext.Provider value={value}>
      {children}
    </ListingTableContext.Provider>
  );
}
