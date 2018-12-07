const $tBody = $('.tbody');                                 // 表格body
const $recordBody = $('.record-body');                      // record 表格 body
const $fetchBtn = $('#fetch-btn');                          // 获取用户模板
const $compare = $('.compare');                             // 更新状态
const $showBtn = $('.show-btn');                            // 显示隐藏审核记录
const $updataNumDom = $('.will-change-success');            // 显示更新数量的DOM
const $eleTplNumDom = $('.will-change-ele')                 // 饿了么远程审核记录
const singlePageNum = 100;                                  // 每页查询的【条目数】
let currentOffset = 0;                                      // 当前【分页偏移】
let updateSum = 0;                                          // 更新状态成功数量
let recordArr = [];                                         // 饿了么短信审核记录数组
let eleRecordMap = new Map()                                // 饿了么短信审核记录Map
let uploadTplArr = [];                                      // 用户待上传模板
let willChangeArr = [];                                     // 用户审核中模板
let timer;                                                  // 备用定时器
let intervalTime = 130;                                     // 定时器时间
let isShowRecordTable = false;                              // 是否显示 record table

$fetchBtn.on('click', function() {
    if ($fetchBtn.hasClass('disabled')) {
        return;
    }
    $fetchBtn.addClass('disabled');
    $tBody.html('');
    uploadTplArr = [];
    intervalTime = 130;
    fetchUserUploadTpl();
});

$compare.on('click', function() {
    if ($compare.hasClass('disabled')) {
        return;
    }
    currentOffset = 0;
    updateSum = 0;
    willChangeArr = [];
    recordArr = [];
    eleRecordMap.clear();
    fetchUserWillChangeTpl();
})

$showBtn.on('click', function() {
    if (!isShowRecordTable) {
        $('.record-table').show();
        isShowRecordTable = true;
    } else {
        $('.record-table').hide();
        isShowRecordTable = false;
    }
});

$tBody.on('click', function(e) {
    const target = e.target;
    if (target.nodeName === 'BUTTON') {
        const trDom = target.parentElement.parentElement;
        const currentName = trDom.getElementsByClassName('msg-name')[0].innerHTML;
        const currentContent = trDom.getElementsByClassName('msg-content-text')[0].innerHTML;
        const currentReson = trDom.getElementsByClassName('reject-text')[0].value;
        if (target.classList.contains('upload-btn')) {
            console.log(currentContent);
            singleUpload(currentName, currentContent, trDom);
        } else {
            if (target.classList.contains('disabled')) return;
            console.log('拒绝');
            singleReject(currentName, currentReson, trDom);
        }
    }
});

// 输入拒绝原因事件
$tBody.on('input', function(e) {
    const value = e.target.value;
    const trDom = e.target.parentElement.parentElement;
    const currentDelBtn = trDom.getElementsByClassName('delete-btn')[0];
    if (value !== '') {
        currentDelBtn.classList.remove('disabled');
    } else {
        currentDelBtn.classList.add('disabled');
    }
});

/**
 * 获取用户待审核模板
 */
function fetchUserWillChangeTpl() {
    request('http://waimaicenter.superboss.cc/sms/getEleCustomSmsTemplate', { status: 1 }, true).then((res) => {
        if (res.data.length > 0) { // 如果有数据
            res.data.forEach((item) => {
                willChangeArr.push(item);
            });
            setTimeout(() => { fetchUserWillChangeTpl() }, 500);
        } else {
            startFetchRecords();
            console.log('用户审核中模板请求结束', willChangeArr);
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
            if (uploadTplArr.length === 0) {
                alert('没有待上传模板');
            }
            // 暂停更新状态按钮 130s
            $compare.addClass('disabled');
            $fetchBtn.removeClass('disabled');
            initTable(uploadTplArr);
            if (timer) {
                clearInterval(timer);
            }
            timer = setInterval(() => {
                intervalTime -= 1;
                $compare.html(`更新状态${intervalTime}s`);
            }, 1000);
            setTimeout(() => {
                $compare.html(`更新状态`);
                clearInterval(timer);
                $compare.removeClass('disabled');
            }, 130000);
        }
    }).catch((err) => {
        console.log('用户列表请求失败', err);
    });
}

