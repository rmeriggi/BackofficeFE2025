import {ACCOUNTS_URLS} from "../Accounts/utils/service";
import {ACCOUNTING_GROUPS_URLS} from "../AccountingGroups/utils/service"
import accountsMock from "./accountsMock";
import accountingGroupsMocks from "./accountingGroupsMock"

export default function mocksServices(mock){

  mock.onPost(ACCOUNTS_URLS.GET_ALL).reply(() => {
        return [200, accountsMock];
  });

  mock.onPost(ACCOUNTING_GROUPS_URLS.GET_ALL).reply(() => {
    return [200, accountingGroupsMocks]; 
  });

}