import { Link } from "react-router-dom";
import AuthPage from "./AuthPage";

export default function Register({ onSubmit }) {
  return (
    <>
      <AuthPage onSubmit={onSubmit} title="Регистрация" text="Зарегистрироваться" />
      <p className="register__subtitile">
        Уже зарегистрированы?
        <Link className="register__link" to="/login">
          Войти
        </Link>
      </p>
    </>
  );
}
