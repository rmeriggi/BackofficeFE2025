import {TAXES_URLS} from "../utils/service";
import taxesMocks from "./taxesMocks"
import exceptionsMocks from "./exceptionsMokcs"
import taxWhereListMocks from "./taxWhereListMocks";
import taxWhoListMocks from "./taxWhoListMocks";
import taxClient from "./taxClient";

export default function mockTaxes(mock){

  mock.onGet(TAXES_URLS.GET).reply(() => {
    return [200, taxesMocks]
  })

  mock.onGet(TAXES_URLS.GET_EXCEPTIONS(1)).reply(() => {
    return [200, exceptionsMocks]
  })

  mock.onGet(TAXES_URLS.GET_TAXWHERE).reply(() => {
    return [200, taxWhereListMocks]
  })

  mock.onGet(TAXES_URLS.GET_TAXWHO).reply(() => {
    return [200, taxWhoListMocks]
  })

  mock.onGet(TAXES_URLS.GET_EXCEPTIONS_CLIENTS).reply(() => {
    return [200, taxClient]
  })

}