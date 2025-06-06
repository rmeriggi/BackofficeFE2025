import { useState, useEffect, useCallback } from 'react';
import * as productsService from './service';

    
export const useAllProviders = (isMountedRef) => {
    const [allProviders, setAllProviders] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllProviders = useCallback(async () => {
        try {
            const providers = await productsService.getAllProviders()
            if (isMountedRef.current) {
                setAllProviders(providers);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getAllProviders();
    }, [getAllProviders]);

    return [allProviders, completed];
}