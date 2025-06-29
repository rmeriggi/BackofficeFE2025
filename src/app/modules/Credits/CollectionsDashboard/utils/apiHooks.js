import { useState, useEffect, useCallback } from 'react';
import * as dashboardService from './service';
    
export const useStatistics = (isMountedRef, values) => {
    const [allStatistics, setAllStatistics] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllStatistics = useCallback(async () => {
        try {
            const statistics = await dashboardService.getDashboardInfo(values)
            if (isMountedRef.current) {
                setAllStatistics(statistics);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef, values]);

    useEffect(() => {
        getAllStatistics();
    }, [getAllStatistics]);

    return [allStatistics, completed];
}

