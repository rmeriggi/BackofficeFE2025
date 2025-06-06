import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClientById } from "../_redux/bankAccounts/bankAccountsActions";

export const useFetchClientById = (clientId) => {
   
    const { client, loadingClient } = useSelector(
        (s) => (s.bankAccounts)
    );
    const dispatch = useDispatch()
  
    useEffect(() => {
            dispatch(getClientById (clientId))       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    return [client, loadingClient ];
  }
