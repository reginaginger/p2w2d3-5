import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import axiosInstance from '../axiosInstance';
import InitiativeCard from '../ui/InitiativeCard';

export default function HomePage() {
  const [initiatives, setInitiatives] = useState([]);
  useEffect(() => {
    axiosInstance('/initiatives/active').then((res) => {
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

// export default function HomePage({ user }) {
//   const [meetups, setMeetups] = useState([]);
//   useEffect(() => {
//     axiosInstance('/meetups').then((res) => {
//       setMeetups(res.data);
//     });
//   }, []);
//   const deleteHandler = async (meetupId) => {
//     const res = await axiosInstance.delete(`/messages/${meetupId}`);
//     if (res.status === 204) {
//       setMeetups((prev) => prev.filter((meet) => meet.id !== meetupId));
//     }
//   };
//   return (
//     <Row>
//         <h1>HomePage</h1>
//       {meetups.map((meetup) => (
//         <Col xs={12} key={meetup.id}>
//           <MeetupItem user={user} meetup={meetup} deleteHandler={deleteHandler} />
//         </Col>
//       ))}
//     </Row>
//   );
// }
