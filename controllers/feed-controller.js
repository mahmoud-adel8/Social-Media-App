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
    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    }
    const postObj = {
      ...req.body,
      imageUrl,
      creator: { name: req.body.creator },
    };
    try {
      const post = await PostService.save(postObj);
      res.status(201).json({
        message: 'a post was created successfully.',
        post: post,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updatePost(req, res, next) {
    const postId = req.params.postId;
    let imageUrl = req.body.imageUrl;
    if (req.file) {
      const imageUrl = req.file.path
    }
    const postObj = {
      ...req.body,
      imageUrl,
    };
    try {
      const post = await PostService.update(postId, postObj);
      res
        .status(200)
        .json({ message: 'Post updated successfully.', post: post });
    } catch (err) {
      next(err);
    }
  }
}
