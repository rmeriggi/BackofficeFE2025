import { useState, useEffect, useCallback } from 'react';
import * as managementUsersService from './service';

export const useOneUser = (isMountedRef,id) => {
    const [oneUser, setOneUser] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getOneUser = useCallback(async () => {
        try {
            const user = await managementUsersService.getOneUser(id)
            if (isMountedRef.current) {
              setOneUser(user);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef, id]);

    useEffect(() => {
      getOneUser();
    }, [getOneUser]);

    return [oneUser, completed];
}

export const useAllAccess = (isMountedRef, id, open) => {
    const [allAccess, setAllAccess] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllAccess = useCallback(async () => {
        try {
            const access = await managementUsersService.getAllAccess(id)
            if (isMountedRef.current) {
              setAllAccess(access);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMountedRef, id, open]);

    useEffect(() => {
      getAllAccess();
    }, [getAllAccess]);

    return [allAccess, completed];
}

export const useModules = (isMountedRef, id) => {
    const [allModules, setAllModules] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllModules = useCallback(async () => {
        try {
            const modules = await managementUsersService.getModules(id)
            if (isMountedRef.current) {
              setAllModules(modules);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef, id]);

    useEffect(() => {
      getAllModules();
    }, [getAllModules]);

    return [allModules, completed];
}