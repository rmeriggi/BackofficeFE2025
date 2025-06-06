import { createSlice } from "@reduxjs/toolkit";

export const actionTypes = {
  Loading: "Loading",
};

const initialRelationsState = {
  loading: false,
  loadingById: false,
  relations: undefined,
  relation: undefined,
};

export const callTypes = {
  relations: "relations",
};

export const relationsSlice = createSlice({
  name: "relations",
  initialState: initialRelationsState,
  reducers: {
    startCall: (state, action) => {
      state.loading = true;
    },
    finishCall: (state, action) => {
      state.loading = false;
    },
    startCallId: (state, action) => {
      state.loadingById = true;
    },
    finishCallId: (state, action) => {
      state.loadingById = false;
    },
    relationsFetched: (state, action) => {
      const { relations } = action.payload;
      state.relations = relations;
    },
    relationFetched: (state, action) => {
      const { relation } = action.payload;
      state.relation = relation;
    },
    updateRelationSuccess: (state, action) => {
      const updatedRelation = action.payload;

      const updatedRelations = state.relations.map((relation) => {
        if (relation.id === updatedRelation.id) {
          return updatedRelation;
        }
        return relation;
      });

      state.relations = updatedRelations;
    },
    updateRelationFailure: (state, action) => {
      console.error(
        "La actualización de la relación falló:",
        action.payload.error
      );
    },
  },
});
