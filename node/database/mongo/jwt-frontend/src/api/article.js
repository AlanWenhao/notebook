import  { post } from './index';

function addArticle(body) {
    return post('/articles/addArticle', body)
}

export default {
    addArticle
}
