import APIError from '../util/api-error.js';

export async function notFoundHandler(req, res, next) {
  const { url } = req;
  next(APIError.notFound(`URL not found: ${url}`));
}
