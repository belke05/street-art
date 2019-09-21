function isLoggedIn(req, res, next) {
  // this is a passport.js thing
  // for any req you can check if a user is authenticated
  if (req.isAuthenticated()) next()
  else next({ status: 403, message: 'Unauthorized' })
}

module.exports = {
  isLoggedIn,
}
