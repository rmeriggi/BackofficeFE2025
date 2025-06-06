import { useState, useEffect, useCallback } from 'react';
import * as scoreSourceService from './service';
    
export const useAllScoreSource = (isMountedRef) => {
    const [allScoreSource, setAllScoreSource] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllScoreSource = useCallback(async () => {
        try {
            const scoreSource = await scoreSourceService.getScoreSource()
            if (isMountedRef.current) {
              setAllScoreSource(scoreSource);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
      getAllScoreSource();
    }, [getAllScoreSource]);

    return [allScoreSource, completed];
}