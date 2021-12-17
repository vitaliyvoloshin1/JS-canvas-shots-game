var canvas = document.getElementById('myCan')
var ctx = canvas.getContext('2d')

var ballRadius = 10;

var x = canvas.width/2;
var y = canvas.height-30;

var dx = 10;
var dy = -10;

var padH = 10;
var padW = 80;
var padX = (canvas.width-padW) / 2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 5;
var brickColumnCount = 11;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffseLeft = 30;

var lives = 3;

var score = 0;

var bricks = [];
for(var c=0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r < brickRowCount; r++) {
        bricks[c][r] = {x: 0, y: 0, status: 1};
    }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = true;
    }
    else if(e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.key == 'Right' || e.key == 'ArrowRight') {
        rightPressed = false;
    }
    else if(e.key == 'Left' || e.key == 'ArrowLeft') {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        padX = relativeX - padW / 2;
    }
}

function collisionDetection() {
    for(var c=0; c < brickColumnCount; c++) {
        for(var r=0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount*brickColumnCount) {
                        alert('ты прошел игру');
                        document.location.reload();
                        clearInterval(interval);
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = '16px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('Счет: '+ score, 8, 20);
}

function drawLives() {
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('жизни: '+lives, canvas.width-65, 20);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2)
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();
}

function drawPad() {
    ctx.beginPath();
    ctx.rect(padX, canvas.height-padH, padW, padH);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(var c=0; c < brickColumnCount; c++) {
        for(var r=0; r < brickRowCount; r++) {
            if( bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffseLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = 'green';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks()
    drawBall();
    drawPad();
    drawScore();
    drawLives();
    collisionDetection();

    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height-ballRadius) {
        if(x > padX && x < padX + padW) {
            dy =- dy;
        } else {
            lives--;
            if(!lives) {
                alert('game over');
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 10;
                dy = -10;
                padX = (canvas.width-padW)/2;
            }
        }
    }

    if (rightPressed && padX < canvas.width-padW) {
        padX += 15;
    } else if (leftPressed && padX > 0) {
        padX -= 15;
    }

    x += dx;
    y += dy;

    requestAnimationFrame(draw);
}
draw();































