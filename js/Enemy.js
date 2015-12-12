var Enemy = function(y)
{
    /**
     * Height
     * @const int
     */
    var HEIGHT = 15;

    /**
     * Width
     * @const int
     */
    var WIDTH = 40;

    /**
     * Which direction are we moving?
     * @var object
     */
    var moving = {left : false,
                  up   : false,
                  right: false,
                  down : false}

    /**
     * Prevent multifire
     * @var boolean
     */
    var shooting = false;

    /**
     * Current x
     * @var int
     */
    var x = (Board.WIDTH) + WIDTH;

    /**
     * Current y
     * @var int
     */
    var y = Math.floor(Math.random()*((Board.HEIGHT-HEIGHT-10)-10+1)+10);

    /**
     * Initialize ship
     *  
     * @return void
     */
    function init()
    {
        moving.left = true;
    };

    /**
     * Paint
     *  
     * @return void
     */
    function paint()
    {
        if(moving.left) x = x -1.2;
        if(moving.up    && (y - 1) > 10) y--;
        if(moving.right && (x + WIDTH  + 1) < (Board.WIDTH  - 10))  x++;
        if(moving.down  && (y + HEIGHT + 1) < (Board.HEIGHT - 10)) y++;

        if(x < (0 - WIDTH))
        {
            Game.unregisterObject('enemy');
            Game.registerObject('enemy', new Enemy(70));
        }

        Board.ctx().fillStyle = '#00dd00';
        Board.ctx().fillRect(x, y, WIDTH, HEIGHT);
    };

    /**
     * Shoot a laser
     *
     * @return void
     */
    function shoot()
    {
        if(!shooting)
        {
            shooting = true;

            lasers++;
            Game.registerObject('laser-' + lasers, new Laser((x + WIDTH + 5), (y + (HEIGHT / 2) - 2), lasers));

            setTimeout(function(){ shooting = false }, 500);
        };
    };

    //
    init();

    // --- return
    return {
        paint: paint,
        x:function(){ return x; },
        y:function(){ return y; },
        WIDTH:WIDTH,
        HEIGHT:HEIGHT
    };
};

var Simple = function()
{
    return new Enemy();
}