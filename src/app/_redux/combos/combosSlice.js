import {createSlice} from "@reduxjs/toolkit";
import { countriesAdapter, currenciesAdapter, entitiesAdapter } from "../../adapters";

export const actionTypes = {
  Loading : 'Loading',
  CurrenciesFetched : 'CurrenciesFetched'
};

const initialCombosState = {
  currencies: undefined,
  entities: undefined,
  countries : undefined,
  wallets: undefined,
  operations: undefined,
  species: undefined,
  deadline: undefined,
  counterparties: undefined,
  markets: undefined,
  operators: undefined,
  coins: undefined,
  status: undefined,
  costCenters: undefined,
  categories: undefined
};

export const callTypes = {
  loading: false,
  currencies: "currencies",
  entities: 'entities',
  countries: 'countries',
  wallets: 'wallets',
  operations: 'operations',
  species: 'species',
  deadlines: 'deadlines',
  counterparties: 'counterparties',
  markets: 'markets',
  operators: 'operators',
  coins: 'coins',
  status: 'status',
  costCenters: 'costCenters',
  categories: 'categories'
};

export const combosSlice = createSlice({
  name: "combos",
  initialState: initialCombosState,
  reducers: {
    startCall: (state, action) => {
      switch (action.payload.callType) {
        case callTypes.currencies:
            state.loading = true
          break;
        case callTypes.entities:
          state.loading = true
          break;
        case callTypes.countries:
          state.loading = true
          break;
        default:
          break;
      }
    },
   
    currenciesFetched: (state, action) => {
      const { currency } = action.payload;
      state.currencies = currenciesAdapter(currency);
    },

    entitiesFetched: (state, action) => {
      const { entities } = action.payload;
      state.entities = entitiesAdapter(entities);
    },
    
    countriesFetched: (state, action) => {
      const { countries } = action.payload;
      state.countries = countriesAdapter(countries);
    },

    walletsFetched: (state, action) => {
      const { wallets } = action.payload;
      state.wallets = wallets;
    },
  
    operationsFetched: (state, action) => {
      const { operations } = action.payload; 
      state.operations = operations;
    },
    
    speciesFetched: (state, action) => {
      const { species } = action.payload;      
      state.species = species;
    },
    
    deadlineFetched: (state, action) => {
      const { deadlines } = action.payload;      
      state.deadlines = deadlines;
    },

    counterpartiesFetched: (state, action) => {
      const { counterparties } = action.payload;     
      state.counterparties = counterparties;
    },
 
    marketsFetched: (state, action) => {
      const { markets } = action.payload;      
      state.markets = markets;
  },

    operatorsFetched: (state, action) => {
      const { operators } = action.payload;
      state.operators = operators;
  },

    coinsFetched: (state, action) => {
      const { coins } = action.payload;
      state.coins = coins;
  },  
    statusFetched: (state, action) => {
    const { status } = action.payload;
    state.status = status;
  },  
  costCentersFetched: (state, action) => {
  const { costCenters } = action.payload;
  state.costCenters = costCenters;
  },  
  categoriesFetched: (state, action) => {
  const { categories } = action.payload;
  state.categories = categories;
  }
  }
});
