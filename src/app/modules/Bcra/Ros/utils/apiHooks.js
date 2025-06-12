import { useState, useEffect, useCallback } from "react";
import * as rosService from "./service";

export const useAllRos = (isMountedRef) => {
  const [allRos, setAllRos] = useState([]);
  const [completed, setCompleted] = useState(false);

  const getAllRos = useCallback(async () => {
    try {
      const ros = await rosService.getAllRos();
      if (isMountedRef.current) {
        setAllRos(ros);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCompleted(true);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getAllRos();
  }, [getAllRos]);

  return [allRos, completed];
};
