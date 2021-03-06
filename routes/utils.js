function requireAdmin(req, res, next) {
    if(req.user.isAdmin) {
        next({
            name: "NotAuthorized",
            message: "You must be an admin to perform this action"
        })
    }
    next();
}

function requireUser(req, res, next) {
    if (!req.user) {
        next({
          name: "MissingUserError",
          message: "You must be logged in to perform this action",
        });
      }
    
      next();
}

module.exports = {
    requireAdmin,
    requireUser
}