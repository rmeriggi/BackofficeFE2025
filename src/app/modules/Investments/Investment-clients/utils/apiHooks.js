import { useState, useEffect, useCallback } from 'react';
import * as investmentClientService from './service';
    
export const useAllInvestmentClients = (isMountedRef) => {
    const [allClients, setAllClients] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllClients = useCallback(async () => {
        try {
            const clients = await investmentClientService.getAll()
            if (isMountedRef.current) {
                setAllClients(clients);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getAllClients();
    }, [getAllClients]);

    return [allClients, completed];
}