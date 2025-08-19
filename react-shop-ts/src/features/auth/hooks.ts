
import { useAppDispatch, useAppSelector } from "../../hooks";
import { login, register, logout } from "./authService";
import { setError } from "./authSlice";

export const useAuth = () => {
  const { user, status, error } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch();

  const handleLogin = async (email: string, password: string) => {
    try {
      dispatch(setError(null));
      await login(email, password);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Auth failed"
      dispatch(setError(message))
      throw err
    }
  };

  const handleRegister = async (email: string, password: string) => {
    try {
      dispatch(setError(null))
      await register(email, password)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed"
      dispatch(setError(message))
      throw err
    }
  };

  const handleLogout = async () => {
    await logout()
  };

  return {
    user,
    status,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout
  };
};