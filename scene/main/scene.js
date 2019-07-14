const config = {
    player_speed : 10,
    cloud_speed: 1,
    enemy_speed: 1,
    bullet_speed: 1,
    fire_cooldown:9,
}
class Bullet extends MinImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }

    setup() {
        this.speed = 1
    }

    update() {
        this.speed = config.bullet_speed
        this.y -= this.speed
    }
}

class Player extends MinImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
    }

    setup() {
        this.speed = 5
        this.cooldown = 0
    }

    update() {
        // super.update();
        // log("player class", config.player_speed)
        log("update")
        this.speed = config.player_speed
        // log("this.cool   down", this.cooldown)
        if(this.cooldown > 0) {
            log("cooldown update", this.cooldown )
            this.cooldown --
        }
        log(this.x, this.y)

    }

    moveLeft() {
        log("moveleft", this.speed)
        this.x -= this.speed
    }
    moveRight() {
        log("moveright", this.speed)
        this.x += this.speed
    }

    moveUp() {
        this.y -= this.speed
    }

    moveDown() {
        this.y += this.speed
    }

    fire() {

        if(this.cooldown <= 0) {
            log("cooldown 0")
            this.cooldown = config.fire_cooldown
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scence.addElement(b)
        }

    }

}

class Enemy extends MinImage {
    constructor(game) {
        var type = randomBetween(0, 4)
        var name = 'enemy' + type
        super(game, name)
        this.setup()
    }

    setup() {
        var s = randomBetween(2, 5)
        this.speed = s
        this.x = randomBetween(0, 350)
        this.y = - randomBetween(0, 200)
        // this.y = 0
        // log("x", this.x, "y", this.y)
    }

    update() {
        this.y += this.speed
        if(this.y > 600) {
            this.setup()
        }

    }

}

class Cloud extends MinImage {
    constructor(game) {
        var type = randomBetween(0, 4)
        var name = 'cloud'
        super(game, name)
        this.setup()
    }

    setup() {
        this.speed = 1
        this.x = randomBetween(0, 300)
        this.y = - randomBetween(0, 200)
    }

    update() {
        this.y += this.speed
        if(this.y > 600) {
            this.setup()
        }

    }

    debug(){
        this.speed = config.cloud_speed
    }

}

class Scene extends MinScene {
    constructor(game) {
        super(game)
        // game.registerAction('k', function () {
        //     var s = Scene(game)
        //     //時にはGAME、時にはG、ややこしい
        //     game.replaceScene(s)
        // })
        // game.registerAction('e', function () {
        //     game.canvas.width = 500
        //     var s = SceneEditor.instance(game)
        //     //時にはGAME、時にはG、ややこしい
        //     game.replaceScene(s)
        // })
        this.setup()
        this.setupInput()

    }

    setup() {
        var game = this.game
        this.numberOfEnemy = 10
        this.bg = MinImage.new(game, 'sky')
        this.cloud = Cloud.new(game)
        this.player = new Player(game)
        // this.player = MinImage.new(game, 'player')
        this.player.x = 100
        this.player.y = 150

        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)

        this.addEnemies()

    }

    addEnemies() {
        var es = []
        for (let i = 0; i < this.numberOfEnemy; i++) {
            var e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }

    setupInput() {
        var g = this.game
        var s = this
        g.registerAction('d', function () {
            s.player.moveRight()
        })

        g.registerAction('a', function () {
            s.player.moveLeft()
        })
        g.registerAction('w', function () {
            s.player.moveUp()
        })

        g.registerAction('s', function () {
            s.player.moveDown()
        })

        g.registerAction('j', function () {
            s.player.fire()
        })
    }


    update(){
        super.update();
        // this.cloud.y += 1
    }

    // static new(game) {
    //     var i = new this(game)
    //     return i
    // }

    //override
    // draw() {
    //     this.game.drawImage(this.bg)
    //     this.player.w = 1
    //     this.player.h = 1
    //     this.game.drawImage(this.player)
    //     //fill text
    //     // this.game.context.fillStyle = "black";
    //     // this.game.context.fillText("Press k to Game Start", 100, 100);
    //
    // }

}


//Sceneの中で、あるいはこのゲームのソースコードの中で、
// 重複しているコードが多すぎる。
// それを解決するためにはオブジェクト志向を使う
// var Scene = function (game) {
//     var s = {
//         game: game,
//     }
//
//     //initialize
//     var paddle = Paddle(game)
//     var ball = Ball(game)
//     var score = 0
//     blocks = loadLevel(game, 1)
//
//
//     paused = false
//     //function化
//     game.registerAction('d', function () {
//         paddle.moveRight()
//     })
//
//     game.registerAction('a', function () {
//         paddle.moveLeft()
//     })
//
//     game.registerAction('f', function () {
//         ball.fire()
//     })
//
//
//     s.draw = function () {
//         //fill rect color
//         game.context.fillStyle = "#443"
//         game.context.fillStyle = "#443"
//         game.context.fillRect(0, 0, 400, 300);
//
//         //理想形:game.draw(paddle)
//         game.drawImage(paddle)
//         game.drawImage(ball)
//
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.alive) {
//                 game.drawImage(block)
//             }
//         }
//
//         //fill text
//         game.context.fillStyle = "white";
//         game.context.fillText("Score:" + score, 10, 20);
//
//     }
//
//     s.update = function () {
//         if (paused) {
//             return
//         }
//         log("ball.y", ball.y, "paddle.y", paddle.y)
//         if (ball.y > paddle.y) {
//             var end = SceneEnd.new(game)
//             //時にはGAME、時にはG、ややこしい
//             game.replaceScene(end)
//             return
//         }
//         ball.move()
//         //if collide
//         if (paddle.collide(ball)) {
//             //ballの何かのメソッドを呼ぶべき
//             // ball.speedY *= -1
//             ball.rebound()
//         }
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.collide(ball)) {
//                 //ballの何かのメソッドを呼ぶべき
//                 block.kill()
//                 score += 100
//                 ball.rebound()
//             }
//         }
//
//     }
//
//     var enableDrag;
//     game.canvas.addEventListener('mousedown', function (event) {
//         // log(evt)
//         var x = event.offsetX
//         var y = event.offsetY
//         // log("mousedown", x, y)
//         //is ball clicked?
//         if (ball.hasPoint(x, y)) {
//             enableDrag = true
//         }
//
//     })
//     game.canvas.addEventListener('mousemove', function (event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         // log("mousedown", x, y)
//         if (enableDrag) {
//             ball.x = x
//             ball.y = y
//         }
//
//     })
//
//     game.canvas.addEventListener('mouseup', function (event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         log("mousedown", x, y)
//         enableDrag = false
//     })
//
//
//     return s
// }