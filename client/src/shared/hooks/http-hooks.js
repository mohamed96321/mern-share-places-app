import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState();

  const activeHttpResquests = useRef([]);

  const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setIsloading(true);
    const httpAbortControl = new AbortController();
    activeHttpResquests.current.push(httpAbortControl);

    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortControl.signal
      });
  
      const responseData = await response.json();

      activeHttpResquests.current = activeHttpResquests.current.filter(
        reqCtrl => reqCtrl !== httpAbortControl
      );
  
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setIsloading(false);
      return responseData;
    } catch (err) {
      setError(err.message);
      setIsloading(false);
      throw(err);
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpResquests.current.forEach(abortCtrl => abortCtrl.abort());
    };
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
    clearError
  };
};