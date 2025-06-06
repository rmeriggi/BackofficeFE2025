import { useEffect } from 'react';

export const useAsync = (
  asyncFn,
  adapter,
  setResponse,
  error = []
) => {
  useEffect(() => {
    let isActive = true;
    asyncFn()
    .then((result) => {
      if (isActive) {
        if(adapter) {
          const fetchAdapted = adapter(result)
          setResponse(fetchAdapted)
        }else{
          setResponse(result)
        }
      };
    })
    .catch((err) => {
      setResponse(error)
    })
    return () => {
      isActive = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};