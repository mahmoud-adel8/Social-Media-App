import * as dotenv from 'dotenv';

import PostModel from '../models/post-model.js';
import APIError from '../util/api-error.js';
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
    } catch (error) {
      throw APIError.from(error);
    }
  }

  static async getPostById(_id) {
    try {
      const post = await PostModel.findById(_id);
      if (!post) {
        throw APIError.badRequest();
      }
      return post;
    } catch (error) {
      throw APIError.from(error);
    }
  }

  static async save(postObj) {
    try {
      const post = new PostModel({
        ...postObj,
        imageUrl: imagePathToUrl(postObj.imageUrl),
      });
      return await post.save();
    } catch (error) {
      throw APIError.from(error);
    }
  }

  static async update(postId, postObj) {
    try {
      const post = await this.getPostById(postId);

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
    } catch (error) {
      throw APIError.from(error);
    }
  }

  static async deleteById(postId) {
    try {
      const post = await this.getPostById(postId);
      clearImage(imageUrlToPath(post.imageUrl));
      return await post.delete();
    } catch (error) {
      throw APIError.from(error);
    }
  }
}
