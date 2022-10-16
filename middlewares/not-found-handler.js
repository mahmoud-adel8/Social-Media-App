export async function notFoundHandler (req, res, next) {
  const { url } = req;
  const err = new Error(`URL not found: ${url}`);
  err.statusCode = 404;
  next(err);
};