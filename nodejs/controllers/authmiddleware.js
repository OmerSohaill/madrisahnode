const { getuser } = require('../controllers/auth');

// Middleware to authenticate the user
function authenticate(req, res, next) {
    req.user = null;
    const token = req.cookies.token;
    if (!token) {
        return res.render('login');
    }

    const user = getuser(token);
    if (!user) {
        return res.render('login');
    }

    req.user = user;
    next();
}

// Middleware to restrict access based on roles
function restrictTo(roles = []) {
    return function(req, res, next) {
        if (!req.user) {
            return res.render('login');
        }

        if (!roles.includes(req.user.role)) {
            return res.render('login');
        }
        res.render('admin')

        // If user role is not allowed, render an appropriate response
        return res.status(403).send('Access denied');
    }
}

module.exports = { authenticate, restrictTo };
