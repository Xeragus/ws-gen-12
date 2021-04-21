module.exports = (res, status, error) => {
  res.status(status).json({
    error: true,
    message: error.message,
  });
}