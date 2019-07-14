var Ball = function (game, x, y) {
    // var image = imageFromPath('ball.PNG')
    var o = game.imageByName('ball')
    o.speedX = 10
    o.speedY = 10
    o.x = x || 100
    o.y = y || 200
    o.fired = false

    /**
     var o = {
        image: image,
        x: 100,
        y: 200,
        speedX: 10, // comma must
        speedY: 10, // comma must
        fired: false,

    }
     */
    o.fire = function() {
        o.fired = true
    }

    o.move = function() {
        if(o.fired) {
            if(o.x < 0 || o.x > 400) {
                o.speedX = o.speedX * -1
            }else{
                o.speedX = o.speedX * 1
            }

            if(o.y < 0 || o.y > 300) {
                o.speedY = o.speedY * -1
            }else{
                o.speedY = o.speedY * 1
            }

            o.x += o.speedX
            o.y += o.speedY
        }
    }

    o.rebound = function () {
        log("rebound")
        o.speedY *= -1
    }

    o.hasPoint = function (x, y) {
        var xIn = o.x <= x &&  x <= o.x + o.w
        var yIn = o.y <= y &&  y <= o.y + o.h
        return xIn && yIn
    }
    return o
}