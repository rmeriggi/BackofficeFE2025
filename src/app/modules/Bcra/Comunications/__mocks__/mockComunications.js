import {COMUNICATIONS_URLS} from "../utils/service";
import comunicationsMocks from "./comunicationsMocks";

export default function mockComunication(mock){

  mock.onGet(COMUNICATIONS_URLS.GET).reply(() => {
    return [200, comunicationsMocks]
  })
}