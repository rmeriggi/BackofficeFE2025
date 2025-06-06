import {createSlice} from "@reduxjs/toolkit";

export const actionTypes = {
  Loading : 'Loading',
};

const initialNotificationsState = {
  loading: false,
  notifications: undefined,
};

export const callTypes = {
  notifications: "notifications",
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: initialNotificationsState,
  reducers: {
    startCall: (state, action) => {
      state.loading = true
    },
    finishCall : (state, action) => {
      state.loading = false
    },
    // SAVE NOTIFICATIONS
    notificationsFetched: (state, action) => {
      const { notifications } = action.payload;
      state.notifications = notifications
    },
  }
});
