import { useState, useEffect, useCallback } from 'react';
import * as creditsService from './service';

export const useCredit = (id, isMountedRef) => {
    const [credit, setCredit] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getCredit = useCallback(async () => {
        try {
            const credit = await creditsService.get(id)
            if (isMountedRef.current) {
                setCredit(credit);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [id, isMountedRef]);

    useEffect(() => {
        getCredit();
    }, [getCredit]);

    return [credit, completed];
}

export const useStatusCredits = (isMountedRef) => {
    const [status, setStatus] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getStatus = useCallback(async () => {
        try {
            const credit = await creditsService.getStatusCredits()
            if (isMountedRef.current) {
                setStatus(credit);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getStatus();
    }, [getStatus]);

    return [status, completed];
}