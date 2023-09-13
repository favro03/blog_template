import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from './FormContainer';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import { useCreatePostMutation } from '../slices/postsApiSlice';

const CreateNew = ({ onSubmit, formData, setFormData }) => {
  const { id: postId } = useParams();
  const [createPost, { isLoading: loadingUpdate }] = useCreatePostMutation();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await createPost(formData);
      toast.success('Post created');
      navigate('/admin/posts');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDeleteLineItem = (list, index) => {
    const updatedList = [...list];
    updatedList.splice(index, 1);
    switch (list) {
      case formData.blog:
        setFormData({
          ...formData,
          blog: updatedList,
        });
        break;
      default:
        break;
    }
  };

  const addLineItem = (list, setList) => {
    setList([...list, '']);
    setFormData({
      ...formData,
      blog: [...list, ''],
    });
  };

  return (
    <>
      <Link to="/admin/posts" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Post</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="authorFirstName">
            <Form.Label>Author First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Author First name"
              name="authorFirstName"
              value={formData.authorFirstName}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="authorLastName">
            <Form.Label>Author Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Author Last name"
              name="authorLastName"
              value={formData.authorLastName}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="blog">
            <Form.Label>Blog</Form.Label>
            {formData.blog.map((item, index) => (
              <div key={index} className="d-flex align-items-center">
                <Form.Control
                  type="text"
                  placeholder={`Blog ${index + 1}`}
                  value={item}
                  onChange={(e) => {
                    const updatedBlog = [...formData.blog];
                    updatedBlog[index] = e.target.value;
                    setFormData({
                      ...formData,
                      blog: updatedBlog,
                    });
                  }}
                />
                <Button
                  variant="light"
                  className="ml-2"
                  onClick={() => handleDeleteLineItem(formData.blog, index)}
                >
                  <FaTrash />
                </Button>
              </div>
            ))}
            <Button onClick={() => addLineItem(formData.blog, setFormData)}>+</Button>
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="health">Health</option>
              <option value="beauty">Beauty</option>
              <option value="kids">Kids</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="isFeature">
            <Form.Label>Feature</Form.Label>
            <Form.Check
              type="checkbox"
              label="Feature"
              name="isFeature"
              checked={formData.isFeature}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="isArchive">
            <Form.Label>Archive</Form.Label>
            <Form.Check
              type="checkbox"
              label="Archive"
              name="isArchive"
              checked={formData.isArchive}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Button type="submit" variant="primary" style={{ marginTop: '1rem' }}>
            Create
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default CreateNew;
