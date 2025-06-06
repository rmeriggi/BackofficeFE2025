import { useState, useEffect, useCallback } from 'react';
import * as walletServices from './service';

export const useAssignWallet = (isMountedRef) => {
    const [assignWallet, setAssignWallet] = useState({});
    const [completed, setCompleted] = useState(false);
  
    const getAssignWallet = useCallback(async () => {
        try {
            const assignWallet = await walletServices.getAssignWalletData()
            if (isMountedRef.current) {
                setAssignWallet(assignWallet);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);
  
    useEffect(() => {
        getAssignWallet();
    }, [getAssignWallet]);
  
    return [assignWallet, completed];
}


export const useAllProducts = (isMountedRef) => {
    const [products, setAllProducts] = useState([]);
    const [completed, setCompleted] = useState(false);
  
    const getAllProducts = useCallback(async () => {
        try {
            const products = await walletServices.getAllProducts()
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
  
    return [products, completed];
}
export const useAllCreditStatuses = (isMountedRef) => {
    const [creditStatuses, setAllCreditStatuses] = useState([]);
    const [completed, setCompleted] = useState(false);
  
    const getAllCreditStatuses = useCallback(async () => {
        try {
            const creditStatuses = await walletServices.getAllCreditStatuses()
            if (isMountedRef.current) {
                setAllCreditStatuses(creditStatuses);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);
  
    useEffect(() => {
        getAllCreditStatuses();
    }, [getAllCreditStatuses]);
  
    return [creditStatuses, completed];
}
export const useAllManagers = (isMountedRef) => {
    const [managers, setAllManagers] = useState([]);
    const [completed, setCompleted] = useState(false);
  
    const getAllManagers = useCallback(async () => {
        try {
            const managers = await walletServices.getAllManagers()
            if (isMountedRef.current) {
                setAllManagers(managers);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);
  
    useEffect(() => {
        getAllManagers();
    }, [getAllManagers]);
  
    return [managers, completed];
}