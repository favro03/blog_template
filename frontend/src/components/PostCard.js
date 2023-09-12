import React from 'react';
import { Card } from 'react-bootstrap';
import PlaceholderImage from '../assets/placeholder.png';
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
        <div className='image-title-container'>
  <div className='image-container'>
    <img src={PlaceholderImage} alt='PlaceholderImage' className='snipit-image' />
  </div>
  <div className='post-content title'>
    <h1>{title}</h1>
  </div>
</div>
        </Card.Title>
        
       

        <Card.Title className='post-card' as='div'>
         
        <div className='author-date-container'>
  <div className='author-names'>
    <strong>{authorFirstName} {authorLastName}</strong>
   
   
  </div>
  <span className='line'>|</span>
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
