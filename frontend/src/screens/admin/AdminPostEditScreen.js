import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa'
import {
  useGetPostDetailsQuery,
  useUpdatePostMutation,
  useUploadPostImageMutation,
} from '../../slices/postsApiSlice';

const AdminPostEditScreen = () => {
  const { id: postId } = useParams();

  const [title, setTitle] = useState('');
  const [authorFirstName, setAuthorFirstName] = useState(0);
  // const [image, setImage] = useState('');
  const [authorLastName, setAuthorLastName] = useState('');
  const [date, setDate] = useState('');
  const [blog, setBlog] = useState([]);
  const [category, setCategory] = useState('');
  const [isFeature, setIsFeature] = useState('');
  const [isArchive, setIsArchive] = useState('');

  const {
    data: post,
    isLoading,
    refetch,
    error,
  } = useGetPostDetailsQuery(postId);

  const [updatePost, { isLoading: loadingUpdate }] =
    useUpdatePostMutation();

  // const [uploadProductImage, { isLoading: loadingUpload }] =
  //   useUploadProductImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updatePost({
        postId,
        title,
        authorFirstName,
        // image,
        authorLastName,
        date,
        blog,
        category,
        isFeature,
        isArchive,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success('Post updated');
      refetch();
      navigate('/admin/posts');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setAuthorFirstName(post.authorFirstName);
      // setImage(post.image);
      setAuthorLastName(post.authorLastName);
      setDate(post.date);
      setBlog(post.blog || []);
      setCategory(post.category);
      setIsFeature(post.isFeature);
      setIsArchive(post.isArchive);
    }
  }, [post]);

  // const uploadFileHandler = async (e) => {
  //   const formData = new FormData();
  //   formData.append('image', e.target.files[0]);
  //   try {
  //     const res = await uploadProductImage(formData).unwrap();
  //     toast.success(res.message);
  //     setImage(res.image);
  //   } catch (err) {
  //     toast.error(err?.data?.message || err.error);
  //   }
  // };
  const handleDeleteLineItem = (list, index) => {
    const updatedList = [...list];
    updatedList.splice(index, 1);
    switch (list) {
      case blog:
        setBlog(updatedList);
        break;
     
      default:
        break;
    }
  };


  const addLineItem = (list, setList) => {
    setList([...list, '']);
  };
  return (
    <>
      <Link to='/admin/posts' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Post</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='authorFirstName'>
              <Form.Label>Author First name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Author First name'
                value={authorFirstName}
                onChange={(e) => setAuthorFirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                label='Choose File'
                onChange={uploadFileHandler}
                type='file'
              ></Form.Control>
              {loadingUpload && <Loader />}
            </Form.Group> */}

            <Form.Group controlId='authorLastName'>
              <Form.Label>Author Last Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Author Last name'
                value={authorLastName}
                onChange={(e) => setAuthorLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='date'>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* <Form.Group controlId='blog'>
              <Form.Label>Blog</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Blog'
                value={blog}
                onChange={(e) => setBlog(e.target.value)}
              ></Form.Control>
            </Form.Group> */}

            <Form.Group controlId='blog'>
          <Form.Label>Blog</Form.Label>
          {blog.map((item, index) => (
            <div key={index} className='d-flex align-items-center'>
              <Form.Control
                type='text'
                placeholder={`Blog ${index + 1}`}
                value={item}
                onChange={(e) => {
                  const updatedBlog= [...blog];
                  updatedBlog[index] = e.target.value;
                  setBlog(updatedBlog);
                }}
              />
              <Button
                variant='light'
                className='ml-2'
                onClick={() => handleDeleteLineItem(blog, index)}
              >
                <FaTrash />
              </Button>
            </div>
          ))}
          <Button onClick={() => addLineItem(blog, setBlog)}>
            +
          </Button>
        </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as='select' // This changes the input type to a dropdown select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value='health'>Health</option>
                <option value='beauty'>Beauty</option>
                <option value='kids'>Kids</option>
              </Form.Control>
            </Form.Group>


            <Form.Group controlId='isFeature'>
              <Form.Label>Feature</Form.Label>
              <Form.Check
                type='checkbox'
                label='Feature'
                checked={isFeature} // Set the checked state based on isFeature value
                onChange={(e) => setIsFeature(e.target.checked)} // Update isFeature when checkbox is clicked
              />
            </Form.Group>

            <Form.Group controlId='isArchive'>
              <Form.Label>Archive</Form.Label>
              <Form.Check
                type='checkbox'
                label='Archive'
                checked={isArchive} // Set the checked state based on isFeature value
                onChange={(e) => setIsArchive(e.target.checked)} // Update isFeature when checkbox is clicked
              />
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default AdminPostEditScreen;