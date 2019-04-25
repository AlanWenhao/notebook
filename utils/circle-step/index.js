const btn = document.querySelector('.white');
const blocks = document.querySelectorAll('.cell');
let index = 0;
let circleTimes = 0;
let activeNum = 0;
let timer = null;

btn.addEventListener('click', go(4), false);

function go(dest) {
    return function() {
        clearInterval(timer);
        resetData();
        timer = setInterval(() => {
            if (circleTimes >= 4 && circleTimes < 7) {
                index += .5;
            } else if (circleTimes >= 7 && circleTimes < 9) {
                index += .2;
            } else if (circleTimes >= 9) {
                index += .15;
                if (Math.floor(activeNum) === dest) clearInterval(timer);
            } else {
                index ++;
            }

            activeNum = index % 8;
            
            if (activeNum >= 0 && activeNum < 1) {
                circleTimes ++;
                console.log('当前圈数', circleTimes);
            }
            setActive(activeNum);

            console.log(activeNum);
        }, 40);
    }
}

function resetData() {
    index = 0;
    circleTimes = 0;
    activeNum = 0;
}

/**
 * 设置block active 状态，0~7
 * @param {Number} index 索引
 */
function setActive(index) {
    for (let i = 0; i < blocks.length; i ++) {
        blocks[i].classList.remove('active');
    }
    if (index >= 0 && index < 1) blocks[0].classList.add('active');
    if (index >= 1 && index < 2) blocks[1].classList.add('active');
    if (index >= 2 && index < 3) blocks[2].classList.add('active');
    if (index >= 3 && index < 4) blocks[4].classList.add('active');
    if (index >= 4 && index < 5) blocks[7].classList.add('active');
    if (index >= 5 && index < 6) blocks[6].classList.add('active');
    if (index >= 6 && index < 7) blocks[5].classList.add('active');
    if (index >= 7) blocks[3].classList.add('active');
}
