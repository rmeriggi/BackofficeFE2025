/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react';
import * as clientService from './service';

export const useOneClient = (id, isMountedRef) => {
    const [oneClient, setOneClient] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getOneClient = useCallback(async () => {
        try {
            const client = await clientService.getOne(id)
            if (isMountedRef.current) {
                setOneClient(client);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [id, isMountedRef]);

    useEffect(() => {
        getOneClient();
    }, [getOneClient]);

    return [oneClient, completed];
}

export const useOneCreditForReceipt = (id, isMountedRef) => {
    const [oneCreditForReceipt, setOneCreditForReceipt] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getOneCreditForReceipt = useCallback(async () => {
        
        if(!id){
            return
        }

        try {
            const client = await clientService.getOneCreditForReceipt(id)
            if (isMountedRef.current) {
                setOneCreditForReceipt(client);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [id, isMountedRef]);

    useEffect(() => {
        getOneCreditForReceipt();
    }, [getOneCreditForReceipt]);

    return [oneCreditForReceipt, completed];
}

export const useUrlImages = (isMountedRef) => {
    const [urlImages, setUrlImages] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getUrlImages = useCallback(async () => {
        try {
            const url = await clientService.getUrlImages()
            if (isMountedRef.current) {
                setUrlImages(url);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getUrlImages();
    }, [getUrlImages]);

    return [urlImages, completed];
}

export const useDocumentsClient = (isMountedRef, id, open) => {
    const [documentsClient, setDocumentsClient] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getDocumentsClient = useCallback(async () => {
        try {
            const url = await clientService.getDocumentsClient(id)
            if (isMountedRef.current) {
                setDocumentsClient(url);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef, id, open]);

    useEffect(() => {
        getDocumentsClient();
    }, [getDocumentsClient]);

    return [documentsClient, completed];
}