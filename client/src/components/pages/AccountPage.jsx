import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import MessageItem from '../ui/MessageItem';
import AddMessageForm from '../ui/AddMessageForm';
import axiosInstance from '../../axiosInstance';
import Loader from '../hoc/Loader';

export default function AccountPage({ user }) {
  const [meetups, setMeetups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axiosInstance('/meetups/my').then((res) => {
      setMeetups(res.data);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  const addMeetupHandler = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const res = await axiosInstance.post('/meetups', formData);
    setMeetups((prev) => [res.data, ...prev]);
  };

  const deleteHandler = async (meetupId) => {
    const res = await axiosInstance.delete(`/meetups/${meetupId}`);
    if (res.status === 204) {
      setMeetups((prev) => prev.filter((msg) => meet.id !== meetupId));
    }
  };
  return (
    <>
      <Row>
        <Col xs={12}>
          <AddMeetupForm addMeetupHandler={addMeetupHandler} />
        </Col>
      </Row>
      <Loader isLoading={isLoading}>
        <Row>
          {messages.map((message) => (
            <Col xs={12} key={message.id}>
              <MeetupItem user={user} message={message} deleteHandler={deleteHandler} />
            </Col>
          ))}
        </Row>
      </Loader>
    </>
  );
}
