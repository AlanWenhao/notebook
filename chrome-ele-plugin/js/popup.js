// $(function() {

// 	// 加载设置
// 	var defaultConfig = {color: 'white'}; // 默认配置
// 	chrome.storage.sync.get(defaultConfig, function(items) {
// 		document.body.style.backgroundColor = items.color;
// 	});
// });

// 打开后台页
$('#open_background').click(e => {
	window.open(chrome.extension.getURL('background.html'));
});

$('#invoke_background_js').click(e => {
	var bg = chrome.extension.getBackgroundPage();
	bg.startMission();
});

$('#show-notification').click(e => {
	chrome.notifications.create(null, {
		type: 'image',
		iconUrl: 'img/icon.png',
		title: '饿了么短信模板',
		message: '测试通知',
		imageUrl: 'img/icon.png'
	});
});
