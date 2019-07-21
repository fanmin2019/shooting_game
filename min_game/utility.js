const log = console.log.bind("console")
const imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

const rectInterSects = function (a, b) {
    if(!paused) {
        // log("a.y", a.y, "b.y", b.y, "b.y + b.image.height", b.y + b.image.height, a.y > b.y && b.y + b.image.height > a.y)
        // log("a.x", a.x, "b.x", b.x, "b.x + b.image.height", b.x + b.image.width, a.x < b.x && a.x > b.x + b.image.width)
    }

    if(b.y <= a.y && a.y <= b.y + b.h) {
            //paddleの左端より右、かつ、paddleの右端より左
            if(b.x <=  a.x && a.x <= b.x + b.w ){
                return true
            }
    }
    return false
}

const randomBetween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}
