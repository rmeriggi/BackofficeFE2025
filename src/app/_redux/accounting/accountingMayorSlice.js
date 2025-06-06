import {createSlice} from "@reduxjs/toolkit";

export const actionTypes = {
  Loading : 'Loading',
};

const initialAccountingMayorState = {
  loading: false,
  accountingMayor: undefined,
};

export const callTypes = {
  accountingMayor: "accountingMayor",
};

export const accountingMayorSlice = createSlice({
  name: "accountingMayor",
  initialState: initialAccountingMayorState,
  reducers: {
    startCall: (state, action) => {
      state.loading = true
    },
    finishCall : (state, action) => {
      state.loading = false
    },
    // SAVE NOTIFICATIONS
    accountingMayorFetched: (state, action) => {
      const { accountingMayor } = action.payload;
      state.accountingMayor = accountingMayor
    },
  }
});
