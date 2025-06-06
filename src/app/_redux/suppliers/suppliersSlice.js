import {createSlice} from "@reduxjs/toolkit";

export const actionTypes = {
  Loading : 'Loading',
};

const initialSuppliersState = {
  loading: false,
  suppliers: undefined,
};

export const callTypes = {
  suppliers: "notifications",
};

export const suppliersSlice = createSlice({
  name: "suppliers",
  initialState: initialSuppliersState,
  reducers: {
    startCall: (state, action) => {
      state.loading = true
    },
    finishCall : (state, action) => {
      state.loading = false
    },
    // SAVE NOTIFICATIONS
    suppliersFetched: (state, action) => {
      const { suppliers } = action.payload;
      state.suppliers = suppliers
    },
  }
});
