/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import * as seatingTeampleatesService from './service';

export const useAllSeatingTemplates = (isMounted) => {
    const [seatingTemplates, setSeatingTemplates] = useState();
    const [completed, setCompleted] = useState(false);

    const getAllSeatingTeampleates = useCallback(async()=>{
        try {
            if(isMounted.current) {
                const seatingTeampleates = await seatingTeampleatesService.getAllSeatingTeampleates()
                setSeatingTemplates(seatingTeampleates)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setCompleted(true)
        }
    }, [isMounted])

    useEffect(()=> {
        getAllSeatingTeampleates()
    }, [getAllSeatingTeampleates])

    return [seatingTemplates, completed]
}

export const useOneHeader = (id, isMounted) => {
    const [header, setHeader] = useState();
    const [completed, setCompleted] = useState(false);

    const getHeader = useCallback(async()=> {
        try {
            if(isMounted.current) {
                const header = await seatingTeampleatesService.getOneHeader(id);
                setHeader(header)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setCompleted(true)
        }
    }, [id, isMounted])

    useEffect(()=> {
        getHeader()
    }, [getHeader])

    return [header, completed]
}

export const useOneDetail = (id, isMounted, open, setLoading, showCreate) => {
    const [detail, setDetail] = useState();
    const [completed, setCompleted] = useState();
    
    const getDetail = useCallback(async() => {
        if(id || id === 0){
            try {
                if(isMounted.current){
                    const detail = await seatingTeampleatesService.getOneDetail(id);
                    setDetail(detail)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setCompleted(true)
                setLoading(false)
            }
        }
    }, [id, isMounted, open, showCreate])

    useEffect(()=> {
        getDetail()
    }, [getDetail, id])

    return [detail, completed]
}

export const useAllModules = (isMounted) => {
    const [modules, setModules] = useState()
    const [completed, setCompleted] = useState(false) 
    
    const getModules = useCallback(async() => {
        try {
            if(isMounted.current) {
                const modules = await seatingTeampleatesService.getAllModules();
                setModules(modules)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setCompleted(true)
        }
    }, [isMounted])

    useEffect(()=> {
        getModules()
    },  [getModules])

    return [modules, completed]
}