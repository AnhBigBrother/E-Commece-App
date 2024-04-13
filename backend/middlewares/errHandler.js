const errHandler = (err, req, res, next) => {
  return res.status(err.code || 500).json({
    error: err.message || "Something went wrong",
    success: err.success,
  });
};

export default errHandler;
