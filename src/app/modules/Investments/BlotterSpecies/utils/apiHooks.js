import { useState, useEffect, useCallback } from "react";
import * as accountsService from "./service";

export const useAllAccounts = (isMountedRef) => {
  const [allAccounts, setAllAccounts] = useState([]);
  const [completed, setCompleted] = useState(false);

  const getAllAccounts = useCallback(async () => {
    try {
      const accounts = await accountsService.getAllAccounts();
      if (isMountedRef.current) {
        setAllAccounts(accounts);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCompleted(true);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getAllAccounts();
  }, [getAllAccounts]);

  return [allAccounts, completed];
};

export const useAllAccountsList = (isMountedRef) => {
  const [allAccounts, setAllAccounts] = useState([]);
  const [completed, setCompleted] = useState(false);

  const getAllAccounts = useCallback(async () => {
    try {
      const accounts = await accountsService.getAllAccountsList();
      if (isMountedRef.current) {
        setAllAccounts(accounts);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCompleted(true);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getAllAccounts();
  }, [getAllAccounts]);

  return [allAccounts, completed];
};

export const useAllTransactions = (id, isMountedRef) => {
  const [transactions, setTransactions] = useState([]);
  const [completed, setCompleted] = useState(false);

  const getTransactions = useCallback(async () => {
    try {
      const transactions = await accountsService.getAllTransactions(id);
      if (isMountedRef.current) {
        setTransactions(transactions);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCompleted(true);
    }
  }, [id, isMountedRef]);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  return [transactions, completed];
};

export const useOneTransaction = (isMountedRef, id) => {
  const [oneTransaction, setOneTransaction] = useState([]);
  const [completed, setCompleted] = useState(false);

  const getOneTransactions = useCallback(async () => {
    try {
      if (id !== "") {
        const transaction = await accountsService.getOneTransaction(id);
        if (isMountedRef.current) {
          setOneTransaction(transaction);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCompleted(true);
    }
  }, [id, isMountedRef]);

  useEffect(() => {
    getOneTransactions();
  }, [getOneTransactions]);

  return [oneTransaction, completed];
};

export const useAccusationsSourcesList = (isMountedRef) => {
  const [accusations, setAccusations] = useState([]);
  const [completed, setCompleted] = useState(false);

  const getAllAccusations = useCallback(async () => {
    try {
      const accusationsList = await accountsService.getAllAccusations();
      if (isMountedRef.current) {
        setAccusations(accusationsList);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCompleted(true);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getAllAccusations();
  }, [getAllAccusations]);

  return [accusations, completed];
};

export const useOneAccount = (id, isMountedRef) => {
  const [oneAccount, setOneAccount] = useState([]);
  const [completed, setCompleted] = useState(false);

  const getOneAccount = useCallback(async () => {
    try {
      const account = await accountsService.getOneAccount(id);
      if (isMountedRef.current) {
        setOneAccount(account);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCompleted(true);
    }
  }, [id, isMountedRef]);

  useEffect(() => {
    getOneAccount();
  }, [getOneAccount]);

  return [oneAccount, completed];
};
