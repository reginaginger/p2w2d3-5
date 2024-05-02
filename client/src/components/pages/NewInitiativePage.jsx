import React from 'react';
import axiosInstance from '../axiosInstance';

export default function NewInitiativePage() {
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const res = await axiosInstance.post('/new', formData);
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="mb-3">
        <div>
          <label htmlFor="exampleInput" className="form-label">
            Название
            <input name="title" type="text" className="form-control" id="exampleInput" />
          </label>
        </div>
        <div>
          <label htmlFor="exampleInput" className="form-label">
            Описание
            <input name="description" type="text" className="form-control" id="exampleInput" />
          </label>
        </div>
        <div>
          <label id="level">
            Выберете уровень:
            <select name="level">
              <option value="">Федеральный</option>
              <option value="">Региональный</option>
              <option value="">Муниципальный</option>
            </select>
          </label>
        </div>
        <div>
          <label id="category">
            Выберете категорию:
            <select name="category">
              <option value="">Образование</option>
              <option value="">Здравоохранение</option>
              <option value="">Муниципальный</option>
              <option value="">Региональный</option>
              <option value="">Муниципальный</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="exampleInput" className="form-label">
            Фотография
            <input name="title" type="text" className="form-control" id="exampleInput" />
          </label>
        </div>
        <div>
          <label htmlFor="exampleInput" className="form-label">
            Дата завершения
            <input name="data" type="text" className="form-control" id="exampleInput" />
          </label>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Добавить</button>
    </form>
  );
}
