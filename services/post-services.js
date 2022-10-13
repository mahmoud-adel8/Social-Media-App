import * as dotenv from 'dotenv';

import PostModel from '../models/post-model.js';
import {
  clearImage,
  imagePathToUrl,
  imageUrlToPath,
} from '../util/file-helper.js';

dotenv.config();

const postsPerPage = 2;

export default class PostService {
  static async getPosts(pageNum) {
    try {
      return await PostModel.find()
        .skip((pageNum - 1) * postsPerPage)
        .limit(postsPerPage);
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      throw err;
    }
  }

  static async getPostById(_id) {
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
      const post = this.getPostById(postId);

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

  static async deleteById(postId) {
    try {
      const post = await this.getPostById(postId);
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
