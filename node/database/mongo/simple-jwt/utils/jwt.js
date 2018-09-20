const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

function sign(payload) {
    return jwt.sign(payload, SECRET_KEY, {
        expiresIn: 600
    });
}

const verify = (mustAdmin) => (req, res, next) => {
    const jwtToken = req.headers.authorization; // 客户端发送的token
    if (jwtToken) {
        jwt.verify(jwtToken, SECRET_KEY, (err, payload) => {
            if (err) { // 1、token被篡改。2、token过期
                console.log(err);
                if (err.name === 'TokenExpiredError') res.error('token过期');
                else res.error('无效token');
            } else {
                if (mustAdmin) {
                    const { admin } = payload;
                    if (admin) next();
                    else res.error('您无权执行此操作');
                } else {
                    next();
                }
            }
        });
    } else {
        res.error('请提供token');
    }
}

module.exports = {
    sign,
    verify
}
