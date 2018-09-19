const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const connection = require('./index');

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String
}, { timestamps: true }); // 加时间戳

UserSchema.pre('save', function(next) {
    bcrypt.genSalt((err, salt) => {
        if (err) return console.log(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            next();
        })
    });
})

// 定义模型，如果没有第二个参数，该方法意为获取模型
const User = connection.model('User', UserSchema);

module.exports = User;
