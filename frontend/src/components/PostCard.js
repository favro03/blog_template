import React from 'react';
import { Card } from 'react-bootstrap';

const PostCard = ({ post }) => {
  const {
    title,
    authorFirstName,
    authorLastName,
    date,
    blog,
  } = post;

  return (
    <div className="post-card-container">
    <Card className='my-3 p-3 rounded postview'>
      <Card.Body>
        <Card.Title className='post-card' as='div'>
 
         
          < div className='post-content'>
         
          <strong>{title}</strong>
          </div>
        </Card.Title>
        
        <div className='line'></div>

        <Card.Title className='post-card' as='div'>
         
          <div className='post-content'>
         
          <strong>{authorFirstName}{authorLastName}</strong>
          </div>
        </Card.Title>
        <div className='line'></div>

        <Card.Title className='post-card' as='div'>
         
          <div className='post-content'>
          <strong>{date}</strong>
          </div>
        </Card.Title>
        <div className='line'></div>

        <Card.Title className='post-card' as='div'>
       
        <div className='post-content'>
          <strong>{blog}</strong>
          </div>
        </Card.Title>
       
      </Card.Body>
    </Card>
    </div>
  );
};

export default PostCard;
