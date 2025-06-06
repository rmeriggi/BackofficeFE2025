import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBankAccountById } from "../_redux/bankAccounts/bankAccountsActions";

export const useFetchBankAccountById = (accountId) => {
   
    const { bankAccount, loadingById } = useSelector(
        (s) => (s.bankAccounts)
    );
    const dispatch = useDispatch()
  
    useEffect(() => {
            dispatch(getBankAccountById(accountId))       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    return [bankAccount, loadingById ];
  }
