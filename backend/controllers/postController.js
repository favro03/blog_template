import asyncHandler from '../middleware/asyncHandler.js';
import Post from '../models/postModel.js';

// @desc    Fetch all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
  res.json({ posts });
});

// @desc    Fetch single post
// @route   GET /api/posts/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {

  const post = await Post.findById(req.params.id);
  if (post) {
    return res.json(post);
  } else {
    // NOTE: this will run if a valid ObjectId but no product was found
    // i.e. product may be null
    res.status(404);
    throw new Error('Post not found');
  }
});

// @desc    Create a post
// @route   POST /api/posts
// @access  Private/Admin
const createPost = asyncHandler(async (req, res) => {
  const post = new Post({
    title: '',
    authorFirstName: '',
    authorLastName: '',
    date: '',
    blog:'',
    category: '',
    isFeature: true,
    isArchive: false
  });
  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private/Admin
const updatePost = asyncHandler(async (req, res) => {
  const {
    title,
    authorFirstName,
    authorLastName,
    date,
    blog,
    category,
    isFeature,
    isArchive
  } = req.body;

  const post = await Post.findById(req.params.id);

  if (post) {
    post.title=title
    post.authorFirstName=authorFirstName
    post. authorLastName=authorLastName
    post.date=date
    post.blog=blog
    post.category=category
    post.isFeature=isFeature
    post.isArchive=isArchive
    
    const updatePost = await post.save();
    res.json(updatePost);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});


// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    await Post.deleteOne({ _id: post._id });
    res.json({ message: 'Post removed' });
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

export { createPost, updatePost, getPosts, getPostById, deletePost };
