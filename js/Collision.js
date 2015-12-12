var Collision = function(o1, o2)
{
    /**
     *
     *
     */
    var obj1 = o1;

    /**
     *
     *
     */
    var obj2 = o2;

    var rect1;
    var rect2;

    /**
     *
     *
     */
    function setup()
    {
        rect1 = {left: obj1.x(), right: (obj1.x() + obj1.WIDTH), top: obj1.y(), bottom: (obj1.y() + obj1.HEIGHT)};
        rect2 = {left: obj2.x(), right: (obj2.x() + obj2.WIDTH), top: obj2.y(), bottom: (obj2.y() + obj2.HEIGHT)};
    };

    /**
     *
     *
     */
    function test()
    {
        setup();

        if
        (
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom ||
            rect1.left > rect2.right ||
            rect1.right < rect2.left
        )
            return false;
        
        return true;
    };

    // --- return
    return {
        test: test
    }
};