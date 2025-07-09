import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRelaciones } from "../_redux/patronosRelaciones/relacionesActions";

export const useFetchRelaciones = () => {
  const { relaciones, listLoading, actionsLoading } = useSelector(
    (s) => s.patronosRelaciones
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRelaciones());
  }, [dispatch]);

  return [relaciones, listLoading, actionsLoading];
};
