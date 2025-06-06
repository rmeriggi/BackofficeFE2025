import { useState, useEffect, useCallback } from 'react';
import * as scoreParamsService from './service';
    
export const useAllScoreParams = (isMountedRef) => {
    const [allScoreParams, setAllScoreParams] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllScoreParams = useCallback(async () => {
        try {
            const scoreParams = await scoreParamsService.getScoreParams()
            if (isMountedRef.current) {
              setAllScoreParams(scoreParams);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
      getAllScoreParams();
    }, [getAllScoreParams]);

    return [allScoreParams, completed];
}