# Mongodb

## 概念
- MongoDB是一个基于分布式 **文件存储** 的 **非关系型** 开源数据库系统
- MongoDB 将数据存储为一个文档，数据结构由键值(key=>value)对组成。MongoDB 文档类似于 JSON 对象。字段值可以包含其他文档，数组及文档数组
- 数据库database、集合collection、文档document

> mysql oracle db2 是常见的集中型 **关系型** 数据库
> 集中型数据库数据存放在一个硬盘中，即使容量很大
> 分布式可以将数据储存在多台机器上，形成集群 

## 使用场景
### 适用
- 数据量太大
- 并发量太大

### 例子
- 用户播放视频时候记录用户的播放的时间，当用户关闭视频重新打开后从当前位置开始播放（每隔10s向数据库中写入一条记录）

## 使用
- mongodb数据库不同于mysql，直接使用时，当数据库不存在，执行`mongoose.connect('db location')`会自动创建

### Schema
- 用于定义数据库集合的骨架模型，定义了集合中字段的名称和类型以及默认值
- 没有操作数据库的能力

```js
const personSchema = new mongoose.Schema({
    name: String,
    living: Boolean,
    birthday: Date,
    age: Number,
    _id: Schema.Types.ObjectId, // 主键,primary key 会自动生成，唯一不重复
    _fk: Schema.Types.ObjectId, // 外键,foreign key 与另一个集合的主键对应
    ...
})
// 内部还会生成 _v, 内部使用，用来解决并发, 记录修改次数版本号，当多个用户同时操作数据库的时候，如果查询与写入的操作对应的版本号不一致，则写入会失败
```

### Model
通过Schema构造而成，除了具有Schema定义的数据库骨架之外，还可以操作数据库

### Entity
用来描述一个个体
```js
const user1 = new User({ name: 'Ben', age: 20 });
console.log(user1); // 这时候能够打印出，但是还没有保存到数据库

user1.save((err, doc) => {
    console.log(err);
    console.log(doc);
})
```

> 所有的mongoose方法都会返回一个 `Promise`，可以不必使用回调函数

### 使用方法总结
```js
/*--------- 直接对生成的模型使用create方法新建数据 ----------*/
const mongoose = require('mongoose');
const connection = mongoose.createConnection('数据库连接地址');

const UserSchema = {
    name: String,
    age: Number
}

const User = connection.model('User', UserSchema); // 这里默认生成的模型名字 users
User.create({ name: 'xxx', age 18 }, (err) => {}); // 回调函数形式


/* --------------- 对模型先创建在保存 ----------------*/
const mongoose = require('mongoose');
const connection = mongoose.createConnection('数据库连接地址');

const UserSchema = {
    name: String,
    age: Number
}

const User = connection.model('User', UserSchema);
const user = new User({ name: 'Ben', age: 20 });
user.save((err, doc) => { // save 方法返回 Promise，可以不使用 回调函数的形式
    console.log(err);
    console.log(doc);
});
// user.save().then()
```