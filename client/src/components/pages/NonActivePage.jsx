import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import axiosInstance from '../axiosInstance';
import InitiativeCard from '../ui/InitiativeCard';

export default function NonActivePage() {
  const [initiatives, setInitiatives] = useState([]);
  useEffect(() => {
    axiosInstance('/initiatives/nonactive').then((res) => {
      setInitiatives(res.data);
    });
  }, []);
  return (
    <Row>
      {initiatives.map((initiative) => (
        <Col xs={12} key={initiative.id}>
          <InitiativeCard initiative={initiative} />
        </Col>
      ))}
    </Row>
  );
}