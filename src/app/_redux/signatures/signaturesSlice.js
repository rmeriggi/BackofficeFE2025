import {createSlice} from "@reduxjs/toolkit";

export const actionTypes = {
  Loading : 'Loading',
};

const initialSignaturesClientsState = {
  loading: false,
  signaturesClients: undefined,
};

export const callTypes = {
  signaturesClients: "signaturesClients",
};

export const signaturesClientsSlice = createSlice({
  name: "signaturesClients",
  initialState: initialSignaturesClientsState,
  reducers: {
    startCall: (state, action) => {
      state.loading = true
    },
    finishCall : (state, action) => {
      state.loading = false
    },
    // SAVE CLIENTS
    clientsSignaturesFetched: (state, action) => {
      const { signaturesClients } = action.payload;
      state.signaturesClients = signaturesClients
    },
  }
});

const initialSignaturesByClientState = {
  loading: false,
  signaturesByClient: undefined,
};

export const signaturesByClientSlice = createSlice({
  name: "signaturesByClient",
  initialState: initialSignaturesByClientState,
  reducers: {
    startCall: (state, action) => {
      state.loading = true
    },
    finishCall : (state, action) => {
      state.loading = false
    },
    // SAVE CLIENTS
    signaturesByclientFetched: (state, action) => {
      const { signaturesByClient } = action.payload;
      state.signaturesByClient = signaturesByClient
    },
  }
});
