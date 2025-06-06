import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCash } from "../_redux/blotter/cashActions";

export const useFetchBlottersCash = () => {
  
  const { cash, loading } = useSelector(
      (s) => (s.cash)
  );

  const dispatch = useDispatch()

  useEffect(() => {
          dispatch(getAllCash(true, false, false, 0))      
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [cash, loading];
}