/* import axios from "axios"; */
import { useState, useEffect, useCallback } from "react";
import * as relationService from "./service";

export const useOneRelation = (id, isMountedRef) => {
  const [oneRelation, setOneRelation] = useState([]);
  const [completed, setCompleted] = useState(false);

  const getOneRelation = useCallback(async () => {
    try {
      const relation = await relationService.getOneRelation(id);
      if (isMountedRef.current) {
        setOneRelation(relation);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCompleted(true);
    }
  }, [id, isMountedRef]);

  useEffect(() => {
    getOneRelation();
  }, [getOneRelation]);

  return [oneRelation, completed];
};