/**
 * 同意上传
 * @param {*} name 
 * @param {*} content 
 * @param {*} trDom 
 */
function singleUpload(name, content, trDom) {
    request('https://open.shop.ele.me/api/invoke?method=SMSTemplateAPIService.saveSMSTemplate', initUploadData(name, content), false, true).then((res) => {
        console.log(res);
        if (!res.error) {
            updateTplStatus(1, name, '').then(() => {
                trDom.style.background = '#f0f0f0';
                trDom.getElementsByClassName('msg-action')[0].innerHTML = '<span style="color:#999;">已上传</span>';
            }).catch(() => {
                alert('跟新状态接口错误，请重新“上传”');
            });
        } else {
            alert(res.error.message);
        }
    }).catch((err) => {
        alert('饿了么接口错误，请重试');
    });
}

/**
 * 拒绝上传
 * @param {*} name 
 * @param {*} content 
 * @param {*} trDom 
 */
function singleReject(name, reason, trDom) {
    updateTplStatus(3, name, reason).then(() => {
        trDom.style.background = '#f0f0f0';
        trDom.getElementsByClassName('msg-action')[0].innerHTML = '<span style="color:red;">已拒绝</span>';
        trDom.getElementsByClassName('reason-td')[0].innerHTML = trDom.getElementsByClassName('reject-text')[0].value;
    }).catch(() => {
        alert('跟新接口错误，请重新“拒绝”');
    });
}

/**
 * 更新短信模板状态 => 审核中、审核失败
 * @param {Number} status 
 * @param {String} name 
 * @param {String} msg 
 */
function updateTplStatus(status, title, reason, tplIdentifier = null) {
    let data;
    if (tplIdentifier) {
        data = {
            status: status,
            titleName: title,
            tplIdentifier: tplIdentifier,
            explanation: reason
        }
    } else {
        data = {
            status: status,
            titleName: title,
            explanation: reason
        }
    }
    return request('http://waimaicenter.superboss.cc/sms/updateEleCustomSmsTemplate', data, true, false);
}

/**
 * 更新短信模板状态 => 审核成功
 */
function updateTplStatusToSuccess(status, code, title) {
    const data = {
        status: status,
        templateIdentifier: code,
        titleName: title
    }
    return request('http://waimaicenter.superboss.cc/sms/updateEleCustomSmsTemplate', data, true, false).then(() => {
        updateSum += 1;
        updateUpdatedDomNum(updateSum);
    });
}

/**
 * 请求【饿了么】审核记录
 */
function startFetchRecords() {
    let originData = initFetchData(singlePageNum, currentOffset);
    request('https://open.shop.ele.me/api/invoke?method=SMSTemplateAPIService.querySMSTemplateList', originData, false, true).then((res) => {
        const isNoReviewing = res.result.result.filter(item => item.templateStatus === "REVIEW").length === 0; // 本轮请求的数据是否都已经审核
        if (!res.result) { // 请求有 err
            // 请求出错
        } else {  // 请求成功  
            res.result.result.forEach((item) => {
                recordArr.push(item);
            });
            if (res.result.result.length === 0 || isNoReviewing) {
                initRecordMap(recordArr); // 初始化 Map 数据
                initRecordTable(recordArr);
                updateEleTplDomNum(recordArr.length);
                setTimeout(() => {
                    multipleUpdateOld(willChangeArr);
                    $('#fetch-btn').removeClass('disabled');
                }, 2000);
            } else {
                currentOffset += singlePageNum; // 更新下次请求偏移量
                setTimeout(() => { startFetchRecords(); }, 1000); // 暂停1s继续执行
            }
        }
    }).catch((err) => {
        console.log(err);
        alert('出错,请查看控制台');
    });
}

