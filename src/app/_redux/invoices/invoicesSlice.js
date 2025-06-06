import { createSlice } from "@reduxjs/toolkit";

const initialInvoicesState = {
  loading: false,
  invoices: undefined,
  error: null,
};

export const invoicesSlice = createSlice({
  name: "invoices",
  initialState: initialInvoicesState,
  reducers: {
    startCall: (state) => {
      state.loading = true;
      state.error = null;
    },
    finishCall: (state) => {
      state.loading = false;
    },
    invoicesFetched: (state, action) => {
      const { invoices } = action.payload;
      state.invoices = invoices;
    },
    catchError: (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
  },
});
