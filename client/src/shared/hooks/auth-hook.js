import {useState, useCallback, useEffect} from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, expirationData) => {
    setToken(token)
    setUserId(uid);
    const tokenExpirationDateTime = 
      expirationData || new Date(new Date().getTime() + 2000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDateTime);
    localStorage.setItem('userData', JSON.stringify({
      userId: uid,
      token: token,
      expiration: tokenExpirationDateTime.toISOString()
    }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData && 
      storedData.token && 
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token);
    }
  }, [login]);
  return { token, login, logout, userId };
};
