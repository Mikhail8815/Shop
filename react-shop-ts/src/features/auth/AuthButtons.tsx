import { useAppSelector } from "../../hooks";
import { useAuth } from "./hooks";
import { Link } from "react-router-dom";
import styles from "./AuthButtons.module.css"; // Импорт стилей

export const AuthButtons = () => {
  const { user } = useAppSelector(state => state.auth);
  const { logout } = useAuth();

  if (user) {
    return (
      <div className={styles.authButtons}>
        <span className={styles.userEmail}>{user.email}</span>
        <button 
          onClick={logout} 
          className={styles.logoutButton}
        >
          Выйти
        </button>
      </div>
    );
  }

  return (
    <div className={styles.authButtons}>
      <Link to="/login" className={styles.authButton}>Вход</Link>
      <Link to="/register" className={styles.authButton}>Регистрация</Link>
    </div>
  );
};