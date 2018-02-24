// this policy should be ordered AFTER isAuthenticated so the req.token is available

module.exports = function (req, res, next) {
  if (!req.token || (req.token && !req.token.isAdmin)) {
    return res.forbidden('User must have admin privileges to access this endpoint')
  }

  next()
}
