import {CREDITS_URLS} from "../utils/service";
import creditTableMock from "./creditTableMock";
import creditGetOneMock from "./creditGetOneMock";
import entitiesTableMock from "./entitiesTableMock";
import currenciestableMock from "./currenciestableMock"; 

export default function mockCredit(mock) {

  mock.onGet(CREDITS_URLS.GET_ALL).reply(() => {
      return [200, creditTableMock]
  });

  mock.onGet(CREDITS_URLS.GET_ALL_CURRENCIES).reply(() => {
    return [200, currenciestableMock]
  });

  mock.onGet(CREDITS_URLS.GET_ALL_ENTITIES).reply(() => {
    return [200, entitiesTableMock]
  });

  mock.onGet(new RegExp(CREDITS_URLS.GET_ONE("*"))).reply(() => {
      return [200, creditGetOneMock]
  });

}