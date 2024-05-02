import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function InitiativeCard({ initiative }) {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={initiative.image} />
      <Card.Body>
        <Card.Title>{initiative.title}</Card.Title>
        <Card.Text>
          {initiative.description}
        </Card.Text>
        <Button variant="primary" href={`/${initiative.id}`} >Подробнее</Button>
      </Card.Body>
    </Card>
  );
}

export default InitiativeCard;

// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import { Link } from 'react-router-dom';

// export default function MeetupItem({ meetup, deleteHandler, user }){
//     return (
//         <Card style={{ width: '18rem' }}>

//             <Card.Body>
//                 <Card.Title>{meetup.title}</Card.Title>
//                 <Card.Text>
//                     {meetup.description}
//                 </Card.Text>
//                 <Link to={`/meetup/${meetup.id}`}>
//                     <Button variant="primary">View</Button>
//                 </Link>
//                 {user && user.id === meetup.userId &&
//                     <Button variant="danger" onClick={() => deleteHandler(meetup.id)}>Delete</Button>
//                 }
//             </Card.Body>
//         </Card>
//     )
// }
