import { useState } from "react";
import { useAuth } from "./hooks";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const { login, status, error } = useAuth()

    const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
       login(email, password)
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
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Signing in..." : "Sign In"}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};