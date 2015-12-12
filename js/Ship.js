var Ship = function()
{
    /**
     * Height
     * @const int
     */
    var HEIGHT = 20;

    /**
     * Width
     * @const int
     */
    var WIDTH = 50;

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
    var x = 10;

    /**
     * Current y
     * @var int
     */
    var y = ((Board.HEIGHT / 2) - (HEIGHT / 2));

    /**
     * Initialize ship
     *  
     * @return void
     */
    function init()
    {
        $(document).keydown(function(ev)
        {
            if(ev.keyCode == 37) moving.left  = true;
            if(ev.keyCode == 38) moving.up    = true;
            if(ev.keyCode == 39) moving.right = true;
            if(ev.keyCode == 40) moving.down  = true;

            if(ev.keyCode == 32) shoot();
        }).keyup(function(ev)
        {
            if(ev.keyCode == 37) moving.left  = false;
            if(ev.keyCode == 38) moving.up    = false;
            if(ev.keyCode == 39) moving.right = false;
            if(ev.keyCode == 40) moving.down  = false;
        });
    };

    /**
     * Paint
     *  
     * @return void
     */
    function paint()
    {
        if(moving.left  && (x - 1) > 10) x--;
        if(moving.up    && (y - 1) > 10) y--;
        if(moving.right && (x + WIDTH  + 1) < (Board.WIDTH  - 10))  x++;
        if(moving.down  && (y + HEIGHT + 1) < (Board.HEIGHT - 10)) y++;

        Board.ctx().fillStyle = '#dd0000';
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