import { createSlice } from "@reduxjs/toolkit";

const initialPatronosState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  patronos: [],
  patrono: undefined,
  lastError: null,
};

export const callTypes = {
  list: "list",
  action: "action",
};

export const patronosSlice = createSlice({
  name: "patronos",
  initialState: initialPatronosState,
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
    patronosFetched: (state, action) => {
      const { patronos } = action.payload;
      state.listLoading = false;
      state.lastError = null;
      state.patronos = patronos;
      state.totalCount = patronos.length;
    },
    patronoFetched: (state, action) => {
      state.actionsLoading = false;
      state.patrono = action.payload.patrono;
      state.lastError = null;
    },
    patronoCreated: (state, action) => {
      state.actionsLoading = false;
      state.lastError = null;
      state.patronos.push(action.payload.patrono);
    },
    patronoUpdated: (state, action) => {
      state.lastError = null;
      state.actionsLoading = false;
      const index = state.patronos.findIndex(
        (patrono) => patrono.id === action.payload.patrono.id
      );
      if (index > -1) {
        state.patronos[index] = action.payload.patrono;
      }
    },
    patronoDeleted: (state, action) => {
      state.lastError = null;
      state.actionsLoading = false;
      state.patronos = state.patronos.filter(
        (patrono) => patrono.id !== action.payload.patronoId
      );
    },
  },
});

export const { actions } = patronosSlice;
