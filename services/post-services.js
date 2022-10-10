import PostModel  from "../models/post-model.js";

export default class PostService {

  static async findAll() {
    try {
      return await PostModel.find();
    } catch(err) {
      console.log(err);
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