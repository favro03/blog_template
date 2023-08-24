import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetPostsQuery } from '../slices/postsApiSlice';
import { Link } from 'react-router-dom';
import BlogSnipitCard from '../components/BlogSnipitCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Hero from '../components/Hero';
import SidePanel from '../components/SidePanel';
// import Paginate from '../components/Paginate';

// import Meta from '../components/Meta';

const HomeScreen = () => {
  // const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetPostsQuery({
    // keyword,
    // pageNumber,
  });

  return (
    <>
      <Hero />
        {/* <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link> */}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          {/* <Meta /> */}
          <h1>Latest Posts</h1>
          <Row>
            {data.posts.map((post) => (
              <Col key={post._id} md={9}>
                <BlogSnipitCard post={post} />
              </Col>
            ))}
         <SidePanel />
            
          </Row>
          {/* <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          /> */}
        </>
      )}
    </>
  );
};

export default HomeScreen;

