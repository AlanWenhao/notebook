const path = require('path');
module.exports = {
    mode:'development',//development production
    devtool:'none',//开发工具
    entry:'./src/index.js',
   /*   entry:{
        page1:'./src/page1.js',
        page2:'./src/page2.js',
        page3:'./src/page3.js'
    }, */
    output:{
        path:path.join(__dirname,'dist'),//输出的目录
        filename:'main.js'
    },
    /* optimization:{
        splitChunks:{
            cacheGroups:{
                vendors:{
                    chunks:'initial',//指定分割的类型，默认3种选项 all async initial
                    name:'vendors',//给分割出去的代码块起一个名字叫vendors
                    test:/node_modules/,//如果模块ID匹配这个正则的话，就会添加一vendors代码块
                    priority:-10 //优先级
                },
                commons:{
                    chunks:'initial',
                    name:'commons',
                    minSize:0,//如果模块的大小大于多少的话才需要提取
                    minChunks:2,//最少最几个chunk引用才需要提取
                    priority:-20
                }
            }
        }
    } */
}