import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccountingMayor } from "../_redux/accounting/accountingMayorActions";

export const useFetchAccountingMayor = () => {
    
  const { accountingMayor, loading } = useSelector(
      (s) => (s.accountingMayor)
  );
  
  const dispatch = useDispatch()

  useEffect(() => {
      if(!accountingMayor || accountingMayor.length === 0){
          dispatch(getAllAccountingMayor())
      }else{
          return
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [accountingMayor, loading];
}