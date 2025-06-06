/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import * as documentsService from './service';

export const useDocuments = (isMountedRef, open) => {
    const [documents, setDocuments] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getDocuments = useCallback(async () => {
        try {
            const documents = await documentsService.getAllDocuments()
            if (isMountedRef.current) {
                setDocuments(documents);
            }   
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef, open]);

    useEffect(() => {
        getDocuments();
    }, [getDocuments]);

    return [documents, completed];
}

export const useDocumentsStatus = (isMountedRef) => {
    const [documentsStatus, setDocumentsStatus] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getDocumentsStatus = useCallback(async () => {
        try {
            const documentsStatus = await documentsService.getAllDocumentsStatus()
            if (isMountedRef.current) {
                setDocumentsStatus(documentsStatus);
            }   
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getDocumentsStatus();
    }, [getDocumentsStatus]);

    return [documentsStatus, completed];
}