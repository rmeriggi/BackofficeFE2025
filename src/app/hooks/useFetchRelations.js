import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRelations } from "../_redux/relations/relationsActions";

export const useFetchRelations = (idClient) => {
  const { relations, loading } = useSelector((state) => state.relations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRelations(idClient, true));
  }, [dispatch, idClient]);

  return [relations, loading];
};
