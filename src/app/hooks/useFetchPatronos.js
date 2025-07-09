import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPatronos } from "../_redux/patronos/patronosActions";

export const useFetchPatronos = (search = "*") => {
  const { patronos, loading } = useSelector((s) => s.patronos);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!patronos || patronos.length === 0) {
      dispatch(getAllPatronos(search));
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [patronos, loading];
};
