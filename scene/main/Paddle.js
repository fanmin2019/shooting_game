//gameは他のオブジェクトなのに、パラメータとして入れるのはどうかな
var Paddle = function(game){
    // var image = imageFromPath('panel.PNG')
    var o = game.imageByName('paddle')
    o.speed = 15
    o.x = 100
    o.y = 250
    // var o = {
    //     image: image,
    //     x: 100,
    //     y: 250,
    //     speed: 5, // comma must
    // }

    //同じロジックをまとめる
    o.move = function (x){
        log("o.move", o.w, o.h)
        if(x < 0) {
            x = 0
        } else if(o.x > 400 - o.w){
            x = 400 - o.w
        }
        o.x = x
    }

    o.moveRight = function() {
        // if(o.x > 400 - o.image.width) {
        //     o.x = 400 - o.image.width
        // } else {
        //     o.x += o.speed
        // }
        o.move(o.x + o.speed)
    }

    o.moveLeft = function() {
        // if(o.x < 0) {
        //     o.x = 0
        // } else {
        //     o.x -= o.speed
        // }
        o.move(o.x - o.speed)
    }

    var aInb = function(x, x1, x2) {
        return x >= x1 && x <= x2
    }

    o.collide = function (ball) {
        // //paddleの上端より低い
        // if(ball.y + ball.h > o.y) {
        //     //paddleの左端より右、かつ、paddleの右端より左a
        //     if(ball.x > o.x && ball.x < o.x + o.w ){
        //         return true
        //     } else {
        //         return false
        //     }
        // }else {
        //     return false
        // }

        var a = o
        var b = ball

        if(aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if(aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
    }

    return o
}