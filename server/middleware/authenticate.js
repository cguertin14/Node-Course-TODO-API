const { User } = require('./../models/user');

const authenticate = (req,res,next) => {
    let token = req.header('x-auth');

    if (!token) {
        return res.status(401).send({
            error: 'Token is required.'
        });
    }

    User.findByToken(token).then(user => {
        if (!user) {
            return Promise.reject();
        }
        
        req.user = user;
        req.token = token;
        next();
    }).catch(e => {
        res.status(401).send({
            status: 'Invalid token.'
        });
    });
};

module.exports.authenticate = authenticate;