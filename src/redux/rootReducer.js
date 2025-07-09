import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import { accountingMayorSlice } from "../app/_redux/accounting/accountingMayorSlice";
import { accountingSlice } from "../app/_redux/accounting/accountingSlice";
import { bankAccountsSlice } from "../app/_redux/bankAccounts/bankAccountsSlice";
import {
  blotterCashMoneySlice,
  blotterCashSlice,
  blotterPnlInstrumentSlice,
  blotterPnlSlice,
  blotterPnlSpeciesSlice,
  blotterSpeciesInstrumentSlice,
  blotterSpeciesSlice,
  blottersSlice,
} from "../app/_redux/blotter/blottersSlice";
import { clientsSlice } from "../app/_redux/clients/clientsSlice";
import { combosSlice } from "../app/_redux/combos/combosSlice";
import { echecksSlice } from "../app/_redux/e-checks/echeksSlice";
import { invoicesSlice } from "../app/_redux/invoices/invoicesSlice";
import { notificationsSlice } from "../app/_redux/notifications/notificationsSlice";
import { patronosSlice } from "../app/_redux/patronos/patronosSlice";
import { relacionesSlice } from "../app/_redux/patronosRelaciones/relacionesSlice";
import { relationsSlice } from "../app/_redux/relations/relationsSlice";
import {
  signaturesByClientSlice,
  signaturesClientsSlice,
} from "../app/_redux/signatures/signaturesSlice";
import { suppliersSlice } from "../app/_redux/suppliers/suppliersSlice";
import * as auth from "../app/modules/Auth/_redux/authRedux";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  combos: combosSlice.reducer,
  clients: clientsSlice.reducer,
  patronos: patronosSlice.reducer,
  patronosRelaciones: relacionesSlice.reducer,
  bankAccounts: bankAccountsSlice.reducer,
  blotters: blottersSlice.reducer,
  relations: relationsSlice.reducer,
  species: blotterSpeciesSlice.reducer,
  speciesInstrument: blotterSpeciesInstrumentSlice.reducer,
  pnls: blotterPnlSlice.reducer,
  cash: blotterCashSlice.reducer,
  signaturesClients: signaturesClientsSlice.reducer,
  signaturesByClient: signaturesByClientSlice.reducer,
  cashMoney: blotterCashMoneySlice.reducer,
  pnlsSpecies: blotterPnlSpeciesSlice.reducer,
  pnlsInstrument: blotterPnlInstrumentSlice.reducer,
  notifications: notificationsSlice.reducer,
  echecks: echecksSlice.reducer,
  suppliers: suppliersSlice.reducer,
  invoices: invoicesSlice.reducer,
  accountingBooks: accountingSlice.reducer,
  accountingMayor: accountingMayorSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
