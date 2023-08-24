import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PlaceholderImage from '../assets/placeholder.png';


const BlogSnipitCard = ({ post }) => {
  const blogContent = post.blog.join(' ');
  const words = blogContent.split(' ');
  const excerpt = words.slice(0, 50).join(' ');

  return (
    <Card className='my-3 p-3 rounded snipit-card'>
      <Link to={`/post/${post._id}`}>
        <div className='image-container'>
          <img src={PlaceholderImage} alt='PlaceholderImage' className='snipit-image' />
        </div>
      </Link>

      <Card.Body className='snipit-body'>
        <Link to={`/post/${post._id}`}>
          <Card.Title as='div' className='post-title'>
            <strong>{post.title}</strong>
          </Card.Title>
        </Link>
        <Card.Text className='author-text'>
          <span className='author-name'>
            {post.authorFirstName} {post.authorLastName}
          </span>{' '}
          | {post.date}
        </Card.Text>
        <Card.Text className='excerpt-text'>{excerpt}...</Card.Text>
        
        <div className='button-container'>
          <Link to={`/post/${post._id}`}>
            <Button variant='primary'>Read More</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default BlogSnipitCard;
