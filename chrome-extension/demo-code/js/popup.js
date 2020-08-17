console.log($);

$('#open_background').click(e => {	
	window.open(chrome.extension.getURL('background.html'));	
});

$('#show-notification').click(e => {	
	chrome.notifications.create(null, {	
		type: 'image',	
		iconUrl: 'img/hy-logo.png',	
		title: '辉跃通知',	
		message: '辉跃科技提醒您学习python了',	
		imageUrl: 'img/hy-logo.png'	
	});	
});
