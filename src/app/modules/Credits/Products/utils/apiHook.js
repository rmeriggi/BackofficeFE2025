/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react';
import * as productsService from './service';
    
export const useAllProducts = (isMountedRef, values) => {
    const [allProducts, setAllProducts] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllProducts = useCallback(async () => {
        try {
            const products = await productsService.getAllProducts(values)
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

export const useProduct = (id, isMountedRef) => {
    const [product, setProduct] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getProduct = useCallback(async () => {
        try {
            if(id !== undefined || typeof id !== "undefined"){
                const product = await productsService.getOne(id)
                if (isMountedRef.current) {
                    setProduct(product);
                }   
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [id, isMountedRef]);

    useEffect(() => {
        getProduct();
    }, [getProduct]);

    return [product, completed];
}

export const useAllScoring = (isMountedRef,open, id) => {
    const [allScoring, setAllScoring] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllScoring = useCallback(async () => {
        try {
            const scoring = await productsService.getAllScoring(id)
            if (isMountedRef.current) {
                setAllScoring(scoring);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef, open]);

    useEffect(() => {
        getAllScoring();
    }, [getAllScoring]);

    return [allScoring, completed];
}

export const useAllPrograms = (isMountedRef, id, open) => {
    const [allPrograms, setAllPrograms] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllPrograms = useCallback(async () => {
        try {
            const programs = await productsService.getAllPrograms(id)
            if (isMountedRef.current) {
                setAllPrograms(programs);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef, id, open]);

    useEffect(() => {
        getAllPrograms();
    }, [getAllPrograms]);

    return [allPrograms, completed];
}

export const useComboPrograms = (isMountedRef) => {
    const [comboPrograms, setComboPrograms] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllComboPrograms = useCallback(async () => {
        try {
            const programs = await productsService.getComboPrograms()
            if (isMountedRef.current) {
                setComboPrograms(programs);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getAllComboPrograms();
    }, [getAllComboPrograms]);

    return [comboPrograms, completed];
}

export const useFrecuencies = (isMountedRef) => {
    const [frecuencies, setFrecuencies] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllFrecuencies = useCallback(async () => {
        try {
            const frecuencies = await productsService.getFrecuencies()
            if (isMountedRef.current) {
                setFrecuencies(frecuencies);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getAllFrecuencies();
    }, [getAllFrecuencies]);

    return [frecuencies, completed];
}

export const useQuotaSystem = (isMountedRef) => {
    const [quotaSystems, setQuotaSystems] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllQuotaSystems = useCallback(async () => {
        try {
            const quotaSystems = await productsService.getComboQuotaSystem()
            if (isMountedRef.current) {
                setQuotaSystems(quotaSystems);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getAllQuotaSystems();
    }, [getAllQuotaSystems]);

    return [quotaSystems, completed];
}

export const useEarningsData = (isMountedRef) => {
    const [earningsData, setEarningsData] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllEarningsData = useCallback(async () => {
        try {
            const earningsData = await productsService.getEarningsData()
            if (isMountedRef.current) {
                setEarningsData(earningsData);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getAllEarningsData();
    }, [getAllEarningsData]);

    return [earningsData, completed];
}

export const useQuotaCalculate = (isMountedRef) => {
    const [quotaCalculate, setQuotaCalculate] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllQuotaCalculate = useCallback(async () => {
        try {
            const quotaCalculate = await productsService.getComboQuotaCalculate()
            if (isMountedRef.current) {
                setQuotaCalculate(quotaCalculate);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getAllQuotaCalculate();
    }, [getAllQuotaCalculate]);

    return [quotaCalculate, completed];
}

export const useCreditDestiny = (isMountedRef) => {
    const [creditDestiny, setCreditDestiny] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllCreditDestiny = useCallback(async () => {
        try {
            const creditDestiny = await productsService.getComboCreditDestiny()
            if (isMountedRef.current) {
                setCreditDestiny(creditDestiny);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getAllCreditDestiny();
    }, [getAllCreditDestiny]);

    return [creditDestiny, completed];
}

export const useScoreSource = (isMountedRef) => {
    const [scoreSource, setScoreSource] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllScoreSource = useCallback(async () => {
        try {
            const scoreSource = await productsService.getScoreSource()
            if (isMountedRef.current) {
                setScoreSource(scoreSource);
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

    return [scoreSource, completed];
}