var Sprite = function(s, c)
{
    /**
     * Callback
     * @var function
     */
    var callback = (c ? c : function(){});

    /**
     * Image object
     * @var object
     */
    var img;

    /**
     * Sprite file
     * @var string
     */
    var sprite = s;

    /**
     * Return image object
     *
     * @return object
     */
    function getImage(){ return img; };

    /**
     * Initialize sprite
     *
     * @return void
     */
    function init()
    {
        img = new Image();
        img.onload = callback;
        img.src = sprite;
    };

    //
    init();

    // --- return
    return {
        getImage: getImage
    };
};