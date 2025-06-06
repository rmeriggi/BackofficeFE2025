import {createSlice} from "@reduxjs/toolkit";

export const actionTypes = {
  Loading : 'Loading',
};

const initialBlottersState = {
  loading: false,
  blotters: undefined,
  fromBlotter:'',
  toBlotter:''
};

export const callTypes = {
  blotters: "blotters",
};

export const blottersSlice = createSlice({
  name: "blotters",
  initialState: initialBlottersState,
  reducers: {
    startCall: (state, action) => {
      state.loading = true
    },
    finishCall : (state, action) => {
      state.loading = false
    },
    // SAVE CLIENTS
    blottersFetched: (state, action) => {
      const { blotters } = action.payload;
      state.blotters = blotters
    },
    // SAVE FROM
    fromFetched: (state, action) => {
      const { fromBlotter } = action.payload;
      state.fromBlotter = fromBlotter
    },
    // SAVE TO
    toFetched: (state, action) => {
      const { toBlotter } = action.payload;
      state.toBlotter = toBlotter
    },
  }
});

const initialBlotterPnlState = {
  loading: false,
  pnls: undefined,
};

export const blotterPnlSlice = createSlice({
  name: "pnls",
  initialState: initialBlotterPnlState,
  reducers: {
    startCall: (state, action) => {
      state.loading = true
    },
    finishCall : (state, action) => {
      state.loading = false
    },
    // SAVE CLIENTS
    pnlsFetched: (state, action) => {
      const { pnls } = action.payload;
      state.pnls = pnls
    },
  }
});

const initialBlotterPnlSpeciesState = {
  loading: false,
  pnlsSpecies: undefined,
};

export const blotterPnlSpeciesSlice = createSlice({
  name: "pnlsSpecies",
  initialState: initialBlotterPnlSpeciesState,
  reducers: {
    startCall: (state, action) => {
      state.loading = true
    },
    finishCall : (state, action) => {
      state.loading = false
    },
    // SAVE CLIENTS
    pnlsSpeciesFetched: (state, action) => {
      const { pnlsSpecies } = action.payload;
      state.pnlsSpecies = pnlsSpecies
    },
  }
});

const initialBlotterPnlInstrumentState = {
  loading: false,
  pnlsInstrument: undefined,
};

export const blotterPnlInstrumentSlice = createSlice({
  name: "pnlsInstrument",
  initialState: initialBlotterPnlInstrumentState,
  reducers: {
    startCall: (state, action) => {
      state.loading = true
    },
    finishCall : (state, action) => {
      state.loading = false
    },
    // SAVE CLIENTS
    pnlsInstrumentFetched: (state, action) => {
      const { pnlsInstrument } = action.payload;
      state.pnlsInstrument = pnlsInstrument
    },
  }
});

const initialBlotterSpeciesState = {
  loading: false,
  species: undefined,
};

export const blotterSpeciesSlice = createSlice({
  name: "species",
  initialState: initialBlotterSpeciesState,
  reducers: {
    startCall: (state, action) => {
      state.loading = true
    },
    finishCall : (state, action) => {
      state.loading = false
    },
    // SAVE CLIENTS
    speciesFetched: (state, action) => {
      const { species } = action.payload;
      state.species = species
    },
  }
});

const initialBlotterSpeciesInstrumentState = {
  loading: false,
  speciesInstrument: undefined,
};

export const blotterSpeciesInstrumentSlice = createSlice({
  name: "speciesInstrument",
  initialState: initialBlotterSpeciesInstrumentState,
  reducers: {
    startCall: (state, action) => {
      state.loading = true
    },
    finishCall : (state, action) => {
      state.loading = false
    },
    // SAVE CLIENTS
    speciesInstrumentFetched: (state, action) => {
      const { speciesInstrument } = action.payload;
      state.speciesInstrument = speciesInstrument
    },
  }
});

const initialBlotterCashState = {
  loading: false,
  cash: undefined,
};

export const blotterCashSlice = createSlice({
  name: "cash",
  initialState: initialBlotterCashState,
  reducers: {
    startCall: (state, action) => {
      state.loading = true
    },
    finishCall : (state, action) => {
      state.loading = false
    },
    // SAVE CLIENTS
    cashFetched: (state, action) => {
      const { cash } = action.payload;
      state.cash = cash
    },
  }
});

const initialBlotterCashMoneyState = {
  loading: false,
  cashMoney: undefined,
};

export const blotterCashMoneySlice = createSlice({
  name: "cashMoney",
  initialState: initialBlotterCashMoneyState,
  reducers: {
    startCall: (state, action) => {
      state.loading = true
    },
    finishCall : (state, action) => {
      state.loading = false
    },
    // SAVE CLIENTS
    cashMoneyFetched: (state, action) => {
      const { cashMoney } = action.payload;
      state.cashMoney = cashMoney
    },
  }
});

