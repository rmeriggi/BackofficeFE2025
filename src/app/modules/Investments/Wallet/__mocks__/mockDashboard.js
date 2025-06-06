import {DASHBOARD_URLS} from "../utils/service";
import statisticsMocks from "./statisticsMocks";

export default function mockDashboard(mock){

  mock.onGet(DASHBOARD_URLS.GET).reply(() => {
    return [200, statisticsMocks]
  })

}