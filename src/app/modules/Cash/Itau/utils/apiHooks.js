import { useState, useEffect, useCallback } from "react";
import * as itauService from './service';

export const useMovements = (isMountedRef, dates, setLoading) => {
    const [movements, setMovements] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getMovements = useCallback(async () => {
        try {
            const movements = await itauService.getListMovements(dates)
            if (isMountedRef.current) {
                setMovements(movements);
                setLoading(false)
            }   
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef, dates, setLoading]);

    useEffect(() => {
        getMovements();
    }, [getMovements]);

    return [movements, completed];
}