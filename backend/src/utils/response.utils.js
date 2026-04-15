const sendResponse = (res, message, statusCode, data = null) => {
  res.status(statusCode).json({
    success: statusCode < 400,
    message,
    data,
  });
};
module.exports = sendResponse;
