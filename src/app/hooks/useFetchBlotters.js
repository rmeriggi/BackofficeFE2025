import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlotters } from "../_redux/blotter/blottersActions";

export const useFetchBlotters = () => {
  
  const menu = useSelector(state => state);
  const { blotters, loading } = useSelector(
      (s) => (s.blotters)
  );

  const dispatch = useDispatch()

  useEffect(() => {
          dispatch(getAllBlotters(true, false, false))      
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [blotters, loading];
}