import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEchecks } from "../_redux/e-checks/echecksActions";

export const useFetchEchecks = () => {
  const { echecks, loading } = useSelector((state) => state.echecks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEchecks());
  }, [dispatch]);

  return [echecks, loading];
};
