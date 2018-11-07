(function(){
    const $tBody = $('.tbody');       // record 数据插入的位置
    const singlePageNum = 10;         // 每页查询的【条目数】
    let currentOffset = 0;            // 当前【分页偏移】
    let currentIndex = 0;             // 审查条目自定义【序号】

    let shouldFetchRecords = true;    // 【是否】应该请求模板记录
    let shouldUploadTpl = true;       // 【是否】应该上传新模板 

    $('#fetch-btn').click((e) => {
        startFetchRecords();
    });

    $('#upload-btn').click((e) => {
        let data = initUploadData('红包领取通知', '#shopName#双十一优惠券已发送至您账户，欢迎归店品尝~');
        request('https://open.shop.ele.me/api/invoke?method=SMSTemplateAPIService.saveSMSTemplate', data).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    });

    // const fetchRecordTimer = setInterval(() => {
    //     startFetchRecords();
    // }, 5000);


    /**
     * 请求审核记录
     */
    function startFetchRecords() {
        if (shouldFetchRecords) {
            let originData = initFetchData(singlePageNum, currentOffset);
            request('https://open.shop.ele.me/api/invoke?method=SMSTemplateAPIService.querySMSTemplateList', originData).then((res) => {
                initTable(res);
            }).catch((err) => {
                alert('ajax请求出错');
            });
        } else {
            clearInterval(fetchRecordTimer); // 清除定时器，之后不需要清除
        }
    }

    /**
     * 得到请求数据，更新 DOM
     * @param {Object} result 请求结果
     */
    function initTable(res) {
        if (res.result.result && res.result.result.length > 0) {
            currentOffset += singlePageNum;
            let str = '';
            res.result.result.forEach((item, index) => {
                str += `
                <tr>
                    <td>${currentIndex + index + 1}</td>
                    <td>${item.templateNo}</td>
                    <td>${item.name}</td>
                    <td>${item.templateStatus === 'PASS' ? '<span style="color: #ec971f">已通过</span>' : `${item.templateStatus === 'REVIEW' ? '<span style="color: #a99cff">审核中</span>' : '<strong style="color:#f56c6c">未通过</strong>'}`}</td>
                    <td>${item.commitTime.replace('T', ' ')}</td>
                </tr>`;
            });
            $tBody.append(str);
            currentIndex += res.result.result.length; // 更新【record序号】
        } else {
            shouldFetchRecords = false;
        }
    }

    /**
     * 请求函数
     * @param {String} url 请求地址
     * @param {Object} data 请求参数
     * @return {Promise}
     */
    function request(url, data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                data: JSON.stringify(data),
                contentType: 'application/json;charset=UTF-8',
                dataType: "json",
                type: 'POST',
                url: url,
                success:function(result){
                    console.log('请求成功');
                    resolve(result);
                },
                error: function(err) {
                    console.log('请求失败');
                    reject(err);
                }
            });
        })
    }

    /**
     * 生成【上传短信模板】参数
     * @param {String} title 题目
     * @param {String} content 内容
     */
    function initUploadData(title, content) {
        return {
            id: "4fde38de-1b28-423d-84ac-3404f14e6775",
            metas: {
                appName: "Odin",
                appVersion: "4.4.0",
                ksid: "NTVMODMTAwMzQ2NTk0ODU4OTAxTVZmTnlOazRQ"
            },
            method: "saveSMSTemplate",
            ncp: "2.0.0",
            params: {
                creation: {
                    content: content,
                    name: title
                }
            },
            service: "SMSTemplateAPIService"
        }
    }

    /**
     * 生成【获取审查列表】参数
     * @param {Number} limit 每页请求个数
     * @param {Number} offset 请求起点
     */
    function initFetchData(limit, offset) {
        return {
            id: "4ef6c4fb-3fc4-4746-b1ca-4a943392e1b0",
            metas: {
                appName: "Odin",
                appVersion: "4.4.0",
                ksid: "NTVMODMTAwMzQ2NTk0ODU4OTAxTVZmTnlOazRQ"
            },
            method: "querySMSTemplateList",
            ncp: "2.0.0",
            params: {
                condition: {
                    limit: limit,
                    offset: offset
                }
            },
            service: "SMSTemplateAPIService"
        }
    }
})()


/**
 * 思路
 * 1：
 * （1）轮训饿了么【记录】，保存数据
 * （2）轮训【用户模板】，保存数据
 * （3）轮训【用户模板 -- 未审核】 --->  提交审核
 * （4）轮训【用户模板 -- 审核中】 --->  与【记录】比较状态 --->  上传【变更模板】
 * 
 * 2：
 * （1）定时执行 1 中四步操作
 */


 /**
  * 实现中注意点：
  * 1.异步任务管理
  * （1）分页查询【记录】
  * （2）递归【用户模板 -- 未审核】   这里维护一个数组，循环调用【上传】，成功的放到一个数组，失败的放到一个数组
  * （3）递归【用户模板 -- 审核中】
  */


  /**
   * chrome 插件机制先注意的地方
   * 1.插件一旦开启，任务将在浏览器后台进行。
   * 2.如果打开【后台】页面，正在后台的执行的任务【不会停止】。这时候会有两个任务同时在跑
   * 3.打开background页面，店长用户数据的情况
   */
