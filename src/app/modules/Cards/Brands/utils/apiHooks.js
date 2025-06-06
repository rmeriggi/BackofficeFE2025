import { useState, useEffect, useCallback } from "react";
import * as brandsService from './service';

export const useBrands = (isMountedRef) => {
    const [brands, setBrands] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getBrands = useCallback(async () => {
        try {
            const brands = await brandsService.getListBrands()
            if (isMountedRef.current) {
                setBrands(brands);
            }   
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getBrands();
    }, [getBrands]);

    return [brands, completed];
}