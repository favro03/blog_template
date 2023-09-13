import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import CreateNew from '../../components/CreateNew'; // Import CreateNew component
import {
  useGetPostDetailsQuery,
  useUpdatePostMutation,
} from '../../slices/postsApiSlice';

const AdminPostEditScreen = () => {
  const { id: postId } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    authorFirstName: '',
    authorLastName: '',
    date: '',
    blog: [],
    category: '',
    isFeature: false,
    isArchive: false,
  });

  const {
    data: post,
    isLoading,
    refetch,
    error,
  } = useGetPostDetailsQuery(postId);

  const [updatePost, { isLoading: loadingUpdate }] =
    useUpdatePostMutation();

  const navigate = useNavigate();

  const submitHandler = async () => {
    try {
      await updatePost({
        postId,
        ...formData,
      }).unwrap(); // Unwrap the Promise to catch any rejection in the catch block
      toast.success('Post updated');
      refetch();
      navigate('/admin/posts');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (post) {
      setFormData(post);
    }
  }, [post]);

  return (
    <>
      <Link to="/admin/posts" className="btn btn-light my-3">
        Go Back
      </Link>
      <CreateNew
        formData={formData}
        setFormData={setFormData}
        onSubmit={submitHandler}
      />
      {/* Submit button in AdminPostEditScreen */}
      <Button onClick={submitHandler} disabled={loadingUpdate}>
        {loadingUpdate ? 'Updating...' : 'Updated'}
      </Button>
    </>
  );
};

export default AdminPostEditScreen;
