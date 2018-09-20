const express = require('express');
const jwt = require('../utils/jwt');
const Article = require('../models/Article');

const router = express.Router();

router.get('/listArticle', jwt.verify(), async (req, res) => {
    try {
        const articleList = await Article.find();
        res.success(articleList);
    } catch (err) {
        res.error(err);
    }
});

router.post('/addArticle', jwt.verify(true), async (req, res) => {
    console.log(req.body)
    const article = new Article(req.body);
    try {
        await article.save();
        res.success(article);
    } catch (err) {
        res.error(err);
    }
});

router.post('/test', (req, res) => {
    console.log(req.body);
    res.success({ success: "ok" })
});

module.exports = router;
