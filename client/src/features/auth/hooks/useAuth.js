import { useContext, useEffect } from "react";
import { AuthContext } from "../store/auth.context.jsx";
import { getMe, login, logout, register } from "../service/auth.service.js";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      setUser(data.user);
      return true;
    } catch (err) {
      console.error("Registration failed:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
  setLoading(true);
  try {
    await logout();
    setUser(null);
    return true;
  } catch (err) {
    console.error("Logout failed:", err);
    return false;
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, handleLogin, handleRegister, handleLogout };
};
