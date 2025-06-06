import { useState, useEffect, useCallback } from "react";
import * as statusService from './service';

export const useStatus = (isMountedRef) => {
    const [status, setStatus] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getStatus = useCallback(async () => {
        try {
            const status = await statusService.getListStatus()
            if (isMountedRef.current) {
                setStatus(status);
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