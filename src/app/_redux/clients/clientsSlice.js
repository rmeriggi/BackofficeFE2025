import {createSlice} from "@reduxjs/toolkit";

export const actionTypes = {
  Loading : 'Loading',
};

const initialClientsState = {
  loading: false,
  clients: undefined,
};

export const callTypes = {
  clients: "clients",
};

export const clientsSlice = createSlice({
  name: "clients",
  initialState: initialClientsState,
  reducers: {
    startCall: (state, action) => {
      state.loading = true
    },
    finishCall : (state, action) => {
      state.loading = false
    },
    // SAVE CLIENTS
    clientsFetched: (state, action) => {
      const { clients } = action.payload;
      state.clients = clients
    },
  }
});
