import {CLIENTS_URLS} from "../utils/service";
import clientsMocks from "./clientsMocks";
import editClientMock from "./editClientMock";
import statusMock from "./statusMock"
import levelsMock from "./levelsMock";
import categoriesMock from "./categoriesMock";
import verifiedMock from "./verifiedMock";

export default function mockClients(mock){

  mock.onGet(CLIENTS_URLS.GET_ALL).reply(() => {
    return [200, clientsMocks]
  })

  mock.onGet(new RegExp(CLIENTS_URLS.GET_ONE("*"))).reply(() => {
    return [200, editClientMock]
  })

  mock.onGet(CLIENTS_URLS.GET_STATUS).reply(() => {
    return [200, statusMock]
  })

  mock.onGet(CLIENTS_URLS.GET_CATEGORIES).reply(() => {
    return [200, categoriesMock]
  })

  mock.onGet(CLIENTS_URLS.GET_LEVELS).reply(() => {
    return [200, levelsMock]
  })

  mock.onGet(CLIENTS_URLS.GET_VERIFIED).reply(() => {
    return [200, verifiedMock]
  })
}