//const webpack = require('webpack');//webpack5
const webpack = require('./mypack');
// import {Button} from 'antd';
const webpackOptions = require('./webpack.config');
debugger;
webpack(webpackOptions,(err,stats)=>{
    if(err){
        console.log(err);
    }else{//把结果变成JSON进行输出
      console.log('完成编译');
        /* console.log(stats.toJson({
            hash:true,//显示hash
            assets:false //不显示打包的资源
        })) */
    }
});
