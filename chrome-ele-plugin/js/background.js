
const $tBody = $('.tbody');          // record 数据插入的位置
const singlePageNum = 100;           // 每页查询的【条目数】
let currentOffset = 0;               // 当前【分页偏移】
let currentIndex = 0;                // 审查条目自定义【序号】
let recordArr = [];                  // 饿了么短信审核记录数组
let eleRecordMap = new Map()         // 饿了么短信审核记录Map
let uploadTplArr = [];               // 将要上传的模板
let willChangeArr = [];              // 店长审核中短信模板

$('#fetch-btn').click((e) => {
    currentOffset = 0;
    currentIndex = 0;
    recordArr = [];
    eleRecordMap.clear();
    uploadTplArr = [];
    willChangeArr = [];
    $tBody.html('');
    fetchUserWillChangeTpl();
});

// 给 popup 页面调用的方法
function startMission() {
    currentOffset = 0;
    currentIndex = 0;
    recordArr = [];
    eleRecordMap.clear();
    uploadTplArr = [];
    willChangeArr = [];
    $tBody.html('');
    fetchUserWillChangeTpl();
}

$('#upload-btn').click((e) => {});

/**
 * 请求用户审核中模板
 */
function fetchUserWillChangeTpl() {
    request('http://waimaicenter.superboss.cc/sms/getEleCustomSmsTemplate', { status: 1 }, true).then((res) => {
        if (res.data.length > 0) { // 如果有数据
            res.data.forEach((item) => {
                willChangeArr.push(item);
            });
            setTimeout(() => { fetchUserWillChangeTpl() }, 500);
        } else {
            console.log('用户待审核模板请求结束', willChangeArr);
            fetchUserUploadTpl();
        }
    }).catch((err) => {
        console.log('用户列表请求失败', err);
    });
}

/**
 * 请求待上传用户模板
 */
function fetchUserUploadTpl() {
    request('http://waimaicenter.superboss.cc/sms/getEleCustomSmsTemplate', { status: 0 }, true).then((res) => {
        if (res.data.length > 0) { // 如果有数据
            res.data.forEach((item) => {
                uploadTplArr.push(item);
            });
            setTimeout(() => { fetchUserUploadTpl() }, 500);
        } else {
            console.log('用户未上传模板请求结束', uploadTplArr);
            circleUpload(uploadTplArr);
        }
    }).catch((err) => {
        console.log('用户列表请求失败', err);
    });
}

/**
 * 循环上传模板方法
 * @param {String} title 
 * @param {Content} content 
 */
function circleUpload(tplArr) {
    if (tplArr.length > 0) {
        const arr = [];
        tplArr.forEach((item) => {
            arr.push(singleUpload(item));
        });
        Promise.all(arr).then(() => {
            startFetchRecords();
        }).catch((err) => {
            console.log(err);
        })
    } else {
        startFetchRecords();
    }
}

/**
 * 配合 circleUpload 函数使用
 * @param {Object} item 店长后台获取到的【单条】【待上传】模板
 */
function singleUpload(item) {
    return request('https://open.shop.ele.me/api/invoke?method=SMSTemplateAPIService.saveSMSTemplate', initUploadData(item.titleName, item.message), false, true);
}

/**
 * 请求【饿了么】审核记录
 */
function startFetchRecords() {
    let originData = initFetchData(singlePageNum, currentOffset);
    request('https://open.shop.ele.me/api/invoke?method=SMSTemplateAPIService.querySMSTemplateList', originData, false, true).then((res) => {
        if (!res.result) { // 请求有 err
            // 请求出错
        } else {  // 请求成功  
            if (res.result.result.length === 0) {
                initRecordMap(recordArr); // 初始化 Map 数据
                setTimeout(() => {
                    multipleUpdateNew(uploadTplArr);
                    multipleUpdateOld(willChangeArr);
                    notice('饿了么短信模板', '任务完成，点击按钮进行下一轮。');
                }, 2000);
            } else {
                initTable(res.result.result);
                res.result.result.forEach((item) => {
                    recordArr.push(item);
                });
                currentOffset += singlePageNum; // 更新下次请求偏移量
                setTimeout(() => { startFetchRecords(); }, 500); // 暂停0.5继续执行
            }
        }
    }).catch((err) => {
        console.log(err);
        alert('出错,请查看控制台');
    });
}