function initRecordMap(arr) {
    arr.forEach((item) => {
        // 审核中：1； 成功：2； 失败：3；
        eleRecordMap.set(item.name, { templateNo: item.templateNo, status: item.templateStatus === 'PASS' ? 2 : item.templateStatus === 'REVIEW' ? 1 : 3 });
    });
    console.log(eleRecordMap);
}

/**
 * 批量更新待审核模板状态
 * @param {*} arr 
 */
function multipleUpdateOld(arr) {
    if (arr.length > 0) {
        arr.forEach((item) => {
            let currentObj = eleRecordMap.get(item.titleName);
            if (currentObj) {
                if (currentObj && currentObj.status === 2) {
                    console.log('更新审核通过', currentObj);
                    updateTplStatusToSuccess(currentObj.status, currentObj.templateNo, item.titleName);
                } else if (currentObj && currentObj.status === 3) {
                    updateTplStatus(currentObj.status, item.titleName, currentObj.reason, currentObj.templateNo)
                }
            }
        });
        notice('自动审核', '本轮跟审核状态更新任务完成');
    } else {
        console.log('用户待审核模板数量为0');
        $updataNumDom.html('用户待审核模板数量为0');
        notice('自动审核', '本轮跟审核状态更新任务完成');
    }
}



/**
 * 生成dom
 * @param {Array} arr 
 */
function initTable(arr) {
    if (arr.length && arr.length > 0) {
        let str = '';
        let currentSimilar = '';
        arr.forEach((item, index) => {
            currentSimilar = '';
            if (item.similarCheckResult) {
                JSON.parse(item.similarCheckResult).forEach(info => {
                    currentSimilar += `
                        <div class="msg-content-msg">
                            <div class="msg-content-msg-left">${info.message}</div>
                            <div class="msg-content-msg-right">${(Number(info.score) * 100).toFixed(2) + '%'}</div>
                        </div>
                    `
                });
            } else {
                if (item.similarCheckResult === null) currentSimilar = `<p style="text-align:center;padding:10px;">未处理</p>`;
                else currentSimilar = `<p style="text-align:center;padding:10px;">相似度小于50%</p>`;
            }
            if (item.similarCheckResult) {
                console.log(JSON.parse(item.similarCheckResult));
            }
            str += `
            <tr class="tr-group">
                <td>${index + 1}</td>
                <td class="msg-name">${item.titleName}</td>
                <td>${item.type}</td>
                <td class="msg-content">
                    <pre class="msg-content-text">${item.message}</pre>
                    <div class="msg-content-box">
                        <div style="padding: 10px;text-align: center;color: #58c4e8;">${item.message}</div>
                        ${currentSimilar}
                    </div>
                </td>
                <td class="msg-action" style="min-width: 130px;">
                    <button class="btn btn-success upload-btn">上传</button>
                    <button class="btn btn-danger delete-btn disabled">拒绝</button>
                </td>
                <td class="reason-td"><textarea class="form-control reject-text"></textarea></td>
            </tr>
            `
        });
        $tBody.append(str);
    } else {

    }
}

function initRecordTable(arr) {
    let str = '';
    arr.forEach((item, index) => {
        str += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.templateNo}</td>
            <td>${item.name}</td>
            <td><pre>${item.content}</pre></td>
            <td class="status-td">${item.templateStatus === 'PASS' ? '<span style="color: #ec971f">已通过</span>' : `${item.templateStatus === 'REVIEW' ? '<span style="color: #a99cff">审核中</span>' : '<strong style="color:#f56c6c">未通过</strong>'}`}</td>
            <td>${item.commitTime.replace('T', ' ')}</td>
        </tr>`;
    });
    $recordBody.append(str);
}


/* -------------------------- 公用函数 ------------------------- */

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

function updateUpdatedDomNum(num) {
    $updataNumDom.html(`本轮更新顾客模板${num}条`);
}

function updateEleTplDomNum(num) {
    $eleTplNumDom.html(`获取饿了么模板${num}条`);
}

