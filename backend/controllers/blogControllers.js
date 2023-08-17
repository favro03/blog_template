import asyncHandler from 'express-async-handler'
import Blog from "../models/blogModel.js";

// @desc   Fetch all blogs
// @route  GET /api/blog
// @access Public
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

// @desc   Create a new blog
// @route  POST /api/blog
// @access Private
const createBlog = asyncHandler(async (req, res) => {
  
  const blog = new Blog({
    title: '',
    authorFirstName: '',
    authorLastName: '',
    date: '',
    post:'',
    category: '',
    isFeature: true,
    isArchive: false
  });

  const createdBlog = await blog.save();

  res.status(201).json(createdBlog);
});

// @desc   Update a blog
// @route  PUT /api/blog/:id
// @access Private
const updateBlog = asyncHandler(async (req, res) => {
  const {
    title,
    authorFirstName,
    authorLastName,
    date,
    post,
    category,
    isFeature,
    isArchive
  } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.title=title
    blog.authorFirstName=authorFirstName
    blog. authorLastName=authorLastName
    blog.eate=date
    blog.post=post
    blog.category=category
    blog.isFeature=isFeature
    blog.isArchive=isArchive
    
    const updateBlog = await blog.save();
    res.json(updateBlog);
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});


// @desc   Get a single blog by ID
// @route  GET /api/blog/:id
// @access Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

// @desc   Delete a blog
// @route  DELETE /api/blog/:id
// @access Private
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await blog.deleteOne();
    res.json({ message: "Blog removed" });
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

export { createBlog, updateBlog, getBlogs, getBlogById, deleteBlog };
