import {CREDITS_URLS} from "../utils/service";
import creditTableMock from "./creditTableMock";
import creditGetOneMock from "./creditGetOneMock";

export default function mockCredit(mock) {

  mock.onGet(CREDITS_URLS.GET_ALL).reply(() => {
      return [200, creditTableMock]
  });

  mock.onGet(new RegExp(CREDITS_URLS.GET_ONE("*"))).reply(() => {
      return [200, creditGetOneMock]
  });
}