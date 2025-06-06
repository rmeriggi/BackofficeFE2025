import {GENERAL_URLS} from "../utils/service";
import trxTypeMock from "./trxTypeMock";
import currenciesMock from "./currenciesMock"
import countriesMock from "./countriesMock";
import creditStatusesMock from "./creditStatusesMock";
import entitiesMock from "./entitiesMock"

export default function generalAccounts(mock){

  mock.onGet(GENERAL_URLS.GET_TRXTYPE).reply(() => {
    return [200, trxTypeMock]
  })

  mock.onGet(GENERAL_URLS.GET_CURRENCIES).reply(() => {
    return [200, currenciesMock]
  });

  mock.onGet(GENERAL_URLS.GET_COUNTRIES).reply(() => {
    return [200, countriesMock]
  });

  mock.onGet(GENERAL_URLS.GET_ALL_CREDIT_STATUS).reply(() => {
    return [200, creditStatusesMock]
  });

  mock.onGet(GENERAL_URLS.GET_ENTITIES).reply(() => {
    return [200, entitiesMock]
  });
}