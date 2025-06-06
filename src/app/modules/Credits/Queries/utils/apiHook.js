import { useState, useEffect, useCallback } from 'react';
import * as collectionsService from './service';
    
export const useAllCollections = (isMountedRef) => {
    const [allCollections, setAllCollections] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllCollections = useCallback(async () => {
        try {
            const products = await collectionsService.getAll()
            if (isMountedRef.current) {
                setAllCollections(products);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getAllCollections();
    }, [getAllCollections]);

    return [allCollections, completed];
}

export const useCollection = (id, isMountedRef) => {
    const [collection, setCollection] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getCollection = useCallback(async () => {
        try {
            const collection = await collectionsService.get(id)
            if (isMountedRef.current) {
                setCollection(collection);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [id, isMountedRef]);

    useEffect(() => {
        getCollection();
    }, [getCollection]);

    return [collection, completed];
}

export const useAllCurrencies = (isMountedRef) => {
    const [allCurrencies, setAllCurrencies] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllCurrencies = useCallback(async () => {
        try {
            const currencies = await collectionsService.getAllCurrencies()
            if (isMountedRef.current) {
                setAllCurrencies(currencies);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getAllCurrencies();
    }, [getAllCurrencies]);

    return [allCurrencies, completed];
}

export const useAllCountries = (isMountedRef) => {
    const [allCountries, setAllCountries] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllCountries = useCallback(async () => {
        try {
            const countries = await collectionsService.getAllCountries()
            if (isMountedRef.current) {
                setAllCountries(countries);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getAllCountries();
    }, [getAllCountries]);

    return [allCountries, completed];
}

export const useAllEntities = (isMountedRef) => {
    const [allEntities, setAllEntities] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllEntities = useCallback(async () => {
        try {
            const entities = await collectionsService.getAllEntities()
            if (isMountedRef.current) {
                setAllEntities(entities);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getAllEntities();
    }, [getAllEntities]);

    return [allEntities, completed];
}
