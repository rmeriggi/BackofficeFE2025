import {SCOREPARAMS_URLS} from "../utils/service";
import scoreParamsMocks from "./scoreParamsMocks"

export default function mockScoreParams(mock){

  mock.onGet(SCOREPARAMS_URLS.GET).reply(() => {
    return [200, scoreParamsMocks]
  })

}