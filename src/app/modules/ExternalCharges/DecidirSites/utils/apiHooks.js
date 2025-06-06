/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import * as siteService from './service';
import { useListingTableContext } from '../pages/Listing/ListingTableContext'

export const useSites = (isMountedRef) => {
    const {sitesContext, setSiteContext} = useListingTableContext()
    const [completed, setCompleted] = useState(false)

    const getSites = useCallback(async () => {
        try {
            const sites = await siteService.getListSites()
            if (isMountedRef.current) {
                setSiteContext(sites);
            }   
        } catch (err) {
            if(isMountedRef.current){
                setSiteContext([]);
                console.error(err.message)
            }
        }finally {
            setCompleted(true)
        }
    }, [isMountedRef]);

    useEffect(() => {
        getSites();
    }, [getSites]);

    return [sitesContext, completed];
}