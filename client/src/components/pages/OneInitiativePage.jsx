import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import axiosInstance from '../axiosInstance';

export default function OneInitiativePage() {
  const [initiative, setInitiative] = useState();
  const { id } = useParams();

  useEffect(() => {
    axiosInstance(`/initiatives/${id}`).then((res) => setInitiative(res.data));
  }, []);

  if (!initiative) return <div>Loading...</div>;

  return (
    <Card>
      <Card.Img variant="top" src={initiative.image} />
      <Card.Body>
        <Card.Text>{initiative.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
