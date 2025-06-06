import {createSlice} from "@reduxjs/toolkit";

export const actionTypes = {
  Loading : 'Loading',
};

const initialAccountingState = {
  loading: false,
  accountingBooks: undefined,
};

export const callTypes = {
  accountingBooks: "accountingBooks",
};

export const accountingSlice = createSlice({
  name: "accountingBooks",
  initialState: initialAccountingState,
  reducers: {
    startCall: (state, action) => {
      state.loading = true
    },
    finishCall : (state, action) => {
      state.loading = false
    },
    // SAVE NOTIFICATIONS
    accountingBooksFetched: (state, action) => {
      const { accountingBooks } = action.payload;
      state.accountingBooks = accountingBooks
    },
  }
});
