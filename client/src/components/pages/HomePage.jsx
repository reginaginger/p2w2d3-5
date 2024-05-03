import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import InitiativeCard from '../ui/InitiativeCard';

export default function HomePage() {
  const [initiatives, setInitiatives] = useState([]);
  useEffect(() => {
    axiosInstance('/initiatives/active').then((data) => {
      setInitiatives(data.data);
    });
  }, []);
  return (
    <>
      <div style={{ textAlign: 'center', margin: '30px' }}>
        <Link className="btn btn-secondary" to="/nonactive">Завершенные</Link>
      </div>
      <Row style={{ display: 'flex', justifyContent: 'space-around' }}>
        {initiatives.map(
          (initiative) => (<Col><InitiativeCard key={initiative.id} initiative={initiative} /></Col>),
        )}
      </Row>
    </>
  );
}
