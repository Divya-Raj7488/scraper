const errorHandler = (err, req, res, next) => {
  const statusCode = err.response?.status
  const mssg = err.message
  return res
    .status(statusCode ?? 500)
    .json({ message: mssg ?? 'Internal server Errorr' })
}

export default errorHandler
