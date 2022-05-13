export default (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const code = err.code || 500;
  res.status(code);
  return res.json({ message: err.message });
};
