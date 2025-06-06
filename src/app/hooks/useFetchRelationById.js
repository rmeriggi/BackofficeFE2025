import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRelationById } from "../_redux/relations/relationsActions";

export const useFetchRelationById = (relationId) => {
  const { relation, loadingById } = useSelector((state) => state.relations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRelationById(relationId));
  }, [dispatch, relationId]);

  return [relation, loadingById];
};
