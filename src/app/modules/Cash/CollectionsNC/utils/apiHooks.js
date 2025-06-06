import { useState, useEffect, useCallback } from "react";
import * as collectionsServices from './service';

export const useCollections = (isMountedRef, showModal) => {
    const [collections, setCollections] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getCollections = useCallback(async () => {
        try {
            const collections = await collectionsServices.getCollections()
            if (isMountedRef.current) {
                setCollections(collections);
            }   
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMountedRef, showModal]);

    useEffect(() => {
        getCollections();
    }, [getCollections]);

    return [collections, completed];
}