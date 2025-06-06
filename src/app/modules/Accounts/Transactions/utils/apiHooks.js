import { useState, useEffect, useCallback } from 'react';
import * as transactionsService from './service';
    
export const useTransactions = (isMountedRef) => {
    const [allTransactions, setAllTransactions] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllTransactions = useCallback(async () => {
        try {
            const transactions = await transactionsService.getAlLTransactions()
            if (isMountedRef.current) {
                setAllTransactions(transactions);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getAllTransactions();
    }, [getAllTransactions]);

    return [allTransactions, completed];
}

export const useOneTransaction = (isMountedRef, id) => {
    const [oneTransaction, setOneTransaction] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getOneTransaction = useCallback(async () => {
        try {
            const transaction = await transactionsService.getOneTransaction(id)
            if (isMountedRef.current) {
                setOneTransaction(transaction);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef, id]);

    useEffect(() => {
        getOneTransaction();
    }, [getOneTransaction]);

    return [oneTransaction, completed];
}