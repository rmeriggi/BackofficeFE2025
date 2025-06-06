import { useState, useEffect, useCallback } from 'react';
import * as accountsService from './service'

export const useAllInvestmentAccounts = (isMountedRef) => {
    const [accounts, setAccounts] = useState([])
    const [completed, setCompleted] = useState(false);

    const getAllAccounts = useCallback(async () => {
        try {
            const accounts = await accountsService.get_all()
            if(isMountedRef.current){
                setAccounts(accounts)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setCompleted(true)
        }
    }, [isMountedRef])

    useEffect(()=> {
        getAllAccounts()
    }, [getAllAccounts])

    return [accounts, completed]
}

export const useOneInvestmentAccount = (isMountedRef, id) => {
    const [account, setAccount] = useState({})
    const [completed, setCompleted] = useState(false);

    const getOneAccount = useCallback(async () => {
        try {
            const account = await accountsService.getOne(id)
            if(isMountedRef.current){
                setAccount(account)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setCompleted(true)
        }
    }, [isMountedRef, id])

    useEffect(()=> {
        getOneAccount()
    }, [getOneAccount])

    return [account, completed]
}

export const usePeopleInvestmentAccount = (isMountedRef, id) => {
    const [people, setPeople] = useState({})
    const [completed, setCompleted] = useState(false);

    const getPeople = useCallback(async () => {
        try {
            const people = await accountsService.getPeolpe(id)
            if(isMountedRef.current){
                setPeople(people)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setCompleted(true)
        }
    }, [isMountedRef, id])

    useEffect(()=> {
        getPeople()
    }, [getPeople])

    return [people, completed]
}

export const useAccountByInvestmentAccount = (isMountedRef, id) => {
    const [accounts, setAccounts] = useState({})
    const [completed, setCompleted] = useState(false);

    const getOneAccount = useCallback(async () => {
        try {
            const accounts = await accountsService.getAccounts(id)
            if(isMountedRef.current){
                setAccounts(accounts)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setCompleted(true)
        }
    }, [isMountedRef, id])

    useEffect(()=> {
        getOneAccount()
    }, [getOneAccount])

    return [accounts, completed]
}

export const useBanksByInvestmentAccount = (isMountedRef, id) => {
    const [banks, setBanks] = useState({})
    const [completed, setCompleted] = useState(false);

    const getBanks = useCallback(async () => {
        try {
            const banks = await accountsService.getBanks(id)
            if(isMountedRef.current){
                setBanks(banks)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setCompleted(true)
        }
    }, [isMountedRef, id])

    useEffect(()=> {
        getBanks()
    }, [getBanks])

    return [banks, completed]
}