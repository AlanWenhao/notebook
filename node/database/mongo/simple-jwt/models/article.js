const mongoose = require('mongoose');
const connection = require('./index');

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: String,
    category: String,
    content: String
}, { timestamps: true }); // 加时间戳

// 定义模型，如果没有第二个参数，该方法意为获取模型
const Article = connection.model('Article', ArticleSchema);

module.exports = Article;
