import { createSlice } from "@reduxjs/toolkit";

export const actionTypes = {
  Loading: "Loading",
};

const initialEchecksState = {
  loading: false,
  loadingById: false,
  echecks: undefined,
  echeck: undefined,
};

export const callTypes = {
  relations: "echecks",
};

export const echecksSlice = createSlice({
  name: "echecks",
  initialState: initialEchecksState,
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
    echecksFetched: (state, action) => {
      const { echecks } = action.payload;
      state.echecks = echecks;
    },
    echeckFetched: (state, action) => {
      const { echeck } = action.payload;
      state.echeck = echeck;
    },
  },
});
