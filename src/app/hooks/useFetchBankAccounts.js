import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBankAccounts } from "../_redux/bankAccounts/bankAccountsActions";

export const useFetchBankAccounts = (idClient) => {
   
  const { bankAccounts, loading } = useSelector(
      (s) => (s.bankAccounts)
  );
  const dispatch = useDispatch()

  useEffect(() => {
          dispatch(getAllBankAccounts(idClient, true))      
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [bankAccounts, loading];
}