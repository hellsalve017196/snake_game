//logic objects

// constant
var COLS = 26, ROWS = 26;

//IDS
var SNAKE = 1,FRUIT = 2,EMPTY = 0;

//Direction
var Left = 0,Right = 2,Up = 1,Down = 3;

//keyCodes
var Key_left = 37,Key_down = 40,Key_right = 39,Key_up = 38;

//pause
var PAUSE = false;

var grid = {

    width:null,
    height:null,
    grid_id:null,

    init: function (d, c, r) {
        this.width = c;
        this.height = r;

        this.grid_id = [];

        for(x=0;x < c;x++)
        {
            this.grid_id.push([]);

            for(y=0;y < r;y++)
            {
                this.grid_id[x].push(d);
            }
        }
    },

    set: function (val,x,y) {
        this.grid_id[x][y] = val;
    },

    get: function (x,y) {
        return this.grid_id[x][y];
    }

};

var snake = {

    direction:null,
    last:null,
    queue:null,
    
    init: function (d,x,y) {
        this.direction = d;

        this.queue = [];

        this.insert(x,y);
    },

    insert: function(x,y){
        this.queue.unshift({x: x,y:y});

        this.last = this.queue[0];
    },

    remove: function() {
        return this.queue.pop();
    }

}

function setFood() {
    var empty = [];

    for(x=0 ;x < grid.width; x++)
    {
        for(y=0 ;y < grid.height; y++)
        {
            if(grid.get(x,y) == EMPTY)
            {
                empty.push({ x:x,y:y });
            }
        }
    }

    var randpos = empty[Math.floor(Math.random() * empty.length)];

    grid.set(FRUIT,randpos.x,randpos.y);
}
