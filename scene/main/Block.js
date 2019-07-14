var Block = function (game, position) {
    log("new block created  ")
    // log("position", position)
    //position[x,y]
    var p = position
    //imageFromPathはどこから来たか、わからなくなる
    // var image = imageFromPath('block.PNG')
    var o = game.imageByName('block')
    o.x = p[0]
    o.y = p[1]
    o.fired = false
    o.width  = 50
    o.height = 20
    o.alive = true
    o.lives = p[2] || 1

    /*
    var o = {
        image: image,
        x: p[0],
        y: p[1],
        width: 50, // comma must
        height: 20, // comma must
        alive: true,
        lives: p[2] || 1,
    }
*/

    o.kill = function() {
        o.lives--
        if(o.lives < 1) {
            o.alive = false
        }
    }

    o.collide = function (ball) {
        return o.alive && (rectInterSects(o, ball) || rectInterSects(ball, o))
        // if(rectInterSects(o, ball) || rectInterSects(ball, o)) {
        //  // if(rectInterSects(o, ball)) {
        //     return true
        // } else {
        //     return false
        // }

    }
    o.hasPoint = function (x, y) {
        var xIn = o.x <= x &&  x <= o.x + o.w
        var yIn = o.y <= y &&  y <= o.y + o.h
        return xIn && yIn
    }

    return o
}