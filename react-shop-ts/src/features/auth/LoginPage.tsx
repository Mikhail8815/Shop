import { Link } from "react-router-dom";
import { LoginForm } from "./LoginForm";

export const LoginPage = () => {
  return (
    <div className="auth-page">
      <h1>Вход</h1>
      <LoginForm />
      <p>
        Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
      </p>
    </div>
  );
};