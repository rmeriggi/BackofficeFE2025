import { useState, useEffect, useCallback } from "react";
import * as cashService from './service';

export const useOperations = (isMountedRef, open) => {
    const [operations, setOperations] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getOperations = useCallback(async () => {
        try {
            const operations = await cashService.getOperations()
            if (isMountedRef.current) {
                setOperations(operations);
            }   
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMountedRef, open]);

    useEffect(() => {
        getOperations();
    }, [getOperations]);

    return [operations, completed];
}