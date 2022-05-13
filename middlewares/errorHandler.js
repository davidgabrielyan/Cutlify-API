export default (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.code);
  return res.json({ message: err.message });
};
