import { useState, useEffect, useCallback } from 'react';
import * as auxAccountService from './service';

export const useGetOneAuxAccount = (isMounted, id) => {
    const [auxAccount, setAuxAccount] = useState({})
    const [completed, setCompleted] = useState(false);

    const getAuxAccount = useCallback(async()=> {
        if(!id){
            return
        }
        try {
            const auxAccount = await auxAccountService.getOneAuxAccount(id)
            if(isMounted.current) {
                setAuxAccount(auxAccount) 
            }
        } catch (error) {
            console.error(error)
        } finally {
            setCompleted(true)
        }
    }, [id, isMounted])
    
    useEffect(()=> {
        getAuxAccount()
    }, [getAuxAccount])

    return [auxAccount, completed]
}