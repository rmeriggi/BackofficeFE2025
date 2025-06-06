import {SCORESOURCE_URLS} from "../utils/service";
import scoreSourceMocks from "./scoreSourceMocks"

export default function mockScoreSource(mock){

  mock.onGet(SCORESOURCE_URLS.GET).reply(() => {
    return [200, scoreSourceMocks]
  })

}