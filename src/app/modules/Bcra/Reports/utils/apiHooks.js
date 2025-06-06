import { useState, useEffect, useCallback } from 'react';
import * as reportsService from './service';
    
export const useAllReports = (isMountedRef) => {
    const [allReports, setAllReports] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllReports = useCallback(async () => {
        try {
            const reports = await reportsService.getAllReports()
            if (isMountedRef.current) {
                setAllReports(reports);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getAllReports();
    }, [getAllReports]);

    return [allReports, completed];
}