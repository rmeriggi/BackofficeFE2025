import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./ProgramsUIHelpers";

const ProgramsUIContext = createContext();

export function useProgramsUIContext() {
  return useContext(ProgramsUIContext);
}

export const ProgramsUIConsumer = ProgramsUIContext.Consumer;

export function ProgramsUIProvider({ programsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
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

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    newProgramButtonClick: programsUIEvents.newProgramButtonClick,
    openEditProgramPage: programsUIEvents.openEditProgramPage,
    openDeleteProgramDialog: programsUIEvents.openDeleteProgramDialog,
    openDeleteProgramsDialog: programsUIEvents.openDeleteProgramsDialog,
    openFetchProgramsDialog: programsUIEvents.openFetchProgramsDialog,
    openUpdateProgramsStatusDialog: programsUIEvents.openUpdateProgramsStatusDialog,
  };

  return (
    <ProgramsUIContext.Provider value={value}>
      {children}
    </ProgramsUIContext.Provider>
  );
}
