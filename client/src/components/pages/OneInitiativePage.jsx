import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import axiosInstance from '../axiosInstance';

export default function OneInitiativePage({ user }) {
  const [initiative, setInitiative] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axiosInstance(`/initiatives/${id}`).then((res) => setInitiative(res.data));
  }, []);

  if (!initiative) return <div>Loading...</div>;

  const completeHandler = async (id) => {
    await axiosInstance.put(`/initiatives/${id}`, { status: false });
    // if (res.ok === 200) {
    window.location = '/';
    // }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card style={{ margin: '50px', width: '50%' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Card.Img variant="top" src={initiative.image} style={{ height: '300px', width: '100%' }} />
        </div>
        <Card.Body>
          <Card.Text><strong>{initiative.title}</strong></Card.Text>
          <Card.Text>{initiative.description}</Card.Text>
          <Card.Title style={{ color: 'gray', fontSize: '16px', marginBottom: '20px' }}>
          Дата окончания:
          {' '}
          {initiative.data}
        </Card.Title>
        </Card.Body>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {initiative.userId === user?.id && initiative.status === true && <Button variant="success" onClick={() => completeHandler(initiative.id)} style={{ width: '30%', margin: '10px' }}>Завершить</Button>}
        </div>
      </Card>
    </div>
  );
}
