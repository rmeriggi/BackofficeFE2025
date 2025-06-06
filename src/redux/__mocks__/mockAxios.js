import MockAdapter from "axios-mock-adapter";
import mockAuth from "../../app/modules/Auth/__mocks__/mockAuth";
import mockClients from "../../app/modules/Clients/Clients/__mocks__/mockClients";
import mockDashboard from "../../app/modules/Clients/Statistics/__mocks__/mockDashboard";
import mockAccounts from "../../app/modules/Accounts/Accounts/__mocks__/mockAccounts";
import mockTransactions from "../../app/modules/Accounts/Transactions/__mocks__/mockTransactions";
import mockRos from "../../app/modules/Bcra/Ros/__mocks__/mockRos";
import mockArchives from "../../app/modules/Bcra/Archives/__mocks__/mockArchives";
import mockReports from '../../app/modules/Bcra/Reports/__mocks__/mockReports'
import mockComunication from "../../app/modules/Bcra/Comunications/__mocks__/mockComunications";
import mockTaxes from "../../app/modules/Taxes/Taxes/__mocks__/mockTaxes";
import generalAccounts from "../../app/__mocks__/mockGeneral";
import mockAccountDashboard from "../../app/modules/Accounts/Dashboard/__mocks__/mockAccountDashboard";
import mockCredit from "../../app/modules/Credits/Credits/__mocks__/mockCredit";
import mockProduct from "../../app/modules/Credits/Products/__mocks__/mockProduct";
import mockManagementUsers from "../../app/modules/Settings/ManagementUsers/__mocks__/mockManagementUsers";
import mockScoreParams from "../../app/modules/Settings/Scoreparams/__mocks__/mockScoreParams";
import mockScoreSource from "../../app/modules/Settings/Scoresub/__mocks__/mockScoreSource";
import mockSectionA from "../../app/modules/Bcra/ApartadoA/__mocks__/mockSectionA";
import mockSectionB from "../../app/modules/Bcra/ApartadoB/__mocks__/mockSectionB";
import mockCvu from "../../app/modules/PSP/Cvu/__mocks__/mockCvu";
import mockBalances from "../../app/modules/Accounts/Balances/__mocks__/mockBalances";
import mockWallet from "../../app/modules/Credits/Wallets/__mocks__/mockWallet";
import mockCardsProduct from "../../app/modules/Cards/Products/__mocks__/mockCards"
import mockCollections from "../../app/modules/Credits/Collections/__mocks__/collectionsMocks";
import mocksServices from "../../app/modules/Accounting/__mocks__/mockServices";

export default function mockAxios(axios) {
  const mock = new MockAdapter(axios, { delayResponse: 300 });

  mockAuth(mock);
  mockDashboard(mock)
  mockClients(mock)
  mockAccounts(mock)
  mockTransactions(mock)
  mockRos(mock)
  mockArchives(mock)
  mockReports(mock)
  mockComunication(mock)
  mockTaxes(mock)
  generalAccounts(mock)
  mockAccountDashboard(mock)
  mockBalances(mock)
  mockCredit(mock)
  mockProduct(mock)
  mockManagementUsers(mock)
  mockScoreParams(mock)
  mockScoreSource(mock)
  mockSectionA(mock)
  mockSectionB(mock)
  mockCvu(mock)
  mockWallet(mock)
  mockCardsProduct(mock)
  mockCollections(mock)
  mocksServices(mock)

  return mock;
}
