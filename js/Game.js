var Game = function()
{
    /**
     * Holds current frame
     * @var int
     */
    var frame = 0;
    
    /**
     * Frames per second
     * @var int
     */
    var fps = (1000 / 60);

    /**
     * Paintable objects
     * @var array
     */
    var paintables = new Array();
    
    /**
     * Game is running
     * @var boolean
     */
    var running = true;
    
    /**
     * Main thread
     * @var int
     */
    var thread;
    
    /**
     * Return current frame
     *
     * @return int
     */
    function getFrame(){ return frame; };
    
    /**
     * The loop, do all things needed
     *
     * @return void
     */
    function loop()
    {
        if(running)
        {
            // --- paint the Board
            Board.ctx().clearRect(0, 0, Board.WIDTH, Board.HEIGHT);
            Board.scroll(-0.5).paint();

            // --- set frame
            if((++frame * (1000 / 60)) >= 1000)
                frame = 0;

            // --- paint objects
            for(key in paintables)
                paintables[key].paint(frame);

            //
            for(var l = 1; l <= lasers; l++)
            {
                if(paintables['laser-' + l])
                {
                    var col = new Collision(paintables['laser-' + l], paintables['enemy']);
                    if(col.test())
                    {
                        unregisterObject('enemy');
                        unregisterObject('laser-' + l);
                        registerObject('enemy', new Enemy());
                    }
                }
            }
            
            thread = setTimeout(function(){ loop(); }, fps);
        }
        else
            clearTimeout(thread);
    };

    /**
     * Register an object so it can be painted on canvas
     *
     * @param string key
     * @param object obj
     *
     * @return void
     */
    function registerObject(key, obj){ paintables[key] = obj; };
    function unregisterObject(key){ delete paintables[key]; };

    /**
     * Start the game
     *
     * @return void
     */
    function start()
    {
        running = true;

        registerObject('ship', new Ship());
        setTimeout(function(){ registerObject('enemy', new Enemy()); }, 5000);

        loop();
    };

    /**
     * Stop the game
     *
     * @return void
     */
    function stop(){ running = false; };
    
    // --- return
    return {
        getFrame      : getFrame,
        registerObject: registerObject,
        unregisterObject :unregisterObject,
        start         : start,
        stop          : stop 
    };
}();