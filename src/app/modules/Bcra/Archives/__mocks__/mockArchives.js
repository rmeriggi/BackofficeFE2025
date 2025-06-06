import {ARCHIVES_URLS} from "../utils/service";
import archivesMocks from "./archivesMocks";

export default function mockArchives(mock){

  mock.onGet(ARCHIVES_URLS.GET).reply(() => {
    return [200, archivesMocks]
  })
}