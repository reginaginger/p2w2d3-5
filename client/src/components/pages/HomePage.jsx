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

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    await axiosInstance.post('/initiatives', data).then((data) => {
      setInitiatives(data.data);
    });
  };
  return (
    <div className="container">
      <div style={{ textAlign: 'right', margin: '30px' }}>
        <Link className="btn btn-secondary" to="/nonactive">Посмотреть завершенные</Link>
      </div>
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <form onSubmit={submitHandler}>
          <div>
            <label id="level" style={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>
              <div style={{ marginBottom: '10px' }}>
                Выберете уровень:
              </div>
              <select name="level">
                <option value="" />
                <option value="Федеральный">Федеральный</option>
                <option value="Региональный">Региональный</option>
                <option value="Муниципальный">Муниципальный</option>
              </select>
            </label>
            <div style={{ marginBottom: '15px' }}>
              <label id="category" style={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>
                <div style={{ marginBottom: '10px' }}>
                  Выберете категорию:
                </div>
                <select name="category">
                  <option value="" />
                  <option value="Образование">Образование</option>
                  <option value="Здравоохранение">Здравоохранение</option>
                  <option value="Транспорт">Транспорт</option>
                  <option value="Политика">Политика</option>
                  <option value="Социальные вопросы">Социальные вопросы</option>
                </select>
              </label>
            </div>
          </div>
          <div style={{ marginTop: '15px' }}>
            <button type="submit" className="btn btn-primary">Поиск</button>
          </div>
        </form>
      </div>
      <Row style={{ display: 'flex', justifyContent: 'space-around' }}>
        {initiatives.map(
          (initiative) => (<Col><InitiativeCard key={initiative.id} initiative={initiative} /></Col>),
        )}
      </Row>
    </div>
  );
}
