const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const { SECRET_KEY }  = require('../config');
const router = express.Router();

// 用户注册，当用户以POST请求向 /users/signup 请求的时候
router.post('/signup', async (req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    try {
        await user.save();
        res.success({ username: user.username });
    } catch(err) {
        res.error(err);
    }
});

router.post('/signin', async (req, res) => {
    console.log(req.body);
    const user = req.body;
    try {
        const doc = await User.findOne({ username: user.username }); // 返回值是mongo的一条数据
        if (doc && doc.comparePassword(user.password)) {
            const jwtToken = jwt.sign({ id: doc._id, username: doc.username }, SECRET_KEY);
            res.success({ jwtToken })
        } else {
            res.error('用户名或密码错误');
        }
    } catch(err) {
        res.error(err);
    }
})

router.post('/test', (req, res) => {
    console.log(req.body);
    res.send({
        code: 0,
        data: { msg: 'yes' }
    });
});

module.exports = router;
