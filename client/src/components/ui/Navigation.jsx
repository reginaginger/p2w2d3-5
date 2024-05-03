import React from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function Navigation({ user, logoutHandler }) {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">{user ? `Привет, ${user.name}` : 'Привет, гость!'}</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Инициативы</Nav.Link>
          {user ? (
            <>
              <Nav.Link as={Link} to="/new">Добавить инициативу</Nav.Link>
              <Nav.Link as={Link} to="/account">Профиль</Nav.Link>
              <Button onClick={logoutHandler}>Выйти</Button>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">Войти</Nav.Link>
              <Nav.Link as={Link} to="/signup">Зарегистрироваться</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
