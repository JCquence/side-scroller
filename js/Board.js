var Board = function()
{
    /**
     *  Height
     *  @const int
     */
    var HEIGHT = 200;

    /**
     *  Width
     *  @const int
     */
    var WIDTH = 500;

    /**
     *  Background sprite
     *  @var object
     */
    var bg;

    /**
     *  Canvas context
     *  @var object
     */
    var canvas;
    var ctx;

    /**
     *  Current X
     *  @var int
     */
    var x = 0;

    /**
     *
     *
     */
    function init()
    {
        $(function()
        {
            // --- set sprite
            bg = new Sprite('sprite/stars.jpg');

            // --- setup canvas
            $('#game').html('<canvas></canvas>');
            canvas = $('canvas');
            
            canvas.attr('width', WIDTH).attr('height', HEIGHT);
            ctx = canvas.get(0).getContext('2d');

            devicePixelRatio  = window.devicePixelRatio || 1;
            backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                                ctx.mozBackingStorePixelRatio ||
                                ctx.msBackingStorePixelRatio ||
                                ctx.oBackingStorePixelRatio ||
                                ctx.backingStorePixelRatio || 1;

            ratio = devicePixelRatio / backingStoreRatio;

            if(devicePixelRatio !== backingStoreRatio)
            {
                canvas.attr('width', (WIDTH * ratio)).attr('height', (HEIGHT * ratio)).css({height: HEIGHT, width: WIDTH});

                ctx.scale(ratio, ratio);
            }
        });
    };

    /**
     *  Paint
     *
     *  @return void
     */
    function paint()
    {
        if(x < -WIDTH)
            x = 0;
        
        ctx.drawImage(bg.getImage(), x, 0);
        ctx.drawImage(bg.getImage(), (x + WIDTH), 0);
    };

    /**
     *  Scroll background
     *
     *  @param int newX
     *
     *  @return void
     */
    function scroll(newX)
    {
        x += newX;

        return this;
    };

    //
    init();

    // --- return
    return {
        ctx   : function(){ return canvas.get(0).getContext('2d'); },
        paint : paint,
        scroll: scroll,

        HEIGHT: HEIGHT,
        WIDTH : WIDTH
    };
}();