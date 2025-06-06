import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpecies } from "../_redux/blotter/speciesActions";

export const useFetchBlottersSpecies = () => {
  
  const { species, loading } = useSelector(
      (s) => (s.species)
  );

  const dispatch = useDispatch()

  useEffect(() => {
          dispatch(getAllSpecies(true, false, false, 0))      
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [species, loading];
}