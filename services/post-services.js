import * as dotenv from 'dotenv';

import PostModel from '../models/post-model.js';
import {
  clearImage,
  imagePathToUrl,
  imageUrlToPath,
} from '../util/file-helper.js';

dotenv.config();

export default class PostService {
  static async findAll() {
    try {
      return await PostModel.find();
    } catch (err) {
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
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    }
  }

  static async save(postObj) {
    try {
      const post = new PostModel({
        ...postObj,
        imageUrl: imagePathToUrl(postObj.imageUrl),
      });
      return await post.save();
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    }
  }

  static async update(postId, postObj) {
    try {
      const post = this.findById(postId);

      post.title = postObj.title;
      post.content = postObj.content;

      if (
        postObj.imageUrl &&
        post.imageUrl !== imagePathToUrl(postObj.imageUrl)
      ) {
        clearImage(imageUrlToPath(post.imageUrl));
        post.imageUrl = imagePathToUrl(postObj.imageUrl);
      }

      return await post.save();
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    }
  }

  static async delete(postId) {
    try {
      const post = await this.findById(postId);
      clearImage(imageUrlToPath(post.imageUrl));
      return await post.delete();
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    }
  }
}
