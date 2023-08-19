import express from 'express';
const router = express.Router();
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/')
.get(getPosts)
.post(protect, admin, createPost)

router.route('/:id')
  .get( getPostById)
  .put(protect, admin, updatePost)
  .delete(protect, admin, deletePost);




export default router;

