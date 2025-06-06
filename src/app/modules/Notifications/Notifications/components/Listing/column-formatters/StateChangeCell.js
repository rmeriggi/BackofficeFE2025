import React, { useState } from 'react'
import { CircularProgress } from "@material-ui/core";
import { useDispatch } from "react-redux";
import statusMocks from '../../../__mocks__/statusMocks';
import { getAllNotifications } from '../../../../../../_redux/notifications/notificationsActions';
import { updateNotification } from '../../../../../../_redux/notifications/notificationsCrud';

export function StateChangeCell({ status }) {
  console.log("Props", status)
  
  return(
    <div>
     {status}
    </div>
  )
}