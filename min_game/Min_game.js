class MinGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        this.actions = {}
        this.keydowns = {}
        this.scence = null
        this.canvas = document.querySelector("#id-canvas")
        this.context = this.canvas.getContext("2d")
        var self = this
        //events
        window.addEventListener('keydown', function (event) {
            //ここでもしthisを使ってしまうと、thisがwindowになってるはず
            self.keydowns[event.key] = true
        })

        window.addEventListener('keyup', event => {
            this.keydowns[event.key] = false
        })

        this.init()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    drawImage(minImg) {
        this.context.drawImage(minImg.texture, minImg.x, minImg.y)
    }

    registerAction = (key, callback) => {
        this.actions[key] = callback
    }

    // arrow関数を使わないと、thisがwindowになってしまう
    update = () => {
        this.scence.update()
    }

    draw = () => {
        this.scence.draw()
    }

    runloop = () => {
        var actions = Object.keys(this.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (this.keydowns[key]) {
                //if key is down, callback
                this.actions[key]()
            }
        }
        //clear
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //update
        this.update()
        //draw
        this.draw()
        //timer
        var self = this
        setTimeout(() => {
            this.runloop()
        }, 1000 / window.fps);
    }

    init = () => {
        //図のロードが終わったら、ゲームを開始
        var counts = []
        var g = this
        var keyList = Object.keys(g.images)
        log("keyList", keyList)
        for (var i = 0; i < keyList.length; i++) {
            //varを使うと、onloadのcallback関数内は常に一つ目のimgになってしまう
            let img = new Image()
            let name = keyList[i]
            img.src = g.images[name]
            log("img.src", img.src, img)
            img.onload = function () {
                g.images[name] = img
                counts.push(img)
                if (counts.length == keyList.length) {
                    //game start
                    g.runCallback(g)
                    g.__start()
                }
            }
        }
    }

    textureByName = (name) => {
        var o = this.images[name]
        return o
    }


    runWithScene = (scene) => {
        this.scence = scene
        //timer
        //intervalおかしい
        var self = this
        setTimeout(function () {
            self.runloop()
        }, 1000 / window.fps);
    }

    __start = () => {
        this.runCallback(this)
    }

    replaceScene = (scene) => {
        this.scence = scene
    }


}