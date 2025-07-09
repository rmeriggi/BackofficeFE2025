import { createSlice } from "@reduxjs/toolkit";

const initialRelacionesState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  relaciones: [],
  relacion: undefined,
  lastError: null,
};

export const callTypes = {
  list: "list",
  action: "action",
};

export const relacionesSlice = createSlice({
  name: "patronosRelaciones",
  initialState: initialRelacionesState,
  reducers: {
    catchError: (state, action) => {
      state.lastError = action.payload.error;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.lastError = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    relacionesFetched: (state, action) => {
      const { relaciones } = action.payload;
      state.listLoading = false;
      state.lastError = null;
      state.relaciones = relaciones;
      state.totalCount = relaciones.length;
    },
    relacionDeleted: (state, action) => {
      state.lastError = null;
      state.actionsLoading = false;
      state.relaciones = state.relaciones.filter(
        (relacion) => relacion.id !== action.payload.relacionId
      );
    },
    // Reset del estado para limpiar errores
    resetState: (state) => {
      state.lastError = null;
      state.actionsLoading = false;
    },
  },
});

export const { actions } = relacionesSlice;
