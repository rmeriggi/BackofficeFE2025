
import { useState, useEffect, useCallback } from 'react';
import * as comunicationsService from './service';
    
export const useAllComunications = (isMountedRef) => {
    const [allComunications, setAllComunications] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllComunications = useCallback(async () => {
        try {
            const comunications = await comunicationsService.getAllComunications()
            if (isMountedRef.current) {
                setAllComunications(comunications);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getAllComunications();
    }, [getAllComunications]);

    return [allComunications, completed];
}