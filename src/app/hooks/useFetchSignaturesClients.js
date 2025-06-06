import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSignaturesClients } from "../_redux/signatures/clientsActions";

export const useFetchSignaturesClients = (search = '*') => {
    
  const { signaturesClients, loading } = useSelector(
      (s) => (s.signaturesClients)
  );
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllSignaturesClients(search))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [signaturesClients, loading];
}