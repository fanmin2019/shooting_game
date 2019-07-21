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
        this.numberOfEnemy = 5
        this.bg = MinImage.new(game, 'sky')
        this.cloud = Cloud.new(game)
        this.player = new Player(game)
        // this.player = MinImage.new(game, 'player')
        this.player.x = 100
        this.player.y = 380
        this.score = Score.new(game)

        this.addElement(this.bg)
        this.addElement(this.cloud)
        this.addElement(this.player)
        this.addElement(this.score)
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