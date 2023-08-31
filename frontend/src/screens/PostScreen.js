import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetPostDetailsQuery } from '../slices/postsApiSlice'; 
import { Link } from 'react-router-dom';

import Loader from '../components/Loader';
import Message from '../components/Message';
import PostCard from '../components/PostCard';
import SidePanel from '../components/SidePanel'

const PostScreen = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetPostDetailsQuery(id); // Use useGetPlannerDetailsQuery with the id

  
  
  return (
    <>
      <Link to='/' className='btn btn-light mb-4'>
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : data ? ( // Check if data exists
        <>
          
          
          
          <Row>
            <Col >
              <PostCard post={data} /> {/* Render the Planneritems component with data */}
            </Col>
            <SidePanel />
          </Row>
        </>
      ) : (
        <Message variant='info'>No Post Found</Message> // Display message if data is not available
      )}
    </>
  );
};

export default PostScreen;
