import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
    <>
      <div style={{ textAlign: 'center', margin: '30px' }}>
        <Link className="btn btn-success" to="/">Активные</Link>
      </div>
      <Row style={{ display: 'flex', justifyContent: 'space-around' }}>
        {initiatives.map(
          (initiative) => (<Col><InitiativeCard key={initiative.id} initiative={initiative} /></Col>),
        )}
      </Row>
    </>
  );
}
