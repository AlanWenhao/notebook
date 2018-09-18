const express = require('express');
const User = require('../models/user')

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

router.post('/test', (req, res) => {
    console.log(req.body);
    res.send({
        code: 0,
        data: { msg: 'yes' }
    });
});

module.exports = router;
