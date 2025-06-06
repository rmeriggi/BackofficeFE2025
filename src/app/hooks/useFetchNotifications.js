import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotifications } from "../_redux/notifications/notificationsActions";

export const useFetchNotifications = () => {
    
  const { notifications, loading } = useSelector(
      (s) => (s.notifications)
  );
  
  const dispatch = useDispatch()

  useEffect(() => {
      if(!notifications || notifications.length === 0){
          dispatch(getAllNotifications())
      }else{
          return
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [notifications, loading];
}