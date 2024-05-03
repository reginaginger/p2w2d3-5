import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import axiosInstance from '../axiosInstance';

export default function OneInitiativePage({ user }) {
  const [initiative, setInitiative] = useState({});

  useEffect(() => {
    axiosInstance(`/initiatives/${id}`).then((res) => setInitiative(res.data));
  }, []);

  const { id } = useParams();

  const [like, setLike] = useState('');

  useEffect(() => {
    axiosInstance.get(`/initiatives/likes/${id}/user`).then((res) => {
      if (res.data.length > 0) {
        setLike(true);
      } else {
        setLike(false);
      }
    });
  }, []);

  const [counter, setCounter] = useState('');

  useEffect(() => {
    axiosInstance.get(`/initiatives/likes/${id}`).then((res) => setCounter(res.data.length));
  }, [like]);

  const createLikeHandler = async () => {
    setLike(!like);
    await axiosInstance.post(`/initiatives/likes/${id}`);
  };

  const deleteLikeHandler = async () => {
    setLike(!like);
    await axiosInstance.delete(`/initiatives/likes/${id}`);
  };

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
          <Card.Img variant="top" src={initiative.image} style={{ height: '400px', width: '100%' }} />
        </div>
        <Card.Body>
          <Card.Text><strong>{initiative.title}</strong></Card.Text>
          <Card.Text>{initiative.description}</Card.Text>
          <Card.Title style={{ color: 'gray', fontSize: '16px', marginBottom: '20px' }}>
            Дата окончания:
            {' '}
            {initiative.data}
          </Card.Title>
          <Card.Title style={{ fontSize: '16px', marginBottom: '20px' }}>
            Категория:
            {' '}
            {initiative.category}
          </Card.Title>
        </Card.Body>
        { user && like === false && initiative.status === true && (
          <div
            style={{
              display: 'flex', justifyContent: 'center', margin: '8px', fontSize: '40px',
            }}
          >
            <div style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            }}
            >
              <span onClick={createLikeHandler}>🤍</span>
              <span>{counter}</span>
            </div>
          </div>
        )}
        { user && like === true && initiative.status === true && (
          <div
            style={{
              display: 'flex', justifyContent: 'center', margin: '8px', fontSize: '40px',
            }}
          >
            <div style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            }}
            >
              <span onClick={deleteLikeHandler}>❤️</span>
              <span>{counter}</span>
            </div>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {initiative.userId === user?.id && initiative.status === true && <Button variant="success" onClick={() => completeHandler(initiative.id)} style={{ width: '30%', margin: '10px' }}>Завершить</Button>}
        </div>
      </Card>
    </div>
  );
}
