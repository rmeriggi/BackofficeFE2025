import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPnlInstrument } from "../_redux/blotter/pnlsInstrumentActions";

export const useFetchBlottersPnlInstrument = () => {
  
  const { pnlsInstrument, loading } = useSelector(
      (s) => (s.pnlsInstrument)
  );

  const dispatch = useDispatch()

  useEffect(() => {
          dispatch(getAllPnlInstrument(true, false, false, 0, 0))      
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [pnlsInstrument, loading];
}