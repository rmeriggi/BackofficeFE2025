import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { columnsToReportRelations } from "../contex/RelationsHelper";
import { useCallAPI } from "../utils/apiHooks";
import {
  getAllRelations,
  createNewPerson,
  createNewClientRelation,
  updateRelation,
} from "../../Relations/utils/service";

const RelationsContext = createContext();

export function useRelationsContext() {
  return useContext(RelationsContext);
}

export const RelationsContextConsumer = RelationsContext.Consumer;

export function RelationsContextProvider({ children }) {
  const [queryParams, setQueryParamsBase] = useState(columnsToReportRelations);
  const [size, setSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

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

  // Función para obtener todas las relaciones
  const fetchAllRelations = useCallback(async () => {
    try {
      const relations = await getAllRelations();
      console.log("Todas las relaciones:", relations);
    } catch (error) {
      console.error("Error al obtener relaciones:", error);
    }
  }, []);

  const createPerson = useCallback(async (personData) => {
    try {
      const newPerson = await createNewPerson(personData);
      console.log("Nueva persona creada:", newPerson);
    } catch (error) {
      console.error("Error al crear persona:", error);
    }
  }, []);

  const createClientRelation = useCallback(async (relationData) => {
    try {
      const newClientRelation = await createNewClientRelation(relationData);
      console.log("Nueva relación de cliente creada:", newClientRelation);
    } catch (error) {
      console.error("Error al crear relación de cliente:", error);
    }
  }, []);

  const updateRelationData = useCallback(async (relationId, updatedData) => {
    try {
      const updatedRelation = await updateRelation(relationId, updatedData);
      console.log("Relación actualizada:", updatedRelation);
    } catch (error) {
      console.error("Error al actualizar relación:", error);
    }
  }, []);

  const value = {
    queryParams,
    setQueryParamsBase,
    setQueryParams,
    size,
    setSize,
    pageNumber,
    setPageNumber,
    fetchAllRelations,
    createPerson,
    createClientRelation,
    updateRelationData,
  };

  return (
    <RelationsContext.Provider value={value}>
      {children}
    </RelationsContext.Provider>
  );
}
