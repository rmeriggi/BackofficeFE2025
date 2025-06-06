import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClients } from "../_redux/clients/clientsActions";

export const useFetchClients = (search = '*') => {
    
  const { clients, loading } = useSelector(
      (s) => (s.clients)
  );
  
  const dispatch = useDispatch()

  useEffect(() => {
      if(!clients || clients.length === 0){
          dispatch(getAllClients(search))
      }else{
          return
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [clients, loading];
}