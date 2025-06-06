import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useFetchCombos = (state, action) => {
    
  const reduxState = useSelector(
      (s) => (s.combos[state])
  );

  const dispatch = useDispatch()

  useEffect(() => {
      if(!reduxState || reduxState.length === 0){
          dispatch(action())
      }else{
          return
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [reduxState];
}