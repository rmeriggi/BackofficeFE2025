import { useState, useEffect, useCallback } from "react";
import * as distributorService from './service';

export const useDistributors = (isMountedRef) => {
    const [distributors, setDistributors] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getDistributors = useCallback(async () => {
        try {
            const distributors = await distributorService.getDistributors()
            if (isMountedRef.current) {
                setDistributors(distributors);
            }   
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getDistributors();
    }, [getDistributors]);

    return [distributors, completed];
}