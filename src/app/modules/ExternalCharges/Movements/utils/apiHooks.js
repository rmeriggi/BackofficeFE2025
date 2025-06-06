import { useState, useEffect, useCallback } from "react";
import * as externalChargesService from './service';

export const useMovements = (isMountedRef) => {
    const [movements, setMovements] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getMovements = useCallback(async () => {
        try {
            const movements = await externalChargesService.getListMovements()
            if (isMountedRef.current) {
                setMovements(movements);
            }   
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getMovements();
    }, [getMovements]);

    return [movements, completed];
}

export const useMovement = (id, isMountedRef) => {
    const [movement, setMovement] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getMovement = useCallback(async () => {
        try {
            const movement = await externalChargesService.getOneMovement(id)
            if (isMountedRef.current) {
                setMovement(movement);
            }   
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef, id]);

    useEffect(() => {
        getMovement();
    }, [getMovement]);

    return [movement, completed];
}

export const useStatus = (isMountedRef) => {
    const [status, setStatus] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getStatus = useCallback(async () => {
        try {
            const status = await externalChargesService.getListStatus()
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