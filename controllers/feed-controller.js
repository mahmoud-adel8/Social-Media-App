import PostService from '../services/post-services.js';

export default class FeedController {
  static async getPosts(req, res, next) {
    try {
      const posts = await PostService.findAll();
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
      const post = await PostService.findById(postId);
      res
        .status(200)
        .json({ message: 'Post fetched successfully.', post: post });
    } catch (err) {
      next(err);
    }
  }

  static async createPost(req, res, next) {
    try {
      const post = await PostService.save(req.body);
      res.status(201).json({
        message: 'a post was created successfully.',
        post: post,
      });
    } catch (err) {
      next(err);
    }
  }
}
