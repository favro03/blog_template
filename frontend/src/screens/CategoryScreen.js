import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Row, Col } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import { useGetPostsQuery } from '../slices/postsApiSlice';
import BlogSnipitCard from '../components/BlogSnipitCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Hero from '../components/Hero';
import SidePanel from '../components/SidePanel';

const CategoryScreen = () => {
  const navigate = useNavigate(); 
  const { category } = useParams();
  const location = useLocation();
  const queryCategory = new URLSearchParams(location.search).get('category');

  const { data, isLoading, error, refetch } = useGetPostsQuery({
    category: queryCategory || category, // Use query parameter if available, otherwise use the category from useParams
  });

  useEffect(() => {
    refetch();
  }, [queryCategory]);

  // Check if data is available before accessing posts
  if (!data) {
    return <Loader />; // or handle the loading state accordingly
  }

  // Filter posts by category using the queryCategory
  const categoryPost = data.posts.filter(post => post.category === (queryCategory || category));

 

  return (
    <div className='content'>
      <Hero />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>{queryCategory || category} Posts</h1>
          <Row>
            {categoryPost.map((post) => (
              <Col key={post._id} md={9}>
                <BlogSnipitCard post={post} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default CategoryScreen;
