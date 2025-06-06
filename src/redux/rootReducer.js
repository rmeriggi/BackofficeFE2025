import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import { combosSlice } from "../app/_redux/combos/combosSlice"
import { clientsSlice } from "../app/_redux/clients/clientsSlice"
import { bankAccountsSlice } from "../app/_redux/bankAccounts/bankAccountsSlice"
import { blottersSlice } from "../app/_redux/blotter/blottersSlice"
import { blotterSpeciesSlice, blotterSpeciesInstrumentSlice } from "../app/_redux/blotter/blottersSlice"
import { blotterPnlSlice, blotterPnlSpeciesSlice, blotterPnlInstrumentSlice } from "../app/_redux/blotter/blottersSlice"
import { blotterCashSlice, blotterCashMoneySlice } from "../app/_redux/blotter/blottersSlice"
import { relationsSlice } from "../app/_redux/relations/relationsSlice";
import { notificationsSlice } from "../app/_redux/notifications/notificationsSlice";
import { signaturesByClientSlice, signaturesClientsSlice } from "../app/_redux/signatures/signaturesSlice";
import { echecksSlice } from "../app/_redux/e-checks/echeksSlice";
import { suppliersSlice } from "../app/_redux/suppliers/suppliersSlice";
import { invoicesSlice } from "../app/_redux/invoices/invoicesSlice";
import { accountingSlice } from "../app/_redux/accounting/accountingSlice";
import { accountingMayorSlice } from "../app/_redux/accounting/accountingMayorSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  combos: combosSlice.reducer,
  clients: clientsSlice.reducer,
  bankAccounts: bankAccountsSlice.reducer,
  blotters: blottersSlice.reducer,
  relations: relationsSlice.reducer,
  species: blotterSpeciesSlice.reducer,
  speciesInstrument: blotterSpeciesInstrumentSlice.reducer,
  pnls: blotterPnlSlice.reducer,
  cash: blotterCashSlice.reducer,
  signaturesClients: signaturesClientsSlice.reducer,
  signaturesByClient:signaturesByClientSlice.reducer,
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
