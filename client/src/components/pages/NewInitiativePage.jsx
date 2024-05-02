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
              <option value="Федеральный">Федеральный</option>
              <option value="Региональный">Региональный</option>
              <option value="Муниципальный">Муниципальный</option>
            </select>
          </label>
        </div>
        <div>
          <label id="category">
            Выберете категорию:
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
          <label htmlFor="exampleInput" className="form-label">
            Фотография
            <input name="image" type="text" className="form-control" id="exampleInput" />
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
