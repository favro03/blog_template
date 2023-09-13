import React, { useState } from 'react';
import CreateNew from '../../components/CreateNew';
import { useCreatePostMutation } from '../../slices/postsApiSlice';

const AdminPostCreateScreen = () => {
  const [createPost, { isLoading: loadingCreate }] = useCreatePostMutation();

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

  const handleSubmit = async () => {
    try {
      // Call the createPost mutation with formData
      const response = await createPost(formData);
      console.log('Response:', response);
      // Check if the mutation was successful
      if (response.payload) {
        console.log('Post created:', response.payload);
        // Optionally, you can reset the form here
        setFormData({
          title: '',
          authorFirstName: '',
          authorLastName: '',
          date: '',
          blog: [],
          category: '',
          isFeature: false,
          isArchive: false,
        });
     
        // You can also redirect or perform any other actions
      }
    } catch (error) {
      console.error('Error creating post:', error);
      // Handle the error, show an error message, or perform any other actions
    }
  };

  return (
    <div>
      <h1>Create Post</h1>
      <CreateNew formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
      {/* Submit button in AdminPostCreateScreen */}
      <button onClick={handleSubmit} disabled={loadingCreate}>
        {loadingCreate ? 'Creating...' : 'Submit'}
      </button>
    </div>
  );
};

export default AdminPostCreateScreen;
