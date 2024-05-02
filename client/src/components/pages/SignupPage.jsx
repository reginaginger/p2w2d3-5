import React from 'react';
import axiosInstance from '../axiosInstance';

export default function SignupPage({ signupHandler }) {
  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    // await axiosInstance.post('/auth/signup', data);
    signupHandler(data);
  };

  return (
    <form onSubmit={submitHandler}>
      <input name="name" type="text" placeholder="Введи имя пользователя" />
      <input name="email" type="email" placeholder="Введи email" />
      <input name="password" type="password" placeholder="Введи пароль" />
      <button type="submit">Sign up</button>
    </form>
  );
}
