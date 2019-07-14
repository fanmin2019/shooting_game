var enableDebugMode = function (game, enabled, ball) {
    if(!enabled) {
        return
    }
    var range = document.getElementById("id-input-speed")
    range.addEventListener("input", function (event) {
        // log(event.target.value, event)
        window.fps = Number(event.target.value)
    })

    window.addEventListener('keyup', function (event) {
        var k = event.key
        log("key is ", k)
        if(k == 'p') {
            //一時停止
            window.paused = !window.paused
        }else if ('1234567'.includes(k)) {
            //デバッグのため
            // blocks = loadLevel(game, Number(k))
        }
    })

    window.addEventListener('click', function (event) {
        log(event.target)
    })
}

var __main = function() {
    // log("main start")
    // オブジェクトのインスタンスを作る
    var images = {
        'bullet': 'img/bullet.png',
        'cloud': 'img/cloud.png',
        'player': 'img/player.gif',
        'sky': 'img/sky.png',
        'enemy0': 'img/enemy1.png',
        'enemy1': 'img/enemy2.png',
        'enemy2': 'img/enemy3.png',
        'enemy3': 'img/enemy1.png',
        'enemy4': 'img/enemy2.png',
    }


    var game =  MinGame.instance(30, images, function (g) {
        // log("game22", g)
        var s = Scene.new(g)
        game.runWithScene(s)
        window.paused = false
    })
    // var game =  Min_game(30, images, function (game) {
        //ロジックが近いコードについては移動して、まとめて抽象化すべき
        // var scene = Scene(game)

        // var paddle = Paddle(game)
        // var ball =  Ball(game)
        // var score = 0
        // //結局グローバル変数にしないといけない
        //同じ図なので、何回もロードする必要がない
        // blocks = loadLevel(game,1)

        // paused = false
        // //function化
        // game.registerAction('d', function(){
        //     paddle.moveRight()
        // })
        //
        // game.registerAction('a', function(){
        //     paddle.moveLeft()
        // })
        //
        // game.registerAction('f', function(){
        //     ball.fire()
        // })

        // game.registerAction('p', function(){
        //      paused = !paused
        //  })
        //gameがロードされたタイミングでデバッグモードを呼び出す
        // enableDebugMode(game,true)
        // game.update = function() {
        //     // if(paused) {
        //     //     return
        //     // }
        //     //call s.update()
        //     scene.update()
        //
        //     // ball.move()
        //     //
        //     // //if collide
        //     // if(paddle.collide(ball)){
        //     //     //ballの何かのメソッドを呼ぶべき
        //     //     // ball.speedY *= -1
        //     //     ball.rebound()
        //     // }
        //     // for (var i=0; i < blocks.length; i++) {
        //     //     var block = blocks[i]
        //     //     if(block.collide(ball)){
        //     //         //ballの何かのメソッドを呼ぶべき
        //     //         block.kill()
        //     //         score += 100
        //     //         ball.rebound()
        //     //     }
        //     // }
        //
        // }

        //game.drawは実際に常にrun loopの中で呼ばれているが、
        // このメインの中だけだと、わかりにくい
        //定義するのがおかしい、理想形:game.draw(padle)
        //paddleを渡すために（setInterval)、ここで書かざるを得ない
        // game.draw = function() {
        //     //s. draw
        //     scene.draw()
        //     // //fill rect color
        //     // game.context.fillStyle = "#443"
        //     // game.context.fillRect(0, 0, 400, 300);
        //     //
        //     // //理想形:game.draw(paddle)
        //     // game.drawImage(paddle)
        //     // game.drawImage(ball)
        //     //
        //     // for (var i=0; i < blocks.length; i++) {
        //     //     var block = blocks[i]
        //     //     if(block.alive) {
        //     //         game.drawImage(block)
        //     //     }
        //     // }
        //     //
        //     // //fill text
        //     // game.context.fillText("Score:" + score, 10, 290);
        // }
    // })
    enableDebugMode(game,true)
}


__main()