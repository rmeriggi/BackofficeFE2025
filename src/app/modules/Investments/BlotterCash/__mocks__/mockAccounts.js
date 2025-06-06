import {ACCOUNTS_URLS} from "../utils/service";
import { format } from "date-fns";
import accountsMocks from "./accountsMocks";
import transactionsMocks from "./transactionsMocks";
import oneAccountMocks from "./oneAccountMocks";
import extractsMocks from "./extractsMocks";
import extractBalancesMocks from "./extractBalancesMocks";

const date = format(new Date() , "yyyy/MM/dd")
export default function mockAccounts(mock){

  mock.onGet(ACCOUNTS_URLS.GET_LIST).reply(() => {
    return [200, accountsMocks]
  })

  mock.onGet(ACCOUNTS_URLS.GET_TRANSACTIONS(95436)).reply(() => {
    return [200, transactionsMocks]
  });

  mock.onGet(ACCOUNTS_URLS.GET_ONE_ACCOUNT(95436)).reply(() => {
    return [200, oneAccountMocks]
  });

  mock.onPost(ACCOUNTS_URLS.GET_EXTRACT(95436), {fromDate: date, toDate: date} ).reply(() => {
    return [200, extractsMocks]
  });

  mock.onPost(ACCOUNTS_URLS.GET_EXTRACT_BALANCES(95436), {fromDate: date, toDate: date} ).reply(() => {
    return [200, extractBalancesMocks]
  });

}