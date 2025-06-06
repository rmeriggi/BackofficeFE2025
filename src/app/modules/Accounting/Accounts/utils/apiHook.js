/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react';
import * as accountsService from './service';

export const useAccount = (id, isMountedRef) => {
    const [account, setAccount] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAccount = useCallback(async () => {
        try {
            if(id !== undefined || typeof id !== "undefined"){
                const account = await accountsService.getOne(id)
                if (isMountedRef.current) {
                    setAccount(account);
                }   
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [id, isMountedRef]);

    useEffect(() => {
        getAccount();
    }, [getAccount]);

    return [account, completed];
}
