import axios from "axios";

export const NOTIFICATIONS_URLS = {
  GET_NOTIFICATIONS:() => `${process.env.REACT_APP_API_URL}/notifications/all`,
  GET_NOTIFICATIONS_BY_ID:(id) => `${process.env.REACT_APP_API_URL}/notifications/by/${id}`,
  POST_NOTIFICATIONS_NEW:() => `${process.env.REACT_APP_API_URL}/notifications/new`,
  UPDATE_NOTIFICATIONS:() => `${process.env.REACT_APP_API_URL}/notifications/update`,
  POST_NOTIFICATIONS_STATUS:() => `${process.env.REACT_APP_API_URL}/notifications/status`,
}


export const getNotifications = async() => {
  const response = await axios.get(NOTIFICATIONS_URLS.GET_NOTIFICATIONS());
  return  response.data
}

export const getNotificationsById = async(id) => {
  const response = await axios.get(NOTIFICATIONS_URLS.GET_NOTIFICATIONS_BY_ID(id));
  return  response.data
}

export const updateNotification = async (notificationData) => {
  const response = await axios.post(
    NOTIFICATIONS_URLS.UPDATE_NOTIFICATIONS(),
    notificationData
  );
  return response.data;
};

export const createNotification = async (notificationData) => {

  const response = await axios.post(
    NOTIFICATIONS_URLS.POST_NOTIFICATIONS_NEW(),
    notificationData
  );
  return response.data;
};

export const statusNotifications = async () => {
  const response = await axios.get(
    NOTIFICATIONS_URLS.POST_NOTIFICATIONS_STATUS());
  return response.data;
};


