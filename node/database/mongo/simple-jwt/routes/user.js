const express = require('express');
const bcrypt = require('bcryptjs');
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

// router.post('/signin', async (req, res) => {
//     console.log(req.body);
//     const user = req.body;
//     try {
//         const doc = await User.findOne(user); // 返回值是mongo的一条数据
//         doc.comparePassword = function(password) {
//             return bcrypt.compareSync(password, this.password);
//         }
//         if (doc && doc.comparePassword(user.password)) {
//             res.success({ username: user.username })
//         } else {
//             res.error('用户名或密码错误');
//         }
//     } catch(err) {
//         res.error(err);
//     }
// })

router.post('/signin', (req, res) => {
    User.findOne(req.body).then((result) => {
        console.log('成功', result);
        res.success(result);
    }).catch((err) => {
        console.log('错误是', err);
        res.error(err);
    })
});

router.post('/test', (req, res) => {
    console.log(req.body);
    res.send({
        code: 0,
        data: { msg: 'yes' }
    });
});

module.exports = router;
