import {BALANCES_URLS} from "../utils/service";
import dashboardMock from "./dashboardAccountMock"

export default function mockAccountDashboard(mock){

  mock.onGet(BALANCES_URLS.GET).reply(() => {
    return [200, dashboardMock]
  })

}