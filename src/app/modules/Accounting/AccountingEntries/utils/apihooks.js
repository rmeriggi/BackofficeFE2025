/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useCallback} from 'react';
import * as entriesServices from './service';

export const useOneEntryDetail = (isMounted, id, open) => {
    const [entryDetail, setEntryDetail] = useState();
    const [completed, setCompleted] = useState();

    const getOneEntry = useCallback(async()=> {
        try {
            if(isMounted.current && open) {
                const entry = await entriesServices.getOneEntryDetail(id);
                setEntryDetail(entry);
            }
        } catch (error) {
            console.error(error)
        } finally {
            setCompleted(true)
        }
    }, [id, isMounted, open])

    useEffect(()=> {
        getOneEntry()
    }, [getOneEntry])

    return [entryDetail, completed]
}