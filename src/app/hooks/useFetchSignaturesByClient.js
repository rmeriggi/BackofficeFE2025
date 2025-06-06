import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSignaturesByClient } from "../_redux/signatures/signaturesByClientActions";

export const useFetchSignaturesByClient = (id) => {
    
  const { signaturesByClient, loading } = useSelector(
      (s) => (s.signaturesByClient)
  );
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSignaturesByClient(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [signaturesByClient, loading];
}