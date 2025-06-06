import { useState, useEffect, useCallback } from 'react';
import * as taxesService from './service';
    
export const useAllTaxes = (isMountedRef) => {
    const [allTaxes, setAllTaxes] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllTaxes = useCallback(async () => {
        try {
            const taxes = await taxesService.getAllTaxes()
            if (isMountedRef.current) {
              setAllTaxes(taxes);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
      getAllTaxes();
    }, [getAllTaxes]);

    return [allTaxes, completed];
}
    
export const useOneTax = (isMountedRef, id) => {
    const [oneTax, setOneTax] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getOneTax = useCallback(async () => {
        try {
            const taxe = await taxesService.getOneTax(id)
            if (isMountedRef.current) {
                setOneTax(taxe);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef, id]);

    useEffect(() => {
        getOneTax();
    }, [getOneTax]);

    return [oneTax, completed];
}

export const useAllExceptions= (id, isMountedRef) => {
    const [allExceptions, setAllException] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllException= useCallback(async () => {
        try {
            const setAllExceptions = await taxesService.getExceptions(id)
            if (isMountedRef.current) {
                setAllException(setAllExceptions);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [id,isMountedRef]);

    useEffect(() => {
        getAllException();
    }, [getAllException]);

    return [allExceptions, completed];
}

export const useAllWhere = (isMountedRef, id) => {
    const [allWhere, setAllWhere] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllWhere = useCallback(async () => {
        try {
            const where = await taxesService.getWhere(id)
            if (isMountedRef.current) {
                setAllWhere(where);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef, id]);

    useEffect(() => {
        getAllWhere();
    }, [getAllWhere]);

    return [allWhere, completed];
}

export const useAllWho= (isMountedRef, id) => {
    const [allWho, setAllWho] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllWho = useCallback(async () => {
        try {
            const who = await taxesService.getWho(id)
            if (isMountedRef.current) {
                setAllWho(who);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef, id]);

    useEffect(() => {
        getAllWho();
    }, [getAllWho]);

    return [allWho, completed];
}

export const useExceptionClients= (isMountedRef) => {
    const [exceptionClients, setExceptionClients] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getExceptionClients = useCallback(async () => {
        try {
            const exceptionClients = await taxesService.getTaxExceptionClient()
            if (isMountedRef.current) {
                setExceptionClients(exceptionClients);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getExceptionClients();
    }, [getExceptionClients]);

    return [exceptionClients, completed];
}

export const useTaxWhoClient= (isMountedRef) => {
    const [allTaxClient, setAllTaxClient] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllTaxClient = useCallback(async () => {
        try {
            const taxClient = await taxesService.getTaxWhoClient()
            if (isMountedRef.current) {
                setAllTaxClient(taxClient);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getAllTaxClient();
    }, [getAllTaxClient]);

    return [allTaxClient, completed];
}

export const useOriginDestiny= (isMountedRef) => {
    const [originDestiny, setOriginDestiny] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getOriginDestiny = useCallback(async () => {
        try {
            const originDestiny = await taxesService.getOriginDestiny()
            if (isMountedRef.current) {
                setOriginDestiny(originDestiny);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getOriginDestiny();
    }, [getOriginDestiny]);

    return [originDestiny, completed];
}
