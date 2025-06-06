import { useState, useEffect, useCallback } from 'react';
import * as distributorsService from './service';

    
export const useAllDistributors = (isMountedRef) => {
    const [allDistributors, setAllDistributors] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllDistributors = useCallback(async () => {
        try {
            const distributors = await distributorsService.getAllDistributors()
            if (isMountedRef.current) {
                setAllDistributors(distributors);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getAllDistributors();
    }, [getAllDistributors]);

    return [allDistributors, completed];
}