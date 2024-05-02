// import React from 'react';
// import axiosInstance from '../axiosInstance';
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export default function SignupPage({signupHandler}) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    // await axiosInstance.post('/auth/signup', data);
    signupHandler(data);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={submitHandler} className="custom-form">
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Введите имя</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="ФИО"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Введите email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Ваш пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mb-3">
              Зарегистрироваться
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};



    // <form onSubmit={submitHandler}>
    //   <input name="name" type="text" placeholder="Введи имя пользователя" />
    //   <input name="email" type="email" placeholder="Введи email" />
    //   <input name="password" type="password" placeholder="Введи пароль" />
    //   <button type="submit">Sign up</button>
    // </form>
//   );
// }