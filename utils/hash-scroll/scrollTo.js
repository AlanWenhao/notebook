document.addEventListener('click', function (event) {
	event.preventDefault();
	const closestHash = event.target.closest('a[href*="#"]'); // 找到离当前事件源最近的拥有 href=#* 的 a 标签
	console.log(closestHash);

	if (closestHash) {
		const target = document.getElementById(closestHash.hash.slice(1));
		const easing = function (t) {
			return t * (2 - t);
		};

		if (target) {
			event.preventDefault();

			scrollTo(target, 300, easing, function () {
				location.hash = closestHash.hash;
			});
		}
	}
});

/**
 * 
 * @param {Number DOM} target 
 * @param {*} duration 
 * @param {Function} easing 
 * @param {*} callback 
 */
function scrollTo(target, duration, easing, callback) {
	const start = window.pageYOffset;
	const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

	const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
	const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
	const targetOffset = typeof target === 'number' ? target : target.offsetTop;
	const targetOffsetToScroll = Math.round(documentHeight - targetOffset < windowHeight ? documentHeight - windowHeight : targetOffset);

	scroll();

	function scroll() {
		const now = 'now' in window.performance ? performance.now() : new Date().getTime();
		const time = Math.min(1, ((now - startTime) / duration));
		const timeFunction = easing(time);

		window.scroll(0, Math.ceil((timeFunction * (targetOffsetToScroll - start)) + start));

		if (window.pageYOffset !== targetOffsetToScroll) {
			requestAnimationFrame(scroll);
		} else {
			window.scroll(0, start);

			callback();
		}
	}
}