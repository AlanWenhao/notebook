class Circle {
    constructor(options) {
        this.canvas = document.querySelector(options.selector);
        this.canvas.width = document.body.clientWidth;
        this.cWidth = this.canvas.width;
        this.cHeight = this.canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.sRadian = - Math.PI / 2; // 默认起点
        this.percent = 0; // 当前分数
        this.highScore = 0;
        this.step = Math.PI * 2 / 100; // 每一分对应的弧度
        this.isRunning = false; // 是否正在加分
        // window.requestAnimationFrame(this.draw);
    }

    /**
     * 绘制函数触发器
     * @param {Number} newScore 要增加的分数
     */
    grow(newScore) {
        this.highScore += newScore; // 跟新总分
        while (!this.isRunning) {
            this.stepDraw();
        }
    }

    /**
     * 绘制函数
     */
    stepDraw() {
        this.isRunning = true;
        this.percent += 1;
        // this.ctx.globalCompositeOperation = 'destination-over';
        this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);

        this.drawCircle(this.cWidth / 2, this.cHeight / 2, 100, this.sRadian, this.percent * this.step, '#fff', 12);
        this.drawText();
        // this.drawPoint();

        if (this.percent < this.highScore) {
            window.requestAnimationFrame(this.stepDraw.bind(this));
        } else {
            this.isRunning = false;
            window.cancelAnimationFrame(this.stepDraw);
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

    drawText() {
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '40px PT Sans';
        const textWidth = this.ctx.measureText(this.percent+'分').width;
        this.ctx.fillText(this.percent + '分', this.cWidth / 2 - textWidth / 2, this.cHeight / 2 + 15);
    }

    drawPoint() {
        // this.ctx.globalCompositeOperation = 'destination-over';
        // this.ctx.save();
        // this.ctx.fillStyle = '#fff';
        // this.ctx.fillRect(this.cWidth, this.cHeight, 50, 50);
        // this.ctx.rotate(5);
        // this.ctx.restore();
        // this.ctx.save();                  // 保存当前状态
        // this.ctx.translate(this.cWidth, this.cHeight);
        // this.ctx.fillStyle = '#FFF'       // 再次改变颜色配置
        // this.ctx.globalAlpha = 0.5;    
        // this.ctx.fillRect(0, 0, 90, 90);
        // this.ctx.restore();
    }
}
const circle = new Circle({
    selector: '#canvas'
});

circle.grow(10);

circle.grow(10);
setTimeout(() => {
    circle.grow(10);
}, 1500)
setTimeout(() => {
    circle.grow(20);
}, 3000)
setTimeout(() => {
    circle.grow(25);
}, 4500)

