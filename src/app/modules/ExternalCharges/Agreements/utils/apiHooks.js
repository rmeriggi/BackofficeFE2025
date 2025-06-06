import { useState, useEffect, useCallback } from "react";
import * as paymentLinkservice from './service';

export const usePaymentLinks = (isMountedRef) => {
    const [paymentLinks, setPaymentLinks] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getPaymentLinks = useCallback(async () => {
        try {
            const paymentLinks = await paymentLinkservice.getPaymentLinks()
            if (isMountedRef.current) {
                setPaymentLinks(paymentLinks);
            }   
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    }, [isMountedRef]);

    useEffect(() => {
        getPaymentLinks();
    }, [getPaymentLinks]);

    return [paymentLinks, completed];
}