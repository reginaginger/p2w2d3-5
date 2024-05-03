import React from 'react';
import axiosInstance from '../axiosInstance';

export default function NewInitiativePage() {
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    await axiosInstance.post('/initiatives/new', formData);
    window.location.href = '/';
  };
  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px',borderRadius: '10px' }}>
      <form onSubmit={submitHandler}>
        <div style={{textAlign: 'center'}}>
          <div className="mb-3">
            <div>
              <label htmlFor="exampleInput" className="form-label" style={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>
                Название
                <input name="title" type="text" className="form-control" id="exampleInput" />
              </label>
            </div>
            <div>
              <label htmlFor="exampleInput" className="form-label" style={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>
                Описание
                <input name="description" type="text" className="form-control" id="exampleInput" />
              </label>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label id="level" style={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>
                <div style={{ marginBottom: '10px' }}>
                  Выберете уровень:
                </div>
                <select name="level">
                  <option value="Федеральный">Федеральный</option>
                  <option value="Региональный">Региональный</option>
                  <option value="Муниципальный">Муниципальный</option>
                </select>
              </label>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label id="category" style={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>
                <div style={{ marginBottom: '10px' }}>
                  Выберете категорию:
                </div>
                <select name="category">
                  <option value="Образование">Образование</option>
                  <option value="Здравоохранение">Здравоохранение</option>
                  <option value="Транспорт">Транспорт</option>
                  <option value="Политика">Политика</option>
                  <option value="Социальные вопросы">Социальные вопросы</option>
                </select>
              </label>
            </div>
            <div>
              <label htmlFor="exampleInput" className="form-label" style={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>
                Фотография
                <input name="image" type="text" className="form-control" id="exampleInput" />
              </label>
            </div>
            <div>
              <label htmlFor="exampleInput" className="form-label" style={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>
                Дата завершения
                <input name="data" type="text" className="form-control" id="exampleInput" />
              </label>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '25px' }}>
            <button type="submit" className="btn btn-primary" style={{ width: '200px' }}>Добавить</button>
          </div>
        </div>
      </form>
    </div>
  );
}
