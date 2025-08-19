import { Link } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";

export const RegisterPage = () => {
  return (
    <div className="auth-page">
      <h1>Регистрация</h1>
      <RegisterForm />
      <p>
        Уже есть аккаунт? <Link to="/login">Войдите</Link>
      </p>
    </div>
  );
};