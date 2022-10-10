import PostService from '../services/post-services.js';

export default class FeedController {

  static async getPosts(req, res, next) {
    const posts = await PostService.findAll();
    res.status(200).json(posts);
  }

  static async createPost(req, res, next) {
    try {
      const post = await PostService.save(req.body);
      res.status(201).json({
        message: 'a post was created successfully.',
        post: post,
      });
    } catch (err) {
      console.log(err);
    }
  }

}
