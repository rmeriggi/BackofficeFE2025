import {PRODUCTS_URLS} from "../utils/service";
import productTableMock from "./productTableMock";
import productGetOneMock from "./productGetOneMock";
import programsTableMock from "./programsTableMock";
import comboProgramsMock from "./comboProgramsMock"
import frecuencyMock from "./frecuencyMock"
import quotaSystemMock from "./quotaSystemMock";

export default function mockProduct(mock) {

  mock.onGet(PRODUCTS_URLS.GET_ALL).reply(() => {
      return [200, productTableMock]
  });

  mock.onGet(PRODUCTS_URLS.GET_ONE("*")).reply(() => {
      return [200, productGetOneMock]
  });

  mock.onGet(PRODUCTS_URLS.GET_ALL_PROGRAMS).reply(() => {
    return [200, programsTableMock]
  });

  mock.onGet(PRODUCTS_URLS.GET_COMBO_PROGRAMS).reply(() => {
    return [200, comboProgramsMock]
  });

  mock.onGet(PRODUCTS_URLS.GET_FRECUENCIES).reply(() => {
    return [200, frecuencyMock]
  });

  mock.onGet(PRODUCTS_URLS.GET_COMBO_QUOTA_SYSTEM).reply(() => {
    return [200, quotaSystemMock]
  });

}