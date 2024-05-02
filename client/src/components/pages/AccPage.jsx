import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';



export default function AccPage({ user }) {

  const [userData, setUserData] = useState({});

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axiosInstance(`/auth/users/${user.id}`)
      .then(response => {

        setUserData(response.data);
      })
  }, []);

  const saveUserData = async (data) => {
    console.log(data)
    try {
      await axiosInstance.put(`/auth/users/${user.id}`, data);

    } catch (error) {
      console.error(    error);
     
    }
  };

  return (
  
        <div>
        <h1>Страница аккаунта</h1>
        <p>Имя: {userData.name}</p>
        <p>Email: {userData.email}</p>
        <p>Адрес: {isEditing ? <input value={userData.adress} onChange={(e) => setUserData({...userData, adress: e.target.value})} /> : userData.adress}</p>


            <button onClick={() => {
            if (isEditing) {

                saveUserData(userData);
            }
            setIsEditing(!isEditing);
            }}>{isEditing ? 'save' : 'edit'}</button>
        </div>

  );
}