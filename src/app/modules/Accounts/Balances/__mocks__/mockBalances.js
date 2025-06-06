import { format } from "date-fns";
import {BALANCES_URLS} from "../utils/service";
import balancesMocks from "./balancesMocks";
import sumMocks from "./sumMocks";

const date = format(new Date(), "yyyy/MM/dd")

export default function mockBalances(mock){

  mock.onPost(BALANCES_URLS.GET_LIST, {date}).reply(() => {
    return [200, balancesMocks]
  })

  mock.onPost(BALANCES_URLS.GET_SUM, {date}).reply(() => {
    return [200, sumMocks]
  })
}