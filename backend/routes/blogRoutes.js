import express from 'express';
const router = express.Router();
import { 
  getBlogs, 
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} from '../controllers/blogControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/')
.get(getBlogs)
.post(protect, admin, createBlog)

router.route('/:id')
  .get( getBlogById)
  .put(protect, admin, updateBlog)
  .delete(protect, admin, deleteBlog);




export default router;

