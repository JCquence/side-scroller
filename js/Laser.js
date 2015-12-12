var lasers = 0;
var Laser = function(x, y, id)
{
    /**
     * Height
     * @const int
     */
    var HEIGHT = 4;

    /**
     * Width
     * @const int
     */
    var WIDTH = 12;

    /**
     *
     *
     */
    var id = id;

    /**
     * Current x
     * @var int
     */
    var x = x;

    /**
     * Current y
     * @var int
     */
    var y = y;

    /**
     * Paint
     *  
     * @return void
     */
    function paint()
    {
        x += 2;
        if(x > Board.WIDTH)// || x < Board.WIDTH)
            Game.unregisterObject('laser-' + id);

        Board.ctx().fillStyle = '#ffffff';
        Board.ctx().fillRect(x, y, WIDTH, HEIGHT);

    };

    // --- return
    return {
        paint: paint,
        x:function(){ return x; },
        y:function(){ return y; },
        WIDTH:WIDTH,
        HEIGHT:HEIGHT
    };
};