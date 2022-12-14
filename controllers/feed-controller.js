import PostService from '../services/post-services.js';
import UserService from '../services/user-services.js';
import { getIO } from '../util/socket.js';

export default class FeedController {
  static async getPosts(req, res, next) {
    const currentPage = req.query.page || 1;
    try {
      const posts = await PostService.getPosts(currentPage);
      res
        .status(200)
        .json({ message: 'Posts fetched successfully.', posts: posts });
    } catch (err) {
      next(err);
    }
  }

  static async getPost(req, res, next) {
    const postId = req.params.postId;
    try {
      const post = await PostService.getPostById(postId);
      res
        .status(200)
        .json({ message: 'Post fetched successfully.', post: post });
    } catch (err) {
      next(err);
    }
  }

  static async createPost(req, res, next) {
    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    }
    const postObj = {
      ...req.body,
      imageUrl,
      creator: req.userId,
    };
    try {
      const post = await PostService.save(postObj);
      const creator = await UserService.addPost(post);

      const io = getIO();
      io.emit('posts', { action: 'create', post: post });

      res.status(201).json({
        message: 'a post was created successfully.',
        post: post,
        creator: { _id: creator._id, name: creator.name },
      });
    } catch (err) {
      next(err);
    }
  }

  static async updatePost(req, res, next) {
    const postId = req.params.postId;
    let imageUrl = req.body.imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    }
    const postObj = {
      ...req.body,
      imageUrl,
    };
    try {
      const post = await PostService.update(postId, postObj);

      const io = getIO();
      io.emit('posts', { action: 'updated', post: post });

      res
        .status(200)
        .json({ message: 'Post updated successfully.', post: post });
    } catch (err) {
      next(err);
    }
  }

  static async deletePost(req, res, next) {
    const postId = req.params.postId;
    try {
      const deletedPost = await PostService.deleteById(postId);
      const creator = await UserService.deletePost(deletedPost);

      const io = getIO();
      io.emit('posts', { action: 'delete', post: deletedPost });

      res.status(200).json({
        message: 'Post deleted successfully.',
        post: deletedPost,
        creator: creator,
      });
    } catch (err) {
      next(err);
    }
  }
}
