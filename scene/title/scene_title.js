class MinLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
    }

    static new(game, text) {
        var i = new this(game, text)
        return i
    }

    draw() {
        log("gua label")
        this.game.context.fillStyle = "black";
        this.game.context.fillText(this.text, 100, 100);
    }

    update() {

    }
}

class MinParticle extends  MinImage{
    constructor(game) {
        super(game, "fire")
        this.setup()
    }

    setup() {
        // this.speed = 1
        this.lives = 10
    }

    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }

    static new(game) {
        var i = new this(game)
        return i
    }

    draw() {
        super.draw()
    }

    update() {
        this.x += this.vx
        this.y += this.vy
        var factor = 0.02
        this.vx += this.vx * factor
        this.vy += this.vy * factor
        this.lives --
    }
}


class MinParticleSystem {
    constructor(game, x, y) {
        this.name = "MinParticleSystem"
        this.game = game
        this.setup(x, y)
    }

    static new(game, x, y) {
        var i = new this(game, x, y)
        return i
    }

    setup(x, y) {
        this.x = x
        this.y = y
        this.numberOfParticles = 100
        this.particles = []
        this.duration = 10

    }

    draw() {
        if(this.duration <= 0) {
            return
        }
        for(var p of this.particles) {
            p.draw()
        }
    }



    update() {
        this.duration--
        //添加小火花
        if(this.particles.length < this.numberOfParticles) {
            var p = MinParticle.new(this.game)
            //设置一下每个小火花的坐标和加速度
            var s = 2
            var vx = randomBetween(-s, s)
            var vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }

        //更新所有的小火花
        for(var p of this.particles) {
            p.update()
        }

        //删除小火花
        this.particles = this.particles.filter(p => p.lives > 0)
    }
}

class SceneTitle extends MinScene {
    constructor(game) {
        super(game)
        this.label = MinLabel.new(game, "Press k to Game Start")
        // 把lable和image里面的draw都抽象成了scene里面的draw
        // 这样做有什么好处呢，首先具体的东西要怎么draw，都是它自己在管理
        // 然后在具体的应用场景中，调用draw这个借口，就可以让他们自己draw了
        // 这样肯定要比在中间的地方draw要好
        this.addElement(this.label)
        // game.registerAction('k', function () {
        //     var s = Scene.new(game)
        //     //時にはGAME、時にはG、ややこしい
        //     game.replaceScene(s)
        // })
        // game.registerAction('e', function () {
        //     game.canvas.width = 500
        //     var s = SceneEditor.instance(game)
        //     //時にはGAME、時にはG、ややこしい
        //     game.replaceScene(《植物大作战》全套美术资源-效果烟花2(effect_fir_爱给网_aigei_com.pngs)
        // })

        var ps = MinParticleSystem.new(this.game)
        this.addElement(ps)
    }

    // static new(game) {
    //     var i = new this(game)
    //     return i
    // }

    //override
    draw() {
        super.draw()
        //fill text
        // this.game.context.fillStyle = "black";
        // this.game.context.fillText("Press k to Game Start", 100, 100);
        // this.label.draw()

    }

}