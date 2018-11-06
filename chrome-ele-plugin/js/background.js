$('#test_cors').click((e) => {
    let originData = {
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
                limit: 100,
                offset: 0
            }
        },
        service: "SMSTemplateAPIService"
    };
    $.ajax({
        data: JSON.stringify(originData),
        contentType: 'application/json;charset=UTF-8',
        dataType: "json",
        type: 'POST',
        url: "https://open.shop.ele.me/api/invoke?method=SMSTemplateAPIService.querySMSTemplateList",
        success:function(result){
            alert('请求成功');
            console.log(result);
            initTable(result);
        },
        error: function(err) {
            alert('请求失败');
            console.log(err);
        }
    });
});

/**
 * 
 * @param {Object} result 请求结果
 */
function initTable(result) {
    const $tBody = $('.tbody');
    let str = '';
    result.result.result.forEach((item, index) => {
        str += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.templateNo}</td>
            <td>${item.name}</td>
            <td>${item.templateStatus === 'PASS' ? '<span style="color: #ec971f">已通过</span>' : `${item.templateStatus === 'REVIEW' ? '<span style="color: #a99cff">审核中</span>' : '<strong style="color:#f56c6c">未通过</strong>'}`}</td>
            <td>${item.commitTime.replace('T', ' ')}</td>
        </tr>`;
    });
    $tBody.html(str);
}
