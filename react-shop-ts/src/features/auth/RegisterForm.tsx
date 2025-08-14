import { useState, useEffect } from "react";
import { useAuth } from "./hooks";
import styles from './RegisterForm.module.css';

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  
  const { register, status, error } = useAuth();

  useEffect(() => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
  }, [email]);

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  }, [password, confirmPassword]);

  const getPasswordStrength = () => {
  if (!password) return "";
  
  if (password.length < 6) return "Слишком короткий";
  
  const hasUpperCase = /[А-ЯA-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  
  if (hasUpperCase && hasNumbers && hasSpecialChars) {
    return "Очень надежный"; 
  } else if (hasUpperCase && hasNumbers) {
    return "Надежный"; 
  } else if (hasUpperCase || hasNumbers) {
    return "Средний"; 
  }
  
  return "Слабый"; 
};
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setPasswordError("Passwords must match");
      return;
    }

    if (emailError) {
      return;
    }

    register(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.registerForm}>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@mail.com"
          required
          className={emailError ? styles.errorBorder : ""}
        />
        {emailError && <span className={styles.errorText}>{emailError}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password">Пароль</label>
        <div className={styles.passwordInputContainer}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Минимум 6 символов"
            required
            minLength={6}
            className={passwordError ? styles.errorBorder : ""}
          />
          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
        <div className={styles.passwordStrength}>
          Надежность: <span className={getPasswordStrength().toLowerCase()}>{getPasswordStrength() || "—"}</span>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword">Подтверждение пароля</label>
        <input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Повторите пароль"
          required
          className={passwordError ? styles.errorBorder : ""}
        />
        {passwordError && <span className={styles.errorText}>{passwordError}</span>}
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={status === "loading" || !!passwordError || !!emailError}
      >
        {status === "loading" ? (
          <>
            <span className={styles.spinner}></span> Создаем аккаунт...
          </>
        ) : (
          "Регистрация"
        )}
      </button>

      {error && <div className={styles.errorServer}>{error}</div>}
    </form>
  );
};