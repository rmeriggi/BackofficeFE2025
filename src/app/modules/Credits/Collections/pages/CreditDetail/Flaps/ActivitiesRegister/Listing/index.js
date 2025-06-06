/* eslint-disable eqeqeq */
import React from "react";
import {ListingTable} from "./ListingTable";
import useIsMountedRef from  "../../../../../../../../hooks/useIsMountedRef";
import { useActivityRegister, useContactsTypes } from "../../../../../utils/apiHook";
import { LayoutSplashScreen } from '../../../../../../../../../_metronic/layout';
import { useState } from "react";
import { useCallAPI } from "../../../../../../../../hooks";
import { getAllUsers } from "../../../../../../../../utils/service";

export default function Listing({idClient}) {

    const isMounted = useIsMountedRef()
    const [activityRegisterData, activityRegisterCompleted] = useActivityRegister(isMounted, idClient)
    const [contactTypes, contactTypesCompleted] = useContactsTypes(isMounted)
    const [usersData, setUsers] = useState()
    useCallAPI(getAllUsers, setUsers)

    if(!(activityRegisterCompleted && contactTypesCompleted && usersData)) return <LayoutSplashScreen />

    const {activityRegister} = activityRegisterData
    const {contactsTypes} = contactTypes;
    const { users } = usersData;

    const activities = activityRegister?.map(activity => {
        const contactType = contactsTypes?.find(c => c.id == activity.contactType)?.contactType || "Sin datos"
        const manager = users?.find(u => u.id == activity.manager)?.name.trim() || "Sin datos"

        return {...activity, contactType, manager}
    })

    return (
        <ListingTable activitiesRegisters={activities} contactsTypes={contactsTypes}/>
    )
}