import {createSlice} from "@reduxjs/toolkit";

export const actionTypes = {
  Loading : 'Loading',
};

const initialClientsState = {
  loading: false,
  loadingById: false,
  loadingClient:false,
  bankAccounts: undefined,
  bankAccount: undefined,
  client: undefined
};

export const callTypes = {
  bankAccounts: "bankAccounts",
};

export const bankAccountsSlice = createSlice({
  name: "bankAccounts",
  initialState: initialClientsState,
  reducers: {
    startCall: (state, action) => {
      state.loading = true
    },
    finishCall : (state, action) => {
      state.loading = false
    },
    startCallId: (state, action) => {
      state.loadingById = true
    },
    finishCallId : (state, action) => {
      state.loadingById = false
    },
    startCallClient: (state, action) => {
      state.loadingClient = true
    },
    finishCallClient : (state, action) => {
      state.loadingClient = false
    },
    // SAVE BANK ACCOUNTS
    bankAccountsFetched: (state, action) => {
      const { bankAccounts } = action.payload;
      state.bankAccounts = bankAccounts
    },
    bankAccountFetched: (state, action) => {
      const { bankAccount } = action.payload;
      state.bankAccount = bankAccount
    },
    clientFetched: (state, action) => {
      const { client } = action.payload;
      state.client = client
    },
  }
});
