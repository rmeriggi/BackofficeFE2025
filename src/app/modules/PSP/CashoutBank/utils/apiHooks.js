import { useState, useEffect, useCallback } from "react";
import * as cashoutTransactionsService from './service';

export const useCashoutTransactions = (isMountedRef, open) => {
    const [cashoutTransactions, setCashoutTransactions] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getCashoutTransactions = useCallback(async () => {
        try {
            const cashoutTransactions = await cashoutTransactionsService.getCashoutTransactions()
            if (isMountedRef.current) {
                setCashoutTransactions(cashoutTransactions);
            }   
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMountedRef, open]);

    useEffect(() => {
        getCashoutTransactions();
    }, [getCashoutTransactions]);

    return [cashoutTransactions, completed];
}

export const useCashoutTransactionsConsult = (id ,isMountedRef) => {
    const [cashoutTransactionsConsult, setCashoutTransactionsConsult] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getCashoutTransactionsConsult = useCallback(async () => {
        try {
            if(!id){
                return
            }
            const cashoutTransactionsConsult = await cashoutTransactionsService.getCashoutTransactionsConsult(id)
            if (isMountedRef.current) {
                setCashoutTransactionsConsult(cashoutTransactionsConsult);
            }   
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMountedRef , id]);

    useEffect(() => {
        getCashoutTransactionsConsult();
    }, [getCashoutTransactionsConsult]);

    return [cashoutTransactionsConsult, completed];
}