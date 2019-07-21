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
    // オブジェクトのインスタンスを作る
    var images = {
        'bullet': 'img/bullet/bullet.png',
        'cloud': 'img/background/cloud.png',
        'player': 'img/player.gif',
        'sky': 'img/background/sky.png',
        'enemy0': 'img/enemy/enemy1.png',
        'enemy1': 'img/enemy/enemy2.png',
        'enemy2': 'img/enemy/enemy3.png',
        'enemy3': 'img/enemy/enemy1.png',
        'enemy4': 'img/enemy/enemy2.png',
        'fire': 'img/background/fire.png',
        'bullet_enemy': 'img/bullet/bullet_enemy.png',
    }


    window.bullets_enemy = []

    var game =  MinGame.instance(30, images, function (g) {
        // log("game22", g)
        // var s = SceneTitle.new(g)
        var s = Scene.new(g)
        game.runWithScene(s)
        window.paused = false
    })

    enableDebugMode(game,true)
}


__main()