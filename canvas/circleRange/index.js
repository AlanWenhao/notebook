class Circle {
    constructor(options) {
        this.canvas = document.querySelector(options.selector);
        this.cWidth = this.canvas.width;
        this.cHeight = this.canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.sRadian = - Math.PI / 2; // 默认起点
        this.percent = 0; // 当前分数
        this.highScore = 0;
        this.step = Math.PI * 2 / 100; // 每一分对应的弧度
        this.isRunning = false; // 是否正在加分
        this.stack = []; // 存放每次增加的分数，便于维护异步任务，避免同一时间发生两次绘制任务
        // window.requestAnimationFrame(this.draw);
    }

    /**
     * 绘制函数触发器
     * @param {Number} newScore 要增加的分数
     */
    grow(newScore) {
        this.highScore += newScore; // 跟新总分
        this.stack.push(newScore); // 更新队列
        this.next();
    }

    /**
     * 绘制函数
     */
    stepDraw() {
        this.isRunning = true;
        this.percent += 1;
        this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);

        this.drawCircle(this.cWidth / 2, this.cHeight / 2, 100, this.sRadian, this.percent * this.step, '#fff', 12);

        if (this.percent < this.highScore) {
            window.requestAnimationFrame(this.stepDraw.bind(this));
        } else {
            this.isRunning = false;
        }
    }

    next() {
        if (!this.isRunning) { // 如果一次加分已经完成，进行下一次加分
            this.stepDraw();
        } else { // 如果一次加分没有完成，递归检测
            setTimeout(() => {
                this.next();
            }, 50);
        }
    }

    drawCircle(x, y, r, sRadian, eRadian, color, lineWidth) {
        this.ctx.beginPath();
        this.ctx.lineCap = "round";
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.arc(x, y, r, sRadian, eRadian + this.sRadian, false); // 顺时针，注意终点要加上起点的改变量
        this.ctx.stroke();
    }
}
const circle = new Circle({
    selector: '#canvas'
});
circle.grow(10);
circle.grow(40);
circle.grow(10);



