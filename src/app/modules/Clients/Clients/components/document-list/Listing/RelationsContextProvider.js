import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";

const RelationsContext = createContext();

export function useRelationsContext() {
  return useContext(RelationsContext);
}

export const RelationsContextProvider = ({ children }) => {
  const [relationParams, setRelationParamsBase] = useState({
    cuit: "",
    name: "",
    lastName: "",
    idRelation: "",
    participation: "",
  });

  const [selectedIds, setSelectedIds] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [size, setSize] = useState(0);

  const setRelationParams = useCallback((nextRelationParams) => {
    setRelationParamsBase((prevRelationParams) => {
      if (isFunction(nextRelationParams)) {
        nextRelationParams = nextRelationParams(prevRelationParams);
      }

      if (isEqual(prevRelationParams, nextRelationParams)) {
        return prevRelationParams;
      }

      return nextRelationParams;
    });
  }, []);

  const initRelation = {
    cuit: "",
    name: "",
    lastName: "",
    idRelation: "",
    participation: "",
  };

  const value = {
    relationParams,
    setRelationParamsBase,
    selectedIds,
    setSelectedIds,
    setRelationParams,
    initRelation,
    pageSize,
    setPageSize,
    pageNumber,
    setPageNumber,
    size,
    setSize,
  };

  return (
    <RelationsContext.Provider value={value}>
      {children}
    </RelationsContext.Provider>
  );
};

export const ListingTableContextProvider = RelationsContext.Provider;
