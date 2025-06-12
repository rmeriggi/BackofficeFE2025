import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotifications } from "../_redux/notifications/notificationsActions";

export const useFetchNotifications = () => {
  const { notifications, loading, error } = useSelector(
    (state) => state.notifications
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!notifications || notifications.length === 0) {
      dispatch(getAllNotifications());
    }
  }, [dispatch, notifications]);

  return [notifications, loading, error];
};
