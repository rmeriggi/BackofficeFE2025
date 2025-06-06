import { useState, useEffect, useCallback } from "react";
import * as typesService from './service';

export const useTypes = (isMountedRef) => {
    const [types, setTypes] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getTypes = useCallback(async () => {
        try {
            const types = await typesService.getListTypes()
            if (isMountedRef.current) {
                setTypes(types);
            }   
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getTypes();
    }, [getTypes]);

    return [types, completed];
}