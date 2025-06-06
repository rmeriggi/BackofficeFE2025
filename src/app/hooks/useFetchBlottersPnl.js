import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPnl } from "../_redux/blotter/pnlsActions";

export const useFetchBlottersPnl = () => {
  
  const { pnls, loading } = useSelector(
      (s) => (s.pnls)
  );

  const dispatch = useDispatch()

  useEffect(() => {
          dispatch(getAllPnl(true, false, false, 0, 0))      
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [pnls, loading];
}