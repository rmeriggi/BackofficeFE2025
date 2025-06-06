/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { LayoutSplashScreen } from "../../../../../../../../../_metronic/layout";
import { withLayoutSplashScreen } from "../../../../../../../../HOCs/withLayoutSplashScreen";
import { useCallAPI } from "../../../../../../../../hooks";
import { getAllUsers } from "../../../../../../../../utils/service";
import { useActivityRegister, useContactsTypes } from "../../../../../../Collections/utils/apiHook";
import {ListingTable} from "./ListingTable";

const Listing = ({data}) => {

    const [activityRegisterData,contactTypes] = data

    const {activityRegister} = activityRegisterData
    const {contactsTypes} = contactTypes;
    const [usersData, setUsersData] = useState()

    useCallAPI(getAllUsers, setUsersData)
    
    if(!usersData) return <LayoutSplashScreen />

    const { users } = usersData;

    const activities = activityRegister?.map(activity => {
        const contactType = contactsTypes?.find(c => c.id == activity.contactType)?.contactType || "Sin datos"
        const manager = users?.find(u => u.id == activity.manager)?.name.trim() || "Sin datos"
        return {...activity, contactType, manager}
    })

    return (
        <ListingTable activitiesRegisters={activities}/>
    )
}

const hooks = [
    {
        hook: useActivityRegister,
        params: "id"
    },
    {
        hook: useContactsTypes,
    },
]

export default withLayoutSplashScreen(Listing, hooks)