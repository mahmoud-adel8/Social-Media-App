export default class FeedController {
  static getPosts(req, res, next) {
    res.status(200).json({
      title: 'First Post',
      content: 'This is the first post',
    });
  }

  static createPost(req, res, next) {
    const title = req.body.title;
    const content = req.body.content;
    res.status(201).json({
      message: 'a post was created successfully.',
      post: { title: title, console: content },
    });
  }
}
