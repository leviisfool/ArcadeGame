var blockWidth = 101;
var blockHeight = 83;
var supplementY = 60;

// 这是我们的玩家要躲避的敌人 
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.init();
};

Enemy.prototype.init = function() {
    this.x = -blockHeight;
    this.y = Math.floor(Math.random() * 3) * blockHeight + supplementY;
    this.speed = Math.floor(Math.random() * 100) + supplementY;
};
// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += this.speed * dt;

    if(this.x > canvas.width) {
        this.init();
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.init();
};

Player.prototype.init = function() {
    this.x = 2 * blockWidth;
    this.y = 4 * blockHeight + supplementY;
};

Player.prototype.update = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if(key == 'left') {
        this.moveX(-1);
    }
    if(key == 'up') {
        this.moveY(-1);
    }
    if(key == 'right') {
        this.moveX(1);
    }
    if(key == 'down') {
        this.moveY(1);
    }
};
Player.prototype.moveX = function(step) {
    var newX = this.x + step * blockWidth;
    if(newX >= 0 && newX < canvas.width)
        this.x = newX;
};

Player.prototype.moveY = function(step) {
    var newY = this.y + step * blockHeight;
    if(newY > 0 - supplementY && newY < 6 * blockHeight - supplementY)
        this.y = newY;
    console.log(this.y);
};

Player.prototype.isWin = function() {
    return this.y <= 0;
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = new Player();


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
