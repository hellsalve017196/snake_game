// game objects
var canvas,context,keystate,frames,score;

function main() {
    canvas = document.getElementById('canvas');

    canvas.height = COLS * 20;
    canvas.width = ROWS * 20;

    context = canvas.getContext("2d");
    sessionStorage.setItem("score",0);



    frames = 0;
    keystate = {};

    document.addEventListener("keydown", function (evt) {
        console.log(evt.keyCode);
        keystate[evt.keyCode] = true;
    });

    document.addEventListener("keyup", function (evt) {
        delete  keystate[evt.keyCode];
    });

    document.getElementById("pause").addEventListener("click", function () {
        if(!PAUSE)
        {
            PAUSE = !PAUSE;
            this.innerHTML = "resume";
        }
        else
        {
            this.innerHTML = "pause";
            PAUSE = false;
        }
    },false);

    init();
    loop();
}

function init() {
    score = 0;

    grid.init(EMPTY,COLS,ROWS);

    var sp = {x:Math.floor(COLS/2),y:ROWS-1};

    snake.init(Up,sp.x,sp.y);
    grid.set(SNAKE,sp.x,sp.y);

    setFood();
}

function loop() {
    update();
    draw();

    window.requestAnimationFrame(loop,canvas);
}

function update() {

    if(PAUSE)
    {
        frames = frames;
    }
    else {
        frames++;
    }

    if(keystate[Key_left] && snake.direction != Right) {  snake.direction = Left;  }
    if(keystate[Key_right] && snake.direction != Left) {  snake.direction = Right;  }
    if(keystate[Key_up] && snake.direction != Up) {  snake.direction = Up;  }
    if(keystate[Key_down] && snake.direction != Down) {  snake.direction = Down;  }

    if(frames % 5 == 0) // speed of the game
    {
        var nx = snake.last.x;
        var ny = snake.last.y;

        switch(snake.direction) {
            case Up:
                ny--;
                break;
            case Down:
                ny++;
                break;
            case Left:
                nx--;
                break;
            case Right:
                nx++;
                break;
        }

        if(0 > nx || nx > grid.width-1 || 0 > ny || ny > grid.height-1 || grid.get(nx,ny) == SNAKE)
        {
            if(score > sessionStorage.getItem("score"))
            {
                sessionStorage.setItem("score",score);
            }

            return init();
        }
        else if(grid.get(nx,ny) === FRUIT)
        {
            score++;
            var tail = {x:nx,y:ny};
            setFood();
        }
        else
        {
            var tail = snake.remove();
            grid.set(EMPTY,tail.x,tail.y);

            tail.x = nx;
            tail.y = ny;
        }


        grid.set(SNAKE,tail.x,tail.y);

        snake.insert(tail.x,tail.y);

    }
}

function draw()
{
    var tw = canvas.width / grid.width;
    var th = canvas.height / grid.height;

    for(x=0 ;x < grid.width; x++)
    {
        for(y=0 ;y < grid.height; y++)
        {
            switch(grid.get(x,y)) {
                case EMPTY:
                    context.fillStyle = "#fff";
                    break;
                case SNAKE:
                    context.fillStyle = "#0ff";
                    break;
                case FRUIT:
                    context.fillStyle = "#f00";
                    break;
            }

            context.fillRect(x*tw,y*th,tw,th);
        }
    }

    context.fillStyle = "red";
    context.font = "20px Arial"
    context.fillText("Score: "+score,10,canvas.height - 10);

    context.fillStyle = "green";
    previous = (sessionStorage.getItem("score") == undefined)?0:sessionStorage.getItem("score");
    context.fillText("Previous Score: "+previous,canvas.width-200,canvas.height - 10);
}

main();