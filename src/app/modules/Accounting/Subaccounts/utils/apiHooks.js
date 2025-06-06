import {useState, useEffect, useCallback} from 'react';
import * as subaccountService from './service';


export const useOneSubaccount = (id, isMounted) => {
    const [subaccount, setSubaccount] = useState({});   
    const [completed, setCompleted] = useState(false);

    const getSubaccount =  useCallback(async () => {
        try {
            const subaccount = await subaccountService.getOneSubaccount(id)
            if(isMounted.current) {
                setSubaccount(subaccount)
            }
        } catch (error) {
            console.error(error);
        } finally{
            setCompleted(true)
        }
    }, [id, isMounted])

    useEffect(()=> {
        getSubaccount()
    }, [getSubaccount])
    
    return [subaccount, completed]
}