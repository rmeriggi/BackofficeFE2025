import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCashMoney } from "../_redux/blotter/cashMoneyActions";

export const useFetchBlottersCashMoney = () => {
  
  const { cashMoney, loading } = useSelector(
      (s) => (s.cashMoney)
  );

  const dispatch = useDispatch()

  useEffect(() => {
          dispatch(getAllCashMoney(true, false, false, 0))      
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [cashMoney, loading];
}