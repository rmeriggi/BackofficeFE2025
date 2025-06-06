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

export const useAllQuotaStatus = (isMountedRef) => {
    const [quotaStatus, setAllQuotaStatus] = useState([]);
    const [completed, setCompleted] = useState(false);
  
    const getAllQuotaStatus = useCallback(async () => {
        try {
            const quotaStatus = await walletServices.getAllQuotaStatus()
            if (isMountedRef.current) {
                setAllQuotaStatus(quotaStatus);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);
  
    useEffect(() => {
        getAllQuotaStatus();
    }, [getAllQuotaStatus]);
  
    return [quotaStatus, completed];
}