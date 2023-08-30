import Form from './Form/Form';
import Input from './Form/Input';
import { React, useRef } from 'react';

export default function AuthPage({ onSubmit, title, text }) {
  const email = useRef();
  const password = useRef();

  const handleSubmit = () => {
    const data = {};
    data.password = password.current.value;
    data.email = email.current.value;
    onSubmit(data);
    password.current.value = '';
    email.current.value = '';
  };
  return (
    <>
      <h2 className="auth__title">{title}</h2>
      <Form
        onSubmit={handleSubmit}
        name="login"
        text={text}
        className="auth__form">
        <Input
          inputRef={email}
          validationLength={{ min: 5 }}
          placeholder="Email"
          name="email"
          type="email"
          id="user-email-input"
          className="auth__input"></Input>
        <Input
          inputRef={password}
          validationLength={{ min: 8 }}
          placeholder="Пароль"
          name="password"
          type="password"
          id="user-password-input"
          className="auth__input"></Input>
      </Form>
    </>
  );
}
