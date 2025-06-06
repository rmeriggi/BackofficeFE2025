import {REPORTS_URLS} from "../utils/service";
import reportsMocks from "./reportsMocks";

export default function mockReports(mock){

  mock.onGet(REPORTS_URLS.GET).reply(() => {
    return [200, reportsMocks]
  })
}