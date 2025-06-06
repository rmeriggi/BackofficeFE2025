/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useState, useEffect, useCallback } from 'react';
import * as generalServices from './service';

export const useAllTrx = (isMountedRef) => {
  const [allTrx, setAllTrx] = useState({types : []});
  const [completed, setCompleted] = useState(false);

  const getAllTrx = useCallback(async () => {
      try {
          const trxType = await generalServices.getTrxType()
          if (isMountedRef.current) {
              setAllTrx(trxType);
          }
      } catch (err) {
          console.error(err);
      } finally {
          setCompleted(true);
      }
  }, [isMountedRef]);

  useEffect(() => {
      getAllTrx();
  }, [getAllTrx]);

  return [allTrx, completed];
}

export const useAllStatusQuota = (isMountedRef) => {
    const [allStatusQuota, setAllStatusQuota] = useState([]);
    const [completed, setCompleted] = useState(false);

    const getAllStatusQuota = useCallback(async () => {
        try {
            const StatusQuota = await generalServices.getAllStatusQuota()
            if (isMountedRef.current) {
              setAllStatusQuota(StatusQuota);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setCompleted(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMountedRef]);

    useEffect(() => {
      getAllStatusQuota();
    }, [getAllStatusQuota]);

    return [allStatusQuota, completed];
}