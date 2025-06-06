import { useAsync } from "./useAsync"
import { useFetchApi } from "./useFetchAPI"

export const useCallAPI = (endpoint, setResponse,params, adapter, err) => {
  const [getApi, loading] = useFetchApi()
  const getApiData = async () => await getApi(endpoint(params))
  useAsync(getApiData,adapter, setResponse, err)
  return [loading]
}