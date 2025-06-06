import { useState, useEffect, useCallback } from "react";
import * as accoutingGroupsService from './service';

export const useAccountingGroup = (id, isMountedRef) => {
    const [group, setGroup] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getGroup = useCallback(async () => {
        try {
            if(id !== undefined || typeof id !== "undefined"){
                const group = await accoutingGroupsService.getOneAccoutingGroup(id)
                if (isMountedRef.current) {
                    setGroup(group);
                }   
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [id, isMountedRef]);

    useEffect(() => {
        getGroup();
    }, [getGroup]);

    return [group, completed];
}