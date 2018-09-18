const mongoose = require('mongoose');
const connection = require('./index');

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String
}, { timestamps: true }); // 加时间戳

// 定义模型，如果没有第二个参数，该方法意为获取模型
const User = connection.model('User', UserSchema);

module.exports = User;
