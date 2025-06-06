import { useState, useEffect, useCallback } from 'react';
import * as collectionsService from './service';
    
export const useAllCollections = (isMountedRef, id) => {
    const [allCollections, setAllCollections] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllCollections = useCallback(async () => {
        try {
            const products = await collectionsService.getAll(id)
            if (isMountedRef.current) {
                setAllCollections(products);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef, id]);

    useEffect(() => {
        getAllCollections();
    }, [getAllCollections]);

    return [allCollections, completed];
}

export const useQuotasList = (isMountedRef,id) => {
    const [allQuotas, setAllQuotas] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllQuotas = useCallback(async () => {
        try {
            const quotas = await collectionsService.getQuotasList(id)
            if (isMountedRef.current) {
                setAllQuotas(quotas);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef,id]);

    useEffect(() => {
        getAllQuotas();
    }, [getAllQuotas]);

    return [allQuotas, completed];
}

export const useContactsTypes = (isMountedRef) => {
    const [contactsTypes, setContactsTypes] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getContactsTypes = useCallback(async () => {
        try {
            const contactsTypes = await collectionsService.getContactsTypes()
            if (isMountedRef.current) {
                setContactsTypes(contactsTypes);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getContactsTypes();
    }, [getContactsTypes]);

    return [contactsTypes, completed];
}



export const useChannels = (isMountedRef) => {
    const [channels, setchannels] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getchannels = useCallback(async () => {
        try {
            const channels = await collectionsService.getAllChannels()
            if (isMountedRef.current) {
                setchannels(channels);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getchannels();
    }, [getchannels]);

    return [channels, completed];
}


export const useOneCredit = (isMountedRef, id) => {
    const [oneCredit, setOneCredit] = useState({});
    const [completed, setCompleted] = useState(false);

    const getOneCredit = useCallback(async () => {
        try {
            const quotas = await collectionsService.getOneCredit(id)
            if (isMountedRef.current) {
                setOneCredit(quotas);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef,id]);

    useEffect(() => {
        getOneCredit();
    }, [getOneCredit]);

    return [oneCredit, completed];
}

export const useActivityRegister = (isMountedRef, id) => {
    const [activityRegister, setActivityRegister] = useState({});
    const [completed, setCompleted] = useState(false);

    const getActivityRegister = useCallback(async () => {
        try {
            const activityRegister = await collectionsService.getActivitiesRegister(id)
            if (isMountedRef.current) {
                setActivityRegister(activityRegister);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef,id]);

    useEffect(() => {
        getActivityRegister();
    }, [getActivityRegister]);

    return [activityRegister, completed];
}

export const useDetailActivityRegister = (isMountedRef, id) => {
    const [detailActivityRegister, setDetailActivityRegister] = useState({});
    const [completed, setCompleted] = useState(false);

    const getDetailActivityRegister = useCallback(async () => {
        try {
            if(id){
               const detailActivityRegister = await collectionsService.getDetailActivitiesRegister(id)
                if (isMountedRef.current) {
                    setDetailActivityRegister(detailActivityRegister);
                }  
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef,id]);

    useEffect(() => {
        getDetailActivityRegister();
    }, [getDetailActivityRegister]);

    return [detailActivityRegister, completed];
}

export const useManagmentStatus = (isMountedRef, id) => {
    const [managmentStatus, setManagmentStatus] = useState({});
    const [completed, setCompleted] = useState(false);

    const getManagmentStatus = useCallback(async () => {
        try {
            const managmentStatus = await collectionsService.getManagmentStatus(id)
            if (isMountedRef.current) {
                setManagmentStatus(managmentStatus);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef,id]);

    useEffect(() => {
        getManagmentStatus();
    }, [getManagmentStatus]);

    return [managmentStatus, completed];
}