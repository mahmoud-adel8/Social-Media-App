import PostModel  from "../models/post-model.js";

export default class PostService {

  static async findAll() {
    try {
      return await PostModel.find();
    } catch(err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    }
  }

  static async findById(_id) {
    try {
      const post = await PostModel.findById(_id);
      if (!post) {
        const err = new Error('Post cannot be found');
        err.statusCode = 500;
        throw err;
      }
      return post;
    } catch(err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    }
  }

  static async save(postObj) {
    try {
      const post = new PostModel(postObj);
      return await post.save();
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    }
  }

}