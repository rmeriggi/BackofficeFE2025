import * as requestFromServer from "./notificationsCrud";
import {notificationsSlice} from "./notificationsSlice";

const {actions} = notificationsSlice;

export const getAllNotifications = () => dispatch => {

  dispatch(actions.startCall());
  return requestFromServer
    .getNotifications()
    .then(response => {
      const  notifications  = response;
      dispatch(actions.notificationsFetched( {notifications: notifications} ));
      dispatch(actions.finishCall());
    })
    .catch(error => {
      console.error(error.message);
      dispatch(actions.notificationsFetched([]));
      dispatch(actions.finishCall());
    });
}
