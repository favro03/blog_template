import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
// import Paginate from '../../components/Paginate';
import {
  useGetPostsQuery,
  useDeletePostMutation,
  useCreatePostMutation,
} from '../../slices/postsApiSlice';
import { toast } from 'react-toastify';

const AdminPostList = () => {
  // const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetPostsQuery({
   
  });

  const [deletePost, { isLoading: loadingDelete }] =
    useDeletePostMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deletePost(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createPost, { isLoading: loadingCreate }] =
    useCreatePostMutation();

  const createPostHandler = async () => {
    if (window.confirm('Are you sure you want to create a new post?')) {
      try {
        await createPost();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Posts</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createPostHandler}>
            <FaPlus /> Create Post
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.data.message}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.posts.map((post) => (
                <tr key={post._id}>
                  <td>{post._id}</td>
                  <td>{post.title}</td>
                  <td>{post.date}</td>
                  <td>
                    <LinkContainer to={`/admin/posts/${post._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-2'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(post._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <Paginate pages={data.pages} page={data.page} isAdmin={true} /> */}
        </>
      )}
    </>
  );
};

export default AdminPostList;