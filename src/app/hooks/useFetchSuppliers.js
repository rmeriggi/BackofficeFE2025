import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSuppliers } from "../_redux/suppliers/suppliersActions";

export const useFetchSuppliers = () => {
    
  const { suppliers, loading } = useSelector(
      (s) => (s.suppliers)
  );
  
  const dispatch = useDispatch()

  useEffect(() => {
      if(!suppliers || suppliers.length === 0){
          dispatch(getAllSuppliers())
      }else{
          return
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [suppliers, loading];
}