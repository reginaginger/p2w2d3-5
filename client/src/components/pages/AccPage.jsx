import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { Container, Row, Col, Button, Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

export default function AccPage({ user }) {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axiosInstance(`/auth/users/${user.id}`)
      .then(response => {
        setUserData(response.data);
      })
  }, []);

  const saveUserData = async (data) => {
    try {
      await axiosInstance.put(`/auth/users/${user.id}`, data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="mt-4">
      <Form>
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm={2}>
            Имя:
          </Form.Label>
          <Col sm={10}>
            <Form.Control plaintext readOnly={!isEditing} defaultValue={userData.name} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm={2}>
            Email:
          </Form.Label>
          <Col sm={10}>
            <Form.Control plaintext readOnly={!isEditing} defaultValue={userData.email} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm={2}>
            Адрес:
          </Form.Label>
          <Col sm={10}>
            {isEditing ? (
              <Form.Control
                type="text"
                value={userData.adress}
                onChange={(e) => setUserData({...userData, adress: e.target.value})}
              />
            ) : (
              <Form.Control plaintext readOnly defaultValue={userData.adress} />
            )}
          </Col>
        </Form.Group>

        <Row className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button variant="primary" onClick={() => {
              if (isEditing) {
                saveUserData(userData);
              }
              setIsEditing(!isEditing);
            }}>
              {isEditing ? 'Сохранить' : 'Редактировать'}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}