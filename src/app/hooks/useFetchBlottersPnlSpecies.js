import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPnlSpecies } from "../_redux/blotter/pnlsSpeciesActions";

export const useFetchBlottersPnlSpecies = () => {
  
  const { pnlsSpecies, loading } = useSelector(
      (s) => (s.pnlsSpecies)
  );

  const dispatch = useDispatch()

  useEffect(() => {
          dispatch(getAllPnlSpecies(true, false, false, 0, 0))      
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [pnlsSpecies, loading];
}