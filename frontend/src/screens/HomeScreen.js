import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetPostsQuery } from '../slices/postsApiSlice';
import BlogSnipitCard from '../components/BlogSnipitCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Hero from '../components/Hero';
import SidePanel from '../components/SidePanel';

const HomeScreen = () => {
  // const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetPostsQuery({
    // keyword,
    // pageNumber,
  });

  // Check if data is available before accessing posts
  if (!data) {
    return <Loader />; // or handle the loading state accordingly
  }

  // Filter posts where isFeatured is true
  const featuredPosts = data.posts.filter(post => post.isFeature);
  console.log("All Posts:", data.posts);

  console.log("Featured Posts:", featuredPosts);
  return (
    <>
      <Hero />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest Featured Posts</h1>
          <Row>
            {featuredPosts.map((post) => (
              <Col key={post._id} md={9}>
                <BlogSnipitCard post={post} />
              </Col>
            ))}
            <SidePanel />
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
