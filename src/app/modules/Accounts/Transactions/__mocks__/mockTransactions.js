import {TRANSACTIONS_URLS} from "../utils/service";
import transactionsMocks from "./transactionsMocks";

export default function mockTransactions(mock){

  mock.onGet(TRANSACTIONS_URLS.GET).reply(() => {
    return [200, transactionsMocks]
  })
}