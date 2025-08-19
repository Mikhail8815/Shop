import { useState } from "react";
import { useAuth } from "./hooks";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const { login, status, error } = useAuth()

    const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Начало отправки')
    try {
      await login(email, password)
      console.log('Успешный вход:')
      navigate("/")
    } catch (err) {
        console.error("Login failed:", err)
        
    }
  };

   const getTranslatedError = () => {
    if (!error) return null
    
    if (error.includes("auth/invalid-email")) return "Некорректный email"
    if (error.includes("auth/user-not-found")) return "Пользователь не найден"
    if (error.includes("auth/wrong-password")) return "Неверный пароль"
    if (error.includes("auth/too-many-requests")) {
      return "Слишком много попыток. Попробуйте позже"
    }
    
    return error;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className={styles.inputField}
        disabled={status === "loading"}
      />
      </div>
      <div className={styles.formGroup}>
         <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
        minLength={6}
        className={styles.inputField}
        required
        disabled={status === "loading"}
      />
      </div>
    
      <button type="submit" 
      disabled={status === "loading"}
      className={styles.submitButton}
      >
        {status === "loading" ? (
          <>
            <span className={styles.spinner}></span>
            Вход...
          </>
        )
        : 
         "Войти" 
         }
      </button>
      {error && (
        <div className={styles.error}> 
          ⚠️ {getTranslatedError()} 
        </div>
      )}
    </form>
  );
};