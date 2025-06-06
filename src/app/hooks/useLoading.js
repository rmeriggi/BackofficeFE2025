import { useState } from 'react'

export const useLoading = (isLoading = true) => {

  const [loading, setLoading] = useState(isLoading);

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };
  return {loading, enableLoading, disableLoading}
}
