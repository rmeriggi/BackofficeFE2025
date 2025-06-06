/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export const useFetchApi = () => {
  let controller
  const [loading, setLoading] = useState(true);

  const getAPI = async (fetch, err = []) => {
    if (fetch.controller) controller = fetch.controller
    setLoading(true)
    try {
        const response = await fetch.call
        setLoading(false)
        return response.data
      } catch (error) {
        setLoading(false)
        return err
    }
  }

  const cancelEndpoint = () => {
    setLoading(false);
    controller && controller.abort();
  };

  useEffect(() => {
    return () => {
      cancelEndpoint();
    };
  }, []);

  return [getAPI, loading];
}