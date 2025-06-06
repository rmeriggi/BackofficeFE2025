import { useState, useEffect, useCallback } from 'react';
import * as balancesService from './service';
    
export const useAllBalances = (isMountedRef, values) => {
    const [allBalances, setAllBalances] = useState([]);
    const [completed, setCompleted] = useState(false);
    
    const getAllBalances = useCallback(async () => {
        try {
            const balances = await balancesService.getAllBalances(values)
            
            if (isMountedRef.current) {
                setAllBalances(balances);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef, values]);

    useEffect(() => {
        getAllBalances();
    }, [getAllBalances]);

    return [allBalances, completed];
}