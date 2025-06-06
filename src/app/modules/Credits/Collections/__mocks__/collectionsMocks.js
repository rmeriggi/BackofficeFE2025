import {COLLECTIONS_URLS} from "../utils/service";
import mockListQuotas from "./mockListQuotas";

export default function mockCollections(mock){

  mock.onGet(COLLECTIONS_URLS.GET_QUOTAS_LIST(29)).reply(() => {
    return [200, mockListQuotas]
  })
}