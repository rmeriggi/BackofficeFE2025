import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpeciesInstrument } from "../_redux/blotter/speciesInstrumentActions";

export const useFetchBlottersSpeciesInstrument = () => {
  
  const { speciesInstrument, loading } = useSelector(
      (s) => (s.speciesInstrument)
  );

  const dispatch = useDispatch()

  useEffect(() => {
          dispatch(getAllSpeciesInstrument(true, false, false, 0, 0))      
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [speciesInstrument, loading];
}