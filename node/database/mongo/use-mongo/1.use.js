const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/school';

const connection = mongoose.createConnection(DB_URL, { useNewUrlParser: true });

// 如果类型不匹配，失败报错，创建字段多了则忽略，少了则置为空
// schema 并没有操作数据库的能力，仅仅是一个骨架
const UserSchema = {
    name: String,
    age: Number
}

// 通过connection可以定义一个模型，这个模型可以操作数据库
// 集合的名字如果没有指定，则 User => user => users，当然可以通过 { collection: 'modelName' } 来指定model的name
// 比如const User = new mongoose.Schema({ name: String, age: Number }, { collection: 'user }); 这时候就不会是 users 了
const User = connection.model('User', UserSchema);

/* User.create({ name: 'Alan', age: 18 }, (err, doc) => {
    console.log(err);
    console.log(doc);
}) */


/* const user1 = new User({ name: 'Ben', age: 20 });
user1.save((err, doc) => {
    console.log(err);
    console.log(doc);
}); */


/* async function insertUser(obj) {
    const user = new User(obj);
    await user.save();
    return user;
}
insertUser({ name: 'Dylen', age: 22 }).then(data => {
    console.log(data);
}); */


// const user2 = new User({ name: 'Even', age: 30 });
// user2.save().then((doc) => {
//     console.log(doc);
// });


/* User.update({ name: 'Even' }, { age: 18 }, (err, result) => {
    console.log(err);
    console.log(result);
}); */


/* User.remove({ name: 'Dylen' }, (err, result) => {
    console.log(err);
    console.log(result);
}); */


User.find({ name: 'Even' }, (err, docs) => {
    if (err) return console.log(err);
    docs[0].remove().then((e) => {
        console.log(e);
    });
});
