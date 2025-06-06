import {WALLET_URLS} from "../utils/service";
import productTypesMock from "./productTypesMock";
import creditStatusesTableMock from "./creditStatusesTableMock";
import managersMock from "./managersMock";
 
export default function mockWallet(mock) {

  mock.onGet(WALLET_URLS.GET_ALL_PRODUCT_TYPES).reply(() => {
      return [200, productTypesMock]
  });

  mock.onGet(WALLET_URLS.GET_ALL_CREDIT_STATUSES).reply(() => {
      return [200, creditStatusesTableMock]
  });

  mock.onGet(WALLET_URLS.GET_ALL_MANAGERS).reply(() => {
      return [200, managersMock]
  });

  mock.onGet(WALLET_URLS.GET_ASSIGN_WALLET_DATA).reply(() => {
      return [200, productTypesMock]
  });

}