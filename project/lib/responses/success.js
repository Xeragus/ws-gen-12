module.exports = (res, status, message, data) => {
  res.status(status).send({
    error: false,
    message: message,
    data,
  });
}