/**
 * 跟新饿了么记录 Map
 * @param {Array} arr 
 */
function initRecordMap(arr) {
    arr.forEach((item) => {
        // 审核中：1； 成功：2； 失败：3；
        eleRecordMap.set(item.name, { templateNo: item.templateNo, status: item.templateStatus === 'PASS' ? 2 : item.templateStatus === 'REVIEW' ? 1 : 3 });
    });
    console.log(eleRecordMap);
}

/**
 * 批量更新新上传的模板状态
 * @param {Array} arr 要跟新的数组 Array<Object>，object包含 status, code, title
 * @param {Number} status 
 */
function multipleUpdateNew(arr) {
    if (arr.length) {
        arr.forEach((item) => {
            let currentObj = eleRecordMap.get(item.titleName);
            console.log('刚上传的', currentObj);
            updateTplStatus(1, currentObj.templateNo, item.titleName);
        });
    } else {
        console.log('没有要更新的【新上传】模板');
    }
}

function multipleUpdateOld(arr) {
    const willUpdateArr = [];
    if (arr.length) {
        arr.forEach((item) => {
            let currentObj = eleRecordMap.get(item.titleName);
            if (currentObj && currentObj.status !== 1) {
                updateTplStatus(newStatus, currentObj.templateNo, item.titleName);
            }
        });
    }
}

/**
 * 更新短信模板状态
 * @param {Number} status 
 * @param {String} name 
 * @param {String} msg 
 */
function updateTplStatus(status, code, title) {
    const data = {
        status: status,
        templateIdentifier: code,
        titleName: title
    }
    return request('http://waimaicenter.superboss.cc/sms/updateEleCustomSmsTemplate', data, true, false);
}

/**
 * 得到请求数据，更新 DOM
 * @param {Object} result 请求结果
 */
function initTable(arr) {
    let str = '';
    arr.forEach((item, index) => {
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
    currentIndex += arr.length; // 更新【record序号】
}

/* ------------------- 公用方法 ----------------------- */

/**
 * 请求函数
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Boolean} isFormData 是否是formData格式
 * @param {Boolean} shouldParseString 是否需要stringify json 数据
 * @return {Promise}
 */
function request(url, data, isFormData = false, shouldParseString = false) {
    return new Promise((resolve, reject) => {
        $.ajax({
            data: shouldParseString ? JSON.stringify(data) : data,
            contentType: isFormData ? 'application/x-www-form-urlencoded' : 'application/json;charset=UTF-8',
            dataType: "json",
            type: 'POST',
            url: url,
            success:function(result){
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

function notice(title, msg) {
    chrome.notifications.create(null, {
        type: 'image',
        iconUrl: 'img/icon.png',
        title: title,
        message: msg,
        imageUrl: 'img/icon.png'
    });
}



/**
 * 思路
 * 1：
 * （1）轮训饿了么【记录】，保存数据
 * （2）轮训【用户模板】，保存数据
 * （3）轮训【用户模板 -- 未审核】 --->  提交审核
 * （4）轮训【用户模板 -- 审核中】 --->  与【记录】比较状态 --->  上传【变更模板】
 * 
 * 2：
 * （1）定时执行 1 中四步操作（顺序待确定）
 */


 /**
  * 实现中注意点：
  * 1.异步任务管理
  * （1）分页查询【记录】
  * （2）递归【用户模板 -- 未审核】   不用递归，用Promise.all
  * （3）递归【用户模板 -- 审核中】
  */


  /**
   * chrome 插件机制先注意的地方
   * 1.插件一旦开启，任务将在浏览器后台进行。
   * 2.如果打开【后台】页面，正在后台的执行的任务【不会停止】。这时候会有两个任务同时在跑
   * 3.打开background页面，店长用户数据的情况
   */

   /**
    * 最终实现：
    * 请求【待更新】 => 请求【待上传】 => 上传模板 => 请求【饿了么审核记录】 => 比较【提取数据】 =>  跟新【待上传】状态 => 更新【待更新】状态
    */
