import { useState, useEffect, useCallback } from 'react';
import * as archivesService from './service';
    
export const useAllArchives = (isMountedRef) => {
    const [allArchives, setAllArchives] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllArchives = useCallback(async () => {
        try {
            const archives = await archivesService.getAllArchives()
            if (isMountedRef.current) {
                setAllArchives(archives);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getAllArchives();
    }, [getAllArchives]);

    return [allArchives, completed];
}