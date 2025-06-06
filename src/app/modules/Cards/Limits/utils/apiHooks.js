import { useState, useEffect, useCallback } from 'react';
import * as productsService from './service';

    
export const useAllProducts = (isMountedRef) => {
    const [allProducts, setAllProducts] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllProducts = useCallback(async () => {
        try {
            const products = await productsService.getAllProducts()
            if (isMountedRef.current) {
                setAllProducts(products);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getAllProducts();
    }, [getAllProducts]);

    return [allProducts, completed];
}