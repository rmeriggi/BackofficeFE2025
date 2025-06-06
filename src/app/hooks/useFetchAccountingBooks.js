import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccountingBooks } from "../_redux/accounting/accountingActions";

export const useFetchAccountingBooks = () => {
    
  const { accountingBooks, loading } = useSelector(
      (s) => (s.accountingBooks)
  );
  
  const dispatch = useDispatch()

  useEffect(() => {
      if(!accountingBooks || accountingBooks.length === 0){
          dispatch(getAllAccountingBooks())
      }else{
          return
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [accountingBooks, loading];
}