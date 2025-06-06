import { useState, useEffect, useCallback } from 'react';
import * as creditsService from './service';
    
export const useAllCredits = (isMountedRef) => {
    const [allCredits, setAllCredits] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllCredits = useCallback(async () => {
        try {
            const products = await creditsService.getAll()
            if (isMountedRef.current) {
                setAllCredits(products);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getAllCredits();
    }, [getAllCredits]);

    return [allCredits, completed];
}

export const useCredit = (id, isMountedRef) => {
    const [credit, setCredit] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getCredit = useCallback(async () => {
        try {
            const credit = await creditsService.get(id)
            if (isMountedRef.current) {
                setCredit(credit);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [id, isMountedRef]);

    useEffect(() => {
        getCredit();
    }, [getCredit]);

    return [credit, completed];
}

export const useAllCurrencies = (isMountedRef) => {
    const [allCurrencies, setAllCurrencies] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllCurrencies = useCallback(async () => {
        try {
            const currencies = await creditsService.getAllCurrencies()
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
            const countries = await creditsService.getAllCountries()
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
            const entities = await creditsService.getAllEntities()
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
