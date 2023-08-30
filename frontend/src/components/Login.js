import AuthPage from "./AuthPage";

export default function Login({ onSubmit }) {
  return <AuthPage onSubmit={onSubmit} title="Вход" text="Войти" />;
}
