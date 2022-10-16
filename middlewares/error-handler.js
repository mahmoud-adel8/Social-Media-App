export function errorHandler(error, req, res, next) {
  console.log(error);
  const statusCode = error.status || 500;
  const errorRes = { message: error.message, details: error.details };
  res.status(statusCode).json(errorRes);
}